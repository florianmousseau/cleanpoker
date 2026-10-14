import { describe, expect, it } from 'vitest';
import { COUPURES, jugerLaCoupure, lireLesCoupures, recevoirLExercice, sonderEnExercice } from './exercice';
import { AUDIENCE, commitAtteste, EMETTEUR, lireLesClesDeGithub } from './jeton-github';
import { sonder } from './sonde';
import { json, MAIN, MAINTENANT, sain, serveurVert } from './sonde-temoin';

describe('each cut', () => {
	for (const nom of Object.keys(COUPURES)) {
		it(`${nom} is seen, at its level, with its reason`, async () => {
			const lu = await sonderEnExercice(sain(), [nom]);
			const verdict = lu.exercice.verdicts[nom];
			expect(verdict).toMatchObject({ vu: true, attendu: COUPURES[nom].attendu });
			expect(verdict.raison).not.toBe('');
			expect(lu.exercice.coupe).toEqual([nom]);
		});
	}

	it('names the source it cut', async () => {
		const raisons = async (nom: string) => (await sonderEnExercice(sain(), [nom])).exercice.verdicts[nom].raison;
		expect(await raisons('pages')).toBe('pages : HTTP 404 : /fr');
		expect(await raisons('fichiers')).toContain('/_app/immutable/entry/');
		expect(await raisons('serveur')).toContain('serveur de salles : fetch failed (exercice)');
		expect(await raisons('tete_main')).toContain('tete de main coupee (exercice)');
		expect(await raisons('commit')).toContain('commit servi inconnu');
	});

	it('leaves the room server alone when the head is cut, and passes a refusal through', async () => {
		const lu = await sonderEnExercice(sain(), ['tete_main']);
		expect(lu.constats.find((c) => c.nom === 'serveur')?.niveau).toBe('ok');
		const panne = await sonderEnExercice({ ...sain(), reseau: async () => json({}, 503) }, ['tete_main']);
		expect(panne.exercice.verdicts.tete_main.vu).toBe(false);
	});

	it('only cuts the room server, not another address', async () => {
		const l = COUPURES.serveur.couper(sain());
		await expect(l.reseau('https://ailleurs.test/x')).resolves.toBeInstanceOf(Response);
		const t = COUPURES.tete_main.couper(sain());
		expect((await t.reseau('https://ailleurs.test/x')).status).toBe(200);
	});
});

describe('the judge', () => {
	it('runs the probe as is when nothing is cut', async () => {
		const lu = await sonderEnExercice(sain(), []);
		expect(lu.alerte).toBe('ok');
		expect(lu.exercice).toEqual({ coupe: [], connues: Object.keys(COUPURES), verdicts: {} });
	});

	it('does not see a cut that also breaks an undeclared finding', async () => {
		const temoin = await sonder(sain());
		const lu = await sonder({ ...COUPURES.pages.couper(sain()), fichier: async () => new Response('', { status: 404 }) });
		const v = jugerLaCoupure('pages', temoin, lu);
		expect(v.vu).toBe(false);
		expect(v.raison).toContain('la coupure de pages a aussi casse fichiers');
	});

	it('proves nothing on a source already down', async () => {
		const enPanne = { ...sain(), reseau: async () => json({ ...serveurVert(), alerte: 'rouge', echecs_des_sondes: ['salle : 503'] }) };
		const lu = await sonderEnExercice(enPanne, ['serveur']);
		expect(lu.exercice.verdicts.serveur).toMatchObject({ vu: false });
		expect(lu.exercice.verdicts.serveur.raison).toContain('serveur deja rouge sans coupure');
	});

	it('says so when the probe stays green, with no false green', async () => {
		const temoin = await sonder(sain());
		expect(jugerLaCoupure('pages', temoin, temoin)).toEqual({ vu: false, attendu: 'rouge', raison: 'la sonde reste ok : ' });
	});

	it('does not see a cut whose finding stayed green, nor one with no new reason', async () => {
		const temoin = await sonder(sain());
		const autre = await sonder({ ...sain(), commit: 'inconnu' });
		expect(jugerLaCoupure('tete_main', temoin, { ...autre, constats: temoin.constats }).raison).toContain('deploiement reste ok');
		expect(jugerLaCoupure('commit', temoin, { ...autre, echecs_des_sondes: [] })).toMatchObject({
			vu: false,
			raison: 'aucune raison dite'
		});
	});
});

describe('the request', () => {
	it('is a list of known cuts, or refused naming them', () => {
		expect(lireLesCoupures({ couper: ['pages', 'pages', 'fichiers'] })).toEqual({ coupe: ['pages', 'fichiers'] });
		expect(lireLesCoupures(null)).toEqual({ refus: 'couper doit etre une liste' });
		expect(lireLesCoupures({ couper: 'pages' })).toEqual({ refus: 'couper doit etre une liste' });
		expect(lireLesCoupures({ couper: ['base', 3] })).toEqual({
			refus: 'coupure inconnue : base, 3 (connues : pages, fichiers, serveur, tete_main, commit)'
		});
	});
});

// GitHub's OIDC token, checked against a key made here.
const paire = await crypto.subtle.generateKey(
	{ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
	true,
	['sign', 'verify']
);
const publique = { ...(await crypto.subtle.exportKey('jwk', paire.publicKey)), kid: 'cle-1' };
const cles = () => Promise.resolve({ keys: [publique] });
const b64 = (o: unknown): string => Buffer.from(JSON.stringify(o)).toString('base64url');

async function jeton(revendications: Record<string, unknown>, kid = 'cle-1', alg = 'RS256'): Promise<string> {
	const corps = `${b64({ alg, kid })}.${b64(revendications)}`;
	const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', paire.privateKey, new TextEncoder().encode(corps));
	return `${corps}.${Buffer.from(signature).toString('base64url')}`;
}

const SAINES = {
	iss: EMETTEUR,
	aud: AUDIENCE,
	repository: 'florianmousseau/cleanpoker',
	ref: 'refs/heads/main',
	sha: MAIN,
	exp: MAINTENANT / 1000 + 300
};

describe('the OIDC token', () => {
	it('attests the commit of a job on main of this repository', async () => {
		expect(await commitAtteste(await jeton(SAINES), cles, MAINTENANT)).toEqual({ commit: MAIN });
	});

	it('refuses a forged, foreign, other-branch or expired token', async () => {
		const refus = async (r: Record<string, unknown>) => commitAtteste(await jeton({ ...SAINES, ...r }), cles, MAINTENANT);
		expect(await refus({ iss: 'https://ailleurs' })).toEqual({ refus: 'emetteur inattendu' });
		expect(await refus({ aud: 'https://florianmousseau.com' })).toEqual({ refus: 'audience inattendue' });
		expect(await refus({ repository: 'florianmousseau/site' })).toEqual({ refus: 'depot inattendu' });
		expect(await refus({ ref: 'refs/heads/develop' })).toEqual({ refus: 'branche inattendue' });
		expect(await refus({ exp: MAINTENANT / 1000 - 1 })).toEqual({ refus: 'jeton expire' });
		expect(await refus({ sha: 'abc' })).toEqual({ refus: 'sha absent' });
		expect(await commitAtteste('', cles, MAINTENANT)).toEqual({ refus: 'jeton mal forme' });
		expect(await commitAtteste('a.b.c', cles, MAINTENANT)).toEqual({ refus: 'jeton illisible' });
		expect(await commitAtteste(await jeton(SAINES, 'autre'), cles, MAINTENANT)).toEqual({ refus: 'signature invalide' });
		expect(await commitAtteste(await jeton(SAINES, 'cle-1', 'HS256'), cles, MAINTENANT)).toEqual({
			refus: 'signature invalide'
		});
		const sansCles = () => Promise.resolve({});
		expect(await commitAtteste(await jeton(SAINES), sansCles, MAINTENANT)).toEqual({ refus: 'signature invalide' });
	});

	it("reads GitHub's keys, and a refusal from GitHub is a stated error", async () => {
		const ok = lireLesClesDeGithub(() => Promise.resolve(Response.json({ keys: [publique] })));
		expect(await ok()).toEqual({ keys: [publique] });
		const non = lireLesClesDeGithub(() => Promise.resolve(new Response('', { status: 503 })));
		await expect(non()).rejects.toThrow('cles de GitHub : HTTP 503');
	});
});

describe('POST /health/exercice', () => {
	it('is 401 without a token of main, 400 on an unreadable request, 200 with the verdict', async () => {
		expect(await recevoirLExercice('', cles, { couper: [] }, sain())).toEqual({
			status: 401,
			corps: { refus: 'jeton mal forme' }
		});
		const develop = await jeton({ ...SAINES, ref: 'refs/heads/develop' });
		expect((await recevoirLExercice(develop, cles, { couper: [] }, sain())).status).toBe(401);
		const vrai = await jeton(SAINES);
		expect(await recevoirLExercice(vrai, cles, { couper: 'x' }, sain())).toEqual({
			status: 400,
			corps: { refus: 'couper doit etre une liste' }
		});
		const r = await recevoirLExercice(vrai, cles, { couper: ['fichiers'] }, sain());
		expect(r.status).toBe(200);
		expect(r.corps).toMatchObject({ alerte: 'rouge', exercice: { coupe: ['fichiers'], verdicts: { fichiers: { vu: true } } } });
	});
});
