import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Table } from "../Table";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/stores";
import type { RiliGoverment } from "@/types";

export const RiliGov = () => {
  function sortByRole(riliGov: Array<RiliGoverment>) {
    return riliGov.sort((rgm1, rgm2) => {
      switch (rgm1.role) {
        case "Founder":
          return -1;
        case "Co-Founder":
          switch (rgm2.role) {
            case "Founder":
              return 1;
            case "Co-Founder":
              return 0;
            default:
              return -1;
          }
        case "Salty Springs":
          switch (rgm2.role) {
            case "Founder":
              return 1;
            case "Co-Founder":
              return 1;
            case "Salty Springs":
              return 0;
            default:
              return -1;
          }
        default:
          return 1;
      }
    });
  }

  const riliGovQuery: UseQueryResult<Array<RiliGoverment>> = useQuery(
    {
      queryKey: ["riliGoverment"],
      queryFn: () =>
        fetch("/api/getRiliGoverment", { method: "GET" })
          .then((res) => res.json())
          .then((riliGov: Array<RiliGoverment>) => sortByRole(riliGov)),
    },
    queryClient,
  );

  return (
    <>
      <div className="h-screen w-screen">
        <img
          src="../riliGov.webp"
          alt="Rili Goverment"
          className="h-full w-full"
        />
      </div>
      <div className="absolute top-24 z-20 flex h-screen w-screen justify-center">
        <div className="mt-8 flex h-2/3 w-screen justify-center">
          <div className="glass w-2/3 rounded-lg">
            <ErrorBoundary
              fallback={<div>Error loading rili goverment...</div>}
            >
              <Suspense fallback={<div>Loading rili goverment...</div>}>
                <Table>
                  <Table.Head className="h-2">
                    <Table.HeadItem className="text-primary">
                      Name
                    </Table.HeadItem>
                    <Table.HeadItem className="text-primary">
                      Role
                    </Table.HeadItem>
                  </Table.Head>
                  {riliGovQuery.isSuccess ? (
                    riliGovQuery.data.map(
                      (riliGov: RiliGoverment, index: number) => (
                        <Table.Body key={index} className="h-2">
                          <Table.BodyItem className="text-secondary">
                            {riliGov.name}
                          </Table.BodyItem>
                          <Table.BodyItem className="text-secondary">
                            {riliGov.role}
                          </Table.BodyItem>
                        </Table.Body>
                      ),
                    )
                  ) : (
                    <Table.Body>
                      <Table.BodyItem className="text-secondary">
                        N/A
                      </Table.BodyItem>
                      <Table.BodyItem className="text-secondary">
                        N/A
                      </Table.BodyItem>
                    </Table.Body>
                  )}
                </Table>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <ReactQueryDevtools client={queryClient} />
    </>
  );
};
