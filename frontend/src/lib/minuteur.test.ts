import { describe, expect, it } from 'vitest';
import { cadran, peutMener, secondesRestantes } from './minuteur.ts';

describe('secondesRestantes', () => {
  it('rounds a partial second up', () => {
    expect(secondesRestantes(10_500, 9_000)).toBe(2);
  });
  it('never goes below zero', () => {
    expect(secondesRestantes(1_000, 5_000)).toBe(0);
  });
});

describe('cadran', () => {
  it('pads the seconds', () => {
    expect(cadran(65)).toBe('1:05');
    expect(cadran(9)).toBe('0:09');
    expect(cadran(300)).toBe('5:00');
  });
});

describe('peutMener', () => {
  it('lets anyone run an open room', () => {
    expect(peutMener({ host: 'a', locked: false }, 'b')).toBe(true);
  });
  it('keeps a locked room to its host', () => {
    expect(peutMener({ host: 'a', locked: true }, 'b')).toBe(false);
    expect(peutMener({ host: 'a', locked: true }, 'a')).toBe(true);
  });
});
