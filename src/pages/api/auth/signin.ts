import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const provider = formData.get("provider")?.toString();
  const validProviders = ["github"];

  let url:
    | "https://localhost:4321"
    | "https://beta.pylinker.com"
    | "https://dev.pylinker.com"
    | "https://www.pylinker.com";
  switch (import.meta.env.PUBLIC_ENV) {
    case "local":
      url = "https://localhost:4321";
      break;
    case "beta":
      url = "https://beta.pylinker.com";
      break;
    case "dev":
      url = "https://dev.pylinker.com";
      break;
    case "prod":
      url = "https://www.pylinker.com";
      break;
    default:
      break;
  }

  if (provider && validProviders.includes(provider)) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${
          // @ts-ignore
          typeof url !== "undefined" ? url : "https://beta.pylinker.com"
        }/api/auth/callback`,
      },
    });

    if (error) {
      return new Response(error.message, { status: 500 });
    }

    return redirect(data.url);
  }
  return redirect("/");
};
