import * as elements from "typed-html";
import Elysia, { t } from "elysia";
import { html } from "@elysiajs/html";
import { ROUTE } from "@/constants/routes";
import {
  PollCreatePage,
  PollCreateSuccessPage,
  PollHomePage,
  PollPage,
} from "@/views";
import { getAllPolls, getPollData } from "@/repositories/poll.repository";
import { handleCreateNewPoll, handleDeletePoll } from "@/services/poll.service";
import { handleCreateNewVote } from "@/services/vote.service";
import { fillDynamicPath } from "@/lib/path";

export const pollController = new Elysia()
  .use(html())
  .get(ROUTE.POLL_HOME, ({ html }) => {
    const polls = getAllPolls();
    return html(<PollHomePage polls={polls} />);
  })
  .get(ROUTE.POLL, ({ html, params: { id } }) => {
    const { options, pollTitle } = getPollData(id);
    return html(
      <PollPage options={options} pollId={id} pollTitle={pollTitle} />
    );
  })
  .get(ROUTE.POLL_CREATE, ({ html }) => {
    return html(<PollCreatePage />);
  })
  .get(ROUTE.POLL_CREATE_SUCCESS, ({ html, query }) =>
    html(<PollCreateSuccessPage pollUrl={query.pollUrl ?? ""} />)
  )
  .post(
    ROUTE.POLL_CREATE,
    async ({ set, body }) => {
      const url = await handleCreateNewPoll({
        option: body.option,
        pollTitle: body.pollTitle,
      });
      set.redirect = ROUTE.POLL_CREATE_SUCCESS + "?pollUrl=" + url;
    },
    {
      body: t.Object({
        option: t.Union([t.Array(t.String()), t.String()]),
        pollTitle: t.String(),
      }),
    }
  )
  .post(
    ROUTE.POLL,
    ({ set, body, params: { id } }) => {
      handleCreateNewVote(id, body.option);
      set.redirect = fillDynamicPath(ROUTE.RESULT, { id });
    },
    {
      body: t.Object({ option: t.String() }),
    }
  )
  .delete(ROUTE.POLL, async ({ params: { id } }) => {
    await handleDeletePoll(id);
  });
