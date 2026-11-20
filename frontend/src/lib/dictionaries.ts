import type { Extras, Translation } from '#lib/i18n.ts';
import type { Lang } from '#lib/lang.svelte.ts';

/*
 * One module per language, fetched on demand: a visitor downloads the language
 * they read, not the five. Nothing may import a dictionary statically, or it
 * would travel with every room again (slim.test.ts holds it).
 */
const WORDS: Record<Lang, () => Promise<Translation>> = {
  fr: () => import('#lib/i18n/fr.ts').then((m) => m.FR),
  en: () => import('#lib/i18n/en.ts').then((m) => m.EN),
  es: () => import('#lib/i18n/es.ts').then((m) => m.ES),
  de: () => import('#lib/i18n/de.ts').then((m) => m.DE),
  pt: () => import('#lib/i18n/pt.ts').then((m) => m.PT),
};

const EXTRAS: Record<Lang, () => Promise<Extras>> = {
  fr: () => import('#lib/i18n/extras/fr.ts').then((m) => m.FR),
  en: () => import('#lib/i18n/extras/en.ts').then((m) => m.EN),
  es: () => import('#lib/i18n/extras/es.ts').then((m) => m.ES),
  de: () => import('#lib/i18n/extras/de.ts').then((m) => m.DE),
  pt: () => import('#lib/i18n/extras/pt.ts').then((m) => m.PT),
};

/** What the room says in one language. */
export function loadDictionary(l: Lang): Promise<Translation> {
  return WORDS[l]();
}

/** What the options, the QR code and the local AI say in one language. */
export function loadExtras(l: Lang): Promise<Extras> {
  return EXTRAS[l]();
}
