import React, {
  useRef,
  forwardRef,
  useState,
  useEffect,
  Suspense,
} from "react";
import Draggable from "react-draggable";
import Xarrow, { useXarrow } from "react-xarrows";
import { useStore } from "@nanostores/react";

import { cn } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";
import Title from "../Title";
import { newMessages } from "@/lib/pocketbase";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RiliLand = ({ children }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const messages = useStore(newMessages);

  const updateXarrow = useXarrow();

  useEffect(() => {
    updateXarrow();
  }, [isHovering]);

  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = Array.from({ length: 10 }).map(() =>
    useRef<HTMLAnchorElement>(null),
  );

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
                <Suspense
                  fallback={<Title className="text-2xl">RiliLand</Title>}
                >
                  {children}
                </Suspense>
              )}
            </div>
          </BackgroundGradient>
        </div>
      </Draggable>

      <div className="grid h-screen w-screen grid-cols-5 grid-rows-5 gap-4 pl-2 pr-2 pt-2">
        <LinkBox ref={buttonRef[0]} link="/rili/list">
          Lista rili
        </LinkBox>
        <LinkBox ref={buttonRef[1]} link="/rili/test">
          Test rili
        </LinkBox>
        <LinkBox ref={buttonRef[2]} link="/rili/docs">
          Documentos rili
        </LinkBox>
        <LinkBox ref={buttonRef[3]} link="/rili/capcha">
          Rili capcha
        </LinkBox>
        <LinkBox ref={buttonRef[4]} link="/rili/snake">
          Castor snake
        </LinkBox>
        <LinkBox ref={buttonRef[5]} link="/rili/goverment">
          Rili government
        </LinkBox>
        <LinkBox ref={buttonRef[6]} link="/rili/dictionary">
          Diccionario rili
        </LinkBox>
        <LinkBox
          ref={buttonRef[7]}
          link="/rili/chat"
          cornerIcon={<p>{messages.length}</p>}
        >
          Chat rili
        </LinkBox>
        <LinkBox ref={buttonRef[8]} link="/rili/castorlist">
          Lista castor
        </LinkBox>
        <LinkBox ref={buttonRef[9]} link="/rili/frases">
          Frases rili
        </LinkBox>
      </div>

      {buttonRef.map((ref, index) => (
        <Xarrow
          start={titleRef}
          end={ref}
          curveness={Math.PI / (10 / 3)}
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
  cornerIcon?: ReactNode;
}

const LinkBox = forwardRef<HTMLAnchorElement, LinkBoxProps>(
  ({ children, link, className, cornerIcon }: LinkBoxProps, ref) => (
    <div
      className={cn(
        "z-20 flex cursor-pointer flex-col justify-center",
        className,
      )}
    >
      <a
        href={link}
        ref={ref}
        className="text-text flex min-w-0 flex-row justify-center text-wrap rounded-3xl border-4 border-accent bg-base-200 p-8 sm:text-sm md:text-xl"
      >
        <divc className="-transform translateX-[-50%] transtaleY-[-50%] rounded-xl bg-red-500 p-2">{cornerIcon}</div>
        {children}
      </a>
    </div>
  ),
);

export default RiliLand;
