import { getCollection, getEntry } from 'astro:content';

/** Sort helper for collections that expose a numeric `order` field. */
export function byOrder<T extends { data: { order: number } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

/** All published (non-draft) blog posts, newest first. */
export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}

/** Load every singleton + ordered collection the marketing site needs. */
export async function loadSiteContent() {
  const [
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
  ] = await Promise.all([
    getEntry('hero', 'main'),
    getEntry('contact', 'main'),
    getEntry('whyus', 'main'),
    getEntry('seo', 'main'),
    getEntry('process', 'main'),
    getEntry('marquee', 'main'),
    getCollection('services'),
    getCollection('packages'),
    getCollection('testimonials'),
    getCollection('portfolio'),
    getCollection('social'),
  ]);

  return {
    hero: hero!.data,
    contact: contact!.data,
    whyus: whyus!.data,
    seo: seo!.data,
    process: process!.data,
    marquee: marquee!.data,
    services: byOrder(services).map((e) => e.data),
    packages: byOrder(packages).map((e) => e.data),
    testimonials: byOrder(testimonials).map((e) => e.data),
    portfolio: byOrder(portfolio).map((e) => e.data),
    social: byOrder(social).map((e) => e.data),
  };
}
