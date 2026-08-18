import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const form = readFileSync(join(root, 'src/components/LeadForm.astro'), 'utf8');
const interactions = readFileSync(join(root, 'src/components/SiteInteractions.astro'), 'utf8');

// Property 7: lead-form field integrity.
describe('Property 7 — lead-form field integrity', () => {
  it('restricts preferred duration to Monthly / Quarterly / 6 Months (Req 5.6)', () => {
    expect(form).toContain("['Monthly', 'Quarterly', '6 Months']");
    // The validator enforces the same allow-list.
    expect(interactions).toContain("['Monthly', 'Quarterly', '6 Months']");
  });

  it('captures the required lead fields (Req 5.1)', () => {
    for (const name of [
      'brand_name', 'industry', 'existing_profiles', 'services_needed',
      'challenges', 'goals', 'content_needs', 'photo_video_needs',
      'sales_calling_needs', 'preferred_duration', 'budget',
      'preferred_followup', 'email', 'phone',
    ]) {
      expect(form, `missing field ${name}`).toContain(`name="${name}"`);
    }
  });

  it('applies spam protection (honeypot) (Req 5.4)', () => {
    expect(form).toContain('netlify-honeypot="bot-field"');
    expect(form).toContain('name="bot-field"');
  });

  it('marks key fields as required for validation (Req 5.3)', () => {
    expect(form).toMatch(/name="brand_name"[^>]*required/);
    expect(form).toMatch(/name="services_needed"[^>]*required/);
    expect(form).toMatch(/name="email"[^>]*type="email"[^>]*required/);
  });
});
