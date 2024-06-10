// @ts-expect-error: Module exists with all of those exports
import { db, CastorList, eq } from "astro:db";

import type { APIRoute } from "astro";
import type { CastorListRole } from "../../types";

export const PATCH: APIRoute = async ({ request }) => {
  if (request.headers.get("content-type") === "application/json") {
    const body: { name: string; newRole: CastorListRole } =
      await request.json();
    const { name, newRole } = body;

    if (!name || !newRole) {
      return new Response("Invalid body", { status: 400 });
    }

    await db
      .update(CastorList)
      .set({ role: newRole })
      .where(eq(CastorList.name, name));

    return new Response("OK", { status: 200 });
  }
  return new Response("Invalid content type", { status: 400 });
};
