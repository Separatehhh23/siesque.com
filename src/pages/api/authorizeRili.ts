import type { APIRoute } from "astro";

import pkg from "@fullerstack/nax-ipware";
const { Ipware } = pkg;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const password: string | null = body.password;

    // @ts-ignore
    if (password !== null && password === import.meta.env.RILI_PASSWORD) {
      const DateInSeconds = Date.now() + 60 * 30 * 1000;
      const date = new Date(DateInSeconds);

      // Better auth (hopefully)
      const cookie =
        "0PqxxoNmRBwZj3eZ9ud8hYgLEKcUHfqRHOeMZW0UTKm1fvMEXZNJlWkzpcqc251FezBq89ILkBq3v7YqdPnDrnVBpAFmLWVXjxSoglaUjJsFwvALfgvGSiAI9infpLIa";

      return new Response(null, {
        status: 200,
        headers: {
          "Set-Cookie": `password=${cookie}; Expires=${date}; SameSite=Lax; Path=/`,
        },
      });
    } else {
      return new Response(null, { status: 401 });
    }
  }
  return new Response(null, { status: 400 });
};
