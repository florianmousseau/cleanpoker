import { describe, expect, it } from 'vitest';
import { transitionOf } from './room-transition';

const voting = (round: number) => ({ state: 'voting' as const, round });
const revealed = (round: number) => ({ state: 'revealed' as const, round });

describe('transitionOf', () => {
  it('says nothing on the first state message', () => {
    expect(transitionOf(null, voting(1))).toBeNull();
  });

  it('announces a round started after a reveal', () => {
    expect(transitionOf(revealed(1), voting(2))).toEqual({ kind: 'newRound', round: 2 });
  });

  it('announces a round started while the room was still voting', () => {
    // A double-clicked "new round" is the common way in: the second click
    // never crossed the revealed -> voting edge, so it announced nothing and
    // the live region kept reading the round before it.
    expect(transitionOf(voting(4), voting(5))).toEqual({ kind: 'newRound', round: 5 });
  });

  it('carries the round now on screen, not the one it last caught', () => {
    expect(transitionOf(voting(2), voting(5))).toEqual({ kind: 'newRound', round: 5 });
  });

  it('announces the reveal', () => {
    expect(transitionOf(voting(3), revealed(3))).toEqual({ kind: 'revealed' });
  });

  it('says nothing when only the votes moved', () => {
    expect(transitionOf(voting(3), voting(3))).toBeNull();
  });
});
