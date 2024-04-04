/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_ENV: "beta" | "dev" | "prod" | "local";
  readonly RILI_PASSWORD: string;
  readonly ALPHA_PASSWORD: string;
  readonly BETA_PASSWORD: string;
  readonly OMEGA_PASSWORD: string;
  readonly NUCLEAR_LAUNCH_CODE_A: string;
  readonly NUCLEAR_LAUNCH_CODE_B: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
