import * as elements from "typed-html";
import { ROUTE } from "@/constants/routes";
import { GlobalLayout } from "@/layouts/GlobalLayout";

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

export { PollCreateSuccessPage };
