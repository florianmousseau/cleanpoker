import { describe, expect, it } from 'vitest';
import { chargerHabillage, garderHabillage, oublierHabillage } from './habillage.ts';

function rangement() {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m };
}

describe('habillage', () => {
  it('gives back the look kept on the last visit', () => {
    const r = rangement();
    garderHabillage(r, { nom: ' Zenika ', couleur: '#df2147', site: 'zenika.com', logo: 'www.zenika.com' });
    expect(chargerHabillage(r)).toEqual({ nom: 'Zenika', couleur: '#df2147', site: 'zenika.com', logo: 'www.zenika.com' });
  });
  it('has nothing to give on a first visit or without storage', () => {
    expect(chargerHabillage(rangement())).toBeNull();
    expect(chargerHabillage(null)).toBeNull();
  });
  it('refuses what it did not write', () => {
    const r = rangement();
    r.m.set('cleanpoker:habillage', '{oops');
    expect(chargerHabillage(r)).toBeNull();
    r.m.set('cleanpoker:habillage', JSON.stringify({ nom: 'x', couleur: 'red' }));
    expect(chargerHabillage(r)).toBeNull();
  });
  it('creates the room even when the storage refuses', () => {
    const plein = { getItem: () => null, setItem: () => { throw new Error('quota'); }, removeItem: () => { throw new Error('quota'); } };
    expect(() => garderHabillage(plein, { nom: 'a', couleur: '#000000', site: '', logo: '' })).not.toThrow();
  });
  it('forgets the look on reset', () => {
    const r = rangement();
    garderHabillage(r, { nom: 'Acme', couleur: '#1f368b', site: 'acme.com', logo: '' });
    oublierHabillage(r);
    expect(chargerHabillage(r)).toBeNull();
  });
  it('resets the form even when the storage refuses', () => {
    const plein = { getItem: () => null, setItem: () => undefined, removeItem: () => { throw new Error('denied'); } };
    expect(() => oublierHabillage(plein)).not.toThrow();
    expect(() => oublierHabillage(null)).not.toThrow();
  });
});
