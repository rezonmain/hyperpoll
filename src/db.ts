import Database from "bun:sqlite";
import fs from "node:fs/promises";
import { Logger } from "./Logger";
import { deleteMemoryPoll } from "./helpers";

const MIGRATION_PATH = "migrations";
const GLOBAL_DB_PATH = "data/db.sqlite";

async function listMigrations(): Promise<string[]> {
  const pathname = MIGRATION_PATH;
  return await fs.readdir(pathname);
}

async function readAllMigrations(): Promise<
  Array<{ name: string; version: number; content: string[] }>
> {
  const migrations = await listMigrations();
  const pathname = MIGRATION_PATH;
  const promises = migrations.map(async (migration) => {
    const content = await fs.readFile(`${pathname}/${migration}`, "utf-8");
    const version = parseInt(migration.split("_")[0]);
    return {
      name: migration,
      version,
      content: content
        .replaceAll("\n", "")
        .split(";")
        .filter((s) => s)
        .map((s) => s + ";"),
    };
  });
  const resolvedMigrations = await Promise.all(promises);
  return resolvedMigrations.sort((a, b) => a.version - b.version);
}

async function getCurrentMigrationVersion() {
  const db = getDbInstance(GLOBAL_DB_PATH);
  const version = db.prepare("PRAGMA user_version").get() as {
    user_version: number;
  };
  return version.user_version;
}

async function writeMemoryDatabaseFile(pathname: string) {
  const file = Bun.file(pathname);
  if (await file.exists()) {
    return;
  }
  await Bun.write(pathname, "");
}

const configurePollMemoryDB = (db: Database, dbPath: string) => {
  db.transaction(() => {
    db.run(`CREATE TABLE IF NOT EXISTS poll (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            option TEXT NOT NULL
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS title (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS vote (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            optionId INTEGER NOT NULL,
            FOREIGN KEY(optionId) REFERENCES poll(id)
            )`);
  })();
};

async function runMigrations() {
  await writeMemoryDatabaseFile(GLOBAL_DB_PATH);
  const db = getDbInstance(GLOBAL_DB_PATH);
  const migrations = await readAllMigrations();
  const currentVersion = await getCurrentMigrationVersion();
  for (const migration of migrations) {
    if (migration.version <= currentVersion) {
      Logger.log(
        `⏭️  [migrate()] Skipping migration: ${migration.name} version: ${migration.version}`
      );
      continue;
    }
    try {
      db.transaction(() => {
        migration.content.forEach((sql) => {
          db.prepare(sql).run();
        });
      })();
    } catch (error) {
      Logger.error(
        `❌ [migrate()] Error running migration ${migration.name} rolling back transaction...`,
        "\n",
        error
      );
      Logger.logAndExit("😤 Unable to run migrations 😤");
    }
    Logger.log(
      `🔄 [migrate()] OK Migration: ${migration.name}, version: ${migration.version}`
    );
  }
  Logger.log(
    `✅ [migrate()] Successfully ran all migrations, latest version: ${
      migrations[migrations.length - 1].version
    }`
  );
}

const getDbInstance = (pathname: string) => new Database(pathname);

export {
  runMigrations,
  writeMemoryDatabaseFile,
  configurePollMemoryDB,
  GLOBAL_DB_PATH,
  getDbInstance,
};
