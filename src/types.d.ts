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

type RiliArray = Array<Object<number, string, number>>;

export type { BlogEntry, Params, ModalElement, RiliArray };
