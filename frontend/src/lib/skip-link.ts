/**
 * The skip link lives in app.html, outside every component, so it is the one
 * string the Svelte translations cannot reach. `hooks.server.ts` substitutes it
 * at render time from this table, and the room route re-applies it on the
 * client when the language on screen is not the one the server stamped.
 *
 * One table, because two would drift: a language added to the server side alone
 * would ship a room whose skip link is the only English thing left on the page.
 */
export const SKIP_LINK: Record<string, string> = {
  en: 'Skip to main content',
  fr: 'Aller au contenu principal',
  es: 'Ir al contenido principal',
  de: 'Zum Hauptinhalt springen',
  pt: 'Ir para o conteúdo principal'
};
