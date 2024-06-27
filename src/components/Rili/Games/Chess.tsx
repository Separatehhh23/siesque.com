import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ReactNode, MouseEventHandler } from "react";
import type { ClassValue } from "clsx";

function mapFile(index: number) {
  const letters = "abcdefgh";
  return letters.split("")[index];
}

function isPiecedRank(r: number) {
  return r === 0 || r === 1 || r === 6 || r === 7;
}

function getPiece(r: number, f: number) {
  if (!isPiecedRank(r)) return;

  switch (r) {
    case 0:
      if (f === 0 || f === 7) {
        // Rook white
        return "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
      } else if (f === 1 || f === 6) {
        // Knight white
        return "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
      } else if (f === 2 || f === 5) {
        // Bishop white
        return "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
      } else if (f === 3) {
        // King white
        return "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg";
      } else {
        // Queen white
        return "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
      }
    case 1:
      // Pawn white
      return "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg";
    case 6:
      // Pawn black
      return "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg";
    case 7:
      if (f === 0 || f === 7) {
        // Rook black
        return "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";
      } else if (f === 1 || f === 6) {
        // Knight black
        return "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";
      } else if (f === 2 || f === 5) {
        // Bishop black
        return "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";
      } else if (f === 3) {
        // King black
        return "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";
      } else {
        // Queen black
        return "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";
      }
  }
}

function setDefaultScores() {
  localStorage.setItem("chessScores", JSON.stringify({ white: 0, black: 0 }));
}

type CellProps = {
  className?: ClassValue;
  children?: ReactNode;
};

const Cell = ({ className, children }: CellProps) => {
  return (
    <div
      className={cn("flex h-16 w-16 items-center justify-center", className)}
    >
      {children}
    </div>
  );
};

const ChessGrid = () => {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="flex flex-row">
      {Array.from({ length: 9 }).map((_, i) => (
        <div className="flex flex-col" key={i}>
          {Array.from({ length: 9 }).map((_, j) =>
            /**
             * i = 0 -> Column with j + 1
             * i = 1 -> 1st file (0)
             * i = 8 -> 8th file (7)
             * j = 0 -> 1st rank (0)
             * j = 7 -> 8th rank (7)
             * j = 8 -> Row with mapFile(i - 1)
             **/
            i !== 0 ? (
              j !== 8 ? (
                <Cell
                  className={{
                    "bg-[#729551]": i % 2 === j % 2,
                    "bg-[#ebebd5]": i % 2 !== j % 2,
                  }}
                  key={j}
                >
                  {isPiecedRank(j) && (
                    <Draggable
                      grid={[64, 64]}
                      onStart={() => setDragging(true)}
                      onStop={() => setDragging(false)}
                    >
                      <img
                        className={cn({
                          "cursor-grab": !dragging,
                          "cursor-grabbing": dragging,
                        })}
                        alt="Chess piece"
                        draggable="false"
                        height={64}
                        width={64}
                        src={getPiece(j, i - 1)}
                      />
                    </Draggable>
                  )}
                </Cell>
              ) : (
                <Cell key={j}>{mapFile(i - 1)}</Cell>
              )
            ) : (
              <Cell key={j}>{j !== 8 ? j + 1 : ""}</Cell>
            ),
          )}
        </div>
      ))}
    </div>
  );
};

type ScoreProps = {
  color: "white" | "black";
};

const Score = ({ color }: ScoreProps) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("chessScores")) {
        setScore(
          JSON.parse(localStorage.getItem("chessScores") as string)[color],
        );
      } else {
        setDefaultScores();
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chessScores",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("chessScores") as string),
        [color]: score,
      }),
    );
  }, [score]);

  return (
    <div className="flex h-16 w-full max-w-48 flex-row justify-between gap-2 rounded-lg bg-secondary p-2">
      <div className="flex flex-col justify-center">
        <p className="text-2xl font-medium">
          {color.at(0)?.toUpperCase() + color.slice(1)}: {score}
        </p>
      </div>
      <button
        className="btn btn-primary h-12 w-12 rounded-full p-1"
        onClick={() => setScore(score + 1)}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

type ButtonProps = {
  onClick?: MouseEventHandler;
  children?: ReactNode;
};

const Button = ({ children, onClick }: ButtonProps) => (
  <button className="btn btn-primary h-16 w-full max-w-48" onClick={onClick}>
    <p className="text-2xl font-medium">{children}</p>
  </button>
);

export const Chess = () => {
  return (
    <div className="h-screen w-screen">
      <div className="m-8 flex h-2/3 w-full items-center justify-center gap-2 p-8">
        <ChessGrid />
        <div className="flex h-full w-full max-w-48 flex-col gap-2">
          <Button onClick={() => window.location.reload()}>Reset board</Button>
          <Button onClick={setDefaultScores}>Reset scores</Button>
          <Score color="white" />
          <Score color="black" />
        </div>
      </div>
    </div>
  );
};
