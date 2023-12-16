import { getLocalDBInstance } from "@/lib/db";

const createNewVote = (id: string, option: string) => {
  const db = getLocalDBInstance(id);
  const stmt = db.prepare(
    "INSERT INTO vote (optionId) values ($optionId) RETURNING (id)"
  );
  return stmt.get({ $optionId: option }) as { id: string };
};

export { createNewVote };
