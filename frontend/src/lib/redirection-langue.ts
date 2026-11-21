import type { Lang } from '#lib/lang.svelte.ts';

/** Every home of the site, by language: English lives at the root. */
const ACCUEILS: Readonly<Record<Lang, string>> = { en: '/', fr: '/fr', es: '/es', de: '/de', pt: '/pt' };

/** What a cache must key the root on, since its answer depends on both. */
export const VARY_RACINE = 'Accept-Language, Cookie';

const LANGS = new Set<string>(Object.keys(ACCUEILS));

function langueChoisie(cookie: string): Lang | null {
	const chosen = /(?:^|;\s*)lang=([^;]+)/.exec(cookie)?.[1];
	return chosen !== undefined && LANGS.has(chosen) ? (chosen as Lang) : null;
}

/** The language of the header the site speaks with the highest weight, if any. */
export function langueAcceptee(header: string): Lang | null {
	const tags = header
		.split(',')
		.map((part, rang) => {
			const [tag, ...params] = part.trim().toLowerCase().split(';');
			const q = params.map((p) => /^\s*q=([\d.]+)\s*$/.exec(p)?.[1]).find(Boolean);
			return { base: tag.split('-')[0], poids: q === undefined ? 1 : Number(q), rang };
		})
		.filter((t) => t.poids > 0 && LANGS.has(t.base))
		.sort((a, b) => b.poids - a.poids || a.rang - b.rang);
	return (tags[0]?.base as Lang | undefined) ?? null;
}

/**
 * The localized home a visitor of the root is sent to, or null to serve the
 * English one. Only `/` redirects, as the x-default of the homes: every other
 * address serves what was asked, so a shared link and a crawler land on it.
 * A language chosen on the site (the `lang` cookie) wins over the browser one,
 * and a request without Accept-Language, as Googlebot sends, stays in English.
 */
export function accueilDuVisiteur(pathname: string, cookie: string, acceptLanguage: string): string | null {
	if (pathname !== '/') return null;
	const voulue = langueChoisie(cookie) ?? langueAcceptee(acceptLanguage);
	return voulue === null || voulue === 'en' ? null : ACCUEILS[voulue];
}
