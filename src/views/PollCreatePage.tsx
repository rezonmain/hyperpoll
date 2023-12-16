import * as elements from "typed-html";
import { ROUTE } from "@/constants/routes";
import { GlobalLayout } from "@/layouts/GlobalLayout";

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

export { PollCreatePage };
