import { describe, expect, it } from 'vitest';
import { cheminQr } from './qr.ts';

describe('cheminQr', () => {
  it('draws one square per dark module', () => {
    expect(cheminQr(['10', '01'])).toBe('M0 0h1v1h-1zM1 1h1v1h-1z');
  });
  it('draws nothing for a light grid', () => {
    expect(cheminQr(['00'])).toBe('');
  });
});
