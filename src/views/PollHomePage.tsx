import * as elements from "typed-html";
import { GlobalLayout } from "@/layouts/GlobalLayout";
import { Poll } from "@/models/Poll";
import { ROUTE } from "@/constants/routes";

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

export { PollHomePage };