/*
 * Aucune ligne francaise ne commence par un deux-points.
 *
 * En francais, une ponctuation double se SOUDE au mot qui la precede par une
 * espace insecable. Avec une espace ordinaire, le retour a la ligne l envoie
 * seule en tete de la ligne suivante, et c est ce qu on lit sur telephone. Meme
 * geste pour ? ! ; et les deux chevrons - l ouvrant reste sinon seul en FIN de
 * ligne.
 *
 * PERIMETRE : le francais et lui seul. Ce site sert cinq langues, et dans les
 * quatre autres l espace devant un deux-points n existe pas - la regle y serait
 * fausse. Sont donc lus `src/routes/fr` et le seul bloc `FR` de `i18n.ts`.
 *
 * L insecable ne s ecrit JAMAIS en clair : `&nbsp;` dans du balisage, `\u00A0`
 * dans une chaine. Posee litteralement elle est indiscernable d une espace
 * ordinaire a la relecture, donc indefendable dans le temps.
 *
 * Trois regimes, parce qu un `.svelte` porte trois choses :
 *
 * - le BALISAGE : balises, accolades et commentaires deviennent un caractere de
 *   meme longueur, donc `<strong>Gras</strong> :` se lit comme un seul flux ;
 * - le CODE - blocs `<script>`, fichiers `.ts` : seules les CHAINES litterales
 *   sont lues, l interieur des `${...}` est efface, donc un ternaire `a ? b : c`
 *   disparait sans que la valeur interpolee cache la faute ;
 * - les ATTRIBUTS de texte, que le masque du balisage effacerait avec leur
 *   balise alors que la meta description passe a la ligne dans un resultat de
 *   recherche.
 *
 * Le piege qui interdit d appliquer le regime des chaines au balisage : une
 * apostrophe francaise OUVRE un litteral. `n'est pas un compte : c'est` se
 * lirait comme une chaine, et la faute passerait.
 *
 * Et celui qui rend un tel controle vert en ne mesurant rien : en JavaScript,
 * `\s` MATCHE l insecable. Ecrit avec `\s`, il ne distingue pas une soudure
 * d une faute. D ou le premier `describe` : le detecteur se prouve avant de
 * mesurer quoi que ce soit.
 */
import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const ESPACE = ' ';
const INSECABLE = '\u00A0';
const ANTISLASH = String.fromCharCode(92);

/*
 * Une espace ORDINAIRE collee a la ponctuation, et rien d autre. Exiger en plus
 * une lettre juste avant ferait rater les deux formes les plus frequentes ici,
 * ou le masque laisse un trou entre le mot et le signe : `<strong>Gras</strong> :`
 * et `{valeur} :`.
 */
const FERMANT = new RegExp(`${ESPACE}[:;?!»%]`);
const OUVRANT = new RegExp(`«${ESPACE}`);

/*
 * Le POURCENT est du meme regime, et il a coute ailleurs : `100 %` et `200 %`
 * vivaient sous cette garde verte parce qu elle ne connaissait que la
 * ponctuation. Le signe se detache exactement pareil, et il suit toujours un
 * chiffre - donc une ligne qui commence par `%` a perdu son nombre.
 *
 * L anglais, lui, colle son pourcent (`72.45%`) : cette forme n a pas d espace
 * du tout et ne peut donc pas rougir.
 */

/*
 * Un signe qui OUVRE une ligne de SOURCE est la meme faute ecrite autrement :
 * le retour a la ligne d une source HTML est rendu comme une espace ordinaire,
 * donc un signe pose seul en tete de ligne s affiche colle a l espace de la
 * ligne d avant. Le `»` fermant en est le cas le plus courant, quand le
 * formateur rejoint un paragraphe.
 */
const OUVRE_LA_LIGNE = new RegExp(`^[${ESPACE}\\t]*[:;?!»%](${ESPACE}|$)`);

function estFautif(ligne: string): boolean {
  return FERMANT.test(ligne) || OUVRANT.test(ligne) || OUVRE_LA_LIGNE.test(ligne);
}

/*
 * TOUT ce qui n est pas du texte affiche devient ce caractere, de MEME longueur,
 * les sauts de ligne conserves. Ce n est pas une espace, et c est l invariant sur
 * lequel repose le reste : une espace dans le masque est une espace dans la
 * SOURCE. Avec des espaces, `&#${code};` se lirait `&#      ;` et le `>` d une
 * balise fermante rejetee a la ligne par le formateur se lirait comme une espace.
 */
function remplir(morceau: string): string {
  return morceau.replace(/[^\n]/g, 'x');
}

/** Ne laisse que les CHAINES litterales ; commentaires et `${...}` sont effaces. */
export function masqueChaines(source: string): string {
  const sortie = new Array<string>(source.length).fill('x');
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (c === '\n') {
      sortie[i] = '\n';
      i += 1;
      continue;
    }
    if (c === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') i += 1;
      continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      i += 2;
      while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) {
        if (source[i] === '\n') sortie[i] = '\n';
        i += 1;
      }
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const guillemet = c;
      const ouverture = i;
      const ecrits: [number, string][] = [];
      let profondeur = 0;
      let ferme = false;
      i += 1;
      while (i < source.length) {
        const d = source[i];
        if (d === ANTISLASH) {
          i += 2;
          continue;
        }
        if (guillemet === '`' && d === '$' && source[i + 1] === '{') {
          profondeur += 1;
          sortie[i] = 'x';
          sortie[i + 1] = 'x';
          i += 2;
          continue;
        }
        if (profondeur > 0) {
          if (d === '}') profondeur -= 1;
          sortie[i] = d === '\n' ? '\n' : 'x';
          i += 1;
          continue;
        }
        if (d === guillemet) {
          i += 1;
          ferme = true;
          break;
        }
        /*
         * Une chaine a guillemet simple ou double ne traverse PAS une fin de
         * ligne. Ce qui a ouvert etait donc autre chose - le plus souvent le `"`
         * d une classe de caracteres dans une expression reguliere. Sans ce
         * garde-fou, cette fausse chaine avale la moitie du fichier, et le code
         * qu elle avale se lit comme du texte affiche.
         */
        if (d === '\n') {
          if (guillemet !== '`') break;
          sortie[i] = '\n';
          i += 1;
          continue;
        }
        ecrits.push([i, d]);
        i += 1;
      }
      if (ferme || guillemet === '`') for (const [index, caractere] of ecrits) sortie[index] = caractere;
      else i = ouverture + 1;
      continue;
    }
    i += 1;
  }
  return sortie.join('');
}

/** Les marques d une expression, pas d une phrase. */
const CODE = /\?\s*[('"`]|[)'"`]\s*:|=>|&&|\|\||\?\?/;
const COMMENTAIRE = /<!--[\s\S]*?-->/g;
const BLOC = /<(script|style)\b[^>]*>([\s\S]*?)<\/\1>/g;

/*
 * Le JSON-LD, et il sort du perimetre pour une raison mesurable. Chaque page
 * francaise construit son graphe dans un `{@html `...`}` du `<svelte:head>` :
 * une chaine JavaScript passee a `JSON.stringify`, puis injectee telle quelle
 * dans un `<script type="application/ld+json">`. Un navigateur ne decode AUCUNE
 * entite a l interieur d un `script` - `&nbsp;` y serait donc servi en clair au
 * robot qui lit le graphe, exactement le defaut que la vitrine fidalo a paye le
 * 2026-08-16 avec `&amp;nbsp;`.
 *
 * Et souder ces chaines ne repare rien : ce n est pas du texte qui se coupe a la
 * largeur d un ecran, c est une DONNEE servie a une machine. La copie VISIBLE
 * des memes phrases, elle, est soudee et c est celle que la regle vise. Meme
 * arbitrage que chez auregistre le 2026-08-19.
 */
const JSON_LD = /\{@html\s+`[\s\S]*?`\}/g;

function sansCommentairesNiBlocs(source: string): string {
  return source.replace(COMMENTAIRE, remplir).replace(BLOC, remplir).replace(JSON_LD, remplir);
}

/** Ne laisse que le TEXTE ; balises, accolades et commentaires sont effaces. */
export function masqueBalisage(source: string): string {
  let texte = sansCommentairesNiBlocs(source);
  // De la plus INTERNE vers la plus externe : sinon la valeur interpolee cache la faute.
  let precedent: string;
  do {
    precedent = texte;
    texte = texte.replace(/\{[^{}]*\}/g, remplir);
  } while (texte !== precedent);
  return texte.replace(/<[^<>]*>/g, remplir);
}

/*
 * L accolade effacee emporte aussi le BALISAGE qu elle contient, et
 * `{#if ...}<p>Un texte</p>{/if}` est la forme meme de Svelte. Cette seconde
 * lecture garde les accolades et ecarte les seules LIGNES qui portent une marque
 * d expression.
 */
export function masqueBalisageSansAccolades(source: string): string {
  return sansCommentairesNiBlocs(source)
    .replace(/<[^<>]*>/g, remplir)
    .split('\n')
    .map((ligne) => (CODE.test(ligne) ? remplir(ligne) : ligne))
    .join('\n');
}

/*
 * Les attributs, qui sont du TEXTE bien plus souvent qu on ne croit et que le
 * masque du balisage efface avec leur balise. Deux raisons de les lire, et la
 * seconde est celle qui a manque :
 *
 * - la meta description passe a la ligne dans un resultat de recherche ;
 * - l accueil francais N EST QUE des attributs. Il ne porte pas une phrase de
 *   balisage : il passe vingt-cinq PROPS a `HomepageTemplate`, dont son `h1`
 *   et son chapeau. Une liste blanche de noms d attributs standards ne voit
 *   rien de cette page, et c est pour ca qu il y a ici une liste NOIRE.
 *
 * Ecarte donc ce qui n est jamais lu : une adresse, une classe, un identifiant
 * de langue. Tout le reste est du texte jusqu a preuve du contraire.
 */
const ATTRIBUT_TECHNIQUE = new Set([
  'class',
  'href',
  'src',
  'srcset',
  'rel',
  'id',
  'style',
  'type',
  'name',
  'property',
  'lang',
  'hreflang',
  'locale',
  'charset',
  'canonical',
  'jsonLdUrl',
  'ogLocale',
  'width',
  'height',
  'viewBox',
  'd',
  'fill',
  'role'
]);
const ATTRIBUT = /\b([\w:-]+)=(["'])((?:(?!\2)[\s\S])*)\2/g;

export function masqueAttributs(source: string): string {
  const sortie = remplir(source).split('');
  for (const trouve of source.matchAll(ATTRIBUT)) {
    if (ATTRIBUT_TECHNIQUE.has(trouve[1])) continue;
    const debut = (trouve.index ?? 0) + trouve[0].length - trouve[3].length - 1;
    for (let i = 0; i < trouve[3].length; i += 1) sortie[debut + i] = trouve[3][i];
  }
  return sortie.join('');
}

/** Meme longueur que la source : seul le CORPS des blocs `<script>` est garde. */
function regionsCode(source: string): string {
  const garde = remplir(source).split('');
  for (const trouve of source.matchAll(BLOC)) {
    if (trouve[1] !== 'script' || trouve[2].length === 0) continue;
    const debut = (trouve.index ?? 0) + trouve[0].indexOf(trouve[2]);
    for (let i = debut; i < debut + trouve[2].length; i += 1) garde[i] = source[i];
  }
  return garde.join('');
}

const RACINE = 'src/routes/fr';
const DICTIONNAIRE = 'src/lib/i18n.ts';
/*
 * La page d erreur est ecrite en francais pour les cinq langues - elle porte
 * « Erreur 404 » et « Retour a l accueil » en dur - et elle vit hors de
 * `routes/fr`. Sans cette ligne, le seul ecran francais du site qu aucun
 * dictionnaire ne traduit echapperait au cliquet.
 */
const ERREUR = 'src/routes/+error.svelte';

function* fichiers(dossier: string): Generator<string> {
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) yield* fichiers(chemin);
    else if (extname(nom) === '.svelte' || extname(nom) === '.ts') yield chemin;
  }
}

/** Le seul bloc `FR`, de meme longueur que le fichier pour garder ses lignes. */
function blocFrancais(source: string): string {
  const debut = source.indexOf('export const FR');
  const suivant = source.indexOf('export const ', debut + 1);
  const fin = suivant === -1 ? source.length : suivant;
  return source
    .split('')
    .map((c, i) => (c === '\n' ? '\n' : i >= debut && i < fin ? c : 'x'))
    .join('');
}

function fautesDe(chemin: string, source: string): string[] {
  const lignes = new Map<number, string>();
  const relever = (contenu: string) => {
    contenu.split('\n').forEach((ligne, index) => {
      if (estFautif(ligne)) lignes.set(index + 1, ligne.trim().slice(0, 100));
    });
  };
  if (extname(chemin) === '.svelte') {
    relever(masqueChaines(regionsCode(source)));
    relever(masqueBalisage(source));
    relever(masqueBalisageSansAccolades(source));
    relever(masqueAttributs(source));
  } else {
    relever(masqueChaines(source));
  }
  return [...lignes.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([numero, ligne]) => `${chemin}:${numero} ${ligne}`);
}

describe('le detecteur de ponctuation decollee', () => {
  /*
   * Chaque cas dit ce qu il protege. Le retirer laisse passer exactement la
   * faute qu il nomme, et un detecteur casse passe au vert en ne mesurant rien.
   */
  it.each([
    ['une espace ordinaire devant le deux-points', estFautif('Le vote est ouvert : chacun choisit.'), true],
    ['la soudure', estFautif(`Le vote est ouvert${INSECABLE}: chacun choisit.`), false],
    ['le point d interrogation', estFautif('Quelle carte choisir ?'), true],
    ['le chevron ouvrant', estFautif('Un outil « gratuit ».'), true],
    ['les deux chevrons soudes', estFautif(`Un outil «${INSECABLE}gratuit${INSECABLE}».`), false],
    ["l heure, qui n est pas une ponctuation double", estFautif('Rendez-vous a 12:30.'), false],
    ['le pourcent detache', estFautif('Hebergement 100 % renouvelable.'), true],
    ['le pourcent soude', estFautif(`Hebergement 100${INSECABLE}% renouvelable.`), false],
    ["le pourcent anglais, colle, qui est la forme JUSTE", estFautif('72.45% of the total.'), false],
    ['le signe qui OUVRE une ligne de source', estFautif('  : la suite de la phrase'), true],
    ['le pourcent qui OUVRE une ligne de source', estFautif('% de couverture'), true],
    ["le deux-points colle, qui n ouvre rien", estFautif(':root { color: red; }'), false],
    [
      'la balise entre le mot et le signe',
      estFautif(masqueBalisage('<p><strong>Force</strong> : rapide</p>')),
      true
    ],
    [
      'la balise fermante rejetee a la ligne, qui ne laisse aucune espace',
      estFautif(masqueBalisage('<p>public</a\n\t>: suite</p>').split('\n')[1]),
      false
    ],
    [
      'l accolade, qui ne doit pas cacher la faute qui la suit',
      estFautif(masqueBalisage('<p>{titre(a, b)} : suite</p>')),
      true
    ],
    ['le bloc Svelte, entierement efface', estFautif(masqueBalisage('<p>{actif ? oui : non}</p>')), false],
    ['l insecable du balisage', estFautif(masqueBalisage('<p><b>Force</b>&nbsp;: rapide</p>')), false],
    ['le ternaire, qui n est pas du texte', estFautif(masqueChaines('const x = actif ? oui : non;')), false],
    ['la chaine, qui en est', estFautif(masqueChaines("const x = 'Le vote : ouvert';")), true],
    ['le commentaire, qui ne l est pas', estFautif(masqueChaines('// Le vote : ouvert')), false],
    [
      'l interpolation, qui ne doit pas cacher la faute qui la suit',
      estFautif(masqueChaines('const x = `${a ? b : c} le vote : ouvert`;')),
      true
    ],
    [
      'l interpolation collee a son signe, qui n est pas une faute',
      estFautif(masqueChaines('const x = `&#${code};`;')),
      false
    ],
    [
      'l expression reguliere a guillemet, qui n ouvre pas de chaine',
      estFautif(
        masqueChaines(['const e = (v) => v.replace(/[&<>"]/g, s);', 'const n = a ?? b;'].join('\n')).split(
          '\n'
        )[1]
      ),
      false
    ],
    [
      'l attribut de texte, que le masque du balisage efface',
      estFautif(masqueAttributs('<meta name="description" content="Un outil : lequel" />')),
      true
    ],
    [
      'la PROP d un composant, seul texte de l accueil francais',
      estFautif(masqueAttributs('<HomepageTemplate h1Main="Poker planning :" />')),
      true
    ],
    ["l attribut technique, qui n est jamais lu", estFautif(masqueAttributs('<a class="lien" href="/a?b=1">x</a>')), false],
    [
      'le JSON-LD, donnee servie a une machine et non texte a l ecran',
      estFautif(masqueBalisageSansAccolades('{@html `<script>${JSON.stringify({ n: "Un titre : deux" })}<\\/script>`}')),
      false
    ],
    [
      'la phrase qui SUIT le graphe, qui elle est du texte',
      estFautif(
        masqueBalisageSansAccolades(
          ['{@html `<script>${JSON.stringify({ n: "x" })}<\\/script>`}', '<p>Un titre : deux</p>'].join('\n')
        ).split('\n')[1]
      ),
      true
    ]
  ])('%s', (_nom, mesure, attendu) => {
    expect(mesure).toBe(attendu);
  });

  it("ne prend pas l insecable pour une espace", () => {
    // En JavaScript `\s` matche l insecable : un controle ecrit avec `\s` rougirait ici.
    expect(FERMANT.test(`ouvert${INSECABLE}:`)).toBe(false);
    expect(FERMANT.test('ouvert :')).toBe(true);
  });
});

describe('le texte francais affiche', () => {
  it('ne porte aucune espace ordinaire devant une ponctuation double', () => {
    const fautes = [
      ...[...fichiers(RACINE), ERREUR].flatMap((chemin) =>
        fautesDe(chemin, readFileSync(chemin, 'utf8'))
      ),
      ...fautesDe(DICTIONNAIRE, blocFrancais(readFileSync(DICTIONNAIRE, 'utf8')))
    ];
    expect(fautes).toEqual([]);
  });

  /*
   * L entite ne se decode pas dans un `script`, donc `&nbsp;` ecrit dans le
   * graphe serait servi en clair. Le controle ci-dessus ne peut pas l attraper :
   * il vient justement d ecarter ces blocs.
   */
  it("n ecrit aucune entite dans le JSON-LD, qu aucun navigateur n y decode", () => {
    const fautifs = [...fichiers(RACINE)].filter((chemin) =>
      (readFileSync(chemin, 'utf8').match(JSON_LD) ?? []).some((bloc) => bloc.includes('&nbsp;'))
    );
    expect(fautifs).toEqual([]);
  });

  it("n ecrit jamais l insecable en clair dans une source", () => {
    const enClair = [...fichiers(RACINE), ERREUR, DICTIONNAIRE].filter((chemin) =>
      readFileSync(chemin, 'utf8').includes(INSECABLE)
    );
    expect(enClair).toEqual([]);
  });
});
