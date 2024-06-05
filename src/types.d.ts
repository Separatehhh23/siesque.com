import { Graphics } from "@pixi/react";
import type { ComponentProps, Dispatch, SetStateAction } from "react";
import type { CollectionEntry } from "astro:content";

interface BlogEntry extends CollectionEntry<"blog"> {
  id: string;
  slug: string;
  body: string;
  collection: "blog";
  data: {
    title: string;
    tags: string[];
    author: string;
    description: string;
    publishDate: Date;
  };
}

interface ModalElement extends HTMLElement {
  showModal(): void;
}

interface RiliObject {
  id: number;
  name: string;
  amount: number;
}
type RiliArray = RiliObject[];

type DrawGraphics = ComponentProps<typeof Graphics>["draw"];

interface Position {
  x: number;
  y: number;
}

type SetState<T> = Dispatch<SetStateAction<T>>;

interface Experiments {
  queryDevtools: boolean;
}

type CastakeLeaderboard = {
  username: string;
  score: number;
};

type RiliGovermentRole = "Founder" | "Co-Founder" | "Salty Springs" | "Castor";

type RiliGoverment = {
  name: string;
  role: RiliGovermentRole;
};

export type {
  BlogEntry,
  Params,
  ModalElement,
  RiliObject,
  RiliArray,
  DrawGraphics,
  Position,
  SetState,
  Experiments,
  CastakeLeaderboard,
  RiliGoverment,
  RiliGovermentRole,
};
