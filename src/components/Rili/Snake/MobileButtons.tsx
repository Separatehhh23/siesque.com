import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

type MobileButtonsProps = {
  handler: (event: KeyboardEvent) => void;
};

export const MobileButtons = ({ handler }: MobileButtonsProps) => {
  const handleClick = (key: "w" | "a" | "s" | "d") =>
    handler(new KeyboardEvent("keydown", { key: key }));

  return (
    <div className="flex flex-row justify-around">
      <MobileButton onClick={() => handleClick("a")}>
        <ArrowLeft />
      </MobileButton>
      <MobileButton onClick={() => handleClick("w")}>
        <ArrowUp />
      </MobileButton>

      <MobileButton onClick={() => handleClick("s")}>
        <ArrowDown />
      </MobileButton>
      <MobileButton onClick={() => handleClick("d")}>
        <ArrowRight />
      </MobileButton>
    </div>
  );
};

type MobileButtonProps = {
  onClick: MouseEventHandler;
  children: ReactNode;
};

const MobileButton = ({ children, onClick }: MobileButtonProps) => {
  return (
    <button className="btn btn-circle btn-ghost" onClick={onClick}>
      {children}
    </button>
  );
};
