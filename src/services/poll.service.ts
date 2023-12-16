import { ROUTE } from "@/constants/routes";
import { deleteLocalDB } from "@/lib/db";
import { sanitizeHtml } from "@/lib/fraud";
import { generateId } from "@/lib/id";
import { fillDynamicPath } from "@/lib/path";
import {
  createNewPoll,
  deletePollFromGlobalDB,
} from "@/repositories/poll.repository";

const getPollUrl = (id: string) =>
  `http://localhost:3000${fillDynamicPath(ROUTE.POLL, { id })}`;

const handleCreateNewPoll = async ({
  option,
  pollTitle,
}: {
  option: string | string[];
  pollTitle: string;
}) => {
  const id = generateId();
  const filteredOptions = Array.isArray(option)
    ? option.filter((o) => o !== "")
    : [option];
  const sanitizedOptions = filteredOptions.map((o) => sanitizeHtml(o));
  const sanitizedTitle = sanitizeHtml(pollTitle);
  await createNewPoll(id, {
    pollTitle: sanitizedTitle,
    option: sanitizedOptions,
  });
  return getPollUrl(id);
};

const handleDeletePoll = async (id: string) => {
  deleteLocalDB(id);
  deletePollFromGlobalDB(id);
};

export { handleCreateNewPoll, handleDeletePoll };
