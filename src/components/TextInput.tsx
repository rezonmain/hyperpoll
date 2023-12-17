// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as elements from "typed-html";

type InputProps = {
  _?: string;
} & JSX.IntrinsicElements["input"];

const Input = ({ _ = "", ...props }: InputProps) => {
  return (
    <input
      _={_}
      type="text"
      class="border-3 caret-block w-full border-solid border-b-gray-100 border-l-gray-500 border-r-gray-100 border-t-gray-500 font-serif focus:outline-none"
      {...props}
    />
  );
};

export { Input };
