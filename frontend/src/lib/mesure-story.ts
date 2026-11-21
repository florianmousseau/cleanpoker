import type { Actual, Story } from '#lib/useRoom.svelte.ts';

/** What the room compares two delivered stories on: the lines that changed. */
export function linesOf(story: Story): number | null {
  return story.actual ? story.actual.added + story.actual.removed : null;
}

/** True when the delivered story looks like another card than the one the team kept. */
export function isGap(story: Story): boolean {
  return !!story.looksLike && story.looksLike !== story.estimate;
}

/** The "measure" command: position, files, lines added, lines removed, then tests and minutes a person does not enter. */
export function measurePayload(index: number, a: Pick<Actual, 'files' | 'added' | 'removed'>): string {
  return [index, a.files, a.added, a.removed, 0, 0].join(',');
}
