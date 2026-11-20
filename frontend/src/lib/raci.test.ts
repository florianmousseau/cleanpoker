import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import type { Matrix } from '#lib/raci.ts';
import {
  CYCLE,
  MAX_LINK,
  MAX_NAME,
  MAX_ROLES,
  MAX_TASKS,
  addRole,
  addTask,
  blankMatrix,
  cellForKey,
  checkMatrix,
  decodeMatrix,
  encodeMatrix,
  matrixCsv,
  matrixMarkdown,
  matrixOf,
  nextCell,
  removeRole,
  removeTask,
} from '#lib/raci.ts';
import { RACI_WORDS } from '#lib/raci-words.ts';

const sample = (): Matrix =>
  matrixOf('Site', ['Lead', 'Dev', 'Client'], [
    ['Write the brief', 'R C A'],
    ['Build', 'A R I'],
  ]);

describe('a cell', () => {
  it('walks empty, R, A, A/R, C, I and comes back to empty', () => {
    let cell = CYCLE[0];
    const seen = [];
    for (let i = 0; i < 6; i += 1) {
      cell = nextCell(cell);
      seen.push(cell);
    }
    expect(seen).toEqual(['R', 'A', 'AR', 'C', 'I', '']);
  });

  it('takes its letter from the keyboard, in either case', () => {
    expect(cellForKey('r')).toBe('R');
    expect(cellForKey('A')).toBe('A');
    expect(cellForKey('c')).toBe('C');
    expect(cellForKey('i')).toBe('I');
    expect(cellForKey('Backspace')).toBe('');
    expect(cellForKey('Delete')).toBe('');
  });

  it('ignores every other key', () => {
    for (const key of ['x', 'Tab', 'Enter', ' ', 'ArrowDown', 'AR']) expect(cellForKey(key)).toBeNull();
  });
});

describe('the checks', () => {
  it('finds nothing in a matrix with one A and one R per task', () => {
    expect(checkMatrix(sample())).toEqual([]);
  });

  it('accepts the A who is also the R', () => {
    const m = matrixOf('', ['Lead', 'Dev'], [['Decide', 'AR I']]);
    expect(checkMatrix(m)).toEqual([]);
  });

  it('reports a task with no A', () => {
    const m = matrixOf('', ['Lead', 'Dev'], [['Build', 'C R']]);
    expect(checkMatrix(m)).toEqual([{ kind: 'noA', task: 0 }]);
  });

  it('reports a task with more than one A, and counts them', () => {
    const m = matrixOf('', ['Lead', 'Dev', 'Client'], [['Build', 'A AR A']]);
    expect(checkMatrix(m)).toEqual([{ kind: 'manyA', task: 0, count: 3 }]);
  });

  it('reports a task with no R', () => {
    const m = matrixOf('', ['Lead', 'Dev'], [['Build', 'A C']]);
    expect(checkMatrix(m)).toEqual([{ kind: 'noR', task: 0 }]);
  });

  it('says once that a task without any letter needs both', () => {
    const m = matrixOf('', ['Lead', 'Dev'], [['Build', 'AR C'], ['Ship', '- -']]);
    expect(checkMatrix(m)).toEqual([{ kind: 'noLetter', task: 1 }]);
  });

  it('reports a role that holds no letter', () => {
    const m = matrixOf('', ['Lead', 'Dev', 'Client'], [['Build', 'A R -'], ['Ship', 'AR C -']]);
    expect(checkMatrix(m)).toEqual([{ kind: 'emptyRole', role: 2 }]);
  });

  it('does not count how many tasks one person does: no source gives a limit', () => {
    const m = matrixOf('', ['Lead', 'Dev'], Array.from({ length: 30 }, (_, i) => [`Task ${i}`, 'A R'] as [string, string]));
    expect(checkMatrix(m)).toEqual([]);
  });

  it('is said in a sentence in both languages', () => {
    const many = { kind: 'manyA', task: 0, count: 2 } as const;
    expect(RACI_WORDS.en.finding(many, 'Build')).toBe('Task "Build" has 2 A: keep one.');
    expect(RACI_WORDS.fr.finding(many, 'Coder')).toBe('La tâche «\u00A0Coder\u00A0» a 2 A\u00A0: gardez-en un seul.');
    expect(RACI_WORDS.fr.finding({ kind: 'emptyRole', role: 1 }, 'Client')).toBe('Le rôle «\u00A0Client\u00A0» n\'a aucune lettre.');
  });
});

describe('the caps', () => {
  it('stops at 30 tasks', () => {
    const m = blankMatrix('', ['a'], ['b']);
    for (let i = 1; i < MAX_TASKS; i += 1) expect(addTask(m, `t${i}`)).toBe(true);
    expect(addTask(m, 'one too many')).toBe(false);
    expect(m.tasks).toHaveLength(30);
    expect(m.cells).toHaveLength(30);
  });

  it('stops at 12 roles', () => {
    const m = blankMatrix('', ['a'], ['b']);
    for (let i = 1; i < MAX_ROLES; i += 1) expect(addRole(m, `r${i}`)).toBe(true);
    expect(addRole(m, 'one too many')).toBe(false);
    expect(m.roles).toHaveLength(12);
    expect(m.cells[0]).toHaveLength(12);
  });

  it('keeps one task and one role', () => {
    const m = blankMatrix('', ['a'], ['b']);
    expect(removeTask(m, 0)).toBe(false);
    expect(removeRole(m, 0)).toBe(false);
  });

  it('removes the row and the column it is asked to', () => {
    const m = sample();
    expect(removeRole(m, 1)).toBe(true);
    expect(removeTask(m, 0)).toBe(true);
    expect(m).toEqual({ title: 'Site', tasks: ['Build'], roles: ['Lead', 'Client'], cells: [['A', 'I']] });
  });
});

describe('the link', () => {
  it('is short: two cells per character', () => {
    expect(encodeMatrix(sample())).toBe('#m=1/Site/Write+the+brief,Build/Lead,Dev,Client/aeb');
  });

  it('gives the same matrix back', () => {
    const m = sample();
    expect(decodeMatrix(encodeMatrix(m) ?? '')).toEqual(m);
  });

  it('carries accents, separators and an odd number of cells', () => {
    const m = matrixOf('Été 2027 : a/b, c+d', ['Rôle « un »'], [['Tâche, 1/2', 'AR'], ['x~y', 'I'], ['', '-']]);
    expect(decodeMatrix(encodeMatrix(m) ?? '')).toEqual(m);
  });

  it('carries the largest matrix under the cap', () => {
    const m = blankMatrix('t', Array.from({ length: MAX_TASKS }, (_, i) => `Task ${i}`), Array.from({ length: MAX_ROLES }, (_, i) => `Role ${i}`));
    m.cells[29][11] = 'I';
    const link = encodeMatrix(m);
    expect(link).not.toBeNull();
    expect(decodeMatrix(link ?? '')).toEqual(m);
  });

  it('is not written past the cap', () => {
    const long = 'é'.repeat(MAX_NAME);
    const m = blankMatrix(long, Array.from({ length: MAX_TASKS }, () => long), ['a']);
    expect(encodeMatrix(m)).toBeNull();
  });

  it.each([
    ['nothing', ''],
    ['another fragment', '#faq'],
    ['an unknown version', '#m=2/Site/a/b/0'],
    ['a missing part', '#m=1/Site/a/b'],
    ['one part too many', '#m=1/Site/a/b/0/0'],
    ['too few cells', '#m=1/Site/a,b/c,d/0'],
    ['too many cells', '#m=1/Site/a/b/000'],
    ['a character that is no cell', '#m=1/Site/a/b/A'],
    ['a broken escape', '#m=1/%E0%A4%A/a/b/0'],
    ['31 tasks', `#m=1/t/${Array.from({ length: 31 }, () => 'a').join(',')}/b/${'0'.repeat(16)}`],
    ['13 roles', `#m=1/t/a/${Array.from({ length: 13 }, () => 'b').join(',')}/${'0'.repeat(7)}`],
    ['a name past 60 characters', `#m=1/t/${'a'.repeat(MAX_NAME + 1)}/b/0`],
    ['a title past 60 characters', `#m=1/${'a'.repeat(MAX_NAME + 1)}/a/b/0`],
    ['a link past the cap', `#m=1/t/a/b/0${'/'.repeat(MAX_LINK)}`],
  ])('refuses %s', (_, fragment) => {
    expect(decodeMatrix(fragment)).toBeNull();
  });
});

describe('the exports', () => {
  it('writes a CSV that Excel reads: byte order mark, CRLF, the separator asked for', () => {
    expect(matrixCsv(sample(), 'Tâche', ';')).toBe('\uFEFFTâche;Lead;Dev;Client\r\nWrite the brief;R;C;A\r\nBuild;A;R;I\r\n');
    expect(matrixCsv(sample(), 'Task', ',')).toBe('\uFEFFTask,Lead,Dev,Client\r\nWrite the brief,R,C,A\r\nBuild,A,R,I\r\n');
  });

  it('quotes a name that carries the separator and defuses a formula', () => {
    const m = matrixOf('', ['a;b', '=SUM(A1)'], [['Say "hi", then go', 'AR -']]);
    expect(matrixCsv(m, 'Task', ';')).toBe('\uFEFFTask;"a;b";\'=SUM(A1)\r\n"Say ""hi"", then go";A/R;\r\n');
  });

  it('writes a Markdown table with the letters centred', () => {
    expect(matrixMarkdown(sample(), 'Task')).toBe(
      '| Task | Lead | Dev | Client |\n| --- | :-: | :-: | :-: |\n| Write the brief | R | C | A |\n| Build | A | R | I |\n',
    );
  });

  it('keeps an empty cell and a pipe from breaking the table', () => {
    const m = matrixOf('', ['a|b'], [['x', '-'], ['y', 'AR']]);
    expect(matrixMarkdown(m, 'Task')).toBe('| Task | a\\|b |\n| --- | :-: |\n| x |   |\n| y | A/R |\n');
  });
});

/*
 * The two pages show the same matrices and the same questions: what a visitor
 * reads and what the FAQPage graph declares come from one array per page.
 */
describe('the two pages', () => {
  const pages = ['src/routes/fr/matrice-raci/+page.svelte', 'src/routes/raci-matrix/+page.svelte'].map((file) => readFileSync(file, 'utf8'));

  it.each(pages)('keeps its matrices free of anomalies', (source) => {
    const found = [...source.matchAll(/matrixOf\(('(?:[^'\\]|\\.)*'), (\[[^\]]*\]), (\[\n(?: {4}\[.*\],\n)+ {2}\])\)/g)];
    expect(found).toHaveLength(4);
    for (const [, title, roles, lines] of found) {
      const m = new Function('matrixOf', `return matrixOf(${title}, ${roles}, ${lines})`)(matrixOf) as Matrix;
      expect(checkMatrix(m), m.title).toEqual([]);
    }
  });

  it('gives both languages the same letters', () => {
    const letters = pages.map((source) => [...source.matchAll(/, '([ARCI -]+)'\],/g)].map((m) => m[1]));
    expect(letters[0]).toHaveLength(20);
    expect(letters[1]).toEqual(letters[0]);
  });

  it.each(pages)('declares the FAQ it shows, from one array', (source) => {
    expect(source).toContain('mainEntity: FAQ.map(');
    expect(source).toContain('{#each FAQ as { q, r } (q)}');
    expect([...source.matchAll(/^ {6}q: /gm)]).toHaveLength(5);
  });
});
