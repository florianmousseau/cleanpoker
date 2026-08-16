import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * Three lists are built from values a player can repeat: the cards typed on the
 * home page, the cards a room was created with, and the activity log, whose
 * timestamps are cut to the second. Keying any of them by content lets two rows
 * share a key, and Svelte answers each_key_duplicate by aborting the render -
 * the room then never leaves "Connecting..." for anyone arriving afterwards.
 * These lists must therefore be keyed by position.
 */
const KEYED_BY_POSITION = [
  { file: 'src/lib/HomepageTemplate.svelte', each: 'cards as card, i (i)' },
  { file: 'src/routes/[id]/+page.svelte', each: 'room.roomState.cards as card, i (i)' },
  { file: 'src/routes/[id]/+page.svelte', each: '[...room.roomState.activity].reverse() as entry, i (i)' },
];

describe('lists built from repeatable values', () => {
  for (const { file, each } of KEYED_BY_POSITION) {
    it(`${file} keys "${each.split(' as ')[0]}" by position`, () => {
      expect(readFileSync(file, 'utf-8')).toContain(`{#each ${each}}`);
    });
  }
});
