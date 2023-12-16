import { generateVoteRegistration } from "@/lib/fraud";
import { createNewVote } from "@/repositories/vote.repository";
import type { SocketAddress } from "bun";

const handleCreateNewVote = ({
  pollId,
  optionId,
  ip,
}: {
  pollId: string;
  optionId: string;
  ip: string | SocketAddress;
}) => {
  const ipAddress = typeof ip === "string" ? ip : ip.address;
  const registration = generateVoteRegistration({ ipAddress, pollId });
  const { id: voteId } = createNewVote({ pollId, optionId, registration });
  return voteId;
};
export { handleCreateNewVote };
