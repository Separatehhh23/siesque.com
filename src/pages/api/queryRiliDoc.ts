import { db, eq, RiliDocs } from "astro:db";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const id: string | null = body.id;

    if (id !== null) {
      const doc = await db.select().from(RiliDocs).where(eq(RiliDocs.id, id));
      return new Response(JSON.stringify(doc[0]), { status: 200 });
    }

    return new Response("Invalid content", { status: 400 });
  }
  return new Response("Invalid content type", { status: 400 });
};
