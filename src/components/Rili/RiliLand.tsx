import type { FC, ReactNode } from "react";
import React, { useRef, forwardRef, useState } from "react";
import Draggable from "react-draggable";
import Xarrow, { useXarrow } from "react-xarrows";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";
import Title from "../Title";
// @ts-ignore
import { ReactComponent as RililandLogo } from "public/RililandLogo.svg";

const RiliLand: FC = () => {
  const [showLogo, setShowLogo] = useState(false);

  const updateXarrow = useXarrow();

  const titleRef = useRef<HTMLDivElement>(null);

  const refArray = new Array(3).map(() => useRef<HTMLDivElement>(null));

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
        <div
          ref={titleRef}
          className="cursor-pointer"
          onMouseOver={() => setShowLogo(!showLogo)}
        >
          {showLogo && <RililandLogo />}
          <BackgroundGradient>
            <div className="rounded-3xl bg-base-100 p-4">
              <Title className="text-2xl">RiliLand</Title>
            </div>
          </BackgroundGradient>
        </div>
      </Draggable>

      <LinkBox
        ref={refArray[0]}
        link="/rili/list"
        className="right-[20rem] top-[14rem]"
      >
        Lista Rili
      </LinkBox>
      <LinkBox
        ref={refArray[1]}
        link="/rili/dictionary"
        className="bottom-[15rem] right-[22rem]"
      >
        Diccionario rili
      </LinkBox>
      <LinkBox
        ref={refArray[2]}
        link="/rili/docs"
        className="bottom-[16rem] left-[25rem]"
      >
        Documentos rili
      </LinkBox>

      {refArray.map((ref, index) => (
        <Xarrow
          start={titleRef}
          end={ref}
          curveness={0.4}
          showHead={false}
          color="#009688"
          key={index}
        />
      ))}
    </div>
  );
};

interface LinkBoxProps {
  children: ReactNode;
  link: string;
  className?: string;
}

const LinkBox = forwardRef<HTMLDivElement, LinkBoxProps>(
  ({ children, link, className }: LinkBoxProps, ref) => (
    <div ref={ref} className={cn("absolute cursor-pointer", className)}>
      <a href={link}>
        <div className="rounded-3xl border-4 border-accent p-4">
          <p className="text-text text-md">{children}</p>
        </div>
      </a>
    </div>
  ),
);

export default RiliLand;
