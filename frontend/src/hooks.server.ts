import type { Handle } from '@sveltejs/kit';

function detectLang(pathname: string): string {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/es')) return 'es';
  if (pathname.startsWith('/de')) return 'de';
  if (pathname.startsWith('/pt')) return 'pt';
  return 'fr';
}

export const handle: Handle = async ({ event, resolve }) => {
  const lang = detectLang(event.url.pathname);
  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('<html lang="fr">', `<html lang="${lang}">`),
  });
};
