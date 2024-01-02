import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://www.pylinker.com",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover"
  },
  integrations: [mdx(), sitemap(), tailwind(), svelte()],
  output: "server",
  adapter: vercel({
    speedInsights: true
  })
});