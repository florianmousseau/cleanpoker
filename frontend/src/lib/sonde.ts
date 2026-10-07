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
	/** The room server, as the browser calls it. */
	reseau: (url: string) => Promise<Response>;
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
	let texte = typeof message === 'string' ? message : JSON.stringify(e);
	if (typeof code === 'string' && !texte.includes(code)) texte = `${code} ${texte}`;
	return cause === undefined || cause === null ? texte : `${texte} (${raison(cause)})`;
}

const BASE = 'https://site.invalid';

const alphabetique = (a: string, b: string): number => a.localeCompare(b);

function trie(liste: Iterable<string>): string[] {
	const copie = [...liste];
	copie.sort(alphabetique);
	return copie;
}

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
	return trie(vus);
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
	const lus = await Promise.allSettled(
		PAGES_TEMOINS.map(async (chemin) => fichiersDe(await lirePage(l, chemin), chemin))
	);
	const echecs = lus.flatMap((r) => (r.status === 'rejected' ? [raison(r.reason)] : []));
	const fichiers = trie(new Set(lus.flatMap((r) => (r.status === 'fulfilled' ? r.value : []))));
	if (echecs.length) return { constat: { nom: 'pages', niveau: 'rouge', detail: echecs.join(' ; ') }, fichiers };
	const detail = `${PAGES_TEMOINS.length} pages avec le formulaire`;
	return { constat: { nom: 'pages', niveau: 'ok', detail }, fichiers };
}

async function lireFichier(l: Lecteurs, f: string): Promise<string[]> {
	const r = await l.fichier(f);
	if (r.status !== 200) throw new Error(`HTTP ${r.status} : ${f}`);
	return f.endsWith('.js') ? importsDe(await r.text(), f) : [];
}

/** Read one wave of files, then the files they import, until none is new. */
async function parcourir(l: Lecteurs, vague: string[], vus: Set<string>, echecs: string[]): Promise<void> {
	if (!vague.length || vus.size > PLAFOND_FICHIERS) return;
	const suivants = await Promise.all(
		vague.map((f) =>
			lireFichier(l, f).catch((e: unknown) => {
				echecs.push(raison(e));
				return [];
			})
		)
	);
	const nouveaux = suivants.flat().filter((f) => !vus.has(f));
	for (const f of nouveaux) vus.add(f);
	await parcourir(l, [...new Set(nouveaux)], vus, echecs);
}

async function fichiers(l: Lecteurs, depart: string[]): Promise<Constat> {
	// A page that asks for nothing is a page whose markup was not read: the
	// walk would be green by measuring nothing.
	if (!depart.some((f) => f.endsWith('.js'))) {
		return { nom: 'fichiers', niveau: 'rouge', detail: 'aucun script trouve dans les pages : rien a verifier' };
	}
	const vus = new Set<string>(depart);
	const echecs: string[] = [];
	await parcourir(l, depart, vus, echecs);
	if (vus.size > PLAFOND_FICHIERS) echecs.push(`plus de ${PLAFOND_FICHIERS} fichiers : parcours arrete`);
	if (echecs.length) return { nom: 'fichiers', niveau: 'rouge', detail: trie(echecs).join(' ; ') };
	return { nom: 'fichiers', niveau: 'ok', detail: `${vus.size} fichiers servis` };
}

interface CorpsServeur {
	alerte?: string;
	echecs_des_sondes?: string[];
	deploye?: { main?: string; main_depuis?: string };
}

/**
 * The head of main as the room server read it. Read from here rather than
 * from GitHub: GitHub answers 429 to a share of the requests that leave
 * Cloudflare, and one reading for the two builds cannot disagree with itself.
 */
function teteDuServeur(corps: CorpsServeur): Tete | Error {
	const { main, main_depuis } = corps.deploye ?? {};
	const date = Date.parse(main_depuis ?? '');
	if (main && main.length >= 7 && !Number.isNaN(date)) return { sha: main, date };
	const pourquoi = (corps.echecs_des_sondes ?? []).filter((e) => e.includes('tete de main')).join(' ; ');
	return new Error(`le serveur de salles ne la publie pas${pourquoi ? ` (${pourquoi})` : ''}`);
}

async function serveur(l: Lecteurs): Promise<{ constat: Constat; tete: Tete | Error }> {
	const url = `${l.serveur}/health`;
	try {
		const r = await l.reseau(url);
		if (r.status !== 200) throw new Error(`HTTP ${r.status} : ${url}`);
		const corps = (await r.json()) as CorpsServeur;
		if (corps.alerte !== 'ok' && corps.alerte !== 'attention' && corps.alerte !== 'rouge') {
			throw new Error(`${url} : pas d'alerte lisible`);
		}
		const echecs = corps.echecs_des_sondes ?? [];
		const detail = echecs.length ? echecs.join(' ; ') : 'serveur de salles au vert';
		return { constat: { nom: 'serveur', niveau: corps.alerte, detail }, tete: teteDuServeur(corps) };
	} catch (e) {
		const detail = `serveur de salles : ${raison(e)}`;
		return { constat: { nom: 'serveur', niveau: 'rouge', detail }, tete: new Error(detail) };
	}
}

function court(sha: string): string {
	return sha.slice(0, 7);
}

function memeCommit(a: string, b: string): boolean {
	const n = Math.min(a.length, b.length);
	return n >= 7 && a.slice(0, n) === b.slice(0, n);
}

function deploiement(l: Lecteurs, tete: Tete | Error): { constat: Constat; deploye: Deploye } {
	const deploye: Deploye = { commit: l.commit, juge: 'non juge' };
	if (!l.commit || l.commit === 'inconnu') {
		const detail = 'commit servi inconnu : build sans GITHUB_SHA';
		return { constat: { nom: 'deploiement', niveau: 'attention', detail }, deploye };
	}
	if (tete instanceof Error) {
		const detail = `tete de main illisible : ${tete.message}`;
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
	const [vues, srv] = await Promise.all([pages(l), serveur(l)]);
	const dep = deploiement(l, srv.tete);
	const constats = [vues.constat, await fichiers(l, vues.fichiers), srv.constat, dep.constat];
	return {
		alerte: pire(constats),
		constats,
		echecs_des_sondes: constats.filter((c) => c.niveau !== 'ok').map((c) => `${c.nom} : ${c.detail}`),
		deploye: dep.deploye
	};
}
