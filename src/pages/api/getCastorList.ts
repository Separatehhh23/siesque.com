// @ts-expect-error: Module exists with all of those exports
import { db, CastorList } from "astro:db";

import type { APIRoute } from "astro";
import type { CastorList as TCastorList } from "../../types";

export const GET: APIRoute = async ({ request }) => {
  const riliGov: TCastorList = await db.select().from(CastorList);
  return new Response(JSON.stringify(riliGov), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
