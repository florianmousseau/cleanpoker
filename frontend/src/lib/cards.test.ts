import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { MAX_CARDS, MAX_CARD_LENGTH, cardsQuery, fitsServer, parseCards } from './cards';

describe('parseCards', () => {
  it('splits, trims and drops empty entries', () => {
    expect(parseCards(' 1 , 2 ,,3 ')).toEqual(['1', '2', '3']);
  });

  it('drops repeated labels', () => {
    // A room built from "1,1,2,3" used to render a keyed {#each} with two "1"
    // keys: Svelte threw each_key_duplicate and every player who opened the
    // room stayed on "Connecting..." for good.
    expect(parseCards('1,1,2,3')).toEqual(['1', '2', '3']);
  });

  it('drops labels that only differ by surrounding spaces', () => {
    expect(parseCards('XS, XS ,S')).toEqual(['XS', 'S']);
  });

  it('keeps the first occurrence in place', () => {
    expect(parseCards('8,1,8,2')).toEqual(['8', '1', '2']);
  });
});

// 2026-10-17 : un jeu de 65 cartes, ou une carte de 17 caracteres, faisait
// repondre 400 au serveur, et la page disait « Unable to create the room.
// Please try again. » - reessayer ne pouvait rien changer.
describe('fitsServer', () => {
  it('accepts a deck the server holds', () => {
    expect(fitsServer(Array.from({ length: 64 }, (_, i) => String(i)))).toBe(true);
    expect(fitsServer(['a'.repeat(16), '🐢'.repeat(16)])).toBe(true);
  });

  it('refuses more cards or longer cards than the server holds', () => {
    expect(fitsServer(Array.from({ length: 65 }, (_, i) => String(i)))).toBe(false);
    expect(fitsServer(['a'.repeat(17), '1'])).toBe(false);
  });

  it('reads the same limits as the server', () => {
    const handler = new URL('../../../backend/internal/handler/handler.go', import.meta.url);
    const go = readFileSync(handler, 'utf8');
    expect(go).toMatch(new RegExp(`maxCards\\s*=\\s*${MAX_CARDS}\\b`));
    expect(go).toMatch(new RegExp(`maxCardLength\\s*=\\s*${MAX_CARD_LENGTH}\\b`));
  });
});

describe('cardsQuery', () => {
  it('reads back exactly the deck that was typed', () => {
    for (const deck of ['1,2,3,5,8,13,21,?', 'XS,S,M,L,XL,XXL,?', '1+1,C#,a&b,%26,x=y,50 %']) {
      expect(new URLSearchParams(cardsQuery(deck)).get('cards')).toBe(deck);
    }
  });
  it('keeps the commas and the question mark readable', () => {
    expect(cardsQuery('1,2,?')).toBe('?cards=1,2,?');
  });
});

describe('the room page on a narrow screen', () => {
  it('keeps the role and kick commands, inside the scrolling table', () => {
    const page = readFileSync(new URL('../routes/[id]/+page.svelte', import.meta.url), 'utf8');
    expect(page).not.toMatch(/\.col-action\s*\{\s*display:\s*none/);
  });
});
