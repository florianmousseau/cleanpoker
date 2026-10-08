/**
 * The site's probe: what a visitor's browser would meet, read now. The rules
 * live in `#lib/sonde.ts`; this file only hands it the platform's readers.
 */
import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$app/env/public';
import { sonder } from '#lib/sonde.ts';

// Prerendered, the probe would serve a verdict frozen at build time.
export const prerender = false;

const DELAI = 10_000;

// The pages are asked for under a name the visitor counter refuses to count.
const AGENT = 'cleanpoker-probe';

export const GET: RequestHandler = async ({ fetch: fetchInterne, platform, url }) => {
	const assets = platform?.env?.ASSETS;
	const maintenant = Date.now();
	const rapport = await sonder({
		page: (chemin) => fetchInterne(chemin, { headers: { 'user-agent': AGENT } }),
		fichier: (chemin) =>
			assets ? assets.fetch(new URL(chemin, url)) : fetchInterne(chemin, { headers: { 'user-agent': AGENT } }),
		reseau: (cible) => fetch(cible, { headers: { 'user-agent': AGENT }, signal: AbortSignal.timeout(DELAI) }),
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
