import { createNewVote } from "@/repositories/vote.repository";

const handleCreateNewVote = (id: string, option: string) => {
  const { id: voteId } = createNewVote(id, option);
  return voteId;
};
export { handleCreateNewVote };
