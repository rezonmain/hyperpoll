import * as elements from "typed-html";
import { GlobalLayout } from "@/layouts/GlobalLayout";
import { ROUTE } from "@/constants/routes";

type PollResultsPageProps = {
  pollTitle: string;
  results: { option: string; count: number }[];
};

const PollResultsPage = ({ pollTitle, results }: PollResultsPageProps) => {
  return (
    <GlobalLayout>
      <body>
        <h1>Results</h1>
        <fieldset>
          <legend>{pollTitle}</legend>
          {results.map((result) => (
            <p>
              {result.option}: {result.count}
            </p>
          ))}
        </fieldset>
        <a href={ROUTE.POLL_HOME}>See all polls</a>
      </body>
    </GlobalLayout>
  );
};

export { PollResultsPage };
