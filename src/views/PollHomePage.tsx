import * as elements from "typed-html";
import { GlobalLayout } from "@/layouts/GlobalLayout";
import { ROUTE } from "@/constants/routes";
import { w98ButtonSm, w98Container } from "@/constants/styles";
import { Button } from "@/components/Button";

const PollHomePage = () => {
  return (
    <GlobalLayout>
      <body class="flex h-[100vh] flex-col items-center justify-evenly bg-gray-300">
        <section class={`${w98Container} flex flex-col`}>
          <div class="flex flex-row items-center justify-between bg-gradient-to-r from-blue-900 to-blue-500 p-1">
            <span class="color-white font-bold tracking-wider">HyperPolls</span>
            <div
              class={`${w98ButtonSm} h-5 w-5 select-none text-center font-mono`}
            >
              x
            </div>
          </div>
          <div class="flex flex-col items-center gap-4 p-10">
            <h1 class="text-5xl">Welcome to HyperPolls ⚡️</h1>
            <a href={ROUTE.POLL_CREATE}>
              <Button>Create new poll</Button>
            </a>
          </div>
        </section>
        <footer>
          <div class="flex flex-row items-center justify-center gap-2">
            <small class="font-mono text-sm">made with{"<3"}by</small>
            <a target="_blank" rel="noreferrer" href="https://rezonmain.dev">
              <small class="font-mono text-sm">rezonmain</small>
            </a>
            <small class="font-mono text-sm">
              &#169; {new Date().getFullYear()}
            </small>
          </div>
        </footer>
      </body>
    </GlobalLayout>
  );
};

export { PollHomePage };
