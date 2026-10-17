/** Parse the comma-separated card list typed on the home page. */
export function parseCards(input: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of input.split(',')) {
    const card = raw.trim();
    // A repeated label is meaningless in planning poker: two cards reading "1"
    // cannot be told apart in the results, and they used to crash the keyed
    // {#each} that renders them.
    if (card.length === 0 || seen.has(card)) continue;
    seen.add(card);
    out.push(card);
  }
  return out;
}

/** The deck the server holds: `maxCards` and `maxCardLength` in backend/internal/handler/handler.go. */
export const MAX_CARDS = 64;
export const MAX_CARD_LENGTH = 16;

/** Whether the server will create a room for this deck, length counted in characters as Go counts runes. */
export function fitsServer(cards: string[]): boolean {
  return cards.length <= MAX_CARDS && cards.every((c) => [...c].length <= MAX_CARD_LENGTH);
}
