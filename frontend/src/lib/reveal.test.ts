import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DE, EN, ES, FR, PT } from './i18n';
import { voteCount } from './reveal';

const player = (id: string, vote: string, observer = false) => ({ id, name: id, vote, observer });

// Audit Codex 2026-11-04: the condition that lets a team reveal its votes had
// no behavioural test; a slip on observers or hidden votes blocks every session.
describe('voteCount', () => {
  it('counts the voters who hold a vote and ignores the observer', () => {
    const observer = player('o', '', true);
    expect(voteCount([player('a', 'hidden'), player('b', ''), observer])).toEqual({ voted: 1, total: 2 });
    expect(voteCount([player('a', 'hidden'), player('b', '8'), observer])).toEqual({ voted: 2, total: 2 });
  });

  it('goes back down when a vote is withdrawn', () => {
    expect(voteCount([player('a', ''), player('b', '')])).toEqual({ voted: 0, total: 2 });
  });

  it('is empty on a room of observers only', () => {
    expect(voteCount([player('o', '', true)])).toEqual({ voted: 0, total: 0 });
  });
});

describe('the reveal button', () => {
  const page = readFileSync(new URL('../routes/[id]/+page.svelte', import.meta.url), 'utf8');

  it('opens on the first vote, not on the last', () => {
    expect(page).toContain('disabled={!canRun || votes.voted === 0}');
    expect(page).not.toContain('allVoted');
  });

  it('leaves the primary role to "New round" once the votes are shown', () => {
    expect(page).toContain("class:btn-primary={revealed} class:btn-secondary={!revealed}");
    expect(page).toMatch(/\{#if !revealed\}\s*<button class="btn btn-primary btn-block" onclick=\{\(\) => room\.show\(\)\}/);
  });
});

describe('the vote count under the reveal button', () => {
  it('agrees with the number in each language', () => {
    expect(EN.controls.voted(1, 5)).toBe('1 of 5 has voted');
    expect(EN.controls.voted(3, 5)).toBe('3 of 5 have voted');
    expect(FR.controls.voted(1, 5)).toBe('1 sur 5 a voté');
    expect(FR.controls.voted(3, 5)).toBe('3 sur 5 ont voté');
    expect(ES.controls.voted(1, 5)).toBe('1 de 5 ha votado');
    expect(ES.controls.voted(3, 5)).toBe('3 de 5 han votado');
    expect(DE.controls.voted(1, 5)).toBe('1 von 5 hat abgestimmt');
    expect(DE.controls.voted(3, 5)).toBe('3 von 5 haben abgestimmt');
    expect(PT.controls.voted(1, 5)).toBe('1 de 5 votou');
    expect(PT.controls.voted(3, 5)).toBe('3 de 5 votaram');
  });

  it('never falls back on a bracketed plural', () => {
    for (const t of [FR, EN, ES, DE, PT]) expect(t.controls.voted(0, 2)).not.toContain('(');
  });
});
