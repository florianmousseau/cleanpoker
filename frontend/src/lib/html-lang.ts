/**
 * `<html lang>` is stamped once, by the `transformPageChunk` in
 * hooks.server.ts, so it stays on the language of the first server render for
 * the rest of the visit. Switching language client-side translated the title,
 * the headings and every button, and left the attribute lying: a screen reader
 * announced German text with a French voice, and the browser offered to
 * translate a page that was already in the reader's language.
 *
 * Anything that changes the language the page is showing must call this.
 */
export function applyLangAttribute(doc: Document, l: string): void {
  doc.documentElement.lang = l;
}
