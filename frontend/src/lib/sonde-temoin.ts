/**
 * A healthy site as the probe reads it, for the tests of the probe and of the
 * outage drill: two pages with the room form, five built files, a green room
 * server that publishes the head of main.
 */
import type { Lecteurs } from './sonde';

export const MAINTENANT = Date.UTC(2026, 9, 7, 20, 0, 0);
export const MAIN = '70044cc3595fed36e17a158128abc53c012d5daa';

export const PAGE = `<html><head>
<link href="./_app/immutable/assets/0.css" rel="stylesheet">
<link rel="modulepreload" href="./_app/immutable/entry/start.js">
</head><body><button data-testid="create-btn">Create</button>
<script>import("./_app/immutable/entry/app.js")</script></body></html>`;

export const FICHIERS: Record<string, string> = {
	'/_app/immutable/assets/0.css': 'body{}',
	'/_app/immutable/entry/start.js': 'import"../chunks/a.js";',
	'/_app/immutable/entry/app.js': 'const n=()=>import("../nodes/0.js");',
	'/_app/immutable/chunks/a.js': 'export const a=1;',
	'/_app/immutable/nodes/0.js': 'import"../chunks/a.js";'
};

export function serveurVert(main = MAIN, depuis = MAINTENANT - 72 * 3600 * 1000) {
	return { alerte: 'ok', echecs_des_sondes: [], deploye: { main, main_depuis: new Date(depuis).toISOString() } };
}

export function json(corps: unknown, status = 200): Response {
	return new Response(JSON.stringify(corps), { status });
}

export function sain(): Lecteurs {
	return {
		page: async () => new Response(PAGE),
		fichier: async (f) => (f in FICHIERS ? new Response(FICHIERS[f]) : new Response('', { status: 404 })),
		reseau: async () => json(serveurVert()),
		commit: MAIN,
		serveur: 'https://serveur.test',
		maintenant: MAINTENANT
	};
}
