/**
 * The room URL is the only thing CleanPoker ever asks anyone to share, and the
 * two copy buttons are the whole of that step. `navigator.clipboard.writeText`
 * rejects more often than it looks: no permission, an insecure context, a
 * webview, a click the browser no longer counts as a user gesture. Both call
 * sites used to be bare `await`s inside a handler nobody awaited, so a refusal
 * left as an unhandled rejection, the label went back to "Copy link", and the
 * host pasted whatever was in the clipboard before into the team channel.
 *
 * Returns whether the text actually reached the clipboard, so the caller can
 * say something either way. It never throws.
 */
export async function copierTexte(texte: string): Promise<boolean> {
  try {
    const presse = navigator?.clipboard;
    if (typeof presse?.writeText !== 'function') return false;
    await presse.writeText(texte);
    return true;
  } catch {
    return false;
  }
}
