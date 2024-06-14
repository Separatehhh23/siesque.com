import React, {
  useRef,
  forwardRef,
  useState,
  useEffect,
  Suspense,
} from "react";
import Draggable from "react-draggable";
import { useStore } from "@nanostores/react";
import { Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";
import Title from "../Title";
import { newMessages } from "@/lib/pocketbase";

import type { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
}

const RiliLand = ({ children }: Props) => {
  const messages = useStore(newMessages);

  return (
    <div className="m-4 grid grid-cols-3 gap-2 p-4">
      <LinkBox link="/rili/dictionary">Diccionario Rili</LinkBox>
      <LinkBox link="/rili/test">Test Rili</LinkBox>
      <LinkBox link="/rili/chat" cornerIcon={messages.messages.length}>
        Chat Rili Publico
      </LinkBox>
      <div className="col-span-3 flex h-[28px] items-center justify-center rounded-full border-4 border-secondary bg-base-200 p-8 text-3xl text-secondary">
        Auth Required <div className="px-1" /> <Lock />
      </div>
      <LinkBox link="/rili/list">List Rili</LinkBox>
      <LinkBox link="/rili/goverment">Rili Goverment</LinkBox>
      <LinkBox link="/rili/castorlist">Lista Castor</LinkBox>
    </div>
  );
};

interface LinkBoxProps {
  children: ReactNode;
  link: string;
  className?: string;
  cornerIcon?: ReactNode;
  icon?: ReactNode;
}

const LinkBox = forwardRef<HTMLAnchorElement, LinkBoxProps>(
  ({ children, link, className, cornerIcon, icon }: LinkBoxProps, ref) => (
    <div
      className={cn(
        "z-20 flex cursor-pointer flex-col justify-center",
        className,
      )}
    >
      {!!cornerIcon || cornerIcon === 0 ? (
        <div
          className="absolute flex h-[28px] w-[28px] items-center justify-center rounded-full bg-red-500 p-2 text-white"
          style={{ transform: "translateY(-42px)" }}
        >
          {cornerIcon}
        </div>
      ) : null}
      <a href={link} ref={ref}>
        <p className="flex min-w-0 flex-row justify-center text-wrap rounded-3xl border-4 border-accent bg-base-200 p-8 sm:text-sm md:text-xl">
          {children}
        </p>
        {icon}
      </a>
    </div>
  ),
);

export default RiliLand;
