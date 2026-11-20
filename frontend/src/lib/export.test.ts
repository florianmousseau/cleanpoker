import { describe, expect, it } from 'vitest';
import { chunkLines, resultMarkdown, storiesCsv, storiesMarkdown, withCredit } from './export.ts';
import { DE, EN, ES, FR, PT } from './i18n/all';
import type { RoomState } from './useRoom.svelte';

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

describe('resultMarkdown', () => {
  const player = (name: string, vote: string, extra: object = {}) => ({ id: name, name, vote, observer: false, ...extra });
  const round = (over: Partial<RoomState> = {}): RoomState => ({
    id: 'abc', cards: ['3', '5', '8'], state: 'revealed', round: 2,
    results: { avg: '5.5', median: '5', min: '3', max: '8', dist: { '5': 2, '3': 1, '8': 1 } },
    players: [player('Alice', '5'), player('Bob', '3'), player('Chloé', '5'), player('Dan', '8')],
    activity: [], host: 'Alice', locked: false, timerEnd: 0,
    ...over,
  });

  it('gives each card, then the average, the median and the agreement of a round with no story list', () => {
    expect(resultMarkdown(round(), EN, 'en')).toBe(
      [
        '| Name | Vote |',
        '| --- | --- |',
        '| Alice | 5 |',
        '| Bob | 3 |',
        '| Chloé | 5 |',
        '| Dan | 8 |',
        '',
        '- Average 5.5',
        '- Median 5',
        '- Agreement 50%',
        '',
      ].join('\n'),
    );
  });

  it('marks an AI participant and quotes its reason', () => {
    const md = resultMarkdown(
      round({ players: [player('Alice', '5'), player('Claude', '8', { ai: true, reason: 'Touches auth | and\nthe data model.' })] }),
      EN,
      'en',
    );
    expect(md).toContain('| Claude (AI) | 8 |');
    expect(md).toContain('> **Claude (AI)** Touches auth \\| and the data model.');
    expect(md).not.toContain('Alice (AI)');
  });

  it('leaves observers out and shows a participant who did not vote', () => {
    const md = resultMarkdown(
      round({ players: [player('Alice', '5'), player('Bob', ''), { ...player('Eve', ''), observer: true }] }),
      EN,
      'en',
    );
    expect(md).toContain('| Bob | - |');
    expect(md).not.toContain('Eve');
  });

  it('gives no average for a deck that has none, as the room does', () => {
    const md = resultMarkdown(
      round({ results: { avg: 'N/A', median: '', min: 'N/A', max: 'N/A', dist: { M: 2, L: 1 } } }),
      EN,
      'en',
    );
    expect(md).not.toContain('Average');
    expect(md).not.toContain('Median');
    expect(md).toContain('- Agreement 67%');
  });

  it('opens on the story list with its estimates, then the votes on the story on the table', () => {
    const md = resultMarkdown(
      round({ stories: [{ title: 'Login page', estimate: '5' }, { title: 'CSV | export', estimate: '' }], current: 1 }),
      EN,
      'en',
    );
    expect(md).toBe(
      [
        '| Story | Estimate |',
        '| --- | --- |',
        '| Login page | 5 |',
        '| CSV \\| export | - |',
        '',
        'Story on the table: **CSV \\| export**',
        '',
        '| Name | Vote |',
        '| --- | --- |',
        '| Alice | 5 |',
        '| Bob | 3 |',
        '| Chloé | 5 |',
        '| Dan | 8 |',
        '',
        '- Average 5.5',
        '- Median 5',
        '- Agreement 50%',
        '',
      ].join('\n'),
    );
  });

  it('writes the figures the way the reader language does', () => {
    const md = resultMarkdown(round(), FR, 'fr');
    expect(md).toContain('- Moyenne 5,5');
    expect(md).toContain('- Accord 50 %');
    expect(md).toContain('| Nom | Vote |');
  });
});

describe('withCredit', () => {
  const md = '| Name | Vote |\n| --- | --- |\n| Alice | 5 |\n';

  it('closes the copied text with the PokerAgile line', () => {
    expect(withCredit(md, EN.results.credit)).toBe(`${md}\nEstimated with PokerAgile: https://pokeragile.com\n`);
  });

  it('adds nothing when the person turned the line off', () => {
    expect(withCredit(md, null)).toBe(md);
  });

  it('names the site in the five languages, each with its address', () => {
    const lines = [FR, EN, ES, DE, PT].map((t) => t.results.credit);
    expect(new Set(lines).size).toBe(5);
    for (const line of lines) expect(line).toMatch(/PokerAgile.*: https:\/\/pokeragile\.com$/);
  });

  it('solders the French colon with a no-break space, never an ordinary one', () => {
    expect(FR.results.credit).toBe('Estimé avec PokerAgile : https://pokeragile.com');
    expect(FR.results.credit).not.toContain(' :');
  });
});
