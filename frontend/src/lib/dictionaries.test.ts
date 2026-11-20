import { describe, expect, it } from 'vitest';
import { loadDictionary, loadExtras } from './dictionaries';
import { DE, EN, ES, FR, PT } from './i18n/all';

const WHOLE = { fr: FR, en: EN, es: ES, de: DE, pt: PT } as const;
const LANGS = ['fr', 'en', 'es', 'de', 'pt'] as const;

describe('the dictionaries, one language at a time', () => {
  it.each(LANGS)('loads what the room says in %s', async (l) => {
    const words = await loadDictionary(l);
    expect(words.join.title).toBe(WHOLE[l].join.title);
    expect(words.results.copy).toBe(WHOLE[l].results.copy);
  });

  it.each(LANGS)('loads what the options say in %s', async (l) => {
    const extras = await loadExtras(l);
    expect(extras.qr.show).toBe(WHOLE[l].qr.show);
    expect(extras.activity.joined).toBe(WHOLE[l].activity.joined);
    expect(extras.results.creditOption).toBe(WHOLE[l].results.creditOption);
  });

  it('gives five different languages, never one twice', async () => {
    const titles = await Promise.all(LANGS.map(async (l) => (await loadDictionary(l)).join.title));
    expect(new Set(titles).size).toBe(5);
    expect((await loadDictionary('fr')).join.title).toBe('Rejoindre la salle');
    expect((await loadDictionary('de')).join.title).toBe('Dem Raum beitreten');
  });

  it('keeps the room words and the option words apart, with the same keys in every language', async () => {
    const shape = (o: object): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        typeof v === 'object' ? shape(v as object).map((s) => `${k}.${s}`) : [`${k}:${typeof v}`]
      );
    const [words, extras] = [await loadDictionary('en'), await loadExtras('en')];
    const shared = shape(words).filter((key) => shape(extras).includes(key));
    expect(shared).toEqual([]);
    for (const l of LANGS) {
      expect(shape(await loadDictionary(l)), l).toEqual(shape(words));
      expect(shape(await loadExtras(l)), l).toEqual(shape(extras));
    }
  });
});
