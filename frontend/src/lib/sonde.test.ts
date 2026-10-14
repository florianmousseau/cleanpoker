import { describe, expect, it } from 'vitest';
import { fichiersDe, importsDe, raison, sonder, TOLERANCE_RETARD } from './sonde';
import { FICHIERS, json, MAIN, MAINTENANT, PAGE, sain, serveurVert } from './sonde-temoin';

function constat(r: Awaited<ReturnType<typeof sonder>>, nom: string) {
	return r.constats.find((c) => c.nom === nom);
}

describe('sonder', () => {
	it('is green when a visitor gets everything', async () => {
		const r = await sonder(sain());
		expect(r.alerte).toBe('ok');
		expect(r.echecs_des_sondes).toEqual([]);
		expect(constat(r, 'fichiers')?.detail).toBe('5 fichiers servis');
		expect(r.deploye).toMatchObject({ juge: 'a jour', retard: { mesure: true } });
	});

	it('is red when a page lost the room form', async () => {
		const r = await sonder({ ...sain(), page: async () => new Response('<html>maintenance</html>') });
		expect(r.alerte).toBe('rouge');
		expect(constat(r, 'pages')?.detail).toContain('formulaire de creation de salle absent');
	});

	it('is red when a page answers an error', async () => {
		const r = await sonder({ ...sain(), page: async (c) => new Response('', { status: c === '/fr' ? 500 : 200 }) });
		expect(r.echecs_des_sondes.join()).toContain('HTTP 500 : /fr');
	});

	// The lesbancs map of 2026-10-07: the page answered, a file it loads did not.
	it('is red when a chunk only an entry imports is missing', async () => {
		const fichier = async (f: string) =>
			f === '/_app/immutable/chunks/a.js' ? new Response('', { status: 404 }) : new Response(FICHIERS[f]);
		const r = await sonder({ ...sain(), fichier });
		expect(r.alerte).toBe('rouge');
		expect(r.echecs_des_sondes).toEqual(['fichiers : HTTP 404 : /_app/immutable/chunks/a.js']);
	});

	it('is red rather than green when the pages name no script at all', async () => {
		const page = async () => new Response('<button data-testid="create-btn"></button>');
		const r = await sonder({ ...sain(), page });
		expect(constat(r, 'fichiers')).toMatchObject({ niveau: 'rouge' });
	});

	it('is red with the cause when the room server cannot be reached', async () => {
		const reseau = async () => {
			throw new TypeError('fetch failed', { cause: Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' }) });
		};
		const r = await sonder({ ...sain(), reseau });
		expect(r.alerte).toBe('rouge');
		expect(constat(r, 'serveur')?.detail).toBe('serveur de salles : fetch failed (connect ECONNREFUSED)');
	});

	it('relays the room server verdict and its reasons', async () => {
		const reseau = async () =>
			json({ ...serveurVert(), alerte: 'rouge', echecs_des_sondes: ['creation de salle : HTTP 503'] });
		const r = await sonder({ ...sain(), reseau });
		expect(r.alerte).toBe('rouge');
		expect(r.echecs_des_sondes).toEqual(['serveur : creation de salle : HTTP 503']);
	});

	it('is red when the room server answers without a verdict', async () => {
		const r = await sonder({ ...sain(), reseau: async () => json({ status: 'ok' }) });
		expect(constat(r, 'serveur')?.detail).toContain("pas d'alerte lisible");
		const r2 = await sonder({ ...sain(), reseau: async () => json({}, 502) });
		expect(constat(r2, 'serveur')?.detail).toContain('HTTP 502');
	});

	// The lesbancs prod of 2026-10-07: four merged pull requests never deployed.
	it('is attention when main moved more than a day ago', async () => {
		const reseau = async () => json(serveurVert(MAIN, MAINTENANT - TOLERANCE_RETARD - 3600 * 1000));
		const r = await sonder({ ...sain(), commit: 'ac104d1', reseau });
		expect(r.alerte).toBe('attention');
		expect(r.deploye).toMatchObject({ juge: 'en retard', retard: { mesure: true, heures: 25 } });
		expect(constat(r, 'deploiement')?.detail).toContain('sert ac104d1, main est 70044cc');
	});

	it('stays green while a deploy can still be running', async () => {
		const reseau = async () => json(serveurVert(MAIN, MAINTENANT - 3600 * 1000));
		const r = await sonder({ ...sain(), commit: 'ac104d1', reseau });
		expect(r.alerte).toBe('ok');
		expect(r.deploye.juge).toBe('en retard');
	});

	it('says why the build could not be judged', async () => {
		const reseau = async () => json({ alerte: 'attention', echecs_des_sondes: ['tete de main illisible : HTTP 429 : flux'] });
		const r = await sonder({ ...sain(), reseau });
		expect(r.alerte).toBe('attention');
		expect(r.deploye.juge).toBe('non juge');
		expect(r.echecs_des_sondes).toContain(
			'deploiement : tete de main illisible : le serveur de salles ne la publie pas (tete de main illisible : HTTP 429 : flux)'
		);
		const r2 = await sonder({ ...sain(), commit: 'inconnu' });
		expect(constat(r2, 'deploiement')).toMatchObject({ niveau: 'attention' });
	});
});

describe('fichiersDe and importsDe', () => {
	it('resolve relative references against the file that holds them', () => {
		expect(fichiersDe(PAGE, '/fr')).toEqual([
			'/_app/immutable/assets/0.css',
			'/_app/immutable/entry/app.js',
			'/_app/immutable/entry/start.js'
		]);
		expect(importsDe('import"../chunks/a.js";import("./b.js")', '/_app/immutable/entry/start.js')).toEqual([
			'/_app/immutable/chunks/a.js',
			'/_app/immutable/entry/b.js'
		]);
	});
});

describe('raison', () => {
	it('carries the cause of an error', () => {
		expect(raison('x')).toBe('x');
		expect(raison({ statut: 1 })).toBe('{"statut":1}');
		expect(raison(new Error('a'))).toBe('a');
		expect(raison(new Error('fetch failed', { cause: { code: 'ENOTFOUND', message: 'getaddrinfo' } }))).toBe(
			'fetch failed (ENOTFOUND getaddrinfo)'
		);
	});
});
