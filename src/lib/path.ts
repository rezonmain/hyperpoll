/* eslint-disable @typescript-eslint/no-unused-vars */
// Borrowed from the internet
type ExtractRouteParams<T> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
      ? { [k in Param]: string }
      : object;

const fillDynamicPath = <S extends string>(
  path: S,
  args: ExtractRouteParams<S>,
) => {
  const parts = path.split("/");
  parts.forEach((p, i) => {
    if (p.startsWith(":")) {
      const key = p.slice(1);
      // @ts-expect-error key is a valid key of args
      parts[i] = args[key];
    }
  });
  return parts.join("/");
};

export { fillDynamicPath };
