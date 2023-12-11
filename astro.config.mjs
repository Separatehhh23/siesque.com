import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: 'https://www.pylinker.com',
  integrations: [mdx(), sitemap(), tailwind(), vue()],
  output: "hybrid",
  adapter: vercel()
});
