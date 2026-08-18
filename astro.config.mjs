import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL is used for sitemap + canonical/OG absolute URLs.
// Override in Netlify via the URL env var / site settings if needed.
const SITE = process.env.SITE_URL || 'https://social-beelines.netlify.app';

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      // Drafts are never emitted as pages, so they are naturally excluded.
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
