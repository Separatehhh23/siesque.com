// @ts-expect-error: Module exists with all of those exports
import { db, RiliGoverment } from "astro:db";

import type { APIRoute } from "astro";
import type { RiliGoverment as TRiliGoverment } from "@/types";

export const GET: APIRoute = async ({ request }) => {
  const riliGov: TRiliGoverment = await db.select().from(RiliGoverment);
  return new Response(JSON.stringify(riliGov), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
