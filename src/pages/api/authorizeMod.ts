import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const password: string | null = body.password;

    // @ts-ignore
    if (password !== null && password === import.meta.env.ALPHA_PASSWORD) {
      const dateInSeconds = Date.now() + 60 * 15 * 1000; // 15 minutes
      const date = new Date(dateInSeconds);

      // Better auth (hopefully)
      const cookie =
        "UuwzEmfPi3agCbQ2epTBeoWhx6DDNkCuSk0yNJAXjMnNWdYMzk6tDtLAiNGIXWjYydvchbLKJo3TUk7u6Pizbh60rctVTjB09wnOSu7tMDv7aqjTOOH0ciTHQaVchDud";

      return new Response("OK", {
        status: 200,
        headers: {
          "Set-Cookie": `modPassword=${cookie}; Expires=${date}; SameSite=Lax; Path=/`,
        },
      });
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  return new Response("Invalid content type", { status: 400 });
};
