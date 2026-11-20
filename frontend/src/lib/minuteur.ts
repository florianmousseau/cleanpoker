/** Whole seconds left before end (Unix ms), never below zero. */
export function secondesRestantes(end: number, now: number): number {
  return Math.max(0, Math.ceil((end - now) / 1000));
}

/** A countdown as a clock face: 75 reads 1:15. */
export function cadran(secondes: number): string {
  const m = Math.floor(secondes / 60);
  const s = secondes % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Whether a seat may run the round: anyone in an open room, the host in a locked one. */
export function peutMener(room: { host: string; locked: boolean }, myId: string): boolean {
  return !room.locked || room.host === myId;
}
