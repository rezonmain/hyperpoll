import { init as configCuid } from "@paralleldrive/cuid2";
import { unlink } from "node:fs/promises";
import sanitizeHtml from "sanitize-html";
import {
  GLOBAL_DB_PATH,
  configurePollMemoryDB,
  getDbInstance,
  writeMemoryDatabaseFile,
} from "./db";
import { Poll } from "./models/Poll";
import { Option } from "./models/Option";
import { Vote } from "./models/Vote";

const POLL_DATA_DIR = "data";
const cuid = configCuid({ length: 6 });

const getPollUrl = (id: string) => `http://localhost:3000/poll/${id}`;

const sanitize = (str: string) =>
  sanitizeHtml(str, { allowedTags: ["b", "i", "em", "strong"] });

const writeToDb = async (pollId: string, pollTitle: string) => {
  const db = getDbInstance(GLOBAL_DB_PATH);
  const stmt = db.prepare(
    "INSERT INTO poll (title, pollId) VALUES ($title, $pollId)"
  );
  stmt.run({ $title: pollTitle, $pollId: pollId });
};

const writeToMemory = async (
  id: string,
  data: {
    option: string[];
    pollTitle: string;
  }
) => {
  const dbPath = `${POLL_DATA_DIR}/poll_${id}.sqlite`;
  await writeMemoryDatabaseFile(dbPath);

  const db = getDbInstance(`${POLL_DATA_DIR}/poll_${id}.sqlite`);
  configurePollMemoryDB(db, dbPath);

  let stmt = db.prepare("INSERT INTO poll (option) VALUES ($option)");
  db.transaction((ops) => {
    for (const o of ops) stmt.run({ $option: o });
    return ops.length;
  })(data.option);

  stmt = db.prepare("INSERT INTO title (title) VALUES ($title)");
  db.transaction((title) => stmt.run({ $title: title }))(data.pollTitle);
};

const handleGenerateNewPoll = async (data: {
  option: string | string[];
  pollTitle: string;
}) => {
  const id = cuid();
  const filteredOptions = Array.isArray(data.option)
    ? data.option.filter((o) => o !== "")
    : [data.option];
  const sanitizedOptions = filteredOptions.map((o) => sanitize(o));
  const sanitizedTitle = sanitize(data.pollTitle);
  writeToMemory(id, { pollTitle: sanitizedTitle, option: sanitizedOptions });
  writeToDb(id, sanitizedTitle);
  return getPollUrl(id);
};

const getPollData = (id: string) => {
  const globalDb = getDbInstance(GLOBAL_DB_PATH);
  const res = globalDb
    .prepare("SELECT * FROM poll WHERE pollId = $id")
    .get({ $id: id });

  if (!res) {
    throw new Error("NOT_FOUND");
  }

  const db = getDbInstance(`${POLL_DATA_DIR}/poll_${id}.sqlite`);
  const options = db.prepare("SELECT * FROM poll").all() as Option[];
  const { title } = db.prepare("SELECT title FROM title").get() as {
    title: string;
  };
  return { pollTitle: title, options };
};

const getAllPolls = () => {
  const db = getDbInstance(GLOBAL_DB_PATH);
  const res = db.prepare("SELECT * FROM poll").all() as Poll[];
  return res;
};

const deleteMemoryPoll = async (id: string) => {
  const pathname = `${POLL_DATA_DIR}/poll_${id}.sqlite`;
  const fileDB = Bun.file(pathname);
  if (await fileDB.exists()) {
    await unlink(pathname);
  }
};

const deletePollFromGlobalDB = (id: string) => {
  const db = getDbInstance(GLOBAL_DB_PATH);
  const stmt = db.prepare("DELETE FROM poll WHERE pollId = $id");
  stmt.run({ $id: id });
};

const handleDeletePoll = async (id: string) => {
  deleteMemoryPoll(id);
  deletePollFromGlobalDB(id);
};

const handleNewVote = (id: string, option: string) => {
  const db = getDbInstance(`${POLL_DATA_DIR}/poll_${id}.sqlite`);
  const stmt = db.prepare("INSERT INTO vote (optionId) values ($optionId)");
  stmt.run({ $optionId: option });
};

const getPollResult = (id: string) => {
  const db = getDbInstance(`${POLL_DATA_DIR}/poll_${id}.sqlite`);
  const options = db.prepare("SELECT * FROM poll").all() as Option[];
  const votes = db.prepare("SELECT * FROM vote").all() as Vote[];
  const { title } = db.prepare("SELECT title FROM title").get() as {
    title: string;
  };
  const results = options.map((o) => {
    const voteCount = votes.filter((v) => v.optionId === o.id).length;
    return { ...o, voteCount };
  });
  return { pollTitle: title, results };
};

export {
  handleGenerateNewPoll,
  getPollData,
  getAllPolls,
  handleDeletePoll,
  handleNewVote,
  deleteMemoryPoll,
  getPollResult,
};
