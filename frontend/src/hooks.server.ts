import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;
  const lang =
    path.startsWith('/en') ? 'en' :
    path.startsWith('/es') ? 'es' :
    path.startsWith('/de') ? 'de' :
    path.startsWith('/pt') ? 'pt' : 'fr';

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('<html lang="fr">', `<html lang="${lang}">`),
  });
};
