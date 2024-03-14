import type { Dispatch, SetStateAction } from "react";
import type { CollectionEntry } from "astro:content";

interface ArrayFunctions {
  map: () => Array<any>;
  filter: () => Array<any>;
  forEach: () => Array<any>;
  reduce: () => Array<any>;
  sort: () => Array<any>;
  slice: () => Array<any>;
  join: () => Array<any>;
  pop: () => Array<any>;
  push: () => Array<any>;
  shift: () => Array<any>;
  unshift: () => Array<any>;
  reverse: () => Array<any>;
  concat: () => Array<any>;
  includes: () => Array<any>;
  indexOf: () => Array<any>;
  lastIndexOf: () => Array<any>;
  toString: () => Array<any>;
  toLocaleString: () => Array<any>;
  valueOf: () => Array<any>;
  length: number;
  splice: () => Array<any>;
  fill: () => Array<any>;
  copyWithin: () => Array<any>;
  find: () => Array<any>;
  findIndex: () => Array<any>;
  flat: () => Array<any>;
}

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

type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Exclude<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Modify<T, R> = Omit<T, keyof R> & R;
type Record<K extends keyof any, T> = { [P in K]: T };
type Params = Record<string, string | undefined>;

type SetState<T> = Dispatch<SetStateAction<T>>;

export type {
  BlogEntry,
  Pick,
  Exclude,
  Modify,
  Omit,
  Record,
  Params,
  ModalElement,
  ArrayFunctions,
  SetState,
};
