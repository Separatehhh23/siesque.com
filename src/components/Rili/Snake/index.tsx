import {
  Suspense,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { Stage, Sprite, useTick } from "@pixi/react";
import { ErrorBoundary } from "react-error-boundary";
import { useStore } from "@nanostores/react";
import { Repeat } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { highScore, setHighScore } from "@/stores";
import TileGrid from "./TileGrid";

import type { FC } from "react";
import type { Position, SetState } from "@/types";

type CastakeMovement = {
  direction: "x" | "y";
  sign: "+" | "-";
} | null;

const UIContext = createContext({ score: 0, highScore: { score: 0 } });

const CastorSnake: FC = () => {
  const [castakePos, setCastakePos] = useState<Position>({ x: 100, y: 200 });
  const [applePosition, setApplePosition] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [castakeMovement, setCastakeMovement] = useState<CastakeMovement>(null);
  const [speed, setSpeed] = useState(2);
  const [isUsingAltMovement, setIsUsingAltMovement] = useState(true);

  const _highScore = useStore(highScore);

  // Constant pointers to constants
  const cols = 16 as const;
  const rows = 16 as const;
  const tileSize = 50 as const;

  const generateRandomPosition = (): { x: number; y: number } => {
    const x = Math.floor(Math.random() * cols) * tileSize;
    const y = Math.floor(Math.random() * rows) * tileSize;
    if (x > 350 || y > 350) {
      return generateRandomPosition(); // Recursively call function if position is out of bounds, no stack overflow pls
    } else {
      return { x, y };
    }
  };

  // Generate initial apple
  useEffect(() => {
    setApplePosition(generateRandomPosition());
  }, []);

  useEffect(() => {
    if (score % 5 === 0) {
      setSpeed(speed + 0.5);
      console.log("Speed:", speed + 0.5);
    }
  }, [score]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    /*
    setCastakePos((prevPosition) => {
      switch (key) {
        case "w":
          return { ...prevPosition, y: prevPosition.y - tileSize };
        case "a":
          return { ...prevPosition, x: prevPosition.x - tileSize };
        case "s":
          return { ...prevPosition, y: prevPosition.y + tileSize };
        case "d":
          return { ...prevPosition, x: prevPosition.x + tileSize };
        default:
          return prevPosition;
      }
    });
    */
    setCastakeMovement(() => {
      switch (key) {
        case "w":
          return { direction: "y", sign: "-" };
        case "a":
          return { direction: "x", sign: "-" };
        case "s":
          return { direction: "y", sign: "+" };
        case "d":
          return { direction: "x", sign: "+" };
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function round(num: number): number {
    return Math.round(num / tileSize) * tileSize;
  }

  const checkCollision = (a: Position, b: Position) => {
    // console.log("A, B", a, b);
    const ar = { x: round(a.x), y: round(a.y) };
    const br = { x: round(b.x), y: round(b.y) };
    // console.log("AR, BR", ar, br);
    if (ar.x === br.x && ar.y === br.y) {
      return true;
    }
  };

  const retry = () => {
    setCastakePos({ x: 100, y: 200 });
    setApplePosition(generateRandomPosition());
    setCastakeMovement(null);
    setScore(0);
    setSpeed(2);
    setIsGameOver(false);
  };

  useEffect(() => {
    if (isUsingAltMovement) {
      setCastakePos((prevPos) => {
        return {
          x: round(prevPos.x),
          y: round(prevPos.y),
        };
      });
    }
  }, [castakeMovement]);

  useEffect(() => {
    if (checkCollision(castakePos, applePosition)) {
      setApplePosition(generateRandomPosition());
      setScore(score + 1);
      if (score + 1 > _highScore.score) {
        setHighScore(score + 1);
      }
    }
  }, [applePosition, castakePos]);

  useEffect(() => {
    if (
      castakePos.x < 0 ||
      castakePos.x > 350 ||
      castakePos.y < 0 ||
      castakePos.y > 350
    ) {
      setIsGameOver(true);
    }
  }, [castakePos]);

  return (
    <UIContext.Provider value={{ score: score, highScore: _highScore }}>
      <button
        className="btn btn-ghost absolute left-2 top-[74px]"
        onClick={() => setIsUsingAltMovement(!isUsingAltMovement)}
      >
        Switch movement
      </button>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        {isGameOver && (
          <div className="card absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform bg-base-200 p-6">
            <h1 className="card-title text-6xl text-primary">Perdiste</h1>
            <h2 className="text-3xl text-secondary">Eres tan rili</h2>
            <div className="card-actions">
              <div className="flex flex-row">
                <p className="pr-1 text-2xl">Otra vez?</p>
                <button
                  onClick={retry}
                  className="flex items-center justify-center rounded-xl bg-secondary p-1 text-white"
                >
                  <Repeat height={20} width={20} />
                </button>
              </div>
            </div>
          </div>
        )}
        <ErrorBoundary
          fallback={<p className="text-error">Error loading castake</p>}
        >
          <Suspense
            fallback={<p className="text-primary">Loading castake...</p>}
          >
            <TopUI />
            <div className="h-[460px] w-[460px] bg-[#568a35]">
              <Stage
                width={400}
                height={400}
                className="left-0 top-0 translate-x-[30px] translate-y-[30px] transform"
              >
                <TileGrid
                  tileSize={tileSize}
                  cols={cols}
                  rows={rows}
                  colors={[0xa9d751, 0xa2d049]}
                />

                <Sprite
                  image="https://www.google.com/logos/fnbx/snake_arcade/v17/apple_00.png"
                  x={applePosition.x}
                  y={applePosition.y}
                  width={40}
                  height={40}
                  anchor={-0.1}
                />

                {!isGameOver && (
                  <Castake
                    castakeMovement={castakeMovement}
                    castakePos={castakePos}
                    setCastakePos={setCastakePos}
                    speed={speed}
                  />
                )}
              </Stage>
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
    </UIContext.Provider>
  );
};

const TopUI: FC = () => {
  const _UIContext = useContext(UIContext);

  return (
    <div className="flex h-[70px] flex-row justify-evenly bg-[#4a752d]">
      <CenteredImage
        href="https://www.google.com/logos/fnbx/snake_arcade/v17/apple_00.png"
        alt="Apple"
        number={_UIContext.score}
      />
      <CenteredImage
        href="https://www.google.com/logos/fnbx/snake_arcade/v18/trophy_00.png"
        alt="Trophy"
        number={_UIContext.highScore.score}
      />
    </div>
  );
};

interface CenteredImageProps {
  href: string;
  alt: string;
  number?: number;
}

const CenteredImage: FC<CenteredImageProps> = ({ href, alt, number }) => (
  <div className="flex flex-col justify-center justify-self-start">
    <div className="flex flex-row">
      <img src={href} alt={alt} className="relative h-[38px] w-[38px]" />
      {typeof number === "number" && (
        <p className="pt-2 text-xl text-white">{number}</p>
      )}
    </div>
  </div>
);

interface CastakeProps {
  castakeMovement: CastakeMovement;
  castakePos: Position;
  setCastakePos: SetState<Position>;
  speed: number;
}

const Castake: FC<CastakeProps> = ({
  castakeMovement,
  setCastakePos,
  speed,
  castakePos,
}) => {
  useTick((deltaTime) => {
    if (castakeMovement) {
      const { direction, sign } = castakeMovement;
      if (direction === "x") {
        setCastakePos((prevPosition) => {
          return {
            ...prevPosition,
            x: prevPosition.x + parseInt(sign + speed) * deltaTime,
          };
        });
      } else {
        setCastakePos((prevPosition) => {
          return {
            ...prevPosition,
            y: prevPosition.y + parseInt(sign + speed) * deltaTime,
          };
        });
      }
    }
  });

  return (
    /* Beaver icon created by Freepik - Flaticon || https://www.flaticon.com/free-icons/beaver */
    <Sprite
      x={castakePos.x}
      y={castakePos.y}
      anchor={-0.1}
      width={40}
      height={40}
      image="../beaver.png"
    />
  );
};

export default CastorSnake;
