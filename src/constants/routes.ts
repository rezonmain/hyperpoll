export const ROUTE = {
  POLL_HOME: "/poll",
  POLL: "/poll/:pollId",
  POLL_CREATE: "/poll/create",
  POLL_CREATE_SUCCESS: "/poll/create/success",
  POLL_VOTED: "/poll/:pollId/voted/:optionId",
  RESULT: "/result/:pollId",
} as const;
