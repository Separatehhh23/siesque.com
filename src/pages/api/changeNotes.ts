import type { APIRoute } from "astro";
import { db, Notes, eq } from "astro:db";
import type { RiliTask } from "@/types";

export const PATCH: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body: RiliTask = await request.json();

    try {
      db.update(Notes).set(body).where(eq(Notes.id, body.id));
    } catch {
      return new Response("Internal server error", { status: 501 });
    }

    return new Response("OK", { status: 200 });
  }
  return new Response("Invalid content type", { status: 400 });
};
