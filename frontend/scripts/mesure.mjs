/*
 * THE MEASUREMENT, THE POLICY AND THE CLAIMS, KEPT EQUAL TO ONE ANOTHER.
 *
 *     npm run mesure
 *
 * Until 2026-08-11 this site sold "zero trackers" in five languages: a public
 * badge in the README, a row reading `Trackers / analytics: 0` in the
 * eco-design table, and a comparison page that reproached other planning poker
 * tools for loading an analytics vendor. Florian decided to count anyway, for
 * the whole portfolio, and the cost was never one sentence - it was seventy,
 * spread over five languages and a dozen SEO pages.
 *
 * That spread is the whole reason this file exists, and why it scans EVERY
 * shipped file rather than a named list. A sixth page written next month, in
 * any of the five languages, would carry the old boast by habit - the phrases
 * below are the product's own vocabulary - and nothing else would notice.
 *
 * It holds the equality in BOTH directions: ship the beacon and no page may
 * claim zero third parties; drop it and both policies must close the permission
 * again and the legal pages stop naming a tool that is gone.
 *
 * TWO POLICIES, and that is not a duplicate. Cloudflare Pages applies _headers
 * to static assets only, never to the responses the SvelteKit worker produces,
 * so the HTML pages take their headers from hooks.server.ts. A beacon allowed
 * in one and not the other is a page that silently fails to count, or a policy
 * that lies about what it permits.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BEACON = 'https://static.cloudflareinsights.com/beacon.min.js';
const lire = (chemin) => readFileSync(chemin, 'utf8');

const shell = lire('src/app.html');
const hooks = lire('src/hooks.server.ts');
const headers = lire('_headers');
const llms = lire('static/llms.txt');
const readme = lire('../README.md');

const measured = shell.includes(BEACON);
const faults = [];
const require_ = (condition, phrase) => {
	if (!condition) faults.push(phrase);
};

// --- les deux politiques, tenues egales entre elles et a la coquille ---
require_(
	hooks.includes(`"script-src 'self' 'unsafe-inline' ${BEACON}"`) === measured,
	`hooks.server.ts names the beacon while the shell loads it (shell: ${measured})`
);
require_(
	headers.includes(`script-src 'self' 'unsafe-inline' ${BEACON};`) === measured,
	'_headers names the beacon too, or the static half of the site disagrees'
);
require_(
	hooks.includes('wss://cleanpoker-backend.fly.dev cloudflareinsights.com') === measured,
	'hooks.server.ts lets the page view out, and nothing else'
);
require_(
	headers.includes('wss://cleanpoker-backend.fly.dev cloudflareinsights.com;') === measured,
	'_headers lets the page view out, and nothing else'
);

// Une balise sans jeton repond 200 et ne compte rien, sur toutes les pages,
// aussi longtemps que personne n'ouvre le tableau de bord.
require_(
	/"token":\s*"[0-9a-f]{32}"/.test(shell) === measured,
	'the shell carries a real site token, because an empty one counts in silence'
);
require_(
	(() => {
		const served = /"token":\s*"([0-9a-f]{32})"/.exec(shell)?.[1];
		const allowed = /'''([0-9a-f]{32})'''/.exec(lire('../.gitleaks.toml'))?.[1];
		return served === allowed;
	})(),
	'gitleaks allows exactly the token the shell serves, and no other'
);

// --- les cinq pages legales, et les deux surfaces lues par des machines ---
const LEGALES = ['', 'fr/', 'de/', 'es/', 'pt/'].map(
	(l) => `src/routes/${l}mentions-legales/+page.svelte`
);
for (const page of LEGALES) {
	require_(
		lire(page).includes('Cloudflare Web Analytics') === measured,
		`${page} names the tool while the measurement exists`
	);
}
require_(
	llms.includes('Cloudflare Web Analytics') === measured,
	'llms.txt names the tool, because that is what answer engines read'
);
require_(
	readme.includes('Cloudflare Web Analytics') === measured,
	'the README names the tool where its badge used to promise the opposite'
);
require_(
	readme.includes('badge/trackers-0') === !measured,
	'the public trackers-0 badge is gone while the site counts'
);

// --- le vocabulaire interdit, dans les cinq langues, PARTOUT ---
//
// Balaye tous les fichiers livres plutot qu'une liste nommee : ces tournures
// sont le vocabulaire maison du produit, et la prochaine page les reprendra par
// habitude. Une liste de fichiers ne verrait pas la page suivante.
const INTERDITES = [
	'zero trackers',
	'Zero trackers',
	'no trackers',
	'no third-party script',
	'No third-party script',
	'trackers-0',
	'zéro trackers',
	'Zéro trackers',
	'sans trackers',
	'sans tracker.',
	'Pas de scripts tiers',
	'sin rastreadores',
	'Sin rastreadores',
	'Sin scripts de terceros',
	'sem rastreadores',
	'Sem rastreadores',
	'Sem scripts de terceiros',
	'keine Tracker',
	'Keine Tracker',
	'null Tracker',
	'Keine Drittanbieter-Skripte'
];

const livres = [];
const parcourir = (dir) => {
	for (const e of readdirSync(dir)) {
		if (['node_modules', 'build', '.svelte-kit'].includes(e)) continue;
		const p = join(dir, e);
		if (statSync(p).isDirectory()) parcourir(p);
		else if (/\.(svelte|ts|txt|md)$/.test(e)) livres.push(p);
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

if (measured) {
	for (const chemin of livres) {
		const texte = lire(chemin);
		for (const phrase of INTERDITES) {
			if (texte.includes(phrase)) {
				faults.push(`${chemin.replaceAll('\\', '/')} still claims "${phrase}"`);
			}
		}
	}
}

// --- et ce qui reste vrai, verifie sans condition ---
//
// Ce sont les phrases que le produit vend vraiment, et aucune ne depend du
// compteur : il part a l'ouverture d'une page et ne touche pas une session.
require_(
	lire('src/routes/green/+page.svelte').includes(
		'No Google Analytics or any behavioral tracking tool'
	),
	'the eco-design page still rules out behavioural tracking'
);
require_(
	lire(LEGALES[1]).includes('rien n&apos;est écrit sur disque') ||
		lire(LEGALES[1]).includes("rien n'est écrit sur disque"),
	'the French legal page still says nothing is written to disk'
);

if (faults.length) {
	console.error('The measurement and what the site says about it have drifted apart:\n');
	for (const f of faults) console.error(`  - ${f}`);
	console.error(
		'\nEither a page is claiming something the shell no longer does, or the shell\n' +
			'is doing something the pages still deny. Both are the same defect.'
	);
	process.exit(1);
}

console.log(
	measured
		? `Measurement declared: both policies, ${LEGALES.length} legal pages, llms.txt and the README agree with the shell.`
		: 'No measurement: both policies closed, and no page claims one.'
);
