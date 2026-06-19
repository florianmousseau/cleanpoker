import { browser } from '$app/environment';

export type Lang = 'fr' | 'en' | 'es' | 'de' | 'pt';

const LANGS: readonly Lang[] = ['fr', 'en', 'es', 'de', 'pt'];
const MAX_AGE = 60 * 60 * 24 * 365;

function readCookie(): Lang {
	if (!browser) return 'fr';
	const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
	const v = match?.[1];
	return LANGS.includes(v as Lang) ? (v as Lang) : 'fr';
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
