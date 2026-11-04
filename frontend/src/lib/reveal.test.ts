import { describe, expect, it } from 'vitest';
import { allVoted } from './reveal';

const player = (id: string, vote: string, observer = false) => ({ id, name: id, vote, observer });

// Audit Codex 2026-11-04: the condition that lets a team reveal its votes had
// no behavioural test; a slip on observers or hidden votes blocks every session.
describe('allVoted', () => {
  it('waits for every voter and ignores the observer', () => {
    const observer = player('o', '', true);
    expect(allVoted([player('a', 'hidden'), player('b', ''), observer])).toBe(false);
    expect(allVoted([player('a', 'hidden'), player('b', 'hidden'), observer])).toBe(true);
  });

  it('closes again when a vote is withdrawn', () => {
    expect(allVoted([player('a', 'hidden'), player('b', '')])).toBe(false);
  });

  it('is false on a room of observers only', () => {
    expect(allVoted([player('o', '', true)])).toBe(false);
  });
});
