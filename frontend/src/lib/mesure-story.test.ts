import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { isGap, linesOf, measurePayload } from '#lib/mesure-story.ts';

const actual = { files: 4, added: 120, removed: 30, tests: 6, minutes: 45 };

describe('a delivered story', () => {
  it('counts the lines that changed, and nothing for a story nobody measured', () => {
    expect(linesOf({ title: 'CSV export', estimate: '3', actual })).toBe(150);
    expect(linesOf({ title: 'Login', estimate: '3' })).toBeNull();
  });

  it('is a gap only when it looks like another card than the one kept', () => {
    expect(isGap({ title: 'a', estimate: '3', actual, looksLike: '8' })).toBe(true);
    expect(isGap({ title: 'a', estimate: '3', actual, looksLike: '3' })).toBe(false);
    expect(isGap({ title: 'a', estimate: '3', actual })).toBe(false);
  });

  it('is sent as six whole numbers, the way the room reads them', () => {
    expect(measurePayload(2, { files: 4, added: 120, removed: 30 })).toBe('2,4,120,30,0,0');
  });
});

describe('the stories panel', () => {
  const panel = readFileSync('src/lib/StoriesPanel.svelte', 'utf8');

  it('shows the measure columns only once a story is measured', () => {
    expect(panel.split('{#if anyMeasured}')).toHaveLength(3);
    expect(panel).toContain('data-testid="story-looks-like"');
  });

  it('offers the measure form to who may run the room, for kept stories only', () => {
    expect(panel).toContain('{#if canRun && kept.length > 0}');
    expect(panel).toContain('{#each kept as { story, index } (index)}');
  });

  it('shows a reference per card when the room sends some', () => {
    expect(panel).toContain('{#if references.length > 0}');
  });
});
