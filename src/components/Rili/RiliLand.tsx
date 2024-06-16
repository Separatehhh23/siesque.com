import React, { forwardRef } from "react";
import { Lock } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

const RiliLand = () => {
  return (
    <div className="m-4 grid grid-cols-1 gap-2 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <LinkBox link="/rili/dictionary">Diccionario Rili</LinkBox>
      <LinkBox link="/rili/test">Test Rili</LinkBox>
      <LinkBox link="/rili/chat">Chat Rili Publico</LinkBox>
      <LinkBox link="/rili/snake">Castake v1</LinkBox>
      <LinkBox link="/rili/castake">Castake v2 (WIP)</LinkBox>
      <div className="flex h-[28px] items-center justify-center rounded-full border-4 border-secondary bg-base-200 p-8 text-3xl text-secondary md:col-span-2 xl:col-span-3 2xl:col-span-4">
        Auth Required <SpacedLock />
      </div>
      <LinkBox link="/rili/list">
        List Rili <SpacedLock />
      </LinkBox>
      <LinkBox link="/rili/goverment">
        Rili Goverment <SpacedLock />
      </LinkBox>
      <LinkBox link="/rili/castorlist">
        Lista Castor <SpacedLock />
      </LinkBox>
      <LinkBox link="/rili/chat/private">
        Chat Rili Privado <SpacedLock />
      </LinkBox>
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
      <a
        href={link}
        ref={ref}
        className="flex min-w-0 flex-row justify-center text-wrap rounded-3xl border-4 border-accent bg-base-200 p-8 sm:text-sm md:text-xl"
      >
        {children}

        {icon}
      </a>
    </div>
  ),
);

const SpacedLock = () => (
  <>
    <div className="px-1" />
    <Lock />
  </>
);

export default RiliLand;
