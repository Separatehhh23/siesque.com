// @ts-expect-error: Module exists with all of those exports
import { db, CastakeLeaderboard, eq } from "astro:db";

import type { APIRoute } from "astro";
import type { CastakeLeaderboard as TCastakeLeaderboard } from "@/types";

export const PUT: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = (await request.json()) as TCastakeLeaderboard;

    if (!body.username || !body.score) {
      return new Response("Invalid body", { status: 400 });
    }

    const { username, score } = body;

    console.log(body);

    // Check if the user exists
    const existingEntries = await db
      .select()
      .from(CastakeLeaderboard)
      .where(eq(CastakeLeaderboard.username, username));

    if (existingEntries.length === 0) {
      // Insert new record
      await db.insert(CastakeLeaderboard).values({ username, score });
    } else {
      // Update existing record
      await db
        .update(CastakeLeaderboard)
        .set({ score })
        .where(eq(CastakeLeaderboard.username, username));
    }

    return new Response("OK", { status: 200 });
  }
  return new Response("Invalid content type", { status: 400 });
};
