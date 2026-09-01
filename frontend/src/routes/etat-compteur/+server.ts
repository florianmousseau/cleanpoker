/**
 * POURQUOI LE COMPTEUR NE COMPTE PAS, sur demande - version SvelteKit.
 *
 * Jumeau de `functions/etat-compteur.ts` (site Pages statique), pour les sites
 * dont l'adaptateur Cloudflare possede deja le `_worker.js` : une Function
 * posee a cote n'y serait jamais appelee, donc la sonde doit etre une ROUTE.
 *
 * Un compteur qui n'ecrit rien et ne dit pas pourquoi est exactement
 * l'instrument que ce parc a passe une semaine a debusquer : la balise RUM a
 * servi une decroissance lisse et credible pendant six jours apres avoir ete
 * debranchee, et le temoin favicon a rendu des chiffres faux d'un facteur 84
 * sans qu'aucune sonde ne puisse le dire. Les deux fois, le defaut n'etait pas
 * le calcul, c'etait l'absence de sortie.
 *
 * Cette route rejoue la decision sur la requete qui l'appelle et rend la RAISON
 * telle quelle. Elle est la SEULE preuve qui distingue « pose et silencieux »
 * de « pas pose du tout », et le piege paye le 2026-08-31 dit pourquoi elle ne
 * suffit pas de la lire une fois : une autre session a redeploye auregistre
 * quarante-quatre secondes apres un merge, depuis un build anterieur, et la
 * production a perdu le compteur sans que la CI ni personne ne le dise.
 *
 * Elle est en `noindex` et ne porte aucune donnee personnelle : ni adresse, ni
 * empreinte, seulement le verdict et ce que le bord a vu du client.
 *
 * NE PAS EDITER UNE COPIE. Editer `templates/compteur/sveltekit-etat.ts` dans
 * le depot `assistant`, puis reporter partout d'un coup.
 */
import type { RequestHandler } from '@sveltejs/kit';
import { raisonDeNePasCompter } from '$lib/compteur.js';

/*
 * Un site entierement prerendu prerendrait aussi cette route, et servirait donc
 * un verdict FIGE AU BUILD - c'est-a-dire le contraire d'une sonde. Le `false`
 * est explicite ici plutot que suppose : c'est la seule ligne du fichier dont
 * l'oubli rendrait la sonde credible et fausse.
 */
export const prerender = false;

export const GET: RequestHandler = ({ request, platform }) => {
	/*
	 * `cf` est lu SUR LA REQUETE, et pas sur `platform`, parce que c'est
	 * exactement ce que la regle lit. Une sonde qui irait chercher la donnee a
	 * un second endroit repondrait juste sur un compteur aveugle.
	 */
	const cf = (request as { cf?: Record<string, unknown> }).cf ?? {};
	const ua = request.headers.get('user-agent') ?? '';
	const env = platform?.env;

	/*
	 * La raison rendue par la VRAIE regle, sur une reponse HTML feinte. Une copie
	 * des controles ici divergerait au premier correctif, ce qui est precisement
	 * ce que ce compteur existe pour empecher.
	 *
	 * `raisonDeNePasCompter` et non `compter` : la seconde marquerait le visiteur
	 * comme deja compte dans le cache d'arete, donc appeler la sonde empecherait
	 * sa page suivante d'etre comptee. Un instrument qui abime ce qu'il mesure
	 * est pire qu'absent.
	 */
	const commeUnePage = new Response('', {
		headers: { 'content-type': 'text/html; charset=utf-8' }
	});
	const raison = raisonDeNePasCompter(request, commeUnePage, env);

	return new Response(
		JSON.stringify(
			{
				// Ce que la chaine dirait de VOUS, moins l'ecriture.
				verdict: raison ?? 'compterait',
				// L'etat du cablage, qui est l'autre moitie de la question. Les deux
				// se lisent ensemble : un verdict « compterait » avec un binding
				// absent est impossible, et l'inverse designe le site, pas le client.
				bindingVisiteurs: Boolean(env?.VISITEURS),
				selPose: Boolean(env?.SEL_COMPTEUR),
				// Le bord pose `cf` sur la requete ; si ce faux venait a devenir vrai
				// en production, le compteur cesserait de voir les robots verifies et
				// le pays sans qu'aucun autre champ ne bouge.
				cfSurLaRequete: Object.keys(cf).length > 0,
				// Ce que le bord a vu, sans rien qui identifie personne.
				robotVerifie: cf['verifiedBotCategory'] || null,
				pays: cf['country'] ?? null,
				colo: cf['colo'] ?? null,
				userAgent: ua.slice(0, 200)
			},
			null,
			'\t'
		),
		{
			headers: {
				'content-type': 'application/json; charset=utf-8',
				'cache-control': 'no-store',
				'x-robots-tag': 'noindex'
			}
		}
	);
};
