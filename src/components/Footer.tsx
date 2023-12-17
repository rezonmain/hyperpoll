// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as elements from "typed-html";

const Footer = () => (
  <footer>
    <div class="flex flex-row items-center justify-center gap-2">
      <small class="font-mono text-sm">&#169; {new Date().getFullYear()}</small>
      <small class="font-mono text-sm">made with{"<3"}by</small>
      <a target="_blank" rel="noreferrer" href="https://rezonmain.dev">
        <small class="font-mono text-sm">rezonmain</small>
      </a>
    </div>
  </footer>
);

export { Footer };
