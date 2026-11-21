import { describe, expect, it } from 'vitest';
import { adresseSure, couleurCss, marqueDe } from './marque.ts';

describe('adresseSure', () => {
  it('takes a bare domain and a full address', () => {
    expect(adresseSure('acme.com')?.href).toBe('https://acme.com/');
    expect(adresseSure(' http://www.acme.fr/equipe ')?.hostname).toBe('www.acme.fr');
  });
  it.each([
    '', 'localhost', 'http://localhost:8080', 'https://127.0.0.1', 'http://2130706433', 'http://[::1]/',
    'https://10.0.0.1', 'intranet', 'https://user:pw@acme.com', 'https://acme.com:8443', 'ftp://acme.com',
    'file:///etc/passwd', 'https://box.local', 'https://metadata.internal', 'javascript:alert(1)',
  ])('refuses %s', (saisie) => {
    expect(adresseSure(saisie)).toBeNull();
  });
});

describe('couleurCss', () => {
  it.each([
    ['#1A6B3C', '#1a6b3c'], ['#abc', '#aabbcc'], ['#1a6b3cff', '#1a6b3c'], ['rgb(26, 107, 60)', '#1a6b3c'], ['rgba(26 107 60 / 1)', '#1a6b3c'],
  ])('reads %s', (v, hex) => expect(couleurCss(v)).toBe(hex));
  it('refuses what is not a colour', () => {
    expect(couleurCss('red')).toBeNull();
    expect(couleurCss('rgb(300,0,0)')).toBeNull();
  });
});

describe('marqueDe', () => {
  it('reads the declared colour and the site name', () => {
    const html = `<head><meta name="theme-color" content="#E30613"><meta property="og:site_name" content="Acme &amp; Fils"><title>Accueil | Acme</title></head>`;
    expect(marqueDe(html, 'www.acme.fr')).toEqual({ nom: 'Acme & Fils', couleur: '#e30613' });
  });
  it('falls back to the tile colour and the title', () => {
    const html = `<meta content='#0055a4' name='msapplication-TileColor'><title>Zenith - Conseil</title>`;
    expect(marqueDe(html, 'zenith.io')).toEqual({ nom: 'Zenith', couleur: '#0055a4' });
  });
  it('ignores a white or black theme colour, and names the domain when nothing else does', () => {
    expect(marqueDe('<meta name="theme-color" content="#fff">', 'www.globex.com')).toEqual({ nom: 'globex', couleur: null });
  });
  it('keeps the name within the room limit', () => {
    expect(marqueDe(`<title>${'x'.repeat(80)}</title>`, 'a.com').nom).toHaveLength(30);
  });
});
