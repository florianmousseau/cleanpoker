import type { Lang } from '#lib/lang.svelte.ts';

/**
 * The average as the reader's language writes a decimal.
 * The room server sends "5.5" to every language; French, Spanish, German and
 * Portuguese read "5,5". Min and max stay as sent: they are card labels the
 * team typed itself.
 */
export function moyenneAffichee(avg: string, langue: Lang): string {
  return langue === 'en' ? avg : avg.replace('.', ',');
}
