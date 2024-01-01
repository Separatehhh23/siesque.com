import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import qwikdev from "@qwikdev/astro";
import { qwikReact } from '@builder.io/qwik-react/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://www.pylinker.com",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover"
  },
  integrations: [mdx(), sitemap(), tailwind(), qwikdev()],
  output: "server",
  adapter: vercel({
    speedInsights: true
  }),
  vite: {
    // vite.config.js
    plugins: [qwikReact()]
  }
});
