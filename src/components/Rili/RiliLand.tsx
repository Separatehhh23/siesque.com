import type { FC, ReactNode } from "react";
import React, { useRef, forwardRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import Xarrow, { useXarrow } from "react-xarrows";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";
import Title from "../Title";

interface Props {
  children: ReactNode;
}

const RiliLand: FC<Props> = ({ children }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const updateXarrow = useXarrow();

  useEffect(() => {
    updateXarrow();
  }, [isHovering]);

  const titleRef = useRef<HTMLDivElement>(null);
  const button1 = useRef<HTMLAnchorElement>(null);
  const button2 = useRef<HTMLAnchorElement>(null);
  const button3 = useRef<HTMLAnchorElement>(null);
  const button4 = useRef<HTMLAnchorElement>(null);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
        <div ref={titleRef} className="absolute cursor-pointer">
          <BackgroundGradient>
            <div
              className="rounded-3xl bg-base-100 p-4"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {!isHovering ? (
                <Title className="text-2xl">RiliLand</Title>
              ) : (
                children
              )}
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
        <LinkBox ref={button4} link="/rili/capcha">
          Rili Capcha
        </LinkBox>
      </div>

      {[button1, button2, button3, button4].map((ref, index) => (
        <Xarrow
          start={titleRef}
          end={ref}
          curveness={0.8}
          showHead={false}
          color="#009688"
          endAnchor="bottom"
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

const LinkBox = forwardRef<HTMLAnchorElement, LinkBoxProps>(
  ({ children, link, className }: LinkBoxProps, ref) => (
    <div
      className={cn("flex cursor-pointer flex-col justify-center", className)}
    >
      <a href={link} ref={ref}>
        <div className="flex flex-row justify-center rounded-3xl border-4 border-accent p-8">
          <p className="text-text min-w-0 text-wrap sm:text-sm md:text-xl">
            {children}
          </p>
        </div>
      </a>
    </div>
  ),
);

export default RiliLand;
