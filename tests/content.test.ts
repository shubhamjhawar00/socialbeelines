import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const readJson = (p: string) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const listJson = (dir: string) =>
  readdirSync(join(root, dir)).filter((f) => f.endsWith('.json')).map((f) => readJson(dir + f));

describe('Seeded marketing content', () => {
  it('lists all ten real services (Req 1.3)', () => {
    const services = listJson('src/content/services/');
    expect(services).toHaveLength(10);
    const names = services.map((s) => s.name);
    for (const expected of [
      'Graphic Design',
      'Social Media Management',
      'Reels & Video Editing',
      'Branding',
      'Photography & Videography',
      'Meta Ads',
      'SEO & Google Business Profile',
      'Website Management',
      'WhatsApp Business Management',
      'Sales Calling & Telecalling',
    ]) {
      expect(names).toContain(expected);
    }
  });

  it('has the four packages with correct starting prices (Req 1.5)', () => {
    const pkgs = listJson('src/content/packages/');
    const byName = Object.fromEntries(pkgs.map((p) => [p.name, p]));
    expect(byName['Basic'].priceLabel).toBe('₹9,000');
    expect(byName['Standard'].priceLabel).toBe('₹13,000');
    expect(byName['Premium'].priceLabel).toBe('₹17,000');
    expect(byName['Customized'].isCustom).toBe(true);
  });

  it('shows the real contact details (Req 1.7)', () => {
    const contact = readJson('src/content/contact/main.json');
    expect(contact.email).toBe('socialbeelines@gmail.com');
    expect(contact.phone).toBe('8095756119');
  });

  // Property 2 (representative): required singleton fields are non-empty.
  it('required hero fields are present and non-empty (Property 2)', () => {
    const hero = readJson('src/content/hero/main.json');
    expect(hero.eyebrow.length).toBeGreaterThan(0);
    expect(hero.description.length).toBeGreaterThan(0);
    expect(Array.isArray(hero.titleLines)).toBe(true);
    expect(hero.titleLines.length).toBeGreaterThan(0);
  });
});

// Property 8: no guarantee / promise-of-results copy.
describe('Property 8 — no guaranteed-results claims', () => {
  it('marketing copy avoids guarantee language', () => {
    const files = [
      'src/content/hero/main.json',
      'src/content/whyus/main.json',
      'src/content/process/main.json',
      'src/content/contact/main.json',
      ...readdirSync(join(root, 'src/content/packages')).map((f) => 'src/content/packages/' + f),
      ...readdirSync(join(root, 'src/content/services')).map((f) => 'src/content/services/' + f),
    ];
    const banned = /\b(guarantee|guaranteed|guarantees)\b/i;
    for (const f of files) {
      const text = readFileSync(join(root, f), 'utf8');
      expect(banned.test(text), `guarantee language found in ${f}`).toBe(false);
    }
  });
});
