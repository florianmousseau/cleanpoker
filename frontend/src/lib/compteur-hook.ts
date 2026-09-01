/**
 * LE COMPTEUR DE VISITEURS SUR UN SITE SVELTEKIT (adaptateur Cloudflare).
 *
 * Troisieme et dernier cablage du parc, a cote de `pages-middleware.ts` pour le
 * statique et du middleware Astro d'auregistre. Il en faut trois parce que le
 * point d'accroche differe, PAS la regle : celle-ci vit dans `compteur.js` et
 * elle est identique partout, ce qu'un banc verifie octet pour octet.
 *
 * POURQUOI PAS `functions/_middleware.ts` ICI. L'adaptateur Cloudflare de
 * SvelteKit produit lui-meme le `_worker.js` du projet Pages : une Function
 * posee a cote ne serait jamais appelee, et le site afficherait un tiret dans
 * le cockpit sans qu'aucune erreur ne le dise. C'est exactement la famille de
 * panne que ce compteur existe pour ne plus produire.
 *
 * NE PAS EDITER UNE COPIE. Editer `templates/compteur/sveltekit-hook.ts` dans le
 * depot `assistant`, puis reporter partout d'un coup.
 *
 * S'IL Y A DEJA UN `handle` DANS LE DEPOT, il ne se remplace pas : il se
 * compose avec `sequence()` de `@sveltejs/kit/hooks`, et ce fichier reste une
 * copie intacte. Un depot qui fusionnerait les deux a la main perdrait la
 * garantie d'identite le jour du premier correctif.
 */
import type { Handle } from '@sveltejs/kit';
import { compter } from '$lib/compteur.js';

export const compteurDeVisiteurs: Handle = async ({ event, resolve }) => {
	const reponse = await resolve(event);

	/*
	 * APRES la reponse, et en tache de fond. Le visiteur ne doit jamais attendre
	 * le compteur : un instrument qui fait patienter ce qu'il mesure change ce
	 * qu'il mesure.
	 *
	 * `platform` est ABSENT en developpement (`vite dev`) et le `?.` n'est donc
	 * pas de la prudence decorative : sans lui, chaque page servie en local
	 * planterait. Sans `platform`, `compter` n'est jamais appelee, ce qui est le
	 * bon comportement - une session de developpement n'est pas une visite.
	 */
	event.platform?.context?.waitUntil?.(compter(event.request, reponse, event.platform.env));
	return reponse;
};
