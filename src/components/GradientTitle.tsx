import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const GradientTitle = ({ children, className }: Props) => (
  <div className={className}>
    <div className="flex w-[125%] bg-gradient-to-br from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
      <Title>{children}</Title>
    </div>
  </div>
);

interface TitleProps {
  className?: string;
  children: ReactNode;
}

const Title = ({ children, className }: TitleProps) => (
  <div className={cn("flex", className)}>
    <h1 className="inline-block font-extrabold sm:text-4xl md:text-6xl xl:text-8xl 2xl:text-[10rem]">
      {children}
    </h1>
  </div>
);

export default GradientTitle;
