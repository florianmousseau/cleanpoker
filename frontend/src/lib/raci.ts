/*
 * The two cell writers repeat the guards of export.ts instead of importing
 * them. Measured with `npm run size`: a module shared with the room becomes a
 * file every room downloads, 0.09 kB more on a first visit that has 0.7 kB left.
 */

/** One CSV cell: a value a spreadsheet would run as a formula is written as text instead. */
function cellCsv(value: string): string {
  const formula = value !== '' && '=+-@\t\r'.includes(value[0]);
  const safe = formula ? `'${value}` : value;
  const quoted = ['"', ',', ';', '\n', '\r'].some((sign) => safe.includes(sign));
  return quoted ? `"${safe.replaceAll('"', '""')}"` : safe;
}

/** One Markdown table cell, on a single line, with its pipes escaped. */
function cellMd(value: string): string {
  return value.replaceAll('|', String.raw`\|`).replaceAll('\r', ' ').replaceAll('\n', ' ');
}

/** What one cell holds. `AR` is the person who answers for the task and also does it. */
export type Cell = '' | 'R' | 'A' | 'AR' | 'C' | 'I';

export interface Matrix {
  title: string;
  tasks: string[];
  roles: string[];
  /** One row per task, one cell per role. */
  cells: Cell[][];
}

/** The order a click walks through. Its indexes are the digits of the link. */
export const CYCLE: readonly Cell[] = ['', 'R', 'A', 'AR', 'C', 'I'];

export const MAX_TASKS = 30;
export const MAX_ROLES = 12;
export const MAX_NAME = 60;
/** A link longer than this is neither written nor read. */
export const MAX_LINK = 6000;

const LINK_PREFIX = '#m=';
const VERSION = '1';
const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz';

/** What a cell prints: the letter, or both letters for the one who holds both. */
export function shown(cell: Cell): string {
  return cell === 'AR' ? 'A/R' : cell;
}

export function nextCell(cell: Cell): Cell {
  return CYCLE[(CYCLE.indexOf(cell) + 1) % CYCLE.length];
}

/** The cell a key sets, or null when the key means nothing to a cell. */
export function cellForKey(key: string): Cell | null {
  if (key === 'Backspace' || key === 'Delete') return '';
  const letter = key.toUpperCase();
  return letter === 'R' || letter === 'A' || letter === 'C' || letter === 'I' ? letter : null;
}

export function blankMatrix(title: string, tasks: string[], roles: string[]): Matrix {
  return { title, tasks: [...tasks], roles: [...roles], cells: tasks.map(() => roles.map(() => '' as Cell)) };
}

export function cloneMatrix(m: Matrix): Matrix {
  return { title: m.title, tasks: [...m.tasks], roles: [...m.roles], cells: m.cells.map((row) => [...row]) };
}

export function addTask(m: Matrix, name: string): boolean {
  if (m.tasks.length >= MAX_TASKS) return false;
  m.tasks.push(name);
  m.cells.push(m.roles.map(() => '' as Cell));
  return true;
}

export function addRole(m: Matrix, name: string): boolean {
  if (m.roles.length >= MAX_ROLES) return false;
  m.roles.push(name);
  for (const row of m.cells) row.push('');
  return true;
}

/** A matrix keeps at least one task. */
export function removeTask(m: Matrix, index: number): boolean {
  if (m.tasks.length <= 1 || index < 0 || index >= m.tasks.length) return false;
  m.tasks.splice(index, 1);
  m.cells.splice(index, 1);
  return true;
}

/** A matrix keeps at least one role. */
export function removeRole(m: Matrix, index: number): boolean {
  if (m.roles.length <= 1 || index < 0 || index >= m.roles.length) return false;
  m.roles.splice(index, 1);
  for (const row of m.cells) row.splice(index, 1);
  return true;
}

export type Finding =
  | { kind: 'noLetter' | 'noA' | 'noR'; task: number }
  | { kind: 'manyA'; task: number; count: number }
  | { kind: 'emptyRole'; role: number };

const holdsA = (cell: Cell) => cell === 'A' || cell === 'AR';
const holdsR = (cell: Cell) => cell === 'R' || cell === 'AR';

function taskFindings(row: Cell[], task: number): Finding[] {
  if (row.every((cell) => cell === '')) return [{ kind: 'noLetter', task }];
  const found: Finding[] = [];
  const approvers = row.filter(holdsA).length;
  if (approvers === 0) found.push({ kind: 'noA', task });
  if (approvers > 1) found.push({ kind: 'manyA', task, count: approvers });
  if (!row.some(holdsR)) found.push({ kind: 'noR', task });
  return found;
}

/**
 * What the matrix breaks: a task without exactly one A, a task without an R,
 * a role that holds no letter. Nothing else is a rule, so nothing else is flagged.
 */
export function checkMatrix(m: Matrix): Finding[] {
  const found = m.cells.flatMap(taskFindings);
  m.roles.forEach((_, role) => {
    if (m.cells.every((row) => row[role] === '')) found.push({ kind: 'emptyRole', role });
  });
  return found;
}

const encodeName = (name: string) => encodeURIComponent(name).replaceAll('%20', '+');
const decodeName = (name: string) => decodeURIComponent(name.replaceAll('+', '%20'));

/** Two cells make one character: six states squared is the 36 of base 36. */
function encodeCells(cells: Cell[][]): string {
  const flat = cells.flat().map((cell) => CYCLE.indexOf(cell));
  let out = '';
  for (let i = 0; i < flat.length; i += 2) out += DIGITS[flat[i] * 6 + (flat[i + 1] ?? 0)];
  return out;
}

/** The matrix as a URL fragment, or null when it would pass the cap. */
export function encodeMatrix(m: Matrix): string | null {
  const link =
    LINK_PREFIX +
    [VERSION, encodeName(m.title), m.tasks.map(encodeName).join(','), m.roles.map(encodeName).join(','), encodeCells(m.cells)].join('/');
  return link.length > MAX_LINK ? null : link;
}

function decodeNames(part: string, max: number): string[] | null {
  const names = part.split(',').map(decodeName);
  if (names.length > max || names.some((name) => name.length > MAX_NAME)) return null;
  return names;
}

function decodeCells(part: string, tasks: number, roles: number): Cell[][] | null {
  const count = tasks * roles;
  if (part.length !== Math.ceil(count / 2)) return null;
  const flat: Cell[] = [];
  for (const char of part) {
    const value = DIGITS.indexOf(char);
    if (value < 0) return null;
    flat.push(CYCLE[Math.floor(value / 6)], CYCLE[value % 6]);
  }
  return Array.from({ length: tasks }, (_, task) => flat.slice(task * roles, (task + 1) * roles));
}

/**
 * The matrix a fragment carries, or null. A link is typed text: anything that
 * is not exactly a matrix under the caps is refused, never repaired.
 */
export function decodeMatrix(fragment: string): Matrix | null {
  if (!fragment.startsWith(LINK_PREFIX) || fragment.length > MAX_LINK) return null;
  const parts = fragment.slice(LINK_PREFIX.length).split('/');
  if (parts.length !== 5 || parts[0] !== VERSION) return null;
  try {
    const title = decodeName(parts[1]);
    const tasks = decodeNames(parts[2], MAX_TASKS);
    const roles = decodeNames(parts[3], MAX_ROLES);
    if (title.length > MAX_NAME || !tasks || !roles) return null;
    const cells = decodeCells(parts[4], tasks.length, roles.length);
    return cells ? { title, tasks, roles, cells } : null;
  } catch {
    return null;
  }
}

function rows(m: Matrix, corner: string): string[][] {
  return [[corner, ...m.roles], ...m.tasks.map((task, i) => [task, ...m.cells[i].map(shown)])];
}

/**
 * The matrix as CSV, with a byte order mark so that Excel reads the accents.
 * The separator is the caller's: a French Excel splits on the semicolon.
 */
export function matrixCsv(m: Matrix, corner: string, separator: ',' | ';'): string {
  return '\uFEFF' + rows(m, corner).map((row) => row.map(cellCsv).join(separator)).join('\r\n') + '\r\n';
}

/** The matrix as a Markdown table, letters centred. */
export function matrixMarkdown(m: Matrix, corner: string): string {
  const [header, ...body] = rows(m, corner).map((row) => `| ${row.map((cell) => cellMd(cell) || ' ').join(' | ')} |`);
  const rule = `| --- |${m.roles.map(() => ' :-: |').join('')}`;
  return [header, rule, ...body].join('\n') + '\n';
}

/** A matrix written by hand: one line per task, its letters separated by spaces, `-` for an empty cell. */
export function matrixOf(title: string, roles: string[], lines: [task: string, letters: string][]): Matrix {
  const cell = (letter: string): Cell => (CYCLE.includes(letter as Cell) ? (letter as Cell) : '');
  return {
    title,
    roles: [...roles],
    tasks: lines.map(([task]) => task),
    cells: lines.map(([, letters]) => roles.map((_, i) => cell(letters.split(' ')[i] ?? ''))),
  };
}
