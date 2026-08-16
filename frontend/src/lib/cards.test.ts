import { describe, expect, it } from 'vitest';
import { parseCards } from './cards';

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
