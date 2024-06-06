import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { Table } from "../../Table";
import { AltLeaderboardBody } from "./Shared";

import type { LeaderboardProps } from "@/types";

export const Leaderboard = ({ data, className, style }: LeaderboardProps) => {
  if (!data) return;

  return (
    <ErrorBoundary fallback={<p>Error loading leaderboard</p>}>
      <Suspense fallback={<p>Loading leaderboard...</p>}>
        <Table className={className} style={style}>
          <Table.Head>
            <Table.HeadItem>Posicion</Table.HeadItem>
            <Table.HeadItem>Nombre</Table.HeadItem>
            <Table.HeadItem className="text-green-500">
              Puntos Assist
            </Table.HeadItem>
            <Table.HeadItem className="text-blue-500">
              Puntos Libre
            </Table.HeadItem>
          </Table.Head>
          {data.length !== 0 ? (
            data[0].map((_data, index) => {
              const libreData = data[1].filter(
                (l) => l.username === _data.username,
              )[0];

              return (
                <Table.Body key={index}>
                  <Table.BodyItem>{index + 1}</Table.BodyItem>
                  <Table.BodyItem>{_data.username}</Table.BodyItem>
                  <Table.BodyItem className="text-green-500">
                    {_data.score}
                  </Table.BodyItem>
                  <Table.BodyItem className="text-blue-500">
                    {libreData.score}
                  </Table.BodyItem>
                </Table.Body>
              );
            })
          ) : (
            <AltLeaderboardBody />
          )}
        </Table>
      </Suspense>
    </ErrorBoundary>
  );
};
