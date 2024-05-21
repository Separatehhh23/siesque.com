import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

interface Props {
  text: [string, string, string];
  className?: string;
}

const GradientTitle: FC<Props> = ({ text, className }) => (
  <div className={className}>
    <div className="flex w-[125%] flex-col bg-gradient-to-br from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
      <Title className="justify-start">{text[0]}</Title>
      <Title className="justify-center">{text[1]}</Title>
      <Title className="justify-end">{text[2]}</Title>
    </div>
  </div>
);

interface TitleProps {
  className: string;
  children: ReactNode;
}

const Title: FC<TitleProps> = ({ children, className }) => (
  <div className={cn("inline-flex", className)}>
    <h1 className="inline-block font-extrabold sm:text-4xl md:text-8xl xl:text-[10rem]">
      {children}
    </h1>
  </div>
);

export default GradientTitle;
