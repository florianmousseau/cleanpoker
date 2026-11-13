import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * SvelteKit keeps the page component when only `params.id` changes, and
 * `useRoom` opens its socket once: a client navigation from room A to room B
 * kept voting in A under B's title. The room layout rebuilds the page per id.
 */
describe('the room page', () => {
  it('is rebuilt when the room id changes', () => {
    const layout = readFileSync('src/routes/[id]/+layout.svelte', 'utf-8');
    expect(layout).toMatch(/\{#key page\.params\.id\}\s*\{@render children\(\)\}\s*\{\/key\}/);
  });
});
