/*
 * Toute page publiee recoit au moins un lien d une autre page.
 *
 * Un sitemap DECLARE une page ; un lien la RECOMMANDE, et c est la
 * recommandation qui pese. Une page qu on n atteint qu au sitemap est visitee
 * une fois, classee au plus bas, puis oubliee.
 *
 * Ce que ce controle a trouve le 2026-08-23, et pourquoi il existe : les pages
 * de contenu de/es/pt - `fibonacci`, `estimation-agile`, `alternatives` -
 * existaient, etaient traduites, etaient au sitemap et portaient leurs
 * `hreflang`, et AUCUN lien du site ne pointait dessus. Les cartes de la page
 * "a propos" avaient ete posees en anglais et en francais, jamais dans les
 * trois autres langues. Rien ne pouvait le voir : la page repond 200, le
 * sitemap est complet, aucun lien n est mort.
 *
 * Le controle est sur la SOURCE et non sur le site construit, pour deux
 * raisons : il tourne dans la gate, avant tout deploiement, et une page ajoutee
 * sans lien echoue alors le jour ou elle est ecrite.
 *
 * PERIMETRE : les routes statiques. Une route dynamique (`[id]`) n a pas d
 * adresse fixe a chercher, et l accueil de chaque langue est une porte d
 * entree - elle se juge sur le selecteur de langue, pas ici.
 */
import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = join(import.meta.dirname ?? __dirname, '.');
const ROUTES = join(SRC, 'routes');

/* Les accueils : `/`, `/de`, `/es`, `/fr`, `/pt`. Portes d entree, pas des feuilles. */
const ACCUEILS = new Set(['/', '/de', '/es', '/fr', '/pt']);

function fichiers(racine: string, suffixe: string): string[] {
  const sortie: string[] = [];
  for (const entree of readdirSync(racine)) {
    const chemin = join(racine, entree);
    if (statSync(chemin).isDirectory()) {
      if (entree === 'node_modules') continue;
      sortie.push(...fichiers(chemin, suffixe));
    } else if (entree.endsWith(suffixe)) {
      sortie.push(chemin);
    }
  }
  return sortie;
}

/* `src/routes/de/fibonacci/+page.svelte` -> `/de/fibonacci`. */
function adresseDeLaRoute(chemin: string): string {
  const relatif = chemin.slice(ROUTES.length).replace(/\\/g, '/');
  const dossier = relatif.replace(/\/\+page\.svelte$/, '');
  return dossier === '' ? '/' : dossier;
}

const pagesPubliees = fichiers(ROUTES, '+page.svelte')
  .map(adresseDeLaRoute)
  .filter((adresse) => !adresse.includes('['))
  .filter((adresse) => !ACCUEILS.has(adresse));

/*
 * Les liens de TOUT `src`, pas des seules routes : la navigation, le pied de
 * page et le selecteur de langue vivent dans `src/lib`, et ce sont eux qui
 * portent la moitie du maillage.
 */
const liens = new Set<string>();
for (const fichier of [...fichiers(SRC, '.svelte'), ...fichiers(SRC, '.ts')]) {
  const source = readFileSync(fichier, 'utf8');
  const porteuse = adresseDeLaRoute(fichier);
  for (const trouve of source.matchAll(/href="(\/[^"#?]*)/g)) {
    const cible = trouve[1].replace(/\/$/, '') || '/';
    /* Un lien d une page vers elle-meme ne la recommande pas. */
    if (cible !== porteuse) liens.add(cible);
  }
}

describe('le detecteur voit ce qu il pretend voir', () => {
  it('trouve les pages et les liens', () => {
    expect(pagesPubliees.length).toBeGreaterThan(20);
    expect(liens.size).toBeGreaterThan(20);
  });

  it('sait dire qu une adresse absente n est pas liee', () => {
    expect(liens.has('/de/page-qui-n-existe-pas')).toBe(false);
  });
});

describe('aucune page orpheline', () => {
  it.each(pagesPubliees)('%s recoit au moins un lien interne', (adresse) => {
    expect(liens.has(adresse)).toBe(true);
  });
});
