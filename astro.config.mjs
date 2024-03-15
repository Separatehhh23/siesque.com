import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import alpinejs from "@astrojs/alpinejs";
import react from "@astrojs/react";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: "https://www.pylinker.com",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover"
  },
  integrations: [
    sitemap({ filter: (page) =>
      page !== 'https://www.pylinker.com/rili' &&
      page !== 'https://www.pylinker.com/rili/list'
    }),
    tailwind(),
    mdx(),
    svelte(),
    alpinejs(),
    react(),
    db()
  ],
  output: "server",
  adapter: vercel({
    speedInsights: true
  }),
  vite: {
    build: {
      rollupOptions: {
        external: ["sharp"]
      }
    }
  }
});