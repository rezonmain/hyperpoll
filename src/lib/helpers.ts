import { getLocalDBInstance } from "./db";

const isEmpty = (val: unknown) => {
  if (!val) {
    return true;
  }
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  if (Object.values(val).length === 0) {
    return true;
  }
  return false;
};

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const bench = (fn: () => void, cycles: number) => {
  const times: number[] = [];
  const benchOnce = (fn: () => void) => {
    const t1 = performance.now();
    fn();
    const t2 = performance.now();
    return t2 - t1;
  };
  for (let i = 0; i < cycles; i++) {
    times.push(benchOnce(fn));
  }
  return times.reduce((acc, curr) => acc + curr, 0) / times.length;
};

const insertRandomVotes = (id: string, amount: number) => {
  const db = getLocalDBInstance(id);
  const { optionCount } = db
    .prepare("SELECT COUNT(option) as optionCount from poll")
    .get() as { optionCount: number };
  const stmt = db.prepare("INSERT INTO vote (optionId) values ($optionId)");
  for (let i = 0; i < amount; i++) {
    const option = getRandomIntInclusive(1, optionCount);
    stmt.run({ $optionId: option });
  }
};

export { insertRandomVotes, isEmpty, bench };
