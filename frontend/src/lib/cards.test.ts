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
  const page = readFileSync(new URL('../routes/[id]/+page.svelte', import.meta.url), 'utf8');

  // The two columns used to stay and push "Remove" behind a sideways scroll
  // nothing announced. They may only go where the line of actions takes over.
  it('hides the role and kick columns only where the line under the name shows', () => {
    const narrow = /@media \(max-width: 40rem\) \{[^@]*\.col-action \{ display: none; \}[^@]*\.actions-row \{ display: table-row; \}/;
    expect(page).toMatch(narrow);
    expect(page.split('.col-action { display: none; }')).toHaveLength(2);
  });

  it('renders both commands in the columns and in the line, for both tables', () => {
    expect(page.split('{@render kickAction(player)}').length - 1).toBe(4);
    expect(page.split('{@render roleAction(player, ').length - 1).toBe(4);
  });

  it('shows the promo after the votes, not between the results and them', () => {
    expect(page.indexOf('data-testid="promo"')).toBeGreaterThan(page.indexOf('id="observers-title"'));
  });

  it('sends a removed person to the home of their language', () => {
    expect(page).toContain('<a href={homeHref} class="btn btn-primary" data-testid="kicked-home">');
  });

  it('prefills the name from the last join and keeps it on join, without joining', () => {
    expect(page).toContain('nameInput = loadName(deviceStorage());');
    expect(page).toContain('saveName(deviceStorage(), name);');
  });
});
