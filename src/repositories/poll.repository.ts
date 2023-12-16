import { GLOBAL_DB_PATH, POLL_DATA_DIR } from "@/constants/db";
import {
  configureLocalDB,
  createLocalDatabaseFile,
  getDbInstance,
  getLocalDBInstance,
} from "@/lib/db";
import { Option } from "@/models/Option";
import { Poll } from "@/models/Poll";
import { Vote } from "@/models/Vote";

const getAllPolls = () => {
  const db = getDbInstance(GLOBAL_DB_PATH);
  const res = db.prepare("SELECT * FROM poll").all() as Poll[];
  return res;
};

const getPollData = (id: string) => {
  const globalDb = getDbInstance(GLOBAL_DB_PATH);
  const res = globalDb
    .prepare("SELECT * FROM poll WHERE pollId = $id")
    .get({ $id: id });
  if (!res) {
    throw new Error("NOT_FOUND");
  }
  const db = getLocalDBInstance(id);
  const options = db.prepare("SELECT * FROM poll").all() as Option[];
  const { title } = db.prepare("SELECT title FROM title").get() as {
    title: string;
  };
  return { pollTitle: title, options };
};

const getPollResult = (id: string) => {
  const db = getLocalDBInstance(id);
  const options = db.prepare("SELECT id, option FROM poll").all() as Option[];
  const votes = db.prepare("SELECT optionId FROM vote").all() as Vote[];
  const { title } = db.prepare("SELECT title FROM title").get() as {
    title: string;
  };
  const results = options.map((o) => {
    const count = votes.filter((v) => v.optionId === o.id).length;
    return { option: o.option, count };
  });
  return { pollTitle: title, results };
};

const createNewPoll = async (
  id: string,
  data: {
    option: string[];
    pollTitle: string;
  }
) => {
  await createLocalDatabaseFile(`${POLL_DATA_DIR}/poll_${id}.sqlite`);

  const localDB = getLocalDBInstance(id);
  configureLocalDB(localDB);

  let stmt = localDB.prepare("INSERT INTO poll (option) VALUES ($option)");
  localDB.transaction((ops) => {
    for (const o of ops) stmt.run({ $option: o });
    return ops.length;
  })(data.option);

  stmt = localDB.prepare("INSERT INTO title (title) VALUES ($title)");
  localDB.transaction((title) => stmt.run({ $title: title }))(data.pollTitle);

  const globalDB = getDbInstance(GLOBAL_DB_PATH);
  stmt = globalDB.prepare(
    "INSERT INTO poll (title, pollId) VALUES ($title, $pollId)"
  );
  stmt.run({ $title: data.pollTitle, $pollId: id });
};

const deletePollFromGlobalDB = (id: string) => {
  const db = getDbInstance(GLOBAL_DB_PATH);
  const stmt = db.prepare("DELETE FROM poll WHERE pollId = $id");
  stmt.run({ $id: id });
};

export {
  getAllPolls,
  getPollData,
  getPollResult,
  createNewPoll,
  deletePollFromGlobalDB,
};
