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

interface Vector2 {
  x: number;
  y: number;
}

type Position = Vector2;

type SetState<T> = Dispatch<SetStateAction<T>>;

export type {
  BlogEntry,
  Params,
  ModalElement,
  RiliObject,
  RiliArray,
  DrawGraphics,
  Position,
  Vector2,
  SetState,
};
