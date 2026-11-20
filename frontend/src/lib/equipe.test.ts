import { describe, expect, it } from 'vitest';
import { contraste, couleurSaisie, equipeDe, requeteEquipe, texteSur } from './equipe.ts';

const hexRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

describe('equipeDe', () => {
  it('reads a name and a colour', () => {
    const e = equipeDe(new URLSearchParams('equipe=Alpha&couleur=1a6b3c'));
    expect(e?.nom).toBe('Alpha');
    expect(e?.clair).toBe('#1a6b3c');
  });
  it('darkens a pale colour until white text reads on it, and lightens it for the dark theme', () => {
    const e = equipeDe(new URLSearchParams('couleur=ffe066'))!;
    expect(contraste(hexRgb(e.clair), [255, 255, 255])).toBeGreaterThanOrEqual(4.5);
    expect(contraste(hexRgb(e.sombre), [13, 17, 23])).toBeGreaterThanOrEqual(4.5);
  });
  it('ignores a malformed colour and an empty address', () => {
    expect(equipeDe(new URLSearchParams('couleur=red;x'))).toBeNull();
    expect(equipeDe(new URLSearchParams(''))).toBeNull();
    expect(equipeDe(new URLSearchParams('equipe=' + 'x'.repeat(50)))?.nom).toHaveLength(30);
  });
});

describe('requeteEquipe', () => {
  it('carries name, colour and deck', () => {
    expect(requeteEquipe('Alpha', '#D0453A', ['1', '2', '3'])).toBe('?equipe=Alpha&couleur=d0453a&cards=1%2C2%2C3');
  });
  it('is empty with nothing to carry', () => {
    expect(requeteEquipe(' ', 'nope', [])).toBe('');
  });
});

describe('couleurSaisie', () => {
  it('accepts a brand colour typed with or without its hash', () => {
    expect(couleurSaisie('#D0453A')).toBe('#d0453a');
    expect(couleurSaisie(' d0453a ')).toBe('#d0453a');
  });
  it('waits while the code is not six hex digits yet', () => {
    expect(couleurSaisie('#d04')).toBeNull();
    expect(couleurSaisie('rouge')).toBeNull();
    expect(couleurSaisie('')).toBeNull();
  });
});

describe('texteSur', () => {
  it('picks the text that reads better on the colour', () => {
    expect(texteSur('#000080')).toBe('#ffffff');
    expect(texteSur('#ffe600')).toBe('#000000');
  });
  it('keeps at least 4.5:1 on a mid colour', () => {
    const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    for (const c of ['#1a6b3c', '#d0453a', '#777777', '#0000ff']) {
      expect(contraste(rgb(c), rgb(texteSur(c)))).toBeGreaterThanOrEqual(4.5);
    }
  });
});
