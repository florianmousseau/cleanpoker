import type { Player } from '#lib/useRoom.svelte.ts';

/**
 * How many participants hold a vote, hidden or not, out of how many. One vote
 * is enough to reveal: the server never asked for more, and a team does not
 * wait for someone who stepped away.
 */
export function voteCount(players: readonly Player[]): { voted: number; total: number } {
  const voters = players.filter(p => !p.observer);
  return { voted: voters.filter(p => p.vote !== '').length, total: voters.length };
}
