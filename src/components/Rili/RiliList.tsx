import React, { useEffect, useState, useMemo } from "react";
import type { FC, ReactNode, MouseEventHandler } from "react";
import type { RiliArray } from "@/types";
import { TracingBeam } from "../ui/tracing-beam";
import Title from "../Title";

interface Props {
  rilis: RiliArray;
}

const RiliList: FC<Props> = ({ rilis }: Props) => {
  const [isPlus, setIsPlus] = useState(false);

  const sortedRilis = useMemo(
    () =>
      rilis.toSorted((r1, r2) =>
        r1.amount < r2.amount ? 1 : r1.amount > r2.amount ? -1 : 0,
      ),
    [rilis],
  );

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "+") setIsPlus(true);
    });
    return () => document.removeEventListener("keydown", () => {});
  }, []);

  async function add(id: number) {
    await fetch("/api/addRiliscore", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  }

  async function subtract(id: number) {
    await fetch("/api/subtractRiliscore", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  }

  return (
    <TracingBeam>
      <div
        className="relative mx-auto max-w-2xl pt-4 antialiased"
        style={{ minHeight: "calc(100vh - 30px)" }}
      >
        <Title className="pb-4">{`Lista Rili${isPlus ? "+" : ""}`}</Title>
        <div className="min-w-1/4 rounded-xl">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-primary">Rank</th>
                  <th className="text-primary">Name</th>
                  <th className="text-primary">RiliScore</th>
                </tr>
              </thead>
              <tbody>
                {sortedRilis.map((rili, index) => (
                  <tr key={rili.id}>
                    <th className="text-secondary">{index + 1}</th>
                    <td>{rili.name}</td>
                    <td>{rili.amount}</td>
                    <td>
                      <div className="join join-horizontal w-32">
                        <JoinButton onClick={() => add(rili.id)}>+</JoinButton>
                        <div className="join-item h-full w-1" />
                        <JoinButton onClick={() => subtract(rili.id)}>
                          -
                        </JoinButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TracingBeam>
  );
};

interface JoinButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const JoinButton: FC<JoinButtonProps> = ({
  onClick,
  children,
}: JoinButtonProps) => (
  <button className="btn btn-accent join-item w-8" onClick={onClick}>
    {children}
  </button>
);

export default RiliList;
