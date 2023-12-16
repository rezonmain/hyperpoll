import sanitize from "sanitize-html";

const sanitizeHtml = (html: string) =>
  sanitize(html, { allowedTags: ["em", "strong"] });

const generateVoteRegistration = ({
  ipAddress,
  pollId,
}: {
  ipAddress: string;
  pollId: string;
}) => {
  return Bun.hash(`${pollId}_${ipAddress}`).toString();
};

export { sanitizeHtml, generateVoteRegistration };
