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
const STATIC_DICTIONARY = /from\s+['"][^'"]*i18n\/(extras\/)?(fr|en|es|de|pt|all)(\.ts)?['"]/;

describe('the room dictionaries', () => {
  it('are never a static import of anything a visitor downloads', () => {
    const importers = [...sources('src')].filter(
      (path) => !path.startsWith(join('src', 'lib', 'i18n')) && STATIC_DICTIONARY.test(readFileSync(path, 'utf8'))
    );
    expect(importers).toEqual([]);
  });

  it('proves the detector on the import the home page used to carry', () => {
    expect(STATIC_DICTIONARY.test("import { FR } from '#lib/i18n/fr.ts';")).toBe(true);
    expect(STATIC_DICTIONARY.test("import { DE } from '#lib/i18n/extras/de.ts';")).toBe(true);
    expect(STATIC_DICTIONARY.test("import { FR, EN } from './i18n/all';")).toBe(true);
    expect(STATIC_DICTIONARY.test("import type { Translation } from '#lib/i18n.ts';")).toBe(false);
    expect(STATIC_DICTIONARY.test("fr: () => import('#lib/i18n/fr.ts').then((m) => m.FR),")).toBe(false);
  });

  it('are fetched one language at a time, the room words apart from the option words', () => {
    const loaders = readFileSync('src/lib/dictionaries.ts', 'utf8');
    for (const l of ['fr', 'en', 'es', 'de', 'pt']) {
      expect(loaders, l).toContain(`import('#lib/i18n/${l}.ts')`);
      expect(loaders, l).toContain(`import('#lib/i18n/extras/${l}.ts')`);
    }
  });

  it('are awaited before the room shows, on the server and before hydration', () => {
    const load = readFileSync('src/routes/[id]/+page.ts', 'utf8');
    expect(load).toContain('await loadDictionary(lang.current)');
    const page = readFileSync(ROOM, 'utf8');
    expect(page).toContain('roomWords(() => data.T)');
    expect(page).toContain('onLangChange={(l) => words.change(l as Lang)}');
  });

  it('say the same things in the five languages', () => {
    const shape = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        typeof v === 'object' ? shape(v as object).map((s) => `${k}.${s}`) : [`${k}:${typeof v}`]
      );
    for (const t of [FR, ES, DE, PT]) expect(shape(t).sort()).toEqual(shape(EN).sort());
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

describe('copy the result', () => {
  const page = readFileSync(ROOM, 'utf8');

  it('is one button in the results, and the option waits in the options', () => {
    const results = page.slice(page.indexOf('data-testid="results-data"'), page.indexOf('<p class="no-results">'));
    expect(results.split('data-testid="copy-result"')).toHaveLength(2);
    expect(page.split('data-testid="copy-result"')).toHaveLength(2);
    expect(page).not.toContain('data-testid="credit-option"');
    expect(readFileSync('src/lib/RoomOptions.svelte', 'utf8').split('data-testid="credit-option"')).toHaveLength(2);
  });

  it('leaves the CSV as it was: the line goes to the Markdown only', () => {
    const panel = readFileSync('src/lib/StoriesPanel.svelte', 'utf8');
    expect(panel).toContain('withCredit(storiesMarkdown(stories, header), credit.line(T.results.credit))');
    expect(panel).toContain("storiesCsv(stories, header)], { type: 'text/csv;charset=utf-8' }");
  });
});
