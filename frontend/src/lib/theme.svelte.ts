import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getEffectiveTheme(): Theme {
	if (!browser) return 'light';
	const attr = document.documentElement.getAttribute('data-theme');
	if (attr === 'dark' || attr === 'light') return attr;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let _theme = $state<Theme>(getEffectiveTheme());

export const theme = {
	get current(): Theme { return _theme; },
	toggle() {
		const next: Theme = _theme === 'dark' ? 'light' : 'dark';
		_theme = next;
		if (browser) {
			document.documentElement.setAttribute('data-theme', next);
			document.cookie = `theme=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
		}
	},
};
