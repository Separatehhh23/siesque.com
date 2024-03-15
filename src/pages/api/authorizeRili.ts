import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const password: string | null = body.password;

    // @ts-ignore
    if (password !== null && password === import.meta.env.RILI_PASSWORD) {
      return new Response(null, {
        status: 200,
        headers: {
          "Set-Cookie":
            "password=hornitorrinco; Expires=Sat, 31 Oct 2037 00:00:00 UTC; SameSite=Lax; Domain=pylinker.com; Path=/",
        },
      });
    } else {
      return new Response(null, { status: 401 });
    }
  }
  return new Response(null, { status: 400 });
};
