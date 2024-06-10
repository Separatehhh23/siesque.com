import { useState, useEffect, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Table } from "../Table";
import { queryClient } from "@/stores";

import type { UseQueryResult } from "@tanstack/react-query";
import type { CastorList as TCastorList, CastorListRole } from "../../types";

export const CastorList = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const castorListQuery: UseQueryResult<TCastorList> = useQuery(
    {
      queryKey: ["castorList"],
      queryFn: () =>
        fetch("/api/getCastorList", { method: "GET" }).then((res) =>
          res.json(),
        ),
    },
    queryClient,
  );

  const updateRole = useMutation(
    {
      mutationFn: ({
        newRole,
        name,
      }: {
        newRole: CastorListRole;
        name: string;
      }) =>
        fetch("/api/updateCastorList", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, role: newRole }),
        }),
    },
    queryClient,
  );

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen flex-row">
        {Array.from({ length: Math.ceil(screenWidth / 100) }).map((_, i) => (
          <div className="flex h-screen w-[100px] flex-col" key={i}>
            {Array.from({ length: Math.ceil(screenHeight / 100) }).map(
              (_, j) => (
                <div key={`${i}-${j}`}>
                  <img alt="Castor" src="/beaver.webp" />
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="absolute top-24 z-20 flex h-screen w-screen justify-center">
        <div className="mt-8 flex h-2/3 w-screen justify-center">
          <div className="glass w-2/3 rounded-lg">
            <ErrorBoundary fallback={<div>Error loading castor list...</div>}>
              <Suspense fallback={<div>Loading castor list...</div>}>
                <Table>
                  <Table.Head className="h-2">
                    <Table.HeadItem className="text-green-500">
                      Position
                    </Table.HeadItem>
                    <Table.HeadItem className="text-green-500">
                      Name
                    </Table.HeadItem>
                    <Table.HeadItem className="text-green-500">
                      Role
                    </Table.HeadItem>
                  </Table.Head>
                  {castorListQuery.isSuccess ? (
                    castorListQuery.data.map((castor, index) => (
                      <Table.Body key={index} className="h-2">
                        <Table.BodyItem className="text-secondary">
                          {index + 1}
                        </Table.BodyItem>
                        <Table.BodyItem className="text-secondary">
                          {castor.name}
                        </Table.BodyItem>
                        <Table.BodyItem className="text-secondary">
                          {castor.role}
                        </Table.BodyItem>
                      </Table.Body>
                    ))
                  ) : (
                    <Table.Body>
                      <Table.BodyItem className="text-secondary">
                        N/A
                      </Table.BodyItem>
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
