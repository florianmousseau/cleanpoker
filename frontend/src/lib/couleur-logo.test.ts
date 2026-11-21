import { describe, expect, it } from 'vitest';
import { couleurDominante } from './couleur-logo.ts';

const px = (...couleurs: [number, number, number, number, number][]) =>
  couleurs.flatMap(([r, g, b, a, n]) => Array.from({ length: n }, () => [r, g, b, a]).flat());

describe('couleurDominante', () => {
  it('finds the brand colour on a white background with black text', () => {
    expect(couleurDominante(px([255, 255, 255, 255, 50], [0, 0, 0, 255, 30], [223, 33, 71, 255, 20]))).toBe('#df2147');
  });
  it('ignores transparent pixels', () => {
    expect(couleurDominante(px([0, 200, 0, 0, 90], [30, 60, 200, 255, 10]))).toBe('#1e3cc8');
  });
  it('has nothing to say about a grey logo', () => {
    expect(couleurDominante(px([120, 120, 125, 255, 40], [255, 255, 255, 255, 40]))).toBeNull();
  });
});
