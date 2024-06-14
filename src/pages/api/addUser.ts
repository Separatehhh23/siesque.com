// @ts-expect-error: Module gets built at build time
import { db, Users, eq } from "astro:db";

import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ request, clientAddress }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const { name } = body;

    if (!name) return new Response("Missing name", { status: 400 });

    const user = await db.select().from(Users).where(eq(Users.name, name))[0];
    if (!user) {
      await db.insert(Users).values({
        username: name,
        ip: clientAddress,
      });
    }
    return new Response("OK", { status: 200 });
  }
  return new Response("Invalid content type", { status: 400 });
};
