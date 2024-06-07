import type { FC, ReactNode } from "react";
import React, {
  useRef,
  forwardRef,
  useState,
  useEffect,
  Suspense,
} from "react";
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
  const button5 = useRef<HTMLAnchorElement>(null);
  const button6 = useRef<HTMLAnchorElement>(null);
  const button7 = useRef<HTMLAnchorElement>(null);
  const button8 = useRef<HTMLAnchorElement>(null);
  const button9 = useRef<HTMLAnchorElement>(null);
  const button10 = useRef<HTMLAnchorElement>(null);

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
        <LinkBox ref={button1} link="/rili/list">
          Lista rili
        </LinkBox>
        <LinkBox ref={button2} link="/rili/test">
          Test rili
        </LinkBox>
        <LinkBox ref={button3} link="/rili/docs">
          Documentos rili
        </LinkBox>
        <LinkBox ref={button4} link="/rili/capcha">
          Rili capcha
        </LinkBox>
        <LinkBox ref={button5} link="/rili/snake">
          Castor snake
        </LinkBox>
        <LinkBox ref={button6} link="/rili/goverment">
          Rili government
        </LinkBox>
        <LinkBox ref={button7} link="/rili/experiments">
          Experiments
        </LinkBox>
        <LinkBox ref={button8} link="/rili/art">
          Arte rili
        </LinkBox>
        <LinkBox ref={button9} link="/rili/dictionary">
          Diccionario rili
        </LinkBox>
        <LinkBox ref={button10} link="/rili/chat">
          Chat rili
        </LinkBox>
      </div>

      {[
        button1,
        button2,
        button3,
        button4,
        button5,
        button6,
        button7,
        button8,
        button9,
        button10,
      ].map((ref, index) => (
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
        {children}
      </a>
    </div>
  ),
);

export default RiliLand;
