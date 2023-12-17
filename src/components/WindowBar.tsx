// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as elements from "typed-html";
import { w98ButtonSm } from "@/constants/styles";

type WindowBarProps = {
  title: elements.Children | string;
};
const WindowBar = ({ title }: WindowBarProps) => (
  <div class="flex flex-row items-center justify-between bg-gradient-to-r from-blue-900 to-blue-500 p-1">
    <span class="color-white font-bold tracking-wider">{title}</span>
    <div class={`${w98ButtonSm} h-5 w-5 select-none text-center font-mono`}>
      x
    </div>
  </div>
);

export { WindowBar };
