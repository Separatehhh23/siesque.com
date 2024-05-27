import type { Dispatch, SetStateAction } from "react";
import type { CollectionEntry } from "astro:content";

interface BlogEntry extends CollectionEntry<"blog">, ArrayFunctions {
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

interface RiliTask {
  id: number;
  title: string;
  body: string;
  tick: boolean;
}

export type {
  BlogEntry,
  Params,
  ModalElement,
  RiliObject,
  RiliArray,
  RiliTask,
};
