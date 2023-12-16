import { createNewVote } from "@/repositories/vote.repository";

const handleCreateNewVote = (id: string, option: string) => {
  createNewVote(id, option);
};
export { handleCreateNewVote };
