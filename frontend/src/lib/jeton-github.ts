/**
 * GitHub Actions' OIDC token, checked without any shared secret.
 *
 * The outage drill (`exercice-de-panne.yml`) has to prove it is the drill: a
 * secret would be one more thing to hold, so the job shows the token GitHub
 * signs for it and the site checks it against GitHub's public keys. Only a job
 * of this repository running on `main` passes. Same form as florianmousseau/site.
 */

export const EMETTEUR = 'https://token.actions.githubusercontent.com';
export const AUDIENCE = 'https://cleanpoker.dev';
const DEPOT = 'florianmousseau/cleanpoker';
const BRANCHE = 'refs/heads/main';

type Cles = { keys?: (JsonWebKey & { kid?: string })[] };

/** Les cles publiques de l'emetteur, au format JWKS. */
export type LireLesCles = () => Promise<Cles>;

/** Lit les cles publiques de GitHub par `appel`. */
export function lireLesClesDeGithub(appel: typeof fetch): LireLesCles {
	return async () => {
		const r = await appel(`${EMETTEUR}/.well-known/jwks`, { signal: AbortSignal.timeout(8_000) });
		if (!r.ok) throw new Error(`cles de GitHub : HTTP ${String(r.status)}`);
		return (await r.json()) as Cles;
	};
}

const depuisBase64Url = (s: string): Uint8Array<ArrayBuffer> => {
	const b = atob(
		s
			.replace(/-/g, '+')
			.replace(/_/g, '/')
			.padEnd(Math.ceil(s.length / 4) * 4, '='),
	);
	return Uint8Array.from(b, (c) => c.charCodeAt(0));
};

const lireJson = (s: string): Record<string, unknown> =>
	JSON.parse(new TextDecoder().decode(depuisBase64Url(s))) as Record<string, unknown>;

async function signatureValide(
	entete: Record<string, unknown>,
	morceaux: readonly [string, string, string],
	lireLesCles: LireLesCles,
): Promise<boolean> {
	if (entete.alg !== 'RS256') return false;
	const cle = ((await lireLesCles()).keys ?? []).find((k) => k.kid === entete.kid);
	if (cle === undefined) return false;
	const publique = await crypto.subtle.importKey(
		'jwk',
		cle,
		{ name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
		false,
		['verify'],
	);
	return crypto.subtle.verify(
		'RSASSA-PKCS1-v1_5',
		publique,
		depuisBase64Url(morceaux[2]),
		new TextEncoder().encode(`${morceaux[0]}.${morceaux[1]}`),
	);
}

function revendicationsAttendues(r: Record<string, unknown>, maintenant: number): string | null {
	if (r.iss !== EMETTEUR) return 'emetteur inattendu';
	if (r.aud !== AUDIENCE) return 'audience inattendue';
	if (r.repository !== DEPOT) return 'depot inattendu';
	if (r.ref !== BRANCHE) return 'branche inattendue';
	if (typeof r.exp !== 'number' || r.exp * 1000 <= maintenant) return 'jeton expire';
	if (typeof r.sha !== 'string' || !/^[0-9a-f]{40}$/.test(r.sha)) return 'sha absent';
	return null;
}

/** Le commit qu'un jeton de `main` atteste, ou la raison de le refuser. */
export async function commitAtteste(
	jeton: string,
	lireLesCles: LireLesCles,
	maintenant: number,
): Promise<{ commit: string } | { refus: string }> {
	const morceaux = jeton.split('.');
	if (morceaux.length !== 3) return { refus: 'jeton mal forme' };
	const trio = morceaux as [string, string, string];
	try {
		if (!(await signatureValide(lireJson(trio[0]), trio, lireLesCles))) {
			return { refus: 'signature invalide' };
		}
		const r = lireJson(trio[1]);
		const refus = revendicationsAttendues(r, maintenant);
		return refus === null ? { commit: r.sha as string } : { refus };
	} catch {
		return { refus: 'jeton illisible' };
	}
}
