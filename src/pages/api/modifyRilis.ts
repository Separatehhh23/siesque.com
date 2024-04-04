import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("content-type") === "application/json") {
    const body = await request.json();
    console.log(body);
    return new Response("OK", { status: 200 });
  }
  return new Response("Invalid content type", { status: 400 });
};
