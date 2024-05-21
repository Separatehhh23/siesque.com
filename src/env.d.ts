/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_ENV: "beta" | "dev" | "prod" | "local";
  readonly RILI_PASSWORD: string;
  readonly ALPHA_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
