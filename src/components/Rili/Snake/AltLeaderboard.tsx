import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { Table } from "../../Table";
import { AltLeaderboardBody } from "./Shared";

import type { SimpleCastakeLeaderboard, LeaderboardProps } from "@/types";

export const AltLeaderboard = ({
  data,
  className,
  style,
}: LeaderboardProps) => {
  if (!data) return;

  const largestData: SimpleCastakeLeaderboard = [];

  data[0].forEach((leaderboard) => {
    const sameNameInOther = data[1].filter(
      (l) => l.username === leaderboard.username,
    )[0];

    const largestScore = Math.max(leaderboard.score, sameNameInOther.score);
    largestData.push({ username: leaderboard.username, score: largestScore });
  });

  largestData.sort((l1, l2) =>
    l1.score < l2.score ? 1 : l1.score > l2.score ? -1 : 0,
  );

  return (
    <ErrorBoundary fallback={<p>Error loading leaderboard</p>}>
      <Suspense fallback={<p>Loading leaderboard...</p>}>
        <Table className={className} style={style}>
          <Table.Head>
            <Table.HeadItem>Posicion</Table.HeadItem>
            <Table.HeadItem>Nombre</Table.HeadItem>
            <Table.HeadItem>Puntos</Table.HeadItem>
          </Table.Head>
          {largestData.length !== 0 ? (
            largestData.map((_data, index) => {
              return (
                <Table.Body key={index}>
                  <Table.BodyItem>{index + 1}</Table.BodyItem>
                  <Table.BodyItem>{_data.username}</Table.BodyItem>
                  <Table.BodyItem>{_data.score}</Table.BodyItem>
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
