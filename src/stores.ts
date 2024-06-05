import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { QueryClient } from "@tanstack/react-query";

import type { Experiments } from "./types";

export const queryClient = new QueryClient();

export const count = atom<number>(
  JSON.parse(<string>localStorage.getItem("count")) || 0,
);

export function incrementCount() {
  count.set(count.get() + 1);
  localStorage.setItem("count", JSON.stringify(count.get()));
}

export function resetCount() {
  count.set(0);
  localStorage.setItem("count", JSON.stringify(count.get()));
}

export const capchaOpen = atom(false);

export type elOtroPurchaseLocation = "vigo" | "sahara";
export interface buyElOtroType {
  hasBoughtElOtro: boolean;
  deal?: {
    location: elOtroPurchaseLocation;
    when: Date;
  };
}

export const elOtroPurchase = persistentAtom<buyElOtroType>(
  "hasBoughtElOtro",
  { hasBoughtElOtro: false },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export function buyElOtro(location: elOtroPurchaseLocation) {
  const dateInMs = Date.now() + 7 * 24 * 60 * 60 * 1000;

  elOtroPurchase.set({
    hasBoughtElOtro: true,
    deal: { location: location, when: new Date(dateInMs) },
  });
}

export function clearElOtroPurchase() {
  elOtroPurchase.set({ hasBoughtElOtro: false, deal: undefined });
}

export const riliDocsAccess = persistentAtom(
  "riliDocsAccess",
  { access: false },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export function accessRiliDocs() {
  riliDocsAccess.set({ access: true });
}

export const isShowingCard = atom(true);

export function showCard() {
  isShowingCard.set(true);
}

export function hideCard() {
  isShowingCard.set(false);
}

export const highScore = persistentAtom<{ score: number }>(
  "highScore",
  { score: 0 },
  { encode: JSON.stringify, decode: JSON.parse },
);

export function setHighScore(score: number) {
  highScore.set({ score: score });
}

export const experiments = persistentAtom<Experiments>(
  "experiments",
  {
    queryDevtools: false,
  },
  { encode: JSON.stringify, decode: JSON.parse },
);

export function toggleExperiment(experiment: keyof Experiments) {
  experiments.set({
    ...experiments.get(),
    [experiment]: !experiments.get()[experiment],
  });
}

export const username = persistentAtom<{ name: string }>(
  "username",
  { name: "" },
  { encode: JSON.stringify, decode: JSON.parse },
);

export function setUsername(_username: string) {
  username.set({ name: _username });
}
