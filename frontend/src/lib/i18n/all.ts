// The five dictionaries whole and side by side, for the tests that compare
// them. Never imported by a page: it would ship every language to everyone.
import type { Extras, Translation } from '#lib/i18n.ts';
import { FR as FR_WORDS } from '#lib/i18n/fr.ts';
import { EN as EN_WORDS } from '#lib/i18n/en.ts';
import { ES as ES_WORDS } from '#lib/i18n/es.ts';
import { DE as DE_WORDS } from '#lib/i18n/de.ts';
import { PT as PT_WORDS } from '#lib/i18n/pt.ts';
import { FR as FR_EXTRAS } from '#lib/i18n/extras/fr.ts';
import { EN as EN_EXTRAS } from '#lib/i18n/extras/en.ts';
import { ES as ES_EXTRAS } from '#lib/i18n/extras/es.ts';
import { DE as DE_EXTRAS } from '#lib/i18n/extras/de.ts';
import { PT as PT_EXTRAS } from '#lib/i18n/extras/pt.ts';

type Whole = Translation & Extras;

// Some blocks are split between the two files: merged one level down.
function whole(words: Translation, extras: Extras): Whole {
  const merged: Record<string, unknown> = { ...words };
  for (const [key, value] of Object.entries(extras)) {
    const mine = merged[key];
    merged[key] = typeof mine === 'object' && mine !== null ? { ...mine, ...value } : value;
  }
  return merged as unknown as Whole;
}

export const FR = whole(FR_WORDS, FR_EXTRAS);
export const EN = whole(EN_WORDS, EN_EXTRAS);
export const ES = whole(ES_WORDS, ES_EXTRAS);
export const DE = whole(DE_WORDS, DE_EXTRAS);
export const PT = whole(PT_WORDS, PT_EXTRAS);
