import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./_publications" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string().optional(),
    paperurl: z.string().optional(),
    citation: z.string().optional(),
    excerpt: z.string().optional(),
    featured: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./_talks" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string().optional(),
    location: z.string().optional(),
    type: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./_portfolio" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    date: z.coerce.date().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./_posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { publications, talks, portfolio, posts };
