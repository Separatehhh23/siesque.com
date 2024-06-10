// @ts-expect-error: Module exists with all of those exports
import { db, CastakeLeaderboard, eq } from "astro:db";

import type { APIRoute } from "astro";
import type {
  CastakeLeaderboard as TCastakeLeaderboard,
  SimpleCastakeLeaderboard,
} from "../../types";

export const PUT: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = (await request.json()) as {
      username: string;
      score: number;
      mode: "assist" | "libre";
    };

    if (!body.username || !body.score || !body.mode) {
      return new Response("Invalid body", { status: 400 });
    }

    const { username, score, mode } = body;

    console.log(body);

    // Check if the user exists
    const existingEntries = await db
      .select()
      .from(CastakeLeaderboard)
      .where(eq(CastakeLeaderboard.username, username));

    if (existingEntries.length === 0) {
      // Insert new record
      if (mode === "assist") {
        await db
          .insert(CastakeLeaderboard)
          .values({ username: username, scoreAssist: score });
      } else {
        await db
          .insert(CastakeLeaderboard)
          .values({ username: username, scoreLibre: score });
      }
    } else {
      // Update existing record
      if (mode === "assist") {
        await db
          .update(CastakeLeaderboard)
          .set({ scoreAssist: score })
          .where(eq(CastakeLeaderboard.username, username));
      } else {
        await db
          .update(CastakeLeaderboard)
          .set({ scoreLibre: score })
          .where(eq(CastakeLeaderboard.username, username));
      }
    }
    return new Response("OK", { status: 200 });
  }
  return new Response("Invalid content type", { status: 400 });
};
