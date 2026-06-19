import { browser } from '$app/environment';

export type Lang = 'fr' | 'en' | 'es' | 'de' | 'pt';

const LANGS = new Set<Lang>(['fr', 'en', 'es', 'de', 'pt']);
const MAX_AGE = 60 * 60 * 24 * 365;

function readCookie(): Lang {
	if (!browser) return 'fr';
	const match = /(?:^|;\s*)lang=([^;]+)/.exec(document.cookie);
	const v = match?.[1];
	return LANGS.has(v as Lang) ? (v as Lang) : 'fr';
}

function writeCookie(l: Lang) {
	document.cookie = `lang=${l}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

let _lang = $state<Lang>(readCookie());

export const lang = {
	get current(): Lang { return _lang; },
	set(l: Lang) {
		_lang = l;
		if (browser) writeCookie(l);
	},
};
