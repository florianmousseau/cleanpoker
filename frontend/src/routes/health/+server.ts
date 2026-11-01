/**
 * The site's probe: what a visitor's browser would meet, read now. The rules
 * live in `#lib/sonde.ts`; this file only hands it the platform's readers.
 * A burst of calls shares one probe for thirty seconds (`#lib/sonde-partagee.ts`).
 */
import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$app/env/public';
import { sonder, type Rapport } from '#lib/sonde.ts';
import { lecteursDeLaPlateforme, reponseDeSonde } from '#lib/sonde-plateforme.ts';
import { sondePartagee } from '#lib/sonde-partagee.ts';

// Prerendered, the probe would serve a verdict frozen at build time.
export const prerender = false;

const partagee = sondePartagee<Rapport>(30_000);

export const GET: RequestHandler = async ({ fetch: fetchInterne, platform, url }) => {
	const lecteurs = () =>
		lecteursDeLaPlateforme({
			fetchInterne,
			assets: platform?.env?.ASSETS,
			url,
			serveur: PUBLIC_API_URL,
			commit: __COMMIT__
		});
	return reponseDeSonde(await partagee(() => sonder(lecteurs())));
};
