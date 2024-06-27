import { atom } from "nanostores";
import { currentUser } from "@/lib/pocketbase";
import type { Position } from "@/types";

export type Cell<T> = {
  id: Readonly<T>; // id = x-y
  position: Readonly<Position>;
  active: boolean;
};

export type ReducedUser = {
  name: string;
  color: "red" | "green" | "blue" | "orange" | "purple";
};

export type User = ReducedUser & {
  id: string;
  position: Position;
  cells: {
    [key: string]: Cell<typeof key>; // key = x-y
  };
};

export const users = atom<User[]>([]);

export function addUser({ color, name }: ReducedUser) {
  if (!currentUser.get()) return;

  users.set([
    ...users.get(),
    {
      position: { x: 0, y: 0 },
      id: currentUser.get()?.id,
      cells: {},
      name,
      color,
    },
  ]);
}

export const tilesUser = atom<User | null>(null);

users.listen((_users) => {
  const user = _users.find((user) => user.id === currentUser.get()?.id);
  if (user) {
    tilesUser.set(user);
  }
});

users.subscribe((val) => console.log(val));
