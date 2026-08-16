type Snapshot = { state: 'voting' | 'revealed'; round: number };

export type Transition =
  | { kind: 'newRound'; round: number }
  | { kind: 'revealed' }
  | null;

/**
 * What a state message changed, from the point of view of someone who cannot
 * see the screen.
 *
 * A new round used to be recognised as the revealed -> voting edge alone. A
 * second "new round" started while the room was still voting - a double-click,
 * or a facilitator restarting before anyone revealed - therefore announced
 * nothing, and the live region kept reading the number of the last round it had
 * caught: "Round 2" out loud while the header showed Round 5. The round number
 * is what actually changed, so that is what decides.
 */
export function transitionOf(prev: Snapshot | null, next: Snapshot): Transition {
  if (!prev) return null;
  if (next.round !== prev.round) return { kind: 'newRound', round: next.round };
  if (prev.state === 'voting' && next.state === 'revealed') return { kind: 'revealed' };
  return null;
}
