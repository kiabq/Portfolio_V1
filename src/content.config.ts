// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

// 4. Define a `loader` and `schema` for each collection
const writings = defineCollection({
  loader: glob({ base: "./src/content/writings", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    updated_at: z.optional(z.string()),
    tags: z.array(z.string()),
    description: z.string(),
    images: z.array(z.string()).optional(),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { writings };
