import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

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

type elOtroPurchaseLocation = "vigo" | "sahara";
interface buyElOtroType {
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
