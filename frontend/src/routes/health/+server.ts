/**
 * The site's probe: what a visitor's browser would meet, read now. The rules
 * live in `$lib/sonde`; this file only hands it the platform's readers.
 */
import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import { sonder, teteDuFlux, type Tete } from '$lib/sonde';

// Prerendered, the probe would serve a verdict frozen at build time.
export const prerender = false;

const FLUX_MAIN = 'https://github.com/florianmousseau/cleanpoker/commits/main.atom';
const MEMO_TETE = 10 * 60 * 1000;
const DELAI = 10_000;

// The pages are asked for under a name the visitor counter refuses to count.
const AGENT = 'cleanpoker-probe';

let teteLue: { a: number; tete: Promise<Tete> } | null = null;

function lireTete(maintenant: number): Promise<Tete> {
	if (!teteLue || maintenant - teteLue.a >= MEMO_TETE) {
		const tete = fetch(FLUX_MAIN, { headers: { 'user-agent': AGENT }, signal: AbortSignal.timeout(DELAI) }).then(
			async (r) => {
				if (r.status !== 200) throw new Error(`HTTP ${r.status} : ${FLUX_MAIN}`);
				return teteDuFlux(await r.text());
			}
		);
		teteLue = { a: maintenant, tete };
	}
	return teteLue.tete;
}

export const GET: RequestHandler = async ({ fetch: fetchInterne, platform, url }) => {
	const assets = platform?.env?.ASSETS;
	const maintenant = Date.now();
	const rapport = await sonder({
		page: (chemin) => fetchInterne(chemin, { headers: { 'user-agent': AGENT } }),
		fichier: (chemin) =>
			assets ? assets.fetch(new URL(chemin, url)) : fetchInterne(chemin, { headers: { 'user-agent': AGENT } }),
		reseau: (cible) => fetch(cible, { headers: { 'user-agent': AGENT }, signal: AbortSignal.timeout(DELAI) }),
		tete: () => lireTete(maintenant),
		commit: __COMMIT__,
		serveur: PUBLIC_API_URL,
		maintenant
	});
	return new Response(JSON.stringify(rapport, null, '\t'), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'no-store',
			'x-robots-tag': 'noindex'
		}
	});
};
