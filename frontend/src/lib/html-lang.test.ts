import { describe, expect, it } from 'vitest';
import { accorderDocumentALaLangue, applyLangAttribute } from './html-lang';

function fauxDocument(lang: string, skip = 'Skip to main content') {
  const link = { textContent: skip };
  return {
    documentElement: { lang },
    querySelector: (sel: string) => (sel === '.skip-link' ? link : null),
    __link: link
  } as unknown as Document & { __link: { textContent: string } };
}

describe('applyLangAttribute', () => {
  it('moves the attribute to the language now on screen', () => {
    const doc = fauxDocument('en');
    applyLangAttribute(doc, 'de');
    expect(doc.documentElement.lang).toBe('de');
  });
});

// A room URL carries no locale prefix, so hooks.server.ts stamps it `en` for
// everyone. The page itself then renders in the visitor's cookie language, and
// the whole room was served in French under lang="en", with an English skip
// link on top of it. Anyone arriving by the shared link - which is the only way
// anyone ever arrives - got that page.
describe('accorderDocumentALaLangue', () => {
  it('re-stamps the attribute when the server guessed another language', () => {
    const doc = fauxDocument('en');
    accorderDocumentALaLangue(doc, 'fr');
    expect(doc.documentElement.lang).toBe('fr');
  });

  it('translates the skip link, which no component can reach', () => {
    const doc = fauxDocument('en');
    accorderDocumentALaLangue(doc, 'fr');
    expect(doc.__link.textContent).toBe('Aller au contenu principal');
  });

  it('leaves a document that already agrees untouched', () => {
    const doc = fauxDocument('de', 'Zum Hauptinhalt springen');
    accorderDocumentALaLangue(doc, 'de');
    expect(doc.documentElement.lang).toBe('de');
    expect(doc.__link.textContent).toBe('Zum Hauptinhalt springen');
  });

  it('ignores a language it has no wording for', () => {
    const doc = fauxDocument('en');
    accorderDocumentALaLangue(doc, 'it');
    expect(doc.documentElement.lang).toBe('en');
    expect(doc.__link.textContent).toBe('Skip to main content');
  });

  it('survives a document with no skip link', () => {
    const doc = { documentElement: { lang: 'en' }, querySelector: () => null } as unknown as Document;
    expect(() => accorderDocumentALaLangue(doc, 'pt')).not.toThrow();
    expect(doc.documentElement.lang).toBe('pt');
  });
});
