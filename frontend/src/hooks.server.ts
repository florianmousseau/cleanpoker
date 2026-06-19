import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const LOCALES = ['en', 'es', 'de', 'pt'] as const;
type Locale = typeof LOCALES[number];
const LOCALE_SET = new Set<string>(LOCALES);
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type AnyLang = Locale | 'fr';

function parseAcceptLanguage(header: string | null): AnyLang | null {
	if (!header) return null;
	const primary = header.split(',')[0].split(';')[0].trim().toLowerCase();
	if (primary.startsWith('fr')) return 'fr';
	if (primary.startsWith('pt')) return 'pt';
	if (primary.startsWith('es')) return 'es';
	if (primary.startsWith('de')) return 'de';
	if (primary.startsWith('en')) return 'en';
	return null;
}

function routeLocale(pathname: string): Locale | null {
	return LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)) ?? null;
}

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const cookieOpts = { path: '/', maxAge: COOKIE_MAX_AGE, sameSite: 'lax' as const, httpOnly: false };

	if (pathname === '/') {
		const saved = event.cookies.get('lang') as Locale | undefined;
		if (saved && LOCALE_SET.has(saved)) {
			throw redirect(302, `/${saved}`);
		}
		if (saved) {
			event.cookies.set('lang', 'fr', cookieOpts);
		} else {
			const detected = parseAcceptLanguage(event.request.headers.get('accept-language'));
			if (detected === 'fr') {
				event.cookies.set('lang', 'fr', cookieOpts);
			} else {
				throw redirect(302, `/${detected ?? 'en'}`);
			}
		}
	}

	const locale = routeLocale(pathname);
	if (locale) {
		event.cookies.set('lang', locale, cookieOpts);
	}

	const themeCookie = event.cookies.get('theme');
	const themeAttr = themeCookie === 'dark' ? ' data-theme="dark"'
		: themeCookie === 'light' ? ' data-theme="light"'
		: '';

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html lang="fr">', `<html lang="${locale ?? 'fr'}"${themeAttr}>`),
	});
};
