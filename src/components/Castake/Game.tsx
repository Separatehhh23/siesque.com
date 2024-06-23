import { memo, createContext, useEffect, useState } from "react";
import { Container, Sprite, Stage, useTick } from "@pixi/react";

import type { Position, SetState } from "@/lib/castake/types";

type UiType = Omit<UiContextType, "set">;

interface UiContextType {
  set: (newValue: Partial<UiType>) => void;
  health: number;
}

const UiContext = createContext<UiContextType | null>(null);

export const Game = () => {
  const [ui, setUi] = useState<UiType>({
    health: 10,
  });
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  return (
    <UiContext.Provider
      value={{
        set: (newValue) =>
          setUi((prevState) => ({ ...prevState, ...newValue })),
        ...ui,
      }}
    >
      <Stage
        width={document.body.clientWidth}
        height={document.body.clientHeight}
        options={{ backgroundColor: 0x000000 }}
      >
        {/* Grass container */}
        <Grass />

        {/* Player container */}
        <Container>
          <Castake pos={pos} setPos={setPos} />
        </Container>
      </Stage>
    </UiContext.Provider>
  );
};

const Grass = memo(() => (
  <Container>
    {Array.from({ length: document.body.clientWidth / 200 + 1 }).map((_, i) =>
      Array.from({ length: document.body.clientHeight / 200 + 1 }).map(
        (__, j) => (
          <Sprite
            image="/castake/sprites/grass.jpg"
            x={i * 200}
            y={j * 200}
            width={200}
            height={200}
            key={`${i}-${j}`}
          />
        ),
      ),
    )}
  </Container>
));

interface CastakeProps {
  pos: Position;
  setPos: SetState<Position>;
}

const Castake = ({ pos, setPos }: CastakeProps) => {
  const [key, setKey] = useState<string>("");

  useTick((deltaTime) => {
    if (key === "ArrowRight" || key === "d") {
      setPos({ ...pos, x: pos.x + 2 * deltaTime });
    }
    if (key === "ArrowLeft" || key === "a") {
      setPos({ ...pos, x: pos.x - 2 * deltaTime });
    }
    if (key === "ArrowUp" || key === "w") {
      setPos({ ...pos, y: pos.y - 2 * deltaTime });
    }
    if (key === "ArrowDown" || key === "s") {
      setPos({ ...pos, y: pos.y + 2 * deltaTime });
    }
  });

  function handleKeyDown(e: KeyboardEvent) {
    setKey(e.key);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Sprite
      image="/castake/sprites/castake.webp"
      x={pos?.x}
      y={pos?.y}
      height={50}
      width={50}
    />
  );
};
