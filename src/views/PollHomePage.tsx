import * as elements from "typed-html";
import { GlobalLayout } from "@/layouts/GlobalLayout";
import { ROUTE } from "@/constants/routes";
import { w98Button, w98ButtonSm, w98Container } from "@/constants/styles";

const PollHomePage = () => {
  return (
    <GlobalLayout>
      <body class="flex h-[66vh] flex-col items-center justify-center bg-gray-300">
        <section class={`${w98Container} flex flex-col`}>
          <div class="flex flex-row items-center justify-between bg-gradient-to-r from-blue-900 to-blue-500 p-1">
            <span class="color-white">HyperPoll</span>
            <button class={`${w98ButtonSm} font-mono`}>x</button>
          </div>
          <div class="flex flex-col items-center gap-4 p-10">
            <h1 class="text-5xl">Welcome to HyperPolls</h1>
            <a href={ROUTE.POLL_CREATE}>
              <button class={`${w98Button} px-3 py-1 font-serif text-lg`}>
                Create new poll
              </button>
            </a>
          </div>
        </section>
      </body>
    </GlobalLayout>
  );
};

export { PollHomePage };
