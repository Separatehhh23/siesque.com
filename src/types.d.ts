import { Graphics } from "@pixi/react";
import type {
  ComponentProps,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from "react";
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

type Experiments = {
  altLeaderboard: boolean;
};

type CastakeLeaderboard = {
  username: string;
  scoreAssist: number;
  scoreLibre: number;
};

type RiliGovermentRole = "Founder" | "Co-Founder" | "Salty Springs" | "Castor";

type RiliGoverment = {
  name: string;
  role: RiliGovermentRole;
};

type SimpleCastakeLeaderboard = Array<{
  username: string;
  score: number;
}>;

type LeaderboardProps = {
  data?: Array<SimpleCastakeLeaderboard>;
  className?: string;
  style?: CSSProperties;
};

type ArtData = {
  title: string;
  author: string;
  tags?: Array<string>;
  score: number;
  publishDate: string;
  image: string;
};

type CastorListRole = "Mesopotamico" | "Ceboiah" | "Castor";
type CastorList = Array<{
  name: string;
  role: CastorListRole;
}>;

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
  SimpleCastakeLeaderboard,
  LeaderboardProps,
  ArtData,
  CastorList,
  CastorListRole,
};
