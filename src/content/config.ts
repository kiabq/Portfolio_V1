import { z, defineCollection } from 'astro:content';

const writingsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        date: z.string(),
        updated_at: z.optional(z.string()),
        tags: z.array(z.string()),
        description: z.string(),
        images: z.array(z.string()).optional(),
    })
});

export const collections = {
  'writings': writingsCollection,
};