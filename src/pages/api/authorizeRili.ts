import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const password = body.password;

    // @ts-ignore
    if (password === "ornitorrinco") {
      return new Response(
        JSON.stringify({
          cookie: "hornitorrinco", // 💀 FIX THIS LATER!!!
        }),
        {
          status: 200,
        },
      );
    } else {
      return new Response(null, { status: 401 });
    }
  }
  return new Response(null, { status: 400 });
};
