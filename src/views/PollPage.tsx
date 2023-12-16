import * as elements from "typed-html";
import { Option } from "@/models/Option";
import { GlobalLayout } from "@/layouts/GlobalLayout";
import { ROUTE } from "@/constants/routes";
import { fillDynamicPath } from "@/lib/path";

type PollPageProps = {
  options: Option[];
  pollId: string;
  pollTitle: string;
};

const PollPage = ({ options, pollTitle, pollId }: PollPageProps) => (
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
      <p>
        <a href={fillDynamicPath(ROUTE.RESULT, { id: pollId })}>See results</a>
      </p>
      <p>
        <a href={ROUTE.POLL_HOME}>See all polls</a>
      </p>
    </body>
  </GlobalLayout>
);

export { PollPage };
