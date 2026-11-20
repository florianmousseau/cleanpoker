import type { Story } from '#lib/useRoom.svelte.ts';

// A cell a spreadsheet would run as a formula is written as text instead.
function cellCsv(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\n\r;]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe;
}

/** The stories as CSV, one row per story, with a header row. */
export function storiesCsv(stories: Story[], header: [string, string]): string {
  const rows = [header, ...stories.map((s) => [s.title, s.estimate] as [string, string])];
  return rows.map((r) => r.map(cellCsv).join(',')).join('\r\n') + '\r\n';
}

function cellMd(value: string): string {
  return value.replaceAll('|', String.raw`\|`);
}

/** The stories as a Markdown table, ready to paste into GitHub, Linear or Jira. */
export function storiesMarkdown(stories: Story[], header: [string, string]): string {
  const lines = [`| ${header[0]} | ${header[1]} |`, '| --- | --- |'];
  for (const s of stories) lines.push(`| ${cellMd(s.title)} | ${cellMd(s.estimate || '-')} |`);
  return lines.join('\n') + '\n';
}

/** Split pasted text into chunks of whole lines under maxBytes of UTF-8. */
export function chunkLines(text: string, maxBytes: number): string[] {
  const enc = new TextEncoder();
  const chunks: string[] = [];
  let current = '';
  for (const line of text.split('\n')) {
    const next = current ? `${current}\n${line}` : line;
    if (enc.encode(next).length > maxBytes && current) {
      chunks.push(current);
      current = line;
    } else {
      current = next;
    }
  }
  if (current.trim()) chunks.push(current);
  return chunks;
}
