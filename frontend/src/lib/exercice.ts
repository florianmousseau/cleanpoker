/**
 * THE OUTAGE DRILL, ON THE PROBE IN PRODUCTION (D-128).
 *
 * A test proves the judge, not the probe production runs. `POST
 * /health/exercice` runs the site's real probe with one source cut, for that
 * single response: no visitor sees the cut, nothing is written. Each cut
 * carries the level it must reach. It is SEEN when the cut probe reaches that
 * level on the finding of the same source, says a reason the intact probe,
 * read alongside, does not, and breaks nothing it did not declare.
 * `exercice-de-panne.yml` cuts them one after the other.
 */
import { commitAtteste, type LireLesCles } from './jeton-github.ts';
import { sonder, type Lecteurs, type Niveau, type Rapport } from './sonde.ts';

/** The mark every reason a cut produces carries. */
export const MARQUE_EXERCICE = '(exercice)';

interface Coupure {
	/** The finding this source feeds. */
	readonly cible: string;
	/** The level the probe must reach when this source falls. */
	readonly attendu: Exclude<Niveau, 'ok'>;
	/** Other findings the cut breaks by design, not by accident. */
	readonly aussi?: readonly string[];
	readonly couper: (l: Lecteurs) => Lecteurs;
}

const coupee = (quoi: string): Response => new Response(`${quoi} coupe ${MARQUE_EXERCICE}`, { status: 404 });

/** The room server as it answers, minus the head of main it publishes. */
async function sansTeteDeMain(r: Response): Promise<Response> {
	if (r.status !== 200) return r;
	const corps = (await r.json()) as { deploye?: Record<string, unknown>; echecs_des_sondes?: string[] };
	const deploye = { ...corps.deploye };
	delete deploye.main;
	const echecs = [...(corps.echecs_des_sondes ?? []), `tete de main coupee ${MARQUE_EXERCICE}`];
	return Response.json({ ...corps, deploye, echecs_des_sondes: echecs });
}

/*
 * One cut per source /health reads. What a visitor would meet is red; what
 * only blinds the probe to a late deployment is `attention`.
 */
export const COUPURES: Readonly<Record<string, Coupure>> = {
	pages: {
		cible: 'pages',
		attendu: 'rouge',
		couper: (l) => ({ ...l, page: (c) => (c === '/fr' ? Promise.resolve(coupee(c)) : l.page(c)) })
	},
	fichiers: {
		cible: 'fichiers',
		attendu: 'rouge',
		couper: (l) => ({
			...l,
			fichier: (f) => (f.startsWith('/_app/immutable/entry/') ? Promise.resolve(coupee(f)) : l.fichier(f))
		})
	},
	// The head of main is read from the room server: losing the server blinds
	// the deployment judge too, and that is the design, not an overflow.
	serveur: {
		cible: 'serveur',
		attendu: 'rouge',
		aussi: ['deploiement'],
		couper: (l) => ({
			...l,
			reseau: (u) =>
				u.startsWith(l.serveur)
					? Promise.reject(new TypeError(`fetch failed ${MARQUE_EXERCICE}`))
					: l.reseau(u)
		})
	},
	tete_main: {
		cible: 'deploiement',
		attendu: 'attention',
		couper: (l) => ({ ...l, reseau: async (u) => (u.startsWith(l.serveur) ? sansTeteDeMain(await l.reseau(u)) : l.reseau(u)) })
	},
	commit: {
		cible: 'deploiement',
		attendu: 'attention',
		couper: (l) => ({ ...l, commit: 'inconnu' })
	}
};

/** The cuts asked for (`{"couper": ["fichiers"]}`), or why the request is refused. */
export function lireLesCoupures(corps: unknown): { coupe: string[] } | { refus: string } {
	const demande = typeof corps === 'object' && corps !== null && 'couper' in corps ? corps.couper : null;
	if (!Array.isArray(demande)) return { refus: 'couper doit etre une liste' };
	const connues = Object.keys(COUPURES);
	const inconnues = demande.filter((c) => typeof c !== 'string' || !connues.includes(c));
	if (inconnues.length > 0) {
		return { refus: `coupure inconnue : ${inconnues.map(String).join(', ')} (connues : ${connues.join(', ')})` };
	}
	return { coupe: [...new Set(demande as string[])] };
}

const RANG: readonly Niveau[] = ['ok', 'attention', 'rouge'];
const auMoins = (lu: Niveau, attendu: Niveau): boolean => RANG.indexOf(lu) >= RANG.indexOf(attendu);

function niveau(r: Rapport, nom: string): Niveau {
	return r.constats.find((c) => c.nom === nom)?.niveau ?? 'ok';
}

export interface Verdict {
	readonly vu: boolean;
	readonly attendu: Niveau;
	readonly raison: string;
}

/*
 * The other findings the cut made worse. A cut that breaks more than its
 * source accuses the instrument, and a green drill would prove nothing.
 */
function emportesPar(c: Coupure, temoin: Rapport, lu: Rapport): string[] {
	const permis = new Set([c.cible, ...(c.aussi ?? [])]);
	return lu.constats
		.filter((k) => !permis.has(k.nom) && RANG.indexOf(k.niveau) > RANG.indexOf(niveau(temoin, k.nom)))
		.map((k) => k.nom);
}

/** Is cut `nom` seen in `lu`, against the intact probe `temoin`? */
export function jugerLaCoupure(nom: string, temoin: Rapport, lu: Rapport): Verdict {
	const c = COUPURES[nom];
	const { attendu } = c;
	const nouvelles = lu.echecs_des_sondes.filter((r) => !temoin.echecs_des_sondes.includes(r));
	const raison = nouvelles.join(' ; ');
	if (!auMoins(lu.alerte, attendu)) return { vu: false, attendu, raison: `la sonde reste ${lu.alerte} : ${raison}` };
	if (niveau(temoin, c.cible) !== 'ok') {
		return { vu: false, attendu, raison: `${c.cible} deja ${niveau(temoin, c.cible)} sans coupure, rien n'est prouve` };
	}
	if (!auMoins(niveau(lu, c.cible), attendu)) {
		return { vu: false, attendu, raison: `${c.cible} reste ${niveau(lu, c.cible)} : ${raison}` };
	}
	const emportes = emportesPar(c, temoin, lu);
	if (emportes.length > 0) {
		return { vu: false, attendu, raison: `la coupure de ${nom} a aussi casse ${emportes.join(', ')} : ${raison}` };
	}
	if (nouvelles.length === 0) return { vu: false, attendu, raison: 'aucune raison dite' };
	return { vu: true, attendu, raison };
}

export interface Exercice {
	coupe: string[];
	connues: string[];
	verdicts: Record<string, Verdict>;
}

/** The probe with the sources of `coupe` cut, and the verdict on each cut. */
export async function sonderEnExercice(l: Lecteurs, coupe: readonly string[]): Promise<Rapport & { exercice: Exercice }> {
	const coupes = coupe.reduce((acc, nom) => COUPURES[nom].couper(acc), l);
	const [temoin, lu] = await Promise.all([coupe.length > 0 ? sonder(l) : null, sonder(coupes)]);
	const verdicts = Object.fromEntries(coupe.map((nom) => [nom, jugerLaCoupure(nom, temoin as Rapport, lu)]));
	return { exercice: { coupe: [...coupe], connues: Object.keys(COUPURES), verdicts }, ...lu };
}

/**
 * `POST /health/exercice`: 401 without the OIDC token of `main` (otherwise
 * anyone could make the site walk itself at will), 400 on an unreadable
 * request, 200 with `exercice` and the body of `/health` otherwise.
 */
export async function recevoirLExercice(
	jeton: string,
	lireLesCles: LireLesCles,
	corps: unknown,
	l: Lecteurs
): Promise<{ status: number; corps: unknown }> {
	const atteste = await commitAtteste(jeton, lireLesCles, l.maintenant);
	if ('refus' in atteste) return { status: 401, corps: { refus: atteste.refus } };
	const demande = lireLesCoupures(corps);
	if ('refus' in demande) return { status: 400, corps: demande };
	return { status: 200, corps: await sonderEnExercice(l, demande.coupe) };
}
