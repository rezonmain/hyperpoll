import { SocketAddress } from "bun";
import sanitize from "sanitize-html";
import { getAddressFromIp } from "./helpers";
import { getRegistration } from "@/repositories/vote.repository";

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

const hasVoted = ({
  pollId,
  ip,
}: {
  pollId: string;
  ip: string | SocketAddress;
}) => {
  const address = getAddressFromIp(ip);
  const registration = generateVoteRegistration({ ipAddress: address, pollId });
  return Boolean(getRegistration({ pollId, registration }));
};

export { sanitizeHtml, generateVoteRegistration, hasVoted };
