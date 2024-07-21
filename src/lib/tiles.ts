import { atom } from "nanostores";
import { currentUser } from "./pocketbase";
import type { Position } from "@/types";

export const socket = new WebSocket("ws://127.0.0.1:8788/_ws");

export type Cell = {
  id: string;
  position: Position;
  active: boolean;
};

type PlayerOpts = {
  name: string;
  color: "red" | "green" | "blue" | "orange" | "purple";
};

export type Player = {
  Uid: string;
  id: string;
} & Partial<PlayerOpts>;

const players = atom<{ [key: number]: Player }>({});

export function addOpts({ name, color }: PlayerOpts) {
  socket.send(
    JSON.stringify({
      action: "addOpts",
      data: {
        Uid: currentUser.get()?.id || "anonymous",
        name,
        color,
      },
    }),
  );
}

let callback = () => {};
export function onReadyCallback(callbackFn: () => void) {
  callback = callbackFn;
}

socket.addEventListener("open", () => {
  console.log("Connected to server");

  callback();
});

socket.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);

  console.log(msg);
  if (msg.action === "sendPlayers") {
    players.set(msg.data);
  }
});

players.subscribe((val) => {
  console.log("PlayerStore: ", val);
});
