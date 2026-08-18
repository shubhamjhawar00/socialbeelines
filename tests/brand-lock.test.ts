import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const tokens = read('src/styles/tokens.css');
const cmsConfig = read('public/admin/config.yml');
const globalCss = read('src/styles/global.css');

// Property 1: Brand color lock.
describe('Property 1 — brand color lock', () => {
  it('tokens.css contains the exact locked brand hex values', () => {
    expect(tokens).toContain('--blue: #096ac7');
    expect(tokens).toContain('--cream: #f5f6ec');
  });

  it('the only literal brand hex colors live in tokens.css, not scattered in global.css', () => {
    expect(globalCss).not.toMatch(/#096ac7/i);
    expect(globalCss).not.toMatch(/#f5f6ec/i);
  });

  it('the CMS exposes no color / logo / theme editing widgets or fields', () => {
    // Ignore comment lines; only real config directives matter.
    const directives = cmsConfig
      .split('\n')
      .filter((line) => !line.trim().startsWith('#'))
      .join('\n')
      .toLowerCase();
    expect(directives).not.toContain('widget: color');
    expect(directives).not.toMatch(/name:\s*["']?(color|logo|theme)\b/);
  });
});
