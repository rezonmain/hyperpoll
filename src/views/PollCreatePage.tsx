import * as elements from "typed-html";
import { ROUTE } from "@/constants/routes";
import { w98ButtonMd, w98Container } from "@/constants/styles";
import { WindowBar } from "@/components/WindowBar";
import { Body } from "@/layouts/Body";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/TextInput";

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
    ${(<Input name="option" />)}
    <button _="${onRemoveOption}" class="${w98ButtonMd} font-serif">
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
        <button
          id="add-option"
          _={onAddOption}
          class={`${w98ButtonMd} font-serif`}
        >
          Add option
        </button>
      </div>
    </div>
  );
};

const PollCreatePage = () => (
  <Body>
    <div class="flex h-[100vh] flex-col items-center justify-evenly">
      <section class={`${w98Container} flex flex-col`}>
        <WindowBar title="Create New Poll" />
        <div class="flex flex-row gap-4 p-4">
          <img
            width="178px"
            height="324px"
            class="object-cover outline outline-2"
            src="/public/img/poll-create.webp"
          />
          <form id="new-poll" method="POST" class="flex flex-col gap-4">
            <label>
              Title:
              <Input name="pollTitle" />
            </label>
            <fieldset class="flex flex-col gap-4">
              <legend class="tracking-wider">Options</legend>
              <Options />
              <div>
                <button class={`${w98ButtonMd} font-serif`}>Start poll</button>
              </div>
            </fieldset>
          </form>
        </div>
        <a href={ROUTE.POLL_HOME}>See all polls</a>
      </section>
      <Footer />
    </div>
  </Body>
);

export { PollCreatePage };
