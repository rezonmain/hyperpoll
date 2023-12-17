import * as elements from "typed-html";
import { ROUTE } from "@/constants/routes";
import { w98Container } from "@/constants/styles";
import { Button } from "@/components/Button";
import { WindowBar } from "@/components/WindowBar";
import { Body } from "@/layouts/Body";
import { Footer } from "@/components/Footer";

const PollHomePage = () => {
  return (
    <Body>
      <div class="flex h-[100vh] flex-col items-center justify-evenly">
        <section class={`${w98Container} flex flex-col`}>
          <WindowBar title="HyperPolls" />
          <div class="flex flex-col items-center gap-4 p-10">
            <h1 class="py-10 text-5xl font-medium tracking-tight">
              Welcome to HyperPolls ⚡️
            </h1>
            <a href={ROUTE.POLL_CREATE}>
              <Button size="lg">Create new poll</Button>
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </Body>
  );
};

export { PollHomePage };
