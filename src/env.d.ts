/// <reference path="../.astro/types.d.ts" />
interface ImportMeta {
  readonly env: {
    readonly PUBLIC_ENV: "beta" | "dev" | "prod" | "local";
    readonly SUPABASE_URL: string;
    readonly SUPABASE_ANON_KEY: string;
  };
}
