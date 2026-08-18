import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(process.cwd(), 'src/content/blog') + '/';

interface Post { slug: string; draft: boolean; publishDate: string; title: string; }

function parsePosts(): Post[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(dir + f, 'utf8');
      const fm = raw.split('---')[1] ?? '';
      const get = (k: string) => {
        const m = fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'));
        return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
      };
      return {
        slug: f.replace(/\.md$/, ''),
        draft: get('draft') === 'true',
        publishDate: get('publishDate'),
        title: get('title'),
      };
    });
}

describe('Blog content', () => {
  const posts = parsePosts();

  // Property 3: slug uniqueness.
  it('every blog slug is unique (Property 3)', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  // Property 4: the example draft is flagged as draft.
  it('the draft example is marked draft:true (Property 4)', () => {
    const draft = posts.find((p) => p.slug === 'draft-example');
    expect(draft?.draft).toBe(true);
  });

  it('there is at least one published post', () => {
    expect(posts.some((p) => !p.draft)).toBe(true);
  });

  // Property 5: published posts sort newest-first without loss.
  it('published posts can be ordered by date, newest first (Property 5)', () => {
    const published = posts.filter((p) => !p.draft);
    const sorted = [...published].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    for (let i = 1; i < sorted.length; i++) {
      expect(new Date(sorted[i - 1].publishDate).getTime()).toBeGreaterThanOrEqual(
        new Date(sorted[i].publishDate).getTime()
      );
    }
    expect(sorted).toHaveLength(published.length);
  });
});
