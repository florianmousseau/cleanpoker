/**
 * Width of a result bar, in percent of the votes the revealed round counted.
 * The players list keeps moving after a reveal (a departure, a kick, a switch
 * to observer) while the results stay frozen, so dividing by today's
 * participants drew bars past 100 % that no longer added up to the round.
 */
export function barWidth(count: number, dist: Record<string, number>): number {
  const total = Object.values(dist).reduce((sum, n) => sum + n, 0);
  return total === 0 ? 0 : Math.round((count / total) * 100);
}
