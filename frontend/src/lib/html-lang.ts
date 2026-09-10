import { SKIP_LINK } from '$lib/skip-link';

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

/**
 * A room URL carries no locale prefix, so the server has nothing to read it
 * from and stamps `en` for everyone. The room itself renders in the visitor's
 * cookie language, so a French team opening the shared link got the whole page
 * in French under `lang="en"`, with an English skip link on top of it - and
 * that link is the only way anyone ever reaches a room.
 *
 * Fixed here on the client rather than at the edge on purpose: reading the
 * cookie in `hooks.server.ts` would make a room's HTML vary per visitor, and
 * Cloudflare Pages would then need a `Vary` this site does not send.
 */
export function accorderDocumentALaLangue(doc: Document, l: string): void {
  const wording = SKIP_LINK[l];
  if (!wording) return;
  applyLangAttribute(doc, l);
  const link = doc.querySelector('.skip-link');
  if (link) link.textContent = wording;
}
