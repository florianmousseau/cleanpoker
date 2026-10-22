import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('create button before hydration', () => {
  it('stays disabled until the page has its handler', () => {
    // A click before hydration submitted the bare form and reloaded `/?`
    // without a room: the button must not be live in the server render.
    const page = readFileSync(new URL('./HomepageTemplate.svelte', import.meta.url), 'utf8');
    expect(page).toMatch(/let ready = \$state\(false\)/);
    expect(page).toContain('disabled={!ready || creating || !isValid}');
  });
});
