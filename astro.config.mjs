import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import db from "@astrojs/db";
import svgr from "vite-plugin-svgr";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  site: "https://pylinker.com",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover"
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx(), svelte(), react(), db(), auth()],
  output: "server",
  adapter: vercel({
    speedInsights: true
  }),
  vite: {
    plugins: [svgr()],
    define: {
      "process.env.IS_PREACT": JSON.stringify("false")
    },
    build: {
      rollupOptions: {
        external: ["sharp"]
      }
    }
  }
});