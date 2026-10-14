/**
 * The readers the probe gets in production: pages rendered by this worker,
 * built files through the Pages binding, the room server over the network.
 * Shared by `GET /health` and the outage drill, so the drill cuts the very
 * probe visitors' health is read with.
 */
import type { Lecteurs } from './sonde.ts';

const DELAI = 10_000;

// The pages are asked for under a name the visitor counter refuses to count.
const AGENT = 'cleanpoker-probe';

interface Contexte {
	fetchInterne: typeof fetch;
	assets?: { fetch: (url: URL | string) => Promise<Response> };
	url: URL;
	serveur: string;
	commit: string;
}

export function lecteursDeLaPlateforme({ fetchInterne, assets, url, serveur, commit }: Contexte): Lecteurs {
	return {
		page: (chemin) => fetchInterne(chemin, { headers: { 'user-agent': AGENT } }),
		fichier: (chemin) =>
			assets ? assets.fetch(new URL(chemin, url)) : fetchInterne(chemin, { headers: { 'user-agent': AGENT } }),
		reseau: (cible) => fetch(cible, { headers: { 'user-agent': AGENT }, signal: AbortSignal.timeout(DELAI) }),
		commit,
		serveur,
		maintenant: Date.now()
	};
}

/** A probe answer: JSON, never cached, never indexed. */
export function reponseDeSonde(corps: unknown, status = 200): Response {
	return new Response(JSON.stringify(corps, null, '\t'), {
		status,
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'no-store',
			'x-robots-tag': 'noindex'
		}
	});
}
