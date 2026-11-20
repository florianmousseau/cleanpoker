/**
 * Share of the votes that went to the most chosen card, as a whole percent,
 * or null when nobody voted.
 */
export function agreement(dist: Record<string, number>): number | null {
  const counts = Object.values(dist);
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  return Math.round((Math.max(...counts) * 100) / total);
}

/** Whether a revealed vote is the lowest or highest number of a split round. */
export function extreme(vote: string, min: string, max: string): 'min' | 'max' | null {
  if (min === max || min === 'N/A') return null;
  if (vote === min) return 'min';
  if (vote === max) return 'max';
  return null;
}
