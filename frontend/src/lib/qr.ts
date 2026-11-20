/** An SVG path drawing every dark module ("1") of the rows, one unit each. */
export function cheminQr(rows: string[]): string {
  let d = '';
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) if (row[x] === '1') d += `M${x} ${y}h1v1h-1z`;
  });
  return d;
}
