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

type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Exclude<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Modify<T, R> = Omit<T, keyof R> & R;
type Record<K extends keyof any, T> = { [P in K]: T };
type Params = Record<string, string | undefined>;

export type { BlogEntry, Pick, Exclude, Modify, Record, Params };
