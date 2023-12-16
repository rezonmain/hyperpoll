import { getLocalDBInstance } from "@/lib/db";

const createNewVote = ({
  pollId,
  optionId,
  registration,
}: {
  pollId: string;
  optionId: string;
  registration: string;
}) => {
  const db = getLocalDBInstance(pollId);
  const stmt = db.prepare(
    "INSERT INTO vote (optionId, registration) values ($optionId, $registration) RETURNING (id)"
  );
  return stmt.get({ $optionId: optionId, $registration: registration }) as {
    id: string;
  };
};

const getRegistration = ({
  pollId,
  registration,
}: {
  pollId: string;
  registration: string;
}) => {
  const db = getLocalDBInstance(pollId);
  const stmt = db.prepare(
    "SELECT registration FROM vote WHERE registration = $registration"
  );
  return stmt.get({ $registration: registration });
};

export { createNewVote, getRegistration };
