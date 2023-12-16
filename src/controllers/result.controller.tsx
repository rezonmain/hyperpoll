import * as elements from "typed-html";
import Elysia from "elysia";
import { ROUTE } from "@/constants/routes";
import { html } from "@elysiajs/html";
import { getPollResult } from "@/repositories/poll.repository";
import { PollResultsPage } from "@/views";

export const resultController = new Elysia()
  .use(html())
  .get(ROUTE.RESULT, ({ html, params: { id } }) => {
    const { pollTitle, results } = getPollResult(id);
    return html(<PollResultsPage pollTitle={pollTitle} results={results} />);
  });
