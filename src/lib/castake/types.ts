import type { Dispatch, SetStateAction } from "react";

export type Position = {
  x: number;
  y: number;
};

export type SetState<T> = Dispatch<SetStateAction<T>>;
