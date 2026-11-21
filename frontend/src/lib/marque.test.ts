import { describe, expect, it } from 'vitest';
import { adresseSure, couleurCss, iconesDe, marqueDe, typeImage } from './marque.ts';

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
    expect(marqueDe(html, 'www.acme.fr')).toEqual({ nom: 'Acme & Fils', couleur: '#e30613', site: 'www.acme.fr' });
  });
  it('falls back to the tile colour and the title', () => {
    const html = `<meta content='#0055a4' name='msapplication-TileColor'><title>Zenith - Conseil</title>`;
    expect(marqueDe(html, 'zenith.io')).toEqual({ nom: 'Zenith', couleur: '#0055a4', site: 'zenith.io' });
  });
  it('ignores a white or black theme colour, and names the domain when nothing else does', () => {
    expect(marqueDe('<meta name="theme-color" content="#fff">', 'www.globex.com')).toEqual({ nom: 'globex', couleur: null, site: 'www.globex.com' });
  });
  it('keeps the name within the room limit', () => {
    expect(marqueDe(`<title>${'x'.repeat(80)}</title>`, 'a.com').nom).toHaveLength(30);
  });
});

describe('the company name', () => {
  it('takes the part that matches the domain over a tagline', () => {
    const html = `<meta property="og:site_name" content="Banque pour les particuliers"><title>Banque pour les particuliers | Crédit Agricole</title>`;
    expect(marqueDe(html, 'www.credit-agricole.fr').nom).toBe('Crédit Agricole');
  });
  it('keeps the declared name when nothing matches the domain', () => {
    expect(marqueDe('<meta property="og:site_name" content="Globex">', 'gx.io').nom).toBe('Globex');
  });
});

describe('iconesDe', () => {
  const base = new URL('https://www.acme.fr/');
  it('puts the touch icon first, then the largest icon, then the usual paths', () => {
    const html = `<link rel="icon" href="/f16.png" sizes="16x16"><link rel="icon" href="/f64.png" sizes="64x64"><link rel="apple-touch-icon" href="https://cdn.acme.fr/t.png">`;
    expect(iconesDe(html, base)).toEqual([
      'https://cdn.acme.fr/t.png', 'https://www.acme.fr/f64.png', 'https://www.acme.fr/f16.png',
      'https://www.acme.fr/apple-touch-icon.png', 'https://www.acme.fr/favicon.ico',
    ]);
  });
  it('never offers an SVG', () => {
    const html = `<link rel="icon" href="/logo.svg"><link rel="icon" type="image/svg+xml" href="/i">`;
    expect(iconesDe(html, base)).toEqual(['https://www.acme.fr/apple-touch-icon.png', 'https://www.acme.fr/favicon.ico']);
  });
});

describe('typeImage', () => {
  const o = (...b: number[]) => new Uint8Array([...b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  it.each([
    [o(0x89, 0x50, 0x4e, 0x47), 'image/png'], [o(0xff, 0xd8, 0xff), 'image/jpeg'], [o(0x47, 0x49, 0x46, 0x38), 'image/gif'],
    [new TextEncoder().encode('RIFF\0\0\0\0WEBPVP8 '), 'image/webp'], [o(0, 0, 1, 0), 'image/x-icon'],
  ])('reads %#', (octets, type) => expect(typeImage(octets)).toBe(type));
  it('refuses SVG and HTML', () => {
    expect(typeImage(new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg">'))).toBeNull();
    expect(typeImage(new TextEncoder().encode('<!doctype html>'))).toBeNull();
  });
});
