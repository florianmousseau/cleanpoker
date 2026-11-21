import { langueChoisie, langueDuNavigateur, type Lang } from '#lib/lang.svelte.ts';

export interface Proposition {
	lang: Lang;
	href: string;
}

/**
 * The version of this page to offer the visitor, or null. Never a redirect:
 * a crawler, a shared link and a visitor who reads several languages must all
 * land on the page they asked for. The chosen language wins over the browser
 * one, and only a page that exists in that language is offered.
 */
export function langueProposee(
	cookie: string,
	preferred: readonly string[],
	page: Lang,
	versions: Readonly<Partial<Record<Lang, string>>>,
): Proposition | null {
	const voulue = langueChoisie(cookie) ?? langueDuNavigateur(preferred);
	if (voulue === null || voulue === page) return null;
	const href = versions[voulue];
	return href ? { lang: voulue, href } : null;
}

/** Every home of the site, by language: English lives at the root. */
export const ACCUEILS: Readonly<Record<Lang, string>> = { en: '/', fr: '/fr', es: '/es', de: '/de', pt: '/pt' };

/** Written in the offered language: it is the one the visitor reads. */
export const BANDEAU: Record<Lang, { texte: string; lien: string; fermer: string }> = {
	fr: { texte: 'Cette page existe en français.', lien: 'Lire en français', fermer: 'Rester sur cette version' },
	en: { texte: 'This page is available in English.', lien: 'Read in English', fermer: 'Stay on this version' },
	es: { texte: 'Esta página está disponible en español.', lien: 'Leer en español', fermer: 'Quedarse en esta versión' },
	de: { texte: 'Diese Seite gibt es auch auf Deutsch.', lien: 'Auf Deutsch lesen', fermer: 'Bei dieser Version bleiben' },
	pt: { texte: 'Esta página está disponível em português.', lien: 'Ler em português', fermer: 'Ficar nesta versão' },
};
