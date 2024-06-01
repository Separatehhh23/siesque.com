// @ts-expect-error: Module exists with all of those exports
import { db, CastakeLeaderboard } from "astro:db";

import type { APIRoute } from "astro";
import type { CastakeLeaderboard as TCastakeLeaderboard } from "@/types";

export const GET: APIRoute = async ({ request }) => {
  const leaderboard: TCastakeLeaderboard = await db
    .select()
    .from(CastakeLeaderboard);
  return new Response(JSON.stringify(leaderboard), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
