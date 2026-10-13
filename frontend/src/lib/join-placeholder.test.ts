import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DE, EN, ES, FR, PT } from './i18n';

describe('join form placeholder', () => {
  it('speaks the language of the page', () => {
    // The room page hardcoded "ex. Amandine", a French example, in all five languages.
    const placeholders = [FR, EN, ES, DE, PT].map((t) => t.join.placeholder);
    expect(placeholders.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
    expect(new Set(placeholders).size).toBe(5);
  });

  it('is read from the dictionary, not written in the room page', () => {
    const page = readFileSync(new URL('../routes/[id]/+page.svelte', import.meta.url), 'utf8');
    expect(page).toContain('placeholder={T.join.placeholder}');
  });
});
