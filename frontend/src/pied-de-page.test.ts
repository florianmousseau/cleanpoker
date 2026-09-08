/*
 * Un meme lien porte un seul libelle, dans une langue donnee.
 *
 * Le pied de page est recopie A LA MAIN dans les quarante fichiers de route, et
 * rien ne comparait une page a l autre. Mesure du 2026-09-08 sur la production,
 * avec `setup/scripts/motifs.ps1` du cockpit : l anglais servait « MIT License »
 * sur cinq pages et « MIT Licence » sur trois, l allemand « Uber uns » sur trois
 * et « Uber CleanPoker » sur quatre. Deux libelles pour un meme lien, c est le
 * lecteur qui se demande si c est la meme page.
 *
 * La cle est l ADRESSE, pas la position : elle survit a un lien ajoute ou
 * deplace, et elle compare ce qui doit l etre. Les cinq accueils ne portent pas
 * de balisage de pied - ils passent leurs libelles en props a
 * `HomepageTemplate` - donc ces props sont lues sous le meme regime, la prop
 * tenant lieu d adresse.
 *
 * PERIMETRE : une langue a la fois. « About » et « Uber uns » designent le meme
 * lien et n ont aucune raison de se ressembler.
 */
import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';

const ROUTES = 'src/routes';
const LANGUES = ['fr', 'es', 'de', 'pt'];

function* pages(dossier: string): Generator<string> {
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) yield* pages(chemin);
    else if (nom === '+page.svelte') yield chemin;
  }
}

/** Le prefixe de route, ou `en` quand il n y en a pas : l anglais est a la racine. */
export function langueDe(chemin: string): string {
  const segments = chemin.split(sep);
  const apres = segments[segments.indexOf('routes') + 1];
  return LANGUES.includes(apres) ? apres : 'en';
}

const PIED = /<footer\b[^>]*>([\s\S]*?)<\/footer>/g;
const LIEN = /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
const PROP = /\bfooter(Source|License|About|Legal|Privacy)="([^"]*)"/g;

/** Les couples (cle, libelle) d un fichier : les liens du pied, puis ses props. */
export function libellesDe(source: string): [string, string][] {
  const couples: [string, string][] = [];
  for (const pied of source.matchAll(PIED)) {
    for (const lien of pied[1].matchAll(LIEN)) {
      /*
       * Le contenu du lien est pris TEL QUEL, seuls ses blancs sont normalises.
       * Un retrait de balises par expression reguliere serait lu comme une
       * desinfection HTML - CodeQL l a refuse en `js/incomplete-multi-character
       * -sanitization`, et il a raison sur le principe meme si ce fichier ne
       * sert rien a personne. Aucun des quarante pieds ne porte de balise a
       * l interieur d un lien, et s il en naissait une, elle ferait partie du
       * libelle compare : deux pages qui la posent differemment doivent diverger.
       */
      const libelle = lien[2].replace(/\s+/g, ' ').trim();
      if (libelle) couples.push([lien[1], libelle]);
    }
  }
  for (const prop of source.matchAll(PROP)) couples.push([`footer${prop[1]}`, prop[2]]);
  return couples;
}

describe('le lecteur de pieds de page', () => {
  it('lit un lien du pied, et pas un lien du corps', () => {
    const source = '<main><a href="/x">Corps</a></main><footer><a href="/y">Pied</a></footer>';
    expect(libellesDe(source)).toEqual([['/y', 'Pied']]);
  });

  it('lit les props des accueils, qui ne portent aucun balisage de pied', () => {
    expect(libellesDe('<HomepageTemplate footerAbout="Uber uns" />')).toEqual([
      ['footerAbout', 'Uber uns']
    ]);
  });

  it('range une page traduite dans sa langue, la racine dans en', () => {
    expect(langueDe(join('src', 'routes', 'de', 'green', '+page.svelte'))).toBe('de');
    expect(langueDe(join('src', 'routes', 'green', '+page.svelte'))).toBe('en');
  });
});

describe('le pied de page servi', () => {
  it('donne un seul libelle a chaque lien, dans chaque langue', () => {
    const vus = new Map<string, Map<string, string[]>>();
    for (const chemin of pages(ROUTES)) {
      const langue = langueDe(chemin);
      for (const [cle, libelle] of libellesDe(readFileSync(chemin, 'utf8'))) {
        const parCle = vus.get(`${langue} ${cle}`) ?? new Map<string, string[]>();
        parCle.set(libelle, [...(parCle.get(libelle) ?? []), chemin]);
        vus.set(`${langue} ${cle}`, parCle);
      }
    }
    const divergents = [...vus.entries()]
      .filter(([, parCle]) => parCle.size > 1)
      .map(([cle, parCle]) => `${cle} : ${[...parCle.keys()].join(' / ')}`);
    expect(divergents).toEqual([]);
  });
});
