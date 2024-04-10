import type { FC } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import Xarrow, { useXarrow } from "react-xarrows";
import { BackgroundGradient } from "../ui/background-gradient";
import Title from "../Title";

const RiliLand: FC = () => {
  const updateXarrow = useXarrow();

  const titleRef = useRef<HTMLDivElement>(null);
  const riliListRef = useRef<HTMLDivElement>(null);
  const riliDictRef = useRef<HTMLDivElement>(null);
  const riliDocsRef = useRef<HTMLDivElement>(null);

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
          className="absolute right-[20rem] top-[14rem] cursor-pointer"
        >
          <a href="/rili/list">
            <div className="rounded-3xl border-4 border-accent p-4">
              <p className="text-text text-md">Lista Rili</p>
            </div>
          </a>
        </div>
        <div
          ref={riliDictRef}
          className="absolute bottom-[15rem] right-[22rem] cursor-pointer"
        >
          <a href="/rili/dictionary">
            <div className="rounded-3xl border-4 border-accent p-4">
              <p className="text-text text-md">Diccionario de otros</p>
            </div>
          </a>
        </div>
        <div
          ref={riliDocsRef}
          className="absolute bottom-[16rem] left-[25rem] cursor-pointer"
        >
          <a href="/rili/docs">
            <div className="rounded-3xl border-4 border-accent p-4">
              <p className="text-text text-md">Documentos rili</p>
            </div>
          </a>
        </div>

        <Xarrow start={titleRef} end={riliListRef} />
        <Xarrow start={titleRef} end={riliDictRef} />
        <Xarrow start={titleRef} end={riliDocsRef} />
      </div>
    </>
  );
};

export default RiliLand;
