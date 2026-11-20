import { describe, expect, it } from 'vitest';
import { contraste, equipeDe, requeteEquipe } from './equipe.ts';

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
