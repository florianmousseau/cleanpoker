import { describe, expect, it } from 'vitest';
import { chunkLines, storiesCsv, storiesMarkdown } from './export.ts';

const stories = [
  { title: 'Login, with "SSO"', estimate: '5' },
  { title: '=HYPERLINK("x")', estimate: '' },
  { title: 'A | B', estimate: '8' },
];

describe('storiesCsv', () => {
  it('quotes commas and quotes, and defuses formulas', () => {
    expect(storiesCsv(stories, ['Story', 'Estimate'])).toBe(
      'Story,Estimate\r\n"Login, with ""SSO""",5\r\n"\'=HYPERLINK(""x"")",\r\nA | B,8\r\n',
    );
  });
});

describe('storiesMarkdown', () => {
  it('escapes pipes and marks a missing estimate', () => {
    expect(storiesMarkdown(stories, ['Story', 'Estimate'])).toBe(
      '| Story | Estimate |\n| --- | --- |\n| Login, with "SSO" | 5 |\n| =HYPERLINK("x") | - |\n| A \\| B | 8 |\n',
    );
  });
});

describe('chunkLines', () => {
  it('keeps whole lines under the byte limit', () => {
    const chunks = chunkLines('aaaa\nbbbb\ncccc', 9);
    expect(chunks).toEqual(['aaaa\nbbbb', 'cccc']);
  });
  it('counts multi-byte characters as bytes', () => {
    expect(chunkLines('éé\néé', 5)).toEqual(['éé', 'éé']);
  });
  it('drops an empty paste', () => {
    expect(chunkLines('\n  \n', 100)).toEqual([]);
  });
});
