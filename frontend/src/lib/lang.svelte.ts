import { browser } from '$app/env';
import { applyLangAttribute } from '#lib/html-lang.ts';

export type Lang = 'fr' | 'en' | 'es' | 'de' | 'pt';

const LANGS = new Set<Lang>(['fr', 'en', 'es', 'de', 'pt']);
const MAX_AGE = 60 * 60 * 24 * 365;

/** The language the visitor picked, kept in the `lang` cookie, if any. */
export function langueChoisie(cookie: string): Lang | null {
	const chosen = /(?:^|;\s*)lang=([^;]+)/.exec(cookie)?.[1];
	return LANGS.has(chosen as Lang) ? (chosen as Lang) : null;
}

/** The first language of the browser that the site speaks, if any. */
export function langueDuNavigateur(preferred: readonly string[]): Lang | null {
	for (const tag of preferred) {
		const base = tag.toLowerCase().split('-')[0];
		if (LANGS.has(base as Lang)) return base as Lang;
	}
	return null;
}

/**
 * The language a visitor gets: the one they chose (the cookie), else the first
 * language of their browser that the site speaks, else English. A guest who
 * opens an invite link has no cookie yet and used to get English whatever
 * their browser said.
 */
export function pickLang(cookie: string, preferred: readonly string[]): Lang {
	return langueChoisie(cookie) ?? langueDuNavigateur(preferred) ?? 'en';
}

// Read while the module loads, never in an effect: the first client render
// is already in the right language. The server has neither and renders English.
function initialLang(): Lang {
	if (!browser) return 'en';
	return pickLang(document.cookie, globalThis.navigator?.languages ?? []);
}

function writeCookie(l: Lang) {
	document.cookie = `lang=${l}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

let _lang = $state<Lang>(initialLang());

export const lang = {
	get current(): Lang { return _lang; },
	set(l: Lang) {
		_lang = l;
		if (browser) {
			writeCookie(l);
			applyLangAttribute(document, l);
		}
	},
	/**
	 * A localized home was opened: the room opened next speaks its language.
	 * The English home says nothing, it is also where every bare link lands.
	 */
	visit(l: Lang) {
		if (l !== 'en' && l !== _lang) this.set(l);
	},
};
