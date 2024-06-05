import { QueryClientProvider } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { Suspense } from "react";

import { queryClient, experiments } from "@/stores";
import { ReactQueryDevtools } from "./ReactQueryDevtools";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const QueryWrapper = ({ children }: Props) => {
  const _experiments = useStore(experiments);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
      {
        _experiments.queryDevtools && (
          <ReactQueryDevtools />
        ) /* Devtools are excluded from production */
      }
      {_experiments.queryDevtools && process.env.NODE_ENV !== "development" && (
        /* Lazy load devtools in production */
        <Suspense fallback={null}>
          <ReactQueryDevtools.Production />
        </Suspense>
      )}
    </QueryClientProvider>
  );
};
