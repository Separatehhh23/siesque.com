// @ts-expect-error: Module exists
import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
  }),
});
const artCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    author: z.string().default("Un otro"),
    tags: z.array(z.string()).optional(),
    score: z.number().min(0).max(100),
    publishDate: z.string(z.date().default(new Date().toISOString())),
    image: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  art: artCollection,
};
