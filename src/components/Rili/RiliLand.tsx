import type { FC, ReactNode } from "react";
import React, { useRef, forwardRef, useState } from "react";
import Draggable from "react-draggable";
import Xarrow, { useXarrow } from "react-xarrows";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";
import Title from "../Title";
import RiliLandLogo from "@/assets/RililandLogo.svg?react";

const RiliLand: FC = () => {
  const updateXarrow = useXarrow();

  const titleRef = useRef<HTMLDivElement>(null);
  const button1 = useRef<HTMLAnchorElement>(null);
  const button2 = useRef<HTMLAnchorElement>(null);
  const button3 = useRef<HTMLAnchorElement>(null);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
        <div ref={titleRef} className="absolute cursor-pointer">
          <BackgroundGradient>
            <div className="rounded-3xl bg-base-100 p-4">
              <Title className="text-2xl">RiliLand</Title>
            </div>
          </BackgroundGradient>
        </div>
      </Draggable>

      <div className="grid h-screen w-screen grid-cols-5 grid-rows-5 gap-4 pl-2 pr-2 pt-2">
        <LinkBox ref={button1} link="/rili/list">
          Lista Rili
        </LinkBox>
        <LinkBox ref={button2} link="/rili/dictionary">
          Diccionario rili
        </LinkBox>
        <LinkBox ref={button3} link="/rili/docs">
          Documentos rili
        </LinkBox>
      </div>
      <Xarrow
        start={titleRef}
        end={button1}
        curveness={0.4}
        showHead={false}
        color="#009688"
        endAnchor="bottom"
      />
      <Xarrow
        start={titleRef}
        end={button2}
        curveness={0.4}
        showHead={false}
        color="#009688"
        endAnchor="bottom"
      />
      <Xarrow
        start={titleRef}
        end={button3}
        curveness={0.4}
        showHead={false}
        color="#009688"
        endAnchor="bottom"
      />
    </div>
  );
};

interface LinkBoxProps {
  children: ReactNode;
  link: string;
  className?: string;
}

const LinkBox = forwardRef<HTMLAnchorElement, LinkBoxProps>(
  ({ children, link, className }: LinkBoxProps, ref) => (
    <div
      className={cn("flex cursor-pointer flex-col justify-center", className)}
    >
      <a href={link} ref={ref}>
        <div className="rounded-3xl border-4 border-accent p-4">
          <p className="text-text text-md">{children}</p>
        </div>
      </a>
    </div>
  ),
);

export default RiliLand;
