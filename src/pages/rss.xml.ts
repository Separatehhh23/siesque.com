import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { BlogEntry } from "../types";

export async function GET() {
  const blog: BlogEntry[] = await getCollection("blog");
  return rss({
    title: "My blog",
    description: "A blog about tech and stuff",
    site: "https://www.pylinekr.com",
    items: blog.map((post: BlogEntry) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      // Compute RSS link from post `slug`
      link: `/blog/${post.slug}/`,
    })),
  });
}
