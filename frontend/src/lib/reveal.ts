import type { Player } from '#lib/useRoom.svelte.ts';

/** Every player who is not an observer has cast a vote, hidden or not. */
export function allVoted(players: readonly Player[]): boolean {
  const voters = players.filter(p => !p.observer);
  return voters.length > 0 && voters.every(p => p.vote !== '');
}
