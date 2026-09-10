import { defineCollection, z } from 'astro:content';

/* ------------------------------------------------------------------
   Content_Model — the single source of structured content.
   All editable content is defined here and validated at build time.
   Presentation lives in components; this file holds data shape only.
   ------------------------------------------------------------------ */

// Singleton-style "data" collections (one entry each, e.g. hero.json).
const hero = defineCollection({
  type: 'data',
  schema: z.object({
    eyebrow: z.string(),
    // Each line has a list of words; a word may be flagged accent for styling.
    titleLines: z.array(
      z.object({
        words: z.array(z.object({ text: z.string(), accent: z.boolean().default(false) })),
      })
    ),
    description: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    heroImage: z.string().optional(),
  }),
});

const contact = defineCollection({
  type: 'data',
  schema: z.object({
    email: z.string().email(),
    phone: z.string(),
    phoneHref: z.string(),
    ctaKicker: z.string(),
    ctaHeadline: z.string(),
    ctaHeadlineEm: z.string().optional(),
    footerBlurb: z.string(),
  }),
});

const whyus = defineCollection({
  type: 'data',
  schema: z.object({
    kicker: z.string(),
    heading: z.string(),
    body: z.string(),
    stats: z.array(z.object({ num: z.string(), label: z.string() })).default([]),
    panelTop: z.string(),
    panelHeadline: z.string(),
    panelNote: z.string(),
    panelImage: z.string().optional(),
  }),
});

const seo = defineCollection({
  type: 'data',
  schema: z.object({
    siteTitle: z.string(),
    titleTemplate: z.string().default('%s — Social Beelines'),
    defaultDescription: z.string(),
    ogImage: z.string().optional(),
    analyticsId: z.string().optional(),
  }),
});

const process = defineCollection({
  type: 'data',
  schema: z.object({
    kicker: z.string(),
    heading: z.string(),
    note: z.string(),
    steps: z.array(z.object({ num: z.string(), title: z.string(), body: z.string() })),
  }),
});

const marquee = defineCollection({
  type: 'data',
  schema: z.object({ items: z.array(z.string()) }),
});

// Repeatable collections.
const services = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    tag: z.string(),
    description: z.string(),
    bullets: z.array(z.string()).default([]),
  }),
});

const packages = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    priceLabel: z.string(), // e.g. "₹9,000"  (empty for custom)
    period: z.string().default('month'),
    isCustom: z.boolean().default(false),
    featured: z.boolean().default(false),
    features: z.array(z.string()).default([]),
    ctaLabel: z.string().default('Enquire'),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    quote: z.string(),
    personName: z.string(),
    personRole: z.string(),
    rating: z.number().min(0).max(5).default(5),
    source: z.string().default('Google Review'),
    avatarImage: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    category: z.string(),
    result: z.string(),
    coverImage: z.string().optional(),
    link: z.string().optional(),
  }),
});

const social = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    platform: z.string(),
    label: z.string(),
    url: z.string(),
  }),
});

// Blog — markdown body + validated frontmatter.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  hero,
  contact,
  whyus,
  seo,
  process,
  marquee,
  services,
  packages,
  testimonials,
  portfolio,
  social,
  blog,
};
