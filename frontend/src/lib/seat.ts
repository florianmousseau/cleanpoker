/**
 * The seat a tab holds in a room, kept so a reload or a trip through another
 * page of the site takes the same seat back instead of arriving as someone new.
 *
 * sessionStorage, not localStorage: the seat belongs to the tab. Two tabs on
 * the same room are two participants, and a seat shared through localStorage
 * would merge them.
 */
export type Seat = { name: string; observer: boolean; token: string };

type SeatStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const keyOf = (roomId: string) => `cleanpoker:seat:${roomId}`;

function isSeat(value: unknown): value is Seat {
  if (typeof value !== 'object' || value === null) return false;
  const seat = value as Record<string, unknown>;
  return typeof seat.name === 'string' && seat.name.trim() !== ''
    && typeof seat.observer === 'boolean'
    && typeof seat.token === 'string' && seat.token !== '';
}

/** Read the seat kept for a room, or null when there is none or it cannot be read. */
export function loadSeat(storage: SeatStorage | null, roomId: string): Seat | null {
  if (!storage || !roomId) return null;
  try {
    const raw = storage.getItem(keyOf(roomId));
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isSeat(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Keep the seat for a room. A storage that refuses only costs the next reload. */
export function saveSeat(storage: SeatStorage | null, roomId: string, seat: Seat): void {
  if (!storage || !roomId) return;
  try {
    storage.setItem(keyOf(roomId), JSON.stringify(seat));
  } catch {
    // Private mode or a full quota: the room still works, it just forgets.
  }
}

/** Forget the seat, so the tab arrives as a new participant next time. */
export function forgetSeat(storage: SeatStorage | null, roomId: string): void {
  if (!storage || !roomId) return;
  try {
    storage.removeItem(keyOf(roomId));
  } catch {
    // Nothing to forget if nothing could be kept.
  }
}

/** The tab's sessionStorage, or null where it does not exist or is blocked. */
export function tabStorage(): SeatStorage | null {
  try {
    return typeof sessionStorage === 'undefined' ? null : sessionStorage;
  } catch {
    return null;
  }
}
