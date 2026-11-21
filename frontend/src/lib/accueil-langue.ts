/**
 * The bare home `/` sends a visitor to the home in their language: the one
 * they chose (the `lang` cookie), else the first of their browser that the
 * site speaks. Only `/`, which `hreflang="x-default"` already names as the
 * page that picks a language: every other address is served as asked, so a
 * shared link or a guide found in a search never moves. Crawlers send no
 * Accept-Language and stay on English.
 */
const LANGUES = new Set(['en', 'fr', 'es', 'de', 'pt']);

/** The languages of an Accept-Language header, best first, without the refused ones. */
export function languesAcceptees(entete: string | null): string[] {
	if (!entete) return [];
	return entete
		.split(',')
		.map((partie, rang) => {
			const [etiquette, ...params] = partie.trim().split(';');
			const q = Number(/^q=([\d.]+)$/.exec(params.find((p) => p.trim().startsWith('q='))?.trim() ?? '')?.[1] ?? 1);
			return { langue: etiquette.trim().toLowerCase().split('-')[0], q: Number.isNaN(q) ? 0 : q, rang };
		})
		.filter(({ langue, q }) => langue && q > 0)
		.sort((a, b) => b.q - a.q || a.rang - b.rang)
		.map(({ langue }) => langue);
}

/** Where `/` sends this visitor, or null to serve the English home. */
export function accueilDeLaLangue(pathname: string, choisie: string | undefined, entete: string | null): string | null {
	if (pathname !== '/') return null;
	const voulue = choisie && LANGUES.has(choisie) ? choisie : languesAcceptees(entete).find((l) => LANGUES.has(l));
	return voulue && voulue !== 'en' ? `/${voulue}` : null;
}
