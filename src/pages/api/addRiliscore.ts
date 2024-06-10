import type { APIRoute } from "astro";
// @ts-expect-error: Module exists with all of those exports
import { db, Rili, eq } from "astro:db";
import type { RiliObject, RiliArray } from "../../types";

export const PATCH: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const id: number | null = body.id;

    if (id !== null) {
      const currentRiliArray: RiliArray = await db.select().from(Rili);

      const rili: RiliObject[] = currentRiliArray.filter(
        (rili) => rili.id === id,
      );
      if (rili.length !== 1)
        return new Response("Internal server error", { status: 501 });

      let riliscore = rili[0].amount + 1;

      await db.update(Rili).set({ amount: riliscore }).where(eq(Rili.id, id));
    }

    return new Response("OK", { status: 200 });
  }
  return new Response("Invalid content type", { status: 400 });
};
