/**
 * What /health on the site answers: whether a visitor can do what they came
 * for, read the way their browser reads it. The page renders, every file it
 * loads is served, the room server it calls answers green, and the build is
 * the one on main.
 *
 * Every reader is injected, so a test can break each one the way production
 * breaks it, and the route stays a thin wiring of the platform.
 */

export type Niveau = 'ok' | 'attention' | 'rouge';

export interface Constat {
	nom: string;
	niveau: Niveau;
	detail: string;
}

export interface Deploye {
	commit: string;
	juge: 'a jour' | 'en retard' | 'non juge';
	main?: string;
	retard?: { mesure: boolean; heures: number };
}

export interface Rapport {
	alerte: Niveau;
	constats: Constat[];
	echecs_des_sondes: string[];
	deploye: Deploye;
}

export interface Lecteurs {
	/** A page rendered by this site, as a visitor gets it. */
	page: (chemin: string) => Promise<Response>;
	/** A built file, as the browser downloads it. */
	fichier: (chemin: string) => Promise<Response>;
	/** Anything outside the site: the room server, the head of main. */
	reseau: (url: string) => Promise<Response>;
	/** The newest commit of main, read at most every ten minutes. */
	tete: () => Promise<Tete>;
	commit: string;
	serveur: string;
	maintenant: number;
}

export interface Tete {
	sha: string;
	date: number;
}

/** The pages a visitor lands on, and the mark that the room form is there. */
export const PAGES_TEMOINS = ['/', '/fr'] as const;
const FORMULAIRE = 'data-testid="create-btn"';

/** How long main may run ahead of the served build before it is a finding. */
export const TOLERANCE_RETARD = 24 * 3600 * 1000;

const RANG: Record<Niveau, number> = { ok: 0, attention: 1, rouge: 2 };

function pire(constats: Constat[]): Niveau {
	return constats.reduce<Niveau>((n, c) => (RANG[c.niveau] > RANG[n] ? c.niveau : n), 'ok');
}

/**
 * The message of an error and of its causes. A bare "fetch failed" fits every
 * outage there is; the cause says which one it was.
 */
export function raison(e: unknown): string {
	if (typeof e !== 'object' || e === null) return String(e);
	const { message, code, cause } = e as { message?: unknown; code?: unknown; cause?: unknown };
	let texte = typeof message === 'string' ? message : String(e);
	if (typeof code === 'string' && !texte.includes(code)) texte = `${code} ${texte}`;
	return cause === undefined || cause === null ? texte : `${texte} (${raison(cause)})`;
}

const BASE = 'https://site.invalid';

/** Resolve a reference found in the file at `depuis` to a path of the site. */
function resoudre(ref: string, depuis: string): string {
	return new URL(ref, BASE + depuis).pathname;
}

/** The built files a page asks the browser for: scripts, styles, preloads. */
export function fichiersDe(html: string, chemin = '/'): string[] {
	const vus = new Set<string>();
	for (const m of html.matchAll(/["']((?:\.{1,2}\/|\/)?_app\/immutable\/[^"'?#\s]+)["']/g)) {
		vus.add(resoudre(m[1], chemin));
	}
	return [...vus].sort();
}

/** The modules a built script imports, statically or on demand. */
export function importsDe(js: string, chemin: string): string[] {
	const vus = new Set<string>();
	for (const m of js.matchAll(/["'](\.{1,2}\/[^"'?#\s]+\.(?:js|css))["']/g)) vus.add(resoudre(m[1], chemin));
	return [...vus];
}

/** Past this many files the walk stops and says so rather than run forever. */
export const PLAFOND_FICHIERS = 300;

async function lirePage(l: Lecteurs, chemin: string): Promise<string> {
	const r = await l.page(chemin);
	if (r.status !== 200) throw new Error(`HTTP ${r.status} : ${chemin}`);
	const html = await r.text();
	if (!html.includes(FORMULAIRE)) throw new Error(`${chemin} : formulaire de creation de salle absent`);
	return html;
}

async function pages(l: Lecteurs): Promise<{ constat: Constat; fichiers: string[] }> {
	const trouves = new Set<string>();
	const echecs: string[] = [];
	for (const chemin of PAGES_TEMOINS) {
		try {
			for (const f of fichiersDe(await lirePage(l, chemin), chemin)) trouves.add(f);
		} catch (e) {
			echecs.push(raison(e));
		}
	}
	const fichiers = [...trouves].sort();
	if (echecs.length) return { constat: { nom: 'pages', niveau: 'rouge', detail: echecs.join(' ; ') }, fichiers };
	const detail = `${PAGES_TEMOINS.length} pages avec le formulaire`;
	return { constat: { nom: 'pages', niveau: 'ok', detail }, fichiers };
}

async function lireFichier(l: Lecteurs, f: string): Promise<string[]> {
	const r = await l.fichier(f);
	if (r.status !== 200) throw new Error(`HTTP ${r.status} : ${f}`);
	return f.endsWith('.js') ? importsDe(await r.text(), f) : [];
}

async function fichiers(l: Lecteurs, depart: string[]): Promise<Constat> {
	// A page that asks for nothing is a page whose markup was not read: the
	// walk would be green by measuring nothing.
	if (!depart.some((f) => f.endsWith('.js'))) {
		return { nom: 'fichiers', niveau: 'rouge', detail: 'aucun script trouve dans les pages : rien a verifier' };
	}
	const vus = new Set<string>(depart);
	const echecs: string[] = [];
	let vague = depart;
	while (vague.length && vus.size <= PLAFOND_FICHIERS) {
		const suivants = await Promise.all(
			vague.map((f) =>
				lireFichier(l, f).catch((e: unknown) => {
					echecs.push(raison(e));
					return [];
				})
			)
		);
		vague = suivants.flat().filter((f) => !vus.has(f));
		for (const f of vague) vus.add(f);
	}
	if (vus.size > PLAFOND_FICHIERS) echecs.push(`plus de ${PLAFOND_FICHIERS} fichiers : parcours arrete`);
	if (echecs.length) return { nom: 'fichiers', niveau: 'rouge', detail: echecs.sort().join(' ; ') };
	return { nom: 'fichiers', niveau: 'ok', detail: `${vus.size} fichiers servis` };
}

async function serveur(l: Lecteurs): Promise<Constat> {
	const url = `${l.serveur}/health`;
	try {
		const r = await l.reseau(url);
		if (r.status !== 200) throw new Error(`HTTP ${r.status} : ${url}`);
		const corps = (await r.json()) as { alerte?: string; echecs_des_sondes?: string[] };
		if (corps.alerte !== 'ok' && corps.alerte !== 'attention' && corps.alerte !== 'rouge') {
			throw new Error(`${url} : pas d'alerte lisible`);
		}
		const echecs = corps.echecs_des_sondes ?? [];
		const detail = echecs.length ? echecs.join(' ; ') : 'serveur de salles au vert';
		return { nom: 'serveur', niveau: corps.alerte, detail };
	} catch (e) {
		return { nom: 'serveur', niveau: 'rouge', detail: `serveur de salles : ${raison(e)}` };
	}
}

function court(sha: string): string {
	return sha.slice(0, 7);
}

function memeCommit(a: string, b: string): boolean {
	const n = Math.min(a.length, b.length);
	return n >= 7 && a.slice(0, n) === b.slice(0, n);
}

async function deploiement(l: Lecteurs): Promise<{ constat: Constat; deploye: Deploye }> {
	const deploye: Deploye = { commit: l.commit, juge: 'non juge' };
	if (!l.commit || l.commit === 'inconnu') {
		const detail = 'commit servi inconnu : build sans GITHUB_SHA';
		return { constat: { nom: 'deploiement', niveau: 'attention', detail }, deploye };
	}
	let tete: Tete;
	try {
		tete = await l.tete();
	} catch (e) {
		const detail = `tete de main illisible : ${raison(e)}`;
		return { constat: { nom: 'deploiement', niveau: 'attention', detail }, deploye };
	}
	deploye.main = tete.sha;
	if (memeCommit(tete.sha, l.commit)) {
		deploye.juge = 'a jour';
		deploye.retard = { mesure: true, heures: 0 };
		return { constat: { nom: 'deploiement', niveau: 'ok', detail: 'sert la tete de main' }, deploye };
	}
	const retard = l.maintenant - tete.date;
	const heures = Math.floor(retard / 360000) / 10;
	deploye.juge = 'en retard';
	deploye.retard = { mesure: true, heures };
	const detail = `sert ${court(l.commit)}, main est ${court(tete.sha)} depuis ${heures} h`;
	if (retard > TOLERANCE_RETARD) return { constat: { nom: 'deploiement', niveau: 'attention', detail }, deploye };
	return { constat: { nom: 'deploiement', niveau: 'ok', detail: `${detail}, deploiement attendu` }, deploye };
}

/** Run every walk and judge the whole. */
export async function sonder(l: Lecteurs): Promise<Rapport> {
	const [vues, srv, dep] = await Promise.all([pages(l), serveur(l), deploiement(l)]);
	const constats = [vues.constat, await fichiers(l, vues.fichiers), srv, dep.constat];
	return {
		alerte: pire(constats),
		constats,
		echecs_des_sondes: constats.filter((c) => c.niveau !== 'ok').map((c) => `${c.nom} : ${c.detail}`),
		deploye: dep.deploye
	};
}

const PREFIXE_COMMIT = 'tag:github.com,2008:Grit::Commit/';

/** Read the head of main out of the repository's public Atom feed. */
export function teteDuFlux(xml: string): Tete {
	const entree = xml.match(/<entry>([\s\S]*?)<\/entry>/);
	if (!entree) throw new Error('flux sans aucun commit');
	const id = entree[1].match(/<id>([^<]*)<\/id>/)?.[1] ?? '';
	const maj = entree[1].match(/<updated>([^<]*)<\/updated>/)?.[1] ?? '';
	if (!id.startsWith(PREFIXE_COMMIT) || id.length < PREFIXE_COMMIT.length + 7) {
		throw new Error(`identifiant de commit inattendu "${id}"`);
	}
	const date = Date.parse(maj);
	if (Number.isNaN(date)) throw new Error(`date de commit illisible "${maj}"`);
	return { sha: id.slice(PREFIXE_COMMIT.length), date };
}
