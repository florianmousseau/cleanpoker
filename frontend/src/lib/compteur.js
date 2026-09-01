/**
 * LE COMPTEUR DE VISITEURS DU PARC. UN SEUL FICHIER, LA MEME REGLE PARTOUT.
 *
 * Ce fichier est COPIE a l'identique dans chaque depot qui sert des pages, et
 * `verifier-cockpit.ps1` refuse la moindre derive entre les copies. C'est la
 * seule facon de tenir ce que Florian a demande le 2026-08-31 - _"je veux la
 * meme regle sur tous les sites pour comparer"_ - avec trois piles differentes
 * (auregistre sur un Worker, quivad et titelia sur Fly, le reste sur Pages).
 * Une regle recopiee sans garde perd ses gardes ; ici la garde est le controle
 * d'identite octet pour octet.
 *
 * NE PAS EDITER UNE COPIE. Editer `templates/compteur/compteur.js` dans le
 * depot `assistant`, puis reporter dans toutes les copies d'un coup.
 *
 * ---------------------------------------------------------------------------
 *
 * POURQUOI IL EXISTE. D-042 a retire tout script de mesure du parc le
 * 2026-08-24. Ce qui restait etait l'analytique de zone de Cloudflare, et elle
 * ne peut pas servir de compteur d'audience :
 *
 *   - elle ne garde que 7 JOURS sur ce palier, donc aucune tendance longue ;
 *   - elle plafonne a 10 000 groupes par reponse, ce qui a oblige a decouper
 *     `quivad.fr` en tranches de 10 minutes le 2026-08-31 (34 614 groupes sur
 *     la journee) ;
 *   - elle ECHANTILLONNE les grosses zones, et on ne compte pas des entites
 *     distinctes sur un echantillon ;
 *   - et elle oblige a tirer des adresses IP brutes dans le processus qui lit.
 *
 * Compter a la source regle les quatre d'un coup, sans un octet de JavaScript
 * chez le visiteur : c'est exactement ce que vend l'API d'evenements de
 * Plausible, sans le tiers ni l'abonnement.
 *
 * L'UNITE VIENT D'AILLEURS QUE D'ICI. GoAccess definit un visiteur unique comme
 * « meme IP, meme date, meme user-agent » ; AWStats comme « au moins un hit sur
 * une PAGE » ; Plausible et Fathom hachent `sel_du_jour + domaine + IP +
 * user-agent`. Les quatre sont d'accord, et sur la page, jamais sur une image.
 * C'est cette definition-la qui est implementee, sans variante maison.
 *
 * AUCUNE ADRESSE NE SORT D'ICI, ET AUCUNE N'EST CONSERVEE. L'adresse entre dans
 * un hachage SHA-256 avec un sel qui change chaque jour et n'est jamais ecrit ;
 * ce qui est ecrit est une empreinte de 128 bits, inutilisable pour relier deux
 * journees entre elles. C'est la propriete que Plausible et Fathom vendent, et
 * elle est plus forte que ce que faisait la lecture des journaux, qui tirait des
 * IP brutes dans la memoire du cockpit.
 */

/**
 * Ce que le Worker doit fournir. Decrit en JSDoc plutot qu'importe : ce fichier
 * est du JavaScript pur, sans dependance ni etape de compilation, pour pouvoir
 * etre COPIE tel quel dans trois piles differentes.
 *
 * @typedef {object} Environnement
 * @property {string} [SEL_COMPTEUR]
 * @property {{ writeDataPoint: (point: { indexes?: string[], blobs?: string[], doubles?: number[] }) => void }} [VISITEURS]
 */

/**
 * Les navigateurs se NOMMENT. Une chaine qui s'arrete au moteur de rendu cache
 * quelque chose : `Mozilla/5.0 (Linux; arm_64; Android 14; SM-A346E)
 * AppleWebKit/537.36 (KHTML, like Gecko)` portait 10 029 requetes en 24 h sur
 * auregistre et Cloudflare le classe `Unknown`.
 *
 * Le `Safari/` nu est accepte avec `Mobile/`, parce qu'iOS ne met pas toujours
 * `Version/` : l'application Google (`GSA/... Mobile/15E148 Safari/604.1`) est
 * un vrai navigateur que Cloudflare nomme `ChromeMobile`, et la refuser PERD
 * des gens - la pire des deux erreurs.
 */
const NOM_DE_NAVIGATEUR = new RegExp(
	[
		'(?:Chrome|CriOS|Chromium|Firefox|FxiOS|Edg|EdgA|EdgiOS|OPR|Opera|SamsungBrowser|UCBrowser|YaBrowser|Silk|Trident|MSIE)/',
		'Version/[\\d.]+ (?:Mobile/\\S+ )?Safari/',
		'Mobile/\\S+ Safari/'
	].join('|')
);

/**
 * Ce qui se nomme comme un navigateur et n'en est pas un.
 *
 * Une LISTE et non une expression d'un seul tenant : la version monolithique
 * atteignait une complexite de 46 pour un plafond de 20 chez sonarjs, et
 * surtout personne ne relit une alternation de quarante termes pour verifier
 * qu'un nom n'y figure pas deux fois. Rangee par familles, elle se corrige.
 */
const MOTS_DE_ROBOT = [
	// Les mots generiques du metier, ceux qui attrapent l'inconnu de demain.
	'bot\\b', 'crawler', 'crawling', 'spider', 'slurp', 'scrap', 'probe', 'scan',
	// Les clients HTTP qui ne se cachent pas.
	'curl', 'wget', 'python', 'java(?!script)', 'okhttp', 'axios', 'node', 'go-http',
	'libwww', 'apache-http', 'fetch',
	// Les outils de mesure et de surveillance, qui chargent une page entiere.
	'monitor', 'headless', 'lighthouse', 'pagespeed',
	// Les depliants de lien des messageries : ils rendent la page pour en tirer
	// une vignette, donc ils ressemblent a un lecteur et n'en sont pas un.
	'preview', 'facebookexternalhit', 'embedly', 'whatsapp', 'telegram', 'discord', 'slackbot',
	// Les moteurs et les aspirateurs nommes, gardes meme si Cloudflare en verifie
	// deja une partie : sa liste couvre ce qu'il sait signer, pas ce qui se
	// declare.
	'semrush', 'ahrefs', 'mj12', 'dotbot', 'petal', 'bytespider', 'gptbot', 'claudebot',
	'perplexity', 'amazonbot', 'applebot', 'yandex', 'baidu', 'sogou', 'duckduck'
];
const MOT_DE_ROBOT = new RegExp(MOTS_DE_ROBOT.join('|'), 'i');

/** Le moteur de rendu. Un nom SANS moteur est une chaine forgee a la main. */
const MOTEUR = /(?:AppleWebKit|Gecko|Trident|Presto)\//;

/**
 * CE VERDICT EST CALIBRE, PAS INVENTE. Confronte a l analyseur de user-agent de
 * Cloudflare sur 1 025 914 requetes reelles de sept zones le 2026-08-31, hors
 * robots verifies : **98,94 % d accord, et ZERO faux negatif** - la regle ne
 * refuse jamais ce que Cloudflare appelle un navigateur. Le desaccord qui reste
 * va toujours dans le meme sens, celui d un compte legerement genereux, et il
 * porte sur des chaines que Cloudflare classe `Unknown`.
 *
 * Le banc qui tient ce chiffre est `evals/compteur/` ; le refaire apres toute
 * modification des listes, sinon la calibration ci-dessus devient un souvenir.
 */
/** @param {string | null | undefined} ua */
export const estNavigateur = (ua) =>
	!!ua &&
	/^Mozilla\/5\.0/.test(ua) &&
	// LES DEUX, ET C'EST LA LE POINT. Un nom sans moteur
	// (`Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0`, 1 024
	// requetes en 24 h) et un moteur sans nom (la chaine tronquee du SM-A346E,
	// 10 029 requetes) sont les DEUX formes de contrefacon relevees sur le parc,
	// et une seule des deux conditions en laisse passer une.
	MOTEUR.test(ua) &&
	NOM_DE_NAVIGATEUR.test(ua) &&
	!MOT_DE_ROBOT.test(ua);

/**
 * Une page, et pas une ressource. AWStats compte « au moins un hit sur une
 * PAGE » : un favicon, une feuille de style ou une police ne sont pas des
 * lectures, et les compter ferait dependre le chiffre des en-tetes de cache.
 * C'est exactement le defaut qui a rendu le temoin favicon faux d'un facteur
 * 0,3 a 84 selon la zone.
 */
/** @param {Response} reponse */
const estUnePage = (reponse) =>
	reponse.status < 400 && /^text\/html/i.test(reponse.headers.get('content-type') ?? '');

/** L'empreinte d'un visiteur pour la journee, jamais au-dela. */
/**
 * @param {string} sel
 * @param {string} hote
 * @param {string} adresse
 * @param {string} ua
 */
async function empreinte(sel, hote, adresse, ua) {
	const octets = new TextEncoder().encode(`${sel}|${hote}|${adresse}|${ua}`);
	const somme = await crypto.subtle.digest('SHA-256', octets);
	// 128 bits suffisent : sur dix mille visiteurs, la probabilite d'une seule
	// collision est de l'ordre de 10^-31. Les garder tous doublerait le poids
	// ecrit sans rien changer au compte.
	return [...new Uint8Array(somme).slice(0, 16)].map((o) => o.toString(16).padStart(2, '0')).join('');
}

/** Le jour UTC, qui est aussi la duree de vie de l'empreinte. */
/** @param {number} maintenant */
const jourUTC = (maintenant) => new Date(maintenant).toISOString().slice(0, 10);

/**
 * LE SEL DU JOUR N'EST PAS STOCKE, ET C'EST VOULU.
 *
 * Plausible et Fathom tirent un sel aleatoire et l'effacent a minuit. Ici il est
 * DERIVE du jour et d'un secret de deploiement : deux Workers du meme parc
 * calculent donc la meme empreinte pour le meme visiteur, ce qu'un sel aleatoire
 * par isolat rendrait impossible - et sans cette propriete, un site servi depuis
 * plusieurs colos compterait le meme lecteur plusieurs fois.
 *
 * Le secret manquant n'est PAS une erreur silencieuse : sans lui, le sel ne
 * depend que du jour, donc une empreinte redeviendrait devinable par qui
 * connait une adresse. Le compteur se tait alors plutot que de publier une
 * empreinte reversible.
 */
/**
 * @param {string | undefined} secret
 * @param {string} jour
 */
const selDuJour = (secret, jour) => (secret ? `${secret}:${jour}` : null);

/**
 * DEDUPLIQUER AU BORD, ET POURQUOI CE N'EST PAS UN DETAIL DE PERFORMANCE.
 *
 * Sans cela il faudrait ecrire un point par page servie - 3 millions par jour
 * sur auregistre - puis compter des valeurs DISTINCTES a la lecture, ce que
 * l'echantillonnage d'Analytics Engine rend faux exactement comme il rendait
 * faux le comptage sur les journaux. Avec le cache, on ecrit UNE fois par
 * visiteur et par jour, et la lecture n'est plus qu'une somme.
 *
 * Le cache est LOCAL A UN COLO. Un visiteur qui change de colo dans la journee
 * est compte deux fois, et une eviction produit le meme effet. Le compte est
 * donc une borne HAUTE, du meme cote que l'erreur du filtre d'user-agent, et
 * c'est ce que l'ecran doit dire. La borne basse, elle, n'existe plus ici :
 * elle vivait dans la lecture des journaux.
 */
/**
 * @param {string} empreinteHex
 * @param {number} maintenant
 */
async function dejaCompte(empreinteHex, maintenant) {
	// Une URL de fantaisie sur un hote qui n'existe pas : le cache accepte
	// n'importe quelle cle absolue, et celle-ci ne peut entrer en collision avec
	// aucune ressource reellement servie par le site.
	// `caches.default` est une extension Cloudflare absente du type DOM de
	// `CacheStorage`. Le cast est pose UNE fois, ici, plutot que repete : deux
	// casts se desynchronisent, un seul se relit.
	const bord = /** @type {CacheStorage & { default: Cache }} */ (caches).default;
	const cle = new Request(`https://compteur.invalide/${empreinteHex}`);
	const vu = await bord.match(cle);
	if (vu) return true;
	// L'entree expire a minuit UTC, en meme temps que l'empreinte cesse d'etre
	// calculable : une duree fixe de 24 h ferait deborder le compte d'un jour
	// sur l'autre.
	const finDuJour = Date.UTC(
		new Date(maintenant).getUTCFullYear(),
		new Date(maintenant).getUTCMonth(),
		new Date(maintenant).getUTCDate() + 1
	);
	const secondes = Math.max(60, Math.floor((finDuJour - maintenant) / 1000));
	await bord.put(
		cle,
		new Response('1', { headers: { 'cache-control': `max-age=${secondes}` } })
	);
	return false;
}

/**
 * LE VERDICT, SANS AUCUN EFFET DE BORD. Separe de `compter` pour que la sonde
 * `/etat-compteur` puisse repondre « pourquoi ce visiteur ne compte pas » sans
 * rien ecrire NI marquer le visiteur comme deja compte - une sonde qui
 * declencherait la deduplication empecherait la vraie page suivante d'etre
 * comptee, et un instrument qui abime ce qu'il mesure est pire qu'absent.
 *
 * Deux entrees, une seule regle : `compter` appelle celle-ci puis ecrit. La
 * sonde ne recopie donc jamais la liste des controles, qui divergerait au
 * premier correctif.
 *
 * Rend `null` quand la visite compte, sinon la raison en clair.
 */
/**
 * @param {Request & { cf?: Record<string, unknown> }} requete
 * @param {Response} reponse
 * @param {Environnement | undefined} env
 * @returns {string | null}
 */
export function raisonDeNePasCompter(requete, reponse, env) {
	if (!estUnePage(reponse)) return 'pas une page HTML servie en succes';

	// Le robot que Cloudflare a DEJA identifie sort en premier : c'est la seule
	// classification qui ne depend pas d'une liste ecrite ici, donc la seule qui
	// ne peut pas deriver d'un site a l'autre.
	const cf = requete.cf ?? {};
	if (cf.verifiedBotCategory) return `robot verifie : ${cf.verifiedBotCategory}`;

	if (!estNavigateur(requete.headers.get('user-agent') ?? '')) {
		return 'user-agent qui ne nomme pas un navigateur';
	}
	if (!requete.headers.get('cf-connecting-ip')) return 'aucune adresse au bord';
	if (!env?.SEL_COMPTEUR) return 'SEL_COMPTEUR absent : empreinte reversible, on ne compte pas';
	if (!env?.VISITEURS) return 'aucun binding VISITEURS';
	return null;
}

/**
 * Compte la visite si c'en est une. A appeler dans le `waitUntil` de la
 * requete : le visiteur ne doit jamais attendre le compteur.
 *
 * Rend une raison plutot qu'un booleen, parce qu'un compteur qui n'ecrit pas et
 * ne dit pas pourquoi est exactement l'instrument muet que ce parc a passe une
 * semaine a debusquer. `/etat-compteur` sert cette raison telle quelle.
 */
/**
 * @param {Request & { cf?: Record<string, unknown> }} requete
 * @param {Response} reponse
 * @param {Environnement} env
 * @param {number} [maintenant]
 * @returns {Promise<string | null>}
 */
export async function compter(requete, reponse, env, maintenant = Date.now()) {
	const refus = raisonDeNePasCompter(requete, reponse, env);
	if (refus) return refus;

	const jour = jourUTC(maintenant);
	const hote = new URL(requete.url).hostname.replace(/^www\./, '');

	// `raisonDeNePasCompter` a deja garanti les trois, et le type ne peut pas le
	// savoir. On relit plutot que d'affirmer : un `??` ici est une ceinture, pas
	// un mensonge - si l'un manquait, l'empreinte serait calculee sur du vide et
	// le compte deviendrait faux en silence, ce qui est bien pire qu'une erreur.
	const sel = selDuJour(env.SEL_COMPTEUR, jour);
	const adresse = requete.headers.get('cf-connecting-ip');
	const agent = requete.headers.get('user-agent');
	if (!sel || !adresse || !agent) return 'donnee manquante au moment de compter';

	const trace = await empreinte(sel, hote, adresse, agent);
	if (await dejaCompte(trace, maintenant)) return 'deja compte aujourd hui';

	if (!env.VISITEURS) return 'aucun binding VISITEURS';
	env.VISITEURS.writeDataPoint({
		// `index1` porte l'hote : Analytics Engine echantillonne PAR index, donc
		// une zone enorme ne peut pas faire disparaitre une petite du jeu.
		indexes: [hote],
		// Le pays voyage avec le compte parce que c'est le seul discriminant qui
		// reste quand l'user-agent ment : les fermes de proxy du parc sont en SG,
		// CN et BR, l'audience d'auregistre est en FR.
		blobs: [hote, jour, String((requete.cf ?? {}).country ?? 'XX')],
		doubles: [1]
	});
	return null;
}
