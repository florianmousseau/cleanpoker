/*
 * NO MEASUREMENT SCRIPT, AND NO PAGE THAT OVERSELLS IT.
 *
 *     npm run mesure
 *
 * This guard was written on 2026-08-11 to stop the pages denying a beacon that
 * was being served. On 2026-08-24 Florian removed the beacon from the whole
 * portfolio, so it is TURNED AROUND: it now refuses the beacon coming back, and
 * refuses any page naming a tool that is gone.
 *
 * WHY IT IS NOT SIMPLY THE OLD FILE WITH THE BOOLEAN FLIPPED. Dropping the
 * script does not make "this site measures nothing" true. Cloudflare counts the
 * requests it answers at the edge, for every site it serves, and that count is
 * what the cockpit now reads. So the sentence that is allowed says BOTH halves:
 * no script, no cookie, no identifier on the device - AND a request count by
 * the host, like any site. The badge went back to `trackers-0` because no
 * tracker touches the reader any more; it is only defensible while the nuance
 * sits beside it, which is why the nuance is checked here and not trusted.
 *
 * The opposite defect was paid on 2026-08-11, when the beacon arrived on a site
 * promising zero trackers in five languages, and cost seventy strings to
 * repair. Both defects are the same one: a page and the bytes disagreeing.
 *
 * It scans EVERY shipped file rather than a named list. A sixth page written
 * next month, in any of the five languages, would carry the old wording by
 * habit - it is the product's own vocabulary - and nothing else would notice.
 *
 * TWO POLICIES, and that is not a duplicate. Cloudflare Pages applies _headers
 * to static assets only, never to the responses the SvelteKit worker produces,
 * so the HTML pages take their headers from hooks.server.ts. A permission left
 * open in one of them is a door nobody watches.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const VENDOR = 'cloudflareinsights';
const TOOL = 'Cloudflare Web Analytics';
const lire = (chemin) => readFileSync(chemin, 'utf8');

const shell = lire('src/app.html');
const hooks = lire('src/hooks.server.ts');
const headers = lire('_headers');
const llms = lire('static/llms.txt');
const readme = lire('../README.md');

const faults = [];
const require_ = (condition, phrase) => {
	if (!condition) faults.push(phrase);
};

// --- rien ne charge, et les deux politiques sont refermees ---
require_(!shell.includes(VENDOR), 'src/app.html loads a measurement script again');
require_(
	hooks.includes(`"script-src 'self' 'unsafe-inline'"`) && !hooks.includes(VENDOR),
	'hooks.server.ts allows a script it has no reason to allow'
);
require_(
	headers.includes(`script-src 'self' 'unsafe-inline';`) && !headers.includes(VENDOR),
	'_headers allows a script it has no reason to allow, and the static half of the site disagrees'
);
require_(
	hooks.includes(`"connect-src 'self' https://cleanpoker-backend.fly.dev wss://cleanpoker-backend.fly.dev"`),
	'hooks.server.ts lets the page reach the game server, and nothing else'
);
require_(
	headers.includes(
		`connect-src 'self' https://cleanpoker-backend.fly.dev wss://cleanpoker-backend.fly.dev;`
	),
	'_headers lets the page reach the game server, and nothing else'
);

// A token in the shell is the other way the beacon comes back: the script tag
// can be rebuilt around it in one line.
require_(
	!/"token":\s*"[0-9a-f]{32}"/.test(shell),
	'the shell carries a site token again, which is a beacon waiting for its tag'
);
// The retired tokens STAY in .gitleaks.toml: a full-history scan still finds
// them in the commits that carried them, so dropping the allowance turns the
// repository red with nothing new to hide. What must not come back is a token
// declared as served.
require_(
	!lire('../.gitleaks.toml').includes('# Served today.'),
	'.gitleaks.toml declares a token as served while no page serves one'
);

// --- la nuance, exigee la ou la promesse est faite ---
//
// Chacune de ces phrases dit les DEUX moities. Elles sont verifiees une par
// une, et pas par mot-cle : une formulation voisine qui ne garderait que la
// premiere moitie est exactement le mensonge qu'on repare.
const flat = (texte) => texte.replace(/\s+/g, ' ');
const NUANCE = [
	['../README.md', readme, 'the host that serves the pages counts the requests it answers'],
	['static/llms.txt', llms, 'The host that serves the pages counts the requests it answers'],
	[
		'src/routes/green/+page.svelte',
		null,
		'<tr><td>Requests counted by the host</td><td><strong>yes</strong>'
	],
	[
		'src/routes/fr/green/+page.svelte',
		null,
		"<tr><td>Requêtes comptées par l'hébergeur</td><td><strong>oui</strong>"
	],
	[
		'src/routes/de/green/+page.svelte',
		null,
		'<tr><td>Vom Hoster gezählte Anfragen</td><td><strong>ja</strong>'
	],
	[
		'src/routes/es/green/+page.svelte',
		null,
		'<tr><td>Solicitudes contadas por el proveedor</td><td><strong>sí</strong>'
	],
	[
		'src/routes/pt/green/+page.svelte',
		null,
		'<tr><td>Pedidos contados pelo alojamento</td><td><strong>sim</strong>'
	],
	[
		'src/routes/mentions-legales/+page.svelte',
		null,
		'the host that serves these pages, Cloudflare, records the requests it answers'
	],
	[
		'src/routes/fr/mentions-legales/+page.svelte',
		null,
		"l'hébergeur qui sert ces pages, Cloudflare, enregistre les requêtes auxquelles il répond"
	],
	[
		'src/routes/de/mentions-legales/+page.svelte',
		null,
		'protokolliert der Hoster dieser Seiten, Cloudflare, die Anfragen, die er beantwortet'
	],
	[
		'src/routes/es/mentions-legales/+page.svelte',
		null,
		'el proveedor que sirve estas páginas, Cloudflare, registra las solicitudes que responde'
	],
	[
		'src/routes/pt/mentions-legales/+page.svelte',
		null,
		'o alojamento que serve estas páginas, a Cloudflare, regista os pedidos a que responde'
	]
];
for (const [ou, deja, phrase] of NUANCE) {
	require_(
		flat(deja ?? lire(ou)).includes(phrase),
		`${ou} no longer says the host counts requests, and the claim beside it needs that half`
	);
}
require_(
	readme.includes('badge/trackers-0'),
	'the trackers-0 badge is the promise this product is sold on, and it is true again'
);

// --- le vocabulaire interdit, dans les cinq langues, PARTOUT ---
//
// Ce ne sont PAS les anciennes tournures de 2026-08-11 : « zero trackers » est
// redevenu vrai et le badge est revenu avec. Ce qui reste faux, et le restera
// tant que Cloudflare sert ces pages, c'est de nier TOUTE mesure. Un lecteur
// qui lit « ce site ne mesure rien » et trouve un compteur d'audience dans le
// cockpit a ete trompe, meme si aucun octet n'a touche son appareil.
const INTERDITES = [
	VENDOR,
	TOOL,
	'no measurement at all',
	'nothing is measured',
	'we measure nothing',
	'no analytics of any kind',
	'zero analytics',
	'measures nothing',
	'aucune mesure',
	'ne mesure rien',
	'ne mesurons rien',
	'zéro analytics',
	'keine Messung',
	'misst nichts',
	'messen nichts',
	'ninguna medición',
	'no mide nada',
	'no medimos nada',
	'nenhuma medição',
	'não mede nada',
	'não medimos nada'
];

const livres = [];
const parcourir = (dir) => {
	for (const e of readdirSync(dir)) {
		if (['node_modules', 'build', '.svelte-kit'].includes(e)) continue;
		const p = join(dir, e);
		if (statSync(p).isDirectory()) parcourir(p);
		else if (/\.(svelte|ts|txt|md|html)$/.test(e)) livres.push(p);
	}
};
parcourir('src');
// Le README parce qu'il est la vitrine du depot public, et `referencement.md`
// parce qu'il porte les textes destines a etre SOUMIS ailleurs - annuaires,
// listes awesome - ou personne ne les relira jamais.
//
// `AGENTS.md` est volontairement absent, et c'est le seul : c'est le fichier
// dont le travail est de NOMMER ces tournures pour les interdire, et il n'est
// servi a aucun lecteur. La lecon de truecopy.dev - une note qui cite la phrase
// retiree la remet en circulation - vaut pour ce qui est livre ; la note, elle,
// doit bien vivre quelque part.
livres.push('static/llms.txt', '../README.md', '../docs/referencement.md');

for (const chemin of livres) {
	const texte = lire(chemin);
	for (const phrase of INTERDITES) {
		if (texte.includes(phrase)) {
			faults.push(`${chemin.replaceAll('\\', '/')} still says "${phrase}"`);
		}
	}
}

// --- et ce qui reste vrai, verifie sans condition ---
require_(
	lire('src/routes/green/+page.svelte').includes(
		'No Google Analytics or any behavioral tracking tool'
	),
	'the eco-design page still rules out behavioural tracking'
);
require_(
	lire('src/routes/fr/mentions-legales/+page.svelte').includes('rien n&apos;est écrit sur disque') ||
		lire('src/routes/fr/mentions-legales/+page.svelte').includes("rien n'est écrit sur disque"),
	'the French legal page still says nothing is written to disk'
);

if (faults.length) {
	console.error('The bytes and what the site says about them have drifted apart:\n');
	for (const f of faults) console.error(`  - ${f}`);
	console.error(
		'\nEither a script came back that no page declares, or a page is claiming\n' +
			'more silence than this site can honestly promise. Both are the same defect.'
	);
	process.exit(1);
}

console.log(
	'No measurement script: both policies closed, no page names a tool, and the host-side count is stated where the promise is made.'
);
