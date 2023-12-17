// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as elements from "typed-html";
import { w98ButtonLg, w98ButtonMd, w98ButtonSm } from "@/constants/styles";

type ButtonProps = {
  children: elements.Children | string;
  size?: "sm" | "md" | "lg";
  _?: string;
} & JSX.IntrinsicElements["button"];

const Button = ({ children, size = "md", _ = "", ...other }: ButtonProps) => {
  let buttonSizeStyle = w98ButtonMd;
  switch (size) {
    case "sm":
      buttonSizeStyle = w98ButtonSm;
      break;
    case "md":
      buttonSizeStyle = w98ButtonMd;
      break;
    case "lg":
      buttonSizeStyle = w98ButtonLg;
      break;
  }
  return (
    <button
      _={_}
      class={`${buttonSizeStyle} group p-1 font-serif text-lg`}
      {...other}
    >
      <div class="px-3 py-1 outline-2 group-focus:outline-dotted group-active:outline-none">
        {children}
      </div>
    </button>
  );
};

export { Button };
