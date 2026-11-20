/** The Fibonacci sequence with F(1) = F(2) = 1, computed exactly. It runs on the server only: no client chunk carries it. */

export const RANG_MAX = 100;

const INSECABLE = '\u00A0';

/** Return F(n) for n >= 0, with F(0) = 0. */
export function fib(n: number): bigint {
	if (!Number.isInteger(n) || n < 0) throw new RangeError(`rank out of range: ${n}`);
	let a = 0n;
	let b = 1n;
	for (let i = 0; i < n; i++) [a, b] = [b, a + b];
	return a;
}

/** Tell whether a URL segment names a rank from 1 to RANG_MAX, written without sign or leading zero. */
export function estUnRang(segment: string): boolean {
	return /^[1-9]\d{0,2}$/.test(segment) && Number(segment) <= RANG_MAX;
}

const PAGE_DE_RANG = /^\/(?:fr\/suite-de-fibonacci|fibonacci-numbers)\/([^/]+)\/?$/;

/**
 * Tell whether a path asks for a rank page that does not exist, such as
 * /fibonacci-numbers/101 or /fr/suite-de-fibonacci/abc. The hook answers those
 * with a 404: the route itself accepts any segment.
 */
export function rangInconnu(pathname: string): boolean {
	const trouve = PAGE_DE_RANG.exec(pathname);
	return trouve !== null && !estUnRang(trouve[1]);
}

function grouper(valeur: bigint, separateur: string): string {
	return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separateur);
}

/** Format with non-breaking spaces between thousands. */
export const formatFr = (valeur: bigint): string => grouper(valeur, INSECABLE);

/** Format with commas between thousands. */
export const formatEn = (valeur: bigint): string => grouper(valeur, ',');

/** Return the French ordinal: 1er, 2e, 3e. */
export const ordinalFr = (n: number): string => (n === 1 ? '1er' : `${n}e`);

/** Return the English ordinal: 1st, 2nd, 3rd, 4th, 11th, 21st. */
export function ordinalEn(n: number): string {
	const dizaines = n % 100;
	if (dizaines >= 11 && dizaines <= 13) return `${n}th`;
	return `${n}${['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
}

/** Count the decimal digits of a positive integer. */
export const chiffres = (valeur: bigint): number => valeur.toString().length;

function puissanceModulo(base: bigint, exposant: bigint, modulo: bigint): bigint {
	let resultat = 1n;
	let b = base % modulo;
	let e = exposant;
	while (e > 0n) {
		if (e & 1n) resultat = (resultat * b) % modulo;
		b = (b * b) % modulo;
		e >>= 1n;
	}
	return resultat;
}

/* The first twelve primes as bases make Miller-Rabin exact below 3.3e24; F(100) is 3.5e20. */
const TEMOINS = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];

function estTemoinDeComposition(temoin: bigint, n: bigint, d: bigint, r: number): boolean {
	let x = puissanceModulo(temoin, d, n);
	if (x === 1n || x === n - 1n) return false;
	for (let i = 1; i < r; i++) {
		x = (x * x) % n;
		if (x === n - 1n) return false;
	}
	return true;
}

/** Decide primality exactly for any integer below 3.3e24. */
export function estPremier(n: bigint): boolean {
	if (n < 2n) return false;
	for (const p of TEMOINS) {
		if (n === p) return true;
		if (n % p === 0n) return false;
	}
	let d = n - 1n;
	let r = 0;
	while ((d & 1n) === 0n) {
		d >>= 1n;
		r += 1;
	}
	return !TEMOINS.some((temoin) => estTemoinDeComposition(temoin, n, d, r));
}

/** Return F(n) / F(n-1) rounded to the given number of decimals, as digits around a point. Needs n >= 2. */
export function rapport(n: number, decimales = 10): string {
	const echelle = 10n ** BigInt(decimales);
	const precedent = fib(n - 1);
	const arrondi = (fib(n) * echelle + precedent / 2n) / precedent;
	return `${arrondi / echelle}.${(arrondi % echelle).toString().padStart(decimales, '0')}`;
}

/**
 * Return the gap between phi^n / sqrt(5) and F(n), which is psi^n / sqrt(5):
 * above F(n) on even ranks, below on odd ones.
 */
export function ecartDeBinet(n: number): { auDessus: boolean; mantisse: string; exposant: number } {
	const racine = Math.sqrt(5);
	const [mantisse, exposant] = (Math.pow((racine - 1) / 2, n) / racine).toExponential(2).split('e');
	return { auDessus: n % 2 === 0, mantisse, exposant: Number(exposant) };
}

/** Return the divisors d of n with 2 < d < n: exactly the ranks whose term, above 1, divides F(n). */
export function rangsDiviseurs(n: number): number[] {
	const sortie: number[] = [];
	for (let d = 3; d < n; d++) if (n % d === 0) sortie.push(d);
	return sortie;
}
