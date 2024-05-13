import { Excalidraw } from "@excalidraw/excalidraw";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/stores";
import type { FC } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  id: string;
}

const RiliDoc: FC<Props> = ({ id }) => {
  const { data } = useQuery(
    {
      queryKey: ["doc"],
      queryFn: () =>
        fetch("/api/queryRiliDoc", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }).then((res) => res.json()),
    },
    queryClient,
  );

  console.log(data);

  return (
    <div>
      <ReactQueryDevtools client={queryClient} />
    </div>
  );
};

export default RiliDoc;
