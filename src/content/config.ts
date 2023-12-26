import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
