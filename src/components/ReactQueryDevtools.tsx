import { ReactQueryDevtools as Devtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export const ReactQueryDevtools = Devtools as typeof Devtools & {
  Production: typeof ReactQueryDevtoolsProduction;
};
ReactQueryDevtools.Production = ReactQueryDevtoolsProduction;
