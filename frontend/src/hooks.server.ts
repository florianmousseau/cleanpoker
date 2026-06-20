import type { Handle } from '@sveltejs/kit';

const LOCALES = ['fr', 'es', 'de', 'pt'] as const;
type Locale = typeof LOCALES[number];

function routeLocale(pathname: string): Locale | 'en' {
	const match = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
	return match ?? 'en';
}

export const handle: Handle = async ({ event, resolve }) => {
	const locale = routeLocale(event.url.pathname);

	const themeCookie = event.cookies.get('theme');
	const themeAttr = themeCookie === 'dark' ? ' data-theme="dark"'
		: themeCookie === 'light' ? ' data-theme="light"'
		: '';

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html lang="fr">', `<html lang="${locale}"${themeAttr}>`),
	});
};

