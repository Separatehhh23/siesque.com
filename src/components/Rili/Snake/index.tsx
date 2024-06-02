import {
  Suspense,
  useEffect,
  useState,
  useContext,
  createContext,
  lazy,
} from "react";
import {
  useQuery,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { Stage, Sprite, useTick } from "@pixi/react";
import { ErrorBoundary } from "react-error-boundary";
import { useStore } from "@nanostores/react";
import { Repeat, Check, Rat } from "lucide-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  highScore,
  setHighScore,
  experiments,
  queryClient,
  username,
  setUsername,
} from "@/stores";
import TileGrid from "./TileGrid";
import { Table } from "../../Table";
import { BackgroundGradient } from "../../ui/background-gradient";
import { cn } from "@/lib/utils";

import type { FormEvent, CSSProperties, ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Position, SetState, CastakeLeaderboard } from "@/types";

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

type CastakeMovement = {
  direction: "x" | "y";
  sign: "+" | "-";
} | null;

type TUiContext = {
  score: number;
  highScore: number;
  username: string | null;
};

const UiContext = createContext<TUiContext>({
  score: 0,
  highScore: 0,
  username: null,
});

const CastorSnake = () => {
  const [castakePos, setCastakePos] = useState<Position>({ x: 100, y: 200 });
  const [applePosition, setApplePosition] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [castakeMovement, setCastakeMovement] = useState<CastakeMovement>(null);
  const [speed, setSpeed] = useState(2);
  const [isUsingAltMovement, setIsUsingAltMovement] = useState(true);

  const _highScore = useStore(highScore);
  const _experiments = useStore(experiments);
  const _username = useStore(username);

  // Constant pointers to constants
  const cols = 16 as const;
  const rows = 16 as const;
  const tileSize = 50 as const;

  const leaderboardQuery: UseQueryResult<Array<CastakeLeaderboard>> = useQuery(
    {
      queryKey: ["leaderboard"],
      queryFn: () =>
        fetch("/api/getCastakeLeaderboard", { method: "GET" }).then((res) =>
          res.json(),
        ),
    },
    queryClient,
  );

  const updateLeaderboard = useMutation(
    {
      mutationFn: ({ username, score }: { username: string; score: number }) =>
        fetch("/api/updateCastakeLeaderboard", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, score: score }),
        }),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["leaderboard"],
        }),
    },
    queryClient,
  );

  const submitToLeaderboard = async (score: number) => {
    if (_username.name && leaderboardQuery.isSuccess) {
      const bestScore = leaderboardQuery.data.filter(
        (entry: CastakeLeaderboard) => entry.username === _username.name,
      );
      if (bestScore?.length === 0) {
        updateLeaderboard.mutate({ username: _username.name, score: score });
      } else if (bestScore[0].score < score) {
        updateLeaderboard.mutate({ username: _username.name, score: score });
      }
    }
  };

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
    (async () => {
      if (checkCollision(castakePos, applePosition)) {
        const newScore = score + 1;

        setApplePosition(generateRandomPosition());
        setScore(newScore);
        if (newScore > _highScore.score) {
          setHighScore(newScore);
        }
        await submitToLeaderboard(newScore);
      }
    })();
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
    <QueryClientProvider client={queryClient}>
      <UiContext.Provider
        value={{
          score: score,
          highScore: _highScore.score,
          username: _username.name,
        }}
      >
        <UsernameSelect setUsername={setUsername} />
        <div className="absolute left-2 top-[74px]">
          <button
            className={cn("border-1 btn btn-ghost", {
              "border-green-500": isUsingAltMovement,
              "border-blue-500": !isUsingAltMovement,
            })}
            onClick={() => setIsUsingAltMovement(!isUsingAltMovement)}
          >
            <p>
              Cambiar movimiento, actual:{" "}
              <span
                className={cn({
                  "text-green-500": isUsingAltMovement,
                  "text-blue-500": !isUsingAltMovement,
                })}
              >
                {isUsingAltMovement ? "Assist" : "Libre"}
              </span>
            </p>
          </button>
          <Leaderboard data={leaderboardQuery.data} className="bg-base-200" />
        </div>
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
      </UiContext.Provider>
      {
        _experiments.queryDevtools && (
          <ReactQueryDevtools />
        ) /* Devtools are excluded from production */
      }
      {_experiments.queryDevtools && process.env.NODE_ENV !== "development" && (
        /* Lazy load devtools in production */
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )}
    </QueryClientProvider>
  );
};

const TopUI = () => {
  const _UiContext = useContext(UiContext);

  return (
    <div className="flex h-[70px] flex-row justify-evenly bg-[#4a752d]">
      <CenteredImage
        imageSrc="https://www.google.com/logos/fnbx/snake_arcade/v17/apple_00.png"
        imageAlt="Apple"
      >
        {_UiContext.score}
      </CenteredImage>
      <CenteredImage
        imageSrc="https://www.google.com/logos/fnbx/snake_arcade/v18/trophy_00.png"
        imageAlt="Trophy"
      >
        {_UiContext.highScore}
      </CenteredImage>
      <CenteredImage icon={<Rat className="relative h-[38px] w-[38px]" />}>
        {_UiContext.username ? _UiContext.username : "Un otro"}
      </CenteredImage>
    </div>
  );
};

type CenteredImageProps = {
  imageSrc?: string;
  imageAlt?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

const CenteredImage = ({
  imageSrc,
  imageAlt,
  icon,
  children,
}: CenteredImageProps) => (
  <div className="flex flex-col justify-center justify-self-start">
    <div className="flex flex-row">
      {imageSrc && imageAlt ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="relative h-[38px] w-[38px]"
        />
      ) : icon ? (
        icon
      ) : null}
      <p className="pt-2 text-xl text-white">{children}</p>
    </div>
  </div>
);

interface CastakeProps {
  castakeMovement: CastakeMovement;
  castakePos: Position;
  setCastakePos: SetState<Position>;
  speed: number;
}

const Castake = ({
  castakeMovement,
  setCastakePos,
  speed,
  castakePos,
}: CastakeProps) => {
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

interface UsernameSelectProps {
  setUsername: typeof setUsername;
}

const UsernameSelect = ({ setUsername }: UsernameSelectProps) => {
  const [hide, setHide] = useState(false);
  const [currentText, setCurrentText] = useState("");

  const _UiContext = useContext(UiContext);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentText) {
      setUsername(currentText);
    }
    setHide(true);
  }

  return (
    <>
      {!hide && !_UiContext.username ? (
        <div className="center absolute z-20">
          <BackgroundGradient>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-row space-x-2 rounded-3xl bg-base-200 p-5"
            >
              <input
                type="text"
                placeholder="Nombre"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setCurrentText(e.target.value)}
              />
              <button className="rounded-lg bg-primary p-2">
                <Check />
              </button>
            </form>
          </BackgroundGradient>
        </div>
      ) : null}
    </>
  );
};

interface LeaderboardProps {
  data: Array<CastakeLeaderboard> | undefined;
  className?: string;
  style?: CSSProperties;
}

const Leaderboard = ({ data, className, style }: LeaderboardProps) => {
  if (!data) return null;

  return (
    <ErrorBoundary fallback={<p>Error loading leaderboard</p>}>
      <Suspense fallback={<p>Loading leaderboard...</p>}>
        <Table className={className} style={style}>
          <Table.Head>
            <Table.HeadItem>Posicion</Table.HeadItem>
            <Table.HeadItem>Nombre</Table.HeadItem>
            <Table.HeadItem>Puntos</Table.HeadItem>
          </Table.Head>
          {data.length !== 0 ? (
            data.map((data, index) => (
              <Table.Body key={index}>
                <Table.BodyItem>{index + 1}</Table.BodyItem>
                <Table.BodyItem>{data.username}</Table.BodyItem>
                <Table.BodyItem>{data.score}</Table.BodyItem>
              </Table.Body>
            ))
          ) : (
            <AltLeaderboardBody />
          )}
        </Table>
      </Suspense>
    </ErrorBoundary>
  );
};

const AltLeaderboardBody = () => (
  <Table.Body>
    <Table.BodyItem>N/A</Table.BodyItem>
    <Table.BodyItem>N/A</Table.BodyItem>
    <Table.BodyItem>N/A</Table.BodyItem>
  </Table.Body>
);

export default CastorSnake;
