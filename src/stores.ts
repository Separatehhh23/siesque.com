import { atom } from "nanostores";

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
