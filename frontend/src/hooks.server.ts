import type { Handle } from '@sveltejs/kit';

const LOCALES = ['fr', 'es', 'de', 'pt'] as const;
type Locale = typeof LOCALES[number];

/**
 * Cloudflare Pages applies _headers to static assets only, never to the
 * responses this worker produces, so pages would otherwise ship with none of
 * them. Keep this table and the _headers file in sync.
 */
const SECURITY_HEADERS: Record<string, string> = {
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'Content-Security-Policy': [
		"default-src 'self'",
		"connect-src 'self' https://cleanpoker-backend.fly.dev wss://cleanpoker-backend.fly.dev",
		"script-src 'self' 'unsafe-inline'",
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' data:",
		"font-src 'self'",
		"object-src 'none'",
		"base-uri 'self'",
		"frame-ancestors 'none'"
	].join('; ')
};

function routeLocale(pathname: string): Locale | 'en' {
	const match = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
	return match ?? 'en';
}

/**
 * The skip link lives in app.html, outside any component, so it is the one
 * string the Svelte translations cannot reach. Translate it here, where the
 * locale is already known.
 */
const SKIP_LINK: Record<Locale | 'en', string> = {
	en: 'Skip to main content',
	fr: 'Aller au contenu principal',
	es: 'Ir al contenido principal',
	de: 'Zum Hauptinhalt springen',
	pt: 'Ir para o conteúdo principal'
};

export const handle: Handle = async ({ event, resolve }) => {
	const locale = routeLocale(event.url.pathname);

	const themeCookie = event.cookies.get('theme');
	const themeAttr = themeCookie === 'dark' ? ' data-theme="dark"'
		: themeCookie === 'light' ? ' data-theme="light"'
		: '';

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace('<html lang="fr">', `<html lang="${locale}"${themeAttr}>`)
				.replace(
					'class="skip-link">Aller au contenu principal</a>',
					`class="skip-link">${SKIP_LINK[locale]}</a>`
				),
	});

	for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
		response.headers.set(header, value);
	}

	return response;
};

