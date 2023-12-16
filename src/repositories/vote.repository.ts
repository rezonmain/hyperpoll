import { getLocalDBInstance } from "@/lib/db";

const createNewVote = (id: string, option: string) => {
  const db = getLocalDBInstance(id);
  const stmt = db.prepare("INSERT INTO vote (optionId) values ($optionId)");
  stmt.run({ $optionId: option });
};

export { createNewVote };
