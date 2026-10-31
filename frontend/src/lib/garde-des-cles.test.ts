/*
 * La garde des cles de GitHub : une rafale de jetons forges ne fait sortir le
 * site vers GitHub qu'une fois par minute au plus (D-121).
 */
import { expect, test } from 'vitest';
import {
	AUDIENCE,
	CLES_GARDEES_MS,
	commitAtteste,
	EMETTEUR,
	gardeDesCles,
	RELECTURE_MIN_MS,
	type LireLesCles
} from './jeton-github';

const MAINTENANT = Date.parse('2026-10-31T01:00:00.000Z');
const b64 = (o: unknown): string => Buffer.from(JSON.stringify(o)).toString('base64url');
const SAINES = {
	iss: EMETTEUR,
	aud: AUDIENCE,
	repository: 'florianmousseau/cleanpoker',
	ref: 'refs/heads/main',
	sha: 'a'.repeat(40),
	exp: MAINTENANT / 1000 + 300
};

const forge = (revendications: Record<string, unknown>, kid = 'inconnue'): string =>
	`${b64({ alg: 'RS256', kid })}.${b64(revendications)}.c2ln`;

function compteur(): { lire: LireLesCles; lectures: () => number } {
	let n = 0;
	return {
		lire: () => {
			n += 1;
			return Promise.resolve({ keys: [{ kid: 'cle-1' }] });
		},
		lectures: () => n
	};
}

test('LA SONDE DE RAFALE : 10 000 jetons forges en une heure lisent GitHub au plus une fois par minute', async () => {
	const { lire, lectures } = compteur();
	let t = MAINTENANT;
	const gardees = gardeDesCles(lire, () => t);
	for (let i = 0; i < 10_000; i += 1) {
		t = MAINTENANT + i * 360;
		const visant = { ...SAINES, exp: t / 1000 + 300 };
		expect(await commitAtteste(forge(visant), gardees, t)).toEqual({
			refus: 'signature invalide'
		});
	}
	expect(lectures()).toBeLessThanOrEqual(60);
	expect(lectures()).toBeGreaterThanOrEqual(59);
});

test('un jeton qui ne vise pas ce site est refuse sans lire GitHub', async () => {
	const { lire, lectures } = compteur();
	const gardees = gardeDesCles(lire, () => MAINTENANT);
	for (const autre of [{ aud: 'https://x' }, { repository: 'x/y' }, { exp: 1 }, { iss: 'x' }]) {
		const r = await commitAtteste(forge({ ...SAINES, ...autre }), gardees, MAINTENANT);
		expect('refus' in r).toBe(true);
	}
	expect(await commitAtteste('a.b.c', gardees, MAINTENANT)).toEqual({ refus: 'jeton illisible' });
	expect(lectures()).toBe(0);
});

test('une cle connue sert dix minutes sans relire, puis se relit', async () => {
	const { lire, lectures } = compteur();
	let t = MAINTENANT;
	const gardees = gardeDesCles(lire, () => t);
	await gardees('cle-1');
	t += CLES_GARDEES_MS - 1;
	await gardees('cle-1');
	await gardees();
	expect(lectures()).toBe(1);
	t += 1;
	await gardees('cle-1');
	expect(lectures()).toBe(2);
});

test('une lecture qui echoue attend une minute avant la suivante', async () => {
	let n = 0;
	let t = MAINTENANT;
	const gardees = gardeDesCles(
		() => {
			n += 1;
			return Promise.reject(new Error('cles de GitHub : HTTP 503'));
		},
		() => t
	);
	await expect(gardees('cle-1')).rejects.toThrow(/HTTP 503/);
	await expect(gardees('cle-1')).rejects.toThrow(/relecture trop proche/);
	expect(n).toBe(1);
	t += RELECTURE_MIN_MS;
	await expect(gardees('cle-1')).rejects.toThrow(/HTTP 503/);
	expect(n).toBe(2);
});
