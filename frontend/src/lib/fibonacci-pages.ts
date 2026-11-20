/** What the Fibonacci pages print, computed on the server and formatted for one language. */
import {
	RANG_MAX,
	chiffres,
	ecartDeBinet,
	estPremier,
	fib,
	formatEn,
	formatFr,
	ordinalEn,
	ordinalFr,
	rangsDiviseurs,
	rapport,
} from './fibonacci';
import { facteursPremiers } from './fibonacci-facteurs';


function tailleDe(longueur: number): 'longue' | 'moyenne' | 'courte' {
	if (longueur > 15) return 'longue';
	return longueur > 9 ? 'moyenne' : 'courte';
}

export type Langue = 'fr' | 'en';

const FORMATS = {
	fr: { nombre: formatFr, ordinal: ordinalFr, virgule: ',' },
	en: { nombre: formatEn, ordinal: ordinalEn, virgule: '.' },
};

const decimal = (texte: string, langue: Langue): string => texte.replace('.', FORMATS[langue].virgule);

function terme(n: number, langue: Langue) {
	const { nombre, ordinal } = FORMATS[langue];
	return { n, ordinal: ordinal(n), valeur: nombre(fib(n)) };
}

/** Group repeated primes: 2 2 2 3 3 becomes 2^3 and 3^2. */
function puissances(facteurs: bigint[], langue: Langue): { premier: string; exposant: number }[] {
	const sortie: { premier: string; exposant: number }[] = [];
	for (const facteur of facteurs) {
		const premier = FORMATS[langue].nombre(facteur);
		const dernier = sortie.at(-1);
		if (dernier?.premier === premier) dernier.exposant += 1;
		else sortie.push({ premier, exposant: 1 });
	}
	return sortie;
}

/** Every fact printed on the page of one rank, 1 to 100. */
export function donneesDuRang(n: number, langue: Langue) {
	const valeur = fib(n);
	const longueur = chiffres(valeur);
	const binet = ecartDeBinet(n);
	return {
		...terme(n, langue),
		chiffres: longueur,
		taille: tailleDe(longueur),
		pair: valeur % 2n === 0n,
		premier: estPremier(valeur),
		facteurs: puissances(facteursPremiers(n), langue),
		somme: n > 2 ? { a: terme(n - 2, langue), b: terme(n - 1, langue) } : null,
		precedent: n > 1 ? terme(n - 1, langue) : null,
		suivant: n < RANG_MAX ? terme(n + 1, langue) : null,
		rapport: n > 1 ? decimal(rapport(n), langue) : null,
		binet: { ...binet, mantisse: decimal(binet.mantisse, langue) },
		diviseurs: rangsDiviseurs(n).map((d) => terme(d, langue)),
		cumul: FORMATS[langue].nombre(fib(n + 2) - 1n),
	};
}
