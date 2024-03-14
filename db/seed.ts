// @ts-ignore
import { db, Comment, Rili, NOW } from "astro:db";

export default async function () {
  await db.insert(Comment).values([
    {
      id: 1,
      body: "Hope you like Astro DB!",
      post: 1,
      author: "you",
      published: NOW,
    },
    { id: 2, body: "Enjoy!", post: 2, author: "me", published: NOW },
  ]);

  await db.insert(Rili).values([
    { id: 1, name: "algo", amount: 15643 },
    { id: 2, name: "otro algo", amount: 188 },
  ]);
}
