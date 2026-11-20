import type { Translation } from '#lib/i18n.ts';
import type { Lang } from '#lib/lang.svelte.ts';
import type { RoomState, Story } from '#lib/useRoom.svelte.ts';
import { agreement } from '#lib/consensus.ts';
import { moyenneAffichee } from '#lib/moyenne.ts';

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
  const lines = value.replaceAll('|', String.raw`\|`).split(/[\r\n]+/);
  const last = lines.length - 1;
  // A line break and the spaces around it become one space; the ends stay as typed.
  return lines.map((line, i) => (i > 0 ? line.trimStart() : line)).map((line, i) => (i < last ? line.trimEnd() : line)).join(' ');
}

/** The stories as a Markdown table, ready to paste into GitHub, Linear or Jira. */
export function storiesMarkdown(stories: Story[], header: [string, string]): string {
  const lines = [`| ${header[0]} | ${header[1]} |`, '| --- | --- |'];
  for (const s of stories) lines.push(`| ${cellMd(s.title)} | ${cellMd(s.estimate || '-')} |`);
  return lines.join('\n') + '\n';
}

/** The copied text, closed by the line that names the tool when the person keeps it. */
export function withCredit(markdown: string, credit: string | null): string {
  return credit ? `${markdown}\n${credit}\n` : markdown;
}

/** The votes of the round: one row per participant, then what the room computed. */
function roundMarkdown(room: RoomState, T: Translation, lang: Lang): string {
  const voters = room.players.filter((p) => !p.observer);
  const named = (p: { name: string; ai?: boolean }) => cellMd(p.ai ? `${p.name} (${T.host.ai})` : p.name);
  const lines = [`| ${T.participants.colName} | ${T.participants.colVote} |`, '| --- | --- |'];
  for (const p of voters) lines.push(`| ${named(p)} | ${cellMd(p.vote || '-')} |`);
  const reasons = voters.filter((p) => p.reason).map((p) => `> **${named(p)}** ${cellMd(p.reason ?? '')}`);
  if (reasons.length) lines.push('', ...reasons);
  const stats: string[] = [];
  if (room.results && room.results.avg !== 'N/A') {
    stats.push(`- ${T.results.avg} ${moyenneAffichee(room.results.avg, lang)}`);
    if (room.results.median) stats.push(`- ${T.results.median} ${moyenneAffichee(room.results.median, lang)}`);
  }
  const agreed = room.results ? agreement(room.results.dist) : null;
  if (agreed !== null) stats.push(`- ${T.results.agreement(agreed)}`);
  if (stats.length) lines.push('', ...stats);
  return lines.join('\n') + '\n';
}

/**
 * A revealed round as Markdown. With a story list: the stories and the
 * estimate kept for each, then the votes on the story on the table.
 * Without one: the votes and the figures of the round.
 */
export function resultMarkdown(room: RoomState, T: Translation, lang: Lang): string {
  const stories = room.stories ?? [];
  if (stories.length === 0) return roundMarkdown(room, T, lang);
  const onTable = stories[room.current ?? -1];
  return [
    storiesMarkdown(stories, [T.stories.colStory, T.stories.colEstimate]),
    ...(onTable ? [`${T.stories.onTable} **${cellMd(onTable.title)}**\n`] : []),
    roundMarkdown(room, T, lang),
  ].join('\n');
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
