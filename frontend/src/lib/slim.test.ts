import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DE, EN, ES, FR, PT } from './i18n/all';

/*
 * What a visitor downloads. The home page used to import the five room
 * dictionaries for three labels, and the room carried its options, its story
 * list and the local AI for people who only vote. These tests hold the split:
 * a static import in the wrong place puts the bytes back for everyone, and
 * nothing else would say so.
 */

function* sources(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* sources(path);
    else if (/\.(svelte|ts)$/.test(name) && !/\.test\.ts$/.test(name)) yield path;
  }
}

const ROOM = 'src/routes/[id]/+page.svelte';
const DICTIONARY = /from\s+['"][^'"]*i18n\/(fr|en|es|de|pt|all)(\.ts)?['"]/;

describe('the room dictionaries', () => {
  it('are imported by the room page and by nothing else', () => {
    const importers = [...sources('src')].filter(
      (path) => !path.startsWith(join('src', 'lib', 'i18n')) && DICTIONARY.test(readFileSync(path, 'utf8'))
    );
    expect(importers).toEqual([ROOM]);
  });

  it('proves the detector on the import the home page used to carry', () => {
    expect(DICTIONARY.test("import { FR } from '#lib/i18n/fr.ts';")).toBe(true);
    expect(DICTIONARY.test("import { FR, EN } from './i18n/all';")).toBe(true);
    expect(DICTIONARY.test("import type { Translation } from '#lib/i18n.ts';")).toBe(false);
  });

  it('say the same things in the five languages', () => {
    const shape = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        typeof v === 'object' ? shape(v as object).map((s) => `${k}.${s}`) : [`${k}:${typeof v}`]
      );
    for (const t of [FR, ES, DE, PT]) expect(shape(t)).toEqual(shape(EN));
  });
});

describe('the home page', () => {
  const home = readFileSync('src/lib/HomepageTemplate.svelte', 'utf8');

  it('takes the team labels from its route, in the five languages', () => {
    expect(home).not.toMatch(/i18n/);
    for (const route of ['src/routes/+page.svelte', ...['fr', 'es', 'de', 'pt'].map((l) => `src/routes/${l}/+page.svelte`)]) {
      const page = readFileSync(route, 'utf8');
      for (const prop of ['teamSummary', 'teamNameLabel', 'teamColorLabel']) {
        expect(page, `${route} ${prop}`).toMatch(new RegExp(`\\b${prop}="[^"]+"`));
      }
    }
  });
});

describe('what the room fetches only when it is used', () => {
  const page = readFileSync(ROOM, 'utf8');

  it.each(['RoomOptions', 'StoriesPanel', 'LocalAi'])('%s is never a static import of the room', (name) => {
    expect(page).toContain(`import('#lib/${name}.svelte')`);
    expect(page).not.toMatch(new RegExp(`^\\s*import ${name} from`, 'm'));
  });

  it('keeps the heavy parts of the options out of the page', () => {
    for (const name of ['QrCode', 'invite-ai', 'log-time', 'ia-locale']) {
      expect(page, name).not.toContain(`#lib/${name}`);
    }
  });
});
