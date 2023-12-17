// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import * as elements from "typed-html";
import { GlobalLayout } from "./GlobalLayout";

export const Body = ({ children }: elements.Children) => (
  <GlobalLayout>
    <body un-cloak>{children}</body>
  </GlobalLayout>
);
