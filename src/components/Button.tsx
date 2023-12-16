// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as elements from "typed-html";
import { w98Button, w98ButtonSm } from "@/constants/styles";

type ButtonProps = {
  children: elements.Children | string;
  size?: "sm" | "md" | "lg";
};

const Button = ({ children, size = "md" }: ButtonProps) => {
  let buttonSizeStyle = w98Button;
  switch (size) {
    case "sm":
      buttonSizeStyle = w98ButtonSm;
      break;
    case "md":
      buttonSizeStyle = w98Button;
      break;
    case "lg":
      buttonSizeStyle = w98Button;
      break;
  }
  return (
    <button class={`${buttonSizeStyle} group p-1 font-serif text-lg`}>
      <div class="px-3 py-1 outline-2 group-focus:outline-dotted group-active:outline-none">
        {children}
      </div>
    </button>
  );
};

export { Button };
