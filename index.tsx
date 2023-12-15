import * as elements from "typed-html";
import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { ROUTE } from "./src/constants/routes";
import {
  getAllPolls,
  getPollData,
  getPollResult,
  handleDeletePoll,
  handleGenerateNewPoll,
  handleNewVote,
} from "./src/helpers";
import { runMigrations } from "./src/db";
import { Poll } from "./src/models/Poll";
import { Option } from "./src/models/Option";
import { Vote } from "./src/models/Vote";

runMigrations();

new Elysia()
  .use(html())
  .get("/", ({ set }) => (set.redirect = ROUTE.POLL_HOME))
  .get(ROUTE.POLL_HOME, ({ html }) => {
    const polls = getAllPolls();
    return html(<PollHomePage polls={polls} />);
  })
  .get(ROUTE.POLL, ({ html, params: { id }, set }) => {
    let pollTitle: string;
    let options: Option[];
    try {
      const data = getPollData(id);
      pollTitle = data.pollTitle;
      options = data.options;
    } catch {
      set.status = 404;
      return "Poll not found";
    }
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
  .get(ROUTE.RESULT, ({ html, params: { id } }) => {
    const data = getPollResult(id);
    return html(<PollResultsPage {...data} />);
  })
  .post(
    ROUTE.POLL_CREATE,
    async ({ set, body }) => {
      const url = await handleGenerateNewPoll({ ...body });
      if (!url) {
        set.status = 400;
        return "Bad request";
      }
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
      handleNewVote(id, body.option);
      set.redirect = "/result/" + id;
    },
    {
      body: t.Object({ option: t.String() }),
    }
  )
  .delete(ROUTE.POLL, async ({ params: { id } }) => {
    await handleDeletePoll(id);
  })
  .listen(3000);

const GlobalLayout = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
  <title>Document</title> 
</head>
  ${children}
</html>
`;

type PollPageProps = {
  options: Option[];
  pollId: string;
  pollTitle: string;
};

const PollPage = ({ options, pollTitle }: PollPageProps) => (
  <GlobalLayout>
    <body>
      <form method="POST">
        <fieldset>
          <legend>{pollTitle}</legend>
          {options.map((option) => (
            <p>
              <label>
                {option.option}
                <input
                  type="radio"
                  value={option.id.toString()}
                  name="option"
                  required="required"
                />
              </label>
            </p>
          ))}
          <button>Vote</button>
        </fieldset>
      </form>
      <a href={ROUTE.POLL_HOME}>See all polls</a>
    </body>
  </GlobalLayout>
);

type PollResultsPageProps = ReturnType<typeof getPollResult>;

const PollResultsPage = ({ pollTitle, results }: PollResultsPageProps) => {
  return (
    <GlobalLayout>
      <body>
        <h1>Results</h1>
        <fieldset>
          <legend>{pollTitle}</legend>
          {results.map((result) => (
            <p>
              {result.option}: {result.voteCount}
            </p>
          ))}
        </fieldset>
        <a href={ROUTE.POLL_HOME}>See all polls</a>
      </body>
    </GlobalLayout>
  );
};

const Options = () => {
  const MAX_OPTIONS = 10;
  const onRemoveOption = `
    on click 
      halt the event then
      decrement $nOptions then
      remove closest <label/> then
      if $nOptions is less than ${MAX_OPTIONS - 1} then
      set #add-option @disabled to :empty
    end`;

  const optionInput = `
  <label id="option-field">
    <input type="text" name="option" />
    <button _="${onRemoveOption}">
      Remove
    </button>
  </label>`;

  const onAddOption = `
    on click 
      halt the event then
      increment $nOptions
      put '${optionInput}'
      before closest <div/>
      if $nOptions is greater than ${MAX_OPTIONS - 2} then
      set @disabled to 'disabled'
    end`;

  return (
    <div class="flex flex-col gap-4">
      {optionInput}
      <div _="set :empty to ''">
        <button id="add-option" _={onAddOption}>
          Add option
        </button>
      </div>
    </div>
  );
};

const PollCreatePage = () => (
  <GlobalLayout>
    <body>
      <form id="new-poll" method="POST">
        <fieldset class="flex flex-col gap-4">
          <legend>Create a new poll</legend>
          <label>
            Poll title:
            <input type="text" name="pollTitle" />
          </label>
          <Options />
          <div>
            <button>Start poll</button>
          </div>
        </fieldset>
      </form>
      <a href={ROUTE.POLL_HOME}>See all polls</a>
    </body>
  </GlobalLayout>
);

type PollCreateSuccessPageProps = {
  pollUrl: string;
};

const PollCreateSuccessPage = ({ pollUrl }: PollCreateSuccessPageProps) => (
  <GlobalLayout>
    <body>
      <h1>Success!</h1>
      Navigate to <a href={pollUrl}>{pollUrl}</a> to see your poll, or{" "}
      <a href={ROUTE.POLL_HOME}>see all polls</a>
    </body>
  </GlobalLayout>
);

type PollHomePageProps = {
  polls: Poll[];
};

const PollHomePage = ({ polls }: PollHomePageProps) => {
  const hasPolls = polls.length > 0;
  return (
    <GlobalLayout>
      <body>
        <h1>Welcome to HyperPolls</h1>
        {hasPolls ? <p>Available polls</p> : <p>No polls available</p>}
        <ul>
          {polls.map((poll) => (
            <li>
              <a href={`${ROUTE.POLL_HOME}/${poll.pollId}`}>{poll.title}</a>
              <button
                hx-delete={`${ROUTE.POLL_HOME}/${poll.pollId}`}
                hx-swap="outerHTML"
                hx-target="closest li"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <a href={ROUTE.POLL_CREATE}>Create a new poll</a>
      </body>
    </GlobalLayout>
  );
};
