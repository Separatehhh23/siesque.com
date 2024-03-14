/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_ENV: "beta" | "dev" | "prod" | "local";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
