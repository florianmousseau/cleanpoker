import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const LOCALES = ['en', 'es', 'de', 'pt'] as const;
type Locale = typeof LOCALES[number];
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function parseAcceptLanguage(header: string | null): Locale | null {
	if (!header) return null;
	const primary = header.split(',')[0].split(';')[0].trim().toLowerCase();
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
		if (saved && LOCALES.includes(saved)) {
			throw redirect(302, `/${saved}`);
		}
		if (!saved) {
			const detected = parseAcceptLanguage(event.request.headers.get('accept-language'));
			if (detected) throw redirect(302, `/${detected}`);
		}
		event.cookies.set('lang', 'fr', cookieOpts);
	}

	const locale = routeLocale(pathname);
	if (locale) {
		event.cookies.set('lang', locale, cookieOpts);
	}

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html lang="fr">', `<html lang="${locale ?? 'fr'}">`),
	});
};
