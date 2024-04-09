import type { FC, ReactNode } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import { BackgroundGradient } from "../ui/background-gradient";
import Title from "../Title";

const RiliLand: FC = () => {
  const updateXarrow = useXarrow();

  const titleRef = useRef<HTMLDivElement>(null);
  const riliListRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
          <div ref={titleRef} className="cursor-pointer">
            <BackgroundGradient>
              <div className="rounded-3xl bg-base-100 p-4">
                <Title className="text-2xl">RiliLand</Title>
              </div>
            </BackgroundGradient>
          </div>
        </Draggable>
        <div
          ref={riliListRef}
          style={{ transform: "translateX(26rem) translateY(-10rem)" }}
        >
          <a href="/rili/list">
            <div className="rounded-3xl border-4 border-accent p-4">
              <p className="text-text text-md">Lista Rili</p>
            </div>
          </a>
        </div>
        <Xarrow start={titleRef} end={riliListRef} />
      </div>
    </>
  );
};

export default RiliLand;
