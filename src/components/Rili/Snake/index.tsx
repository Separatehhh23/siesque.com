import {
  Suspense,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { Stage, Sprite } from "@pixi/react";
import { ErrorBoundary } from "react-error-boundary";
import { useStore } from "@nanostores/react";
import { highScore, setHighScore } from "@/stores";
import { Repeat } from "lucide-react";
import TileGrid from "./TileGrid";
import type { FC } from "react";

const UIContext = createContext({ score: 0, highScore: { score: 0 } });

const CastorSnake: FC = () => {
  const [castakePos, setCastakePos] = useState({ x: 100, y: 200 });
  const [applePosition, setApplePosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const _highScore = useStore(highScore);

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

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
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
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  interface Position {
    x: number;
    y: number;
  }

  const checkCollision = (a: Position, b: Position) => {
    //console.log(a, b);
    if (a.x === b.x && a.y === b.y) {
      return true;
    }
  };

  const retry = () => {
    setCastakePos({ x: 100, y: 200 });
    setApplePosition(generateRandomPosition());
    setScore(0);
    setIsGameOver(false);
  };

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
        <Suspense fallback={<p className="text-primary">Loading castake...</p>}>
          <ErrorBoundary
            fallback={<p className="text-error">Error loading castake</p>}
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
                  /* Beaver icon created by Freepik - Flaticon || https://www.flaticon.com/free-icons/beaver */
                  <Sprite
                    x={castakePos.x}
                    y={castakePos.y}
                    anchor={-0.1}
                    width={40}
                    height={40}
                    image="../beaver.png"
                  />
                )}
              </Stage>
            </div>
          </ErrorBoundary>
        </Suspense>
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

export default CastorSnake;
