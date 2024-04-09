import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    description: z.string(),
    publishDate: z.date(),
  }),
});

const riliDocsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    otherScore: z.number().min(0).max(100),
  }),
});

export const collections = {
  blog: blogCollection,
  riliDocs: riliDocsCollection,
};
