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
 * TURNED AROUND A SECOND TIME, on 2026-09-01. The site now counts its own
 * readers, server-side, by hashing their address with a salt that changes every
 * day. That is a processing operation by the CONTROLLER, not by the host, so
 * every sentence saying the host is the only one counting went false the second
 * the middleware shipped. This file therefore also demands the three things a
 * reader must be able to check, in all five languages: that the site counts,
 * that their address is never kept, and on what legal basis.
 *
 * TWO POLICIES, and that is not a duplicate. Cloudflare Pages applies _headers
 * to static assets only, never to the responses the SvelteKit worker produces,
 * so the HTML pages take their headers from hooks.server.ts. A permission left
 * open in one of them is a door nobody watches.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const VENDOR = 'cloudflareinsights';
const TOOL = 'Cloudflare Web Analytics';
const lire = (chemin) => readFileSync(chemin, 'utf8');
const existe = (chemin) => existsSync(chemin);

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
// --- ET AUCUNE PAGE NE PEUT DIRE QUE L'HEBERGEUR EST LE SEUL A COMPTER ---
//
// Depuis le 2026-09-01, le site compte lui-meme ses lecteurs. La liste des
// declarations plus bas tient le paragraphe qu'on a ECRIT ; celle-ci tient tous
// les AUTRES endroits ou une phrase pourrait encore dire l'inverse. La
// distinction n'est pas theorique : une garde ecrite autour du paragraphe
// corrige reste verte sur une page dont la premiere ligne dit encore le
// contraire.
//
// Chaque tournure NOMME le comptage. La premiere version de cette liste portait
// « and nowhere else », qui rougissait sur llms.txt - « Real-time server in
// France (Paris) and nowhere else », une phrase vraie qui parle d'un
// emplacement de serveur et non d'une mesure. Une tournure trop courte attrape
// le vocabulaire ordinaire du produit.
const EXCLUSIVITE_DE_L_HEBERGEUR = [
	'the host is the only one counting',
	'only the host counts',
	'the site itself counts nothing',
	'the site keeps no count of its own',
	"seul l'hébergeur compte",
	'de nulle part ailleurs',
	'le site ne compte personne',
	'le site ne compte pas ses lecteurs',
	'nur der Hoster zählt',
	'die Website selbst zählt nichts',
	'solo el proveedor cuenta',
	'el sitio no cuenta a nadie',
	'apenas o alojamento conta',
	'o site não conta ninguém'
];

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
	/*
	 * MINUSCULES POUR CELLE-CI SEULEMENT, et le defaut a ete paye en eprouvant
	 * la garde : « Seul l'hébergeur compte » avec sa majuscule de debut de phrase
	 * passait au travers, c'est-a-dire exactement la position ou une telle phrase
	 * apparait. `INTERDITES` garde sa casse parce qu'elle nomme des PRODUITS -
	 * « Cloudflare Web Analytics » ne s'ecrit pas autrement.
	 */
	const minuscules = texte.toLowerCase();
	for (const phrase of EXCLUSIVITE_DE_L_HEBERGEUR) {
		if (minuscules.includes(phrase.toLowerCase())) {
			faults.push(
				`${chemin.replaceAll('\\', '/')} still says "${phrase}", which the site's own counter makes false`
			);
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

// --- LE COMPTAGE DU SITE SE DECLARE, dans les cinq langues ---
//
// Le middleware compte un lecteur unique en hachant son adresse. C'est un
// traitement du RESPONSABLE et non de l'hebergeur : le livrer sans ces phrases
// mettrait en ligne des pages qui nient ce que le site fait, sur des donnees
// personnelles - le miroir du defaut decrit en tete de ce fichier, et le plus
// cher des deux.
//
// Les trois exigences sont les trois choses qu'un lecteur doit pouvoir
// verifier. Retirer le compteur sans retirer le paragraphe est l'autre faute,
// et elle rougit ici exactement de la meme facon.
const DECLARATIONS = [
	['src/routes/mentions-legales/+page.svelte', 'the site counts its readers itself'],
	['src/routes/mentions-legales/+page.svelte', 'Your IP address is neither recorded nor kept'],
	['src/routes/mentions-legales/+page.svelte', 'article 6.1.f GDPR'],
	['src/routes/fr/mentions-legales/+page.svelte', 'le site compte aussi ses lecteurs lui-même'],
	[
		'src/routes/fr/mentions-legales/+page.svelte',
		"Votre adresse IP n'est ni enregistrée ni conservée"
	],
	['src/routes/fr/mentions-legales/+page.svelte', 'article 6.1.f du RGPD'],
	['src/routes/de/mentions-legales/+page.svelte', 'zählt die Website ihre Leser auch selbst'],
	[
		'src/routes/de/mentions-legales/+page.svelte',
		'Ihre IP-Adresse wird weder gespeichert noch aufbewahrt'
	],
	['src/routes/de/mentions-legales/+page.svelte', 'Artikel 6.1.f DSGVO'],
	[
		'src/routes/es/mentions-legales/+page.svelte',
		'el sitio también cuenta sus lectores por sí mismo'
	],
	['src/routes/es/mentions-legales/+page.svelte', 'Su dirección IP no se registra ni se conserva'],
	['src/routes/es/mentions-legales/+page.svelte', 'artículo 6.1.f del RGPD'],
	[
		'src/routes/pt/mentions-legales/+page.svelte',
		'o site conta também os seus leitores por si próprio'
	],
	[
		'src/routes/pt/mentions-legales/+page.svelte',
		'O seu endereço IP não é registado nem conservado'
	],
	['src/routes/pt/mentions-legales/+page.svelte', 'artigo 6.1.f do RGPD']
];
for (const [ou, phrase] of DECLARATIONS) {
	require_(
		flat(lire(ou)).includes(phrase),
		`${ou} no longer states: "${phrase}", and the site counts readers anyway`
	);
}

// L'ecran d'ecoconception porte la meme verite sous forme de tableau. Un
// lecteur qui compare les deux pages doit y lire la meme chose.
for (const [ou, phrase] of [
	['src/routes/green/+page.svelte', '<td>Counted by the site itself</td>'],
	['src/routes/fr/green/+page.svelte', '<td>Comptage par le site lui-même</td>'],
	['src/routes/de/green/+page.svelte', '<td>Zählung durch die Website selbst</td>'],
	['src/routes/es/green/+page.svelte', '<td>Recuento por el propio sitio</td>'],
	['src/routes/pt/green/+page.svelte', '<td>Contagem pelo próprio site</td>']
]) {
	require_(
		flat(lire(ou)).includes(phrase),
		`${ou} no longer shows the count the site does itself, beside the host one`
	);
}

// LA REGLE ET SON CABLAGE SONT DES COPIES, et le cockpit tient un banc qui les
// refuse des qu'elles derivent. Ce qu'un banc LA-BAS ne peut pas voir, c'est
// leur disparition d'ICI : un site qui perd son compteur affiche un tiret dans
// le cockpit, et cinq pages legales continuent d'annoncer un comptage absent.
for (const chemin of ['src/lib/compteur.js', 'src/lib/compteur-hook.ts']) {
	require_(existe(chemin), `${chemin} is gone, and the pages still declare the count it does`);
}
require_(
	hooks.includes('sequence(localeThemeAndHeaders, compteurDeVisiteurs)'),
	'hooks.server.ts no longer runs the counter, while five legal pages announce it'
);
require_(
	existe('src/routes/etat-compteur/+server.ts'),
	'the /etat-compteur probe is gone, and nothing else can say WHY a visit does not count'
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
	'No measurement script: both policies closed, no page names a tool, and BOTH counts are ' +
		'stated in five languages - the host one and the site own, with what it never keeps and ' +
		`on what legal basis. ${EXCLUSIVITE_DE_L_HEBERGEUR.length} ways of claiming the host is the only counter are refused.`
);
