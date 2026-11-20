import type { Cell, Finding } from '#lib/raci.ts';
import { MAX_ROLES, MAX_TASKS } from '#lib/raci.ts';

/** What the generator says, in the language of the page that carries it. */
export interface RaciWords {
  heading: string;
  titleLabel: string;
  corner: string;
  task: string;
  role: string;
  taskName: (position: number) => string;
  roleName: (position: number) => string;
  removeTask: (name: string) => string;
  removeRole: (name: string) => string;
  addTask: string;
  addRole: string;
  cell: (task: string, role: string, state: string) => string;
  states: Record<Cell, string>;
  help: string;
  checks: string;
  clean: string;
  finding: (found: Finding, name: string) => string;
  copyMarkdown: string;
  copyLink: string;
  copied: string;
  refused: string;
  downloadCsv: string;
  print: string;
  clear: string;
  privacy: string;
  tooLong: string;
  fileName: string;
  separator: ',' | ';';
}

const FR: RaciWords = {
  heading: 'Remplir une matrice RACI',
  titleLabel: 'Titre de la matrice',
  corner: 'Tâche',
  task: 'Tâche',
  role: 'Rôle',
  taskName: (position) => `Nom de la tâche ${position}`,
  roleName: (position) => `Nom du rôle ${position}`,
  removeTask: (name) => `Supprimer la tâche ${name}`,
  removeRole: (name) => `Supprimer le rôle ${name}`,
  addTask: 'Ajouter une tâche',
  addRole: 'Ajouter un rôle',
  cell: (task, role, state) => `Tâche ${task}, rôle ${role}\u00A0: ${state}`,
  states: {
    '': 'case vide',
    R: 'Réalisateur',
    A: 'Approbateur',
    AR: 'Approbateur et Réalisateur',
    C: 'Consulté',
    I: 'Informé',
  },
  help: `Un clic sur une case, ou la touche Entrée, fait passer de vide à R, A, A/R, C puis I. Les touches R, A, C et I posent la lettre, Retour arrière vide la case, les flèches changent de case. La matrice accepte ${MAX_TASKS} tâches et ${MAX_ROLES} rôles.`,
  checks: 'Contrôles',
  clean: 'Aucune anomalie.',
  finding: (found, name) => {
    if (found.kind === 'noLetter') return `La tâche «\u00A0${name}\u00A0» n'a aucune lettre\u00A0: il lui faut un A et au moins un R.`;
    if (found.kind === 'noA') return `La tâche «\u00A0${name}\u00A0» n'a pas de A.`;
    if (found.kind === 'manyA') return `La tâche «\u00A0${name}\u00A0» a ${found.count} A\u00A0: gardez-en un seul.`;
    if (found.kind === 'noR') return `La tâche «\u00A0${name}\u00A0» n'a pas de R.`;
    return `Le rôle «\u00A0${name}\u00A0» n'a aucune lettre.`;
  },
  copyMarkdown: 'Copier en Markdown',
  copyLink: 'Copier le lien',
  copied: 'Copié dans le presse-papiers.',
  refused: 'Le navigateur a refusé la copie.',
  downloadCsv: 'Télécharger en CSV',
  print: 'Imprimer',
  clear: 'Vider la matrice',
  privacy: 'La matrice reste dans votre navigateur et dans le lien.',
  tooLong: 'La matrice dépasse la taille d\'un lien\u00A0: le lien de la page ne la contient plus.',
  fileName: 'matrice-raci.csv',
  separator: ';',
};

const EN: RaciWords = {
  heading: 'Fill in a RACI matrix',
  titleLabel: 'Matrix title',
  corner: 'Task',
  task: 'Task',
  role: 'Role',
  taskName: (position) => `Name of task ${position}`,
  roleName: (position) => `Name of role ${position}`,
  removeTask: (name) => `Remove task ${name}`,
  removeRole: (name) => `Remove role ${name}`,
  addTask: 'Add a task',
  addRole: 'Add a role',
  cell: (task, role, state) => `Task ${task}, role ${role}: ${state}`,
  states: {
    '': 'empty',
    R: 'Responsible',
    A: 'Accountable',
    AR: 'Accountable and Responsible',
    C: 'Consulted',
    I: 'Informed',
  },
  help: `A click on a cell, or the Enter key, moves it from empty to R, A, A/R, C, then I. The R, A, C and I keys set the letter, Backspace empties the cell, the arrow keys move between cells. The matrix takes ${MAX_TASKS} tasks and ${MAX_ROLES} roles.`,
  checks: 'Checks',
  clean: 'No issue found.',
  finding: (found, name) => {
    if (found.kind === 'noLetter') return `Task "${name}" has no letter: it needs one A and at least one R.`;
    if (found.kind === 'noA') return `Task "${name}" has no A.`;
    if (found.kind === 'manyA') return `Task "${name}" has ${found.count} A: keep one.`;
    if (found.kind === 'noR') return `Task "${name}" has no R.`;
    return `Role "${name}" has no letter.`;
  },
  copyMarkdown: 'Copy as Markdown',
  copyLink: 'Copy the link',
  copied: 'Copied to the clipboard.',
  refused: 'The browser refused the copy.',
  downloadCsv: 'Download as CSV',
  print: 'Print',
  clear: 'Empty the matrix',
  privacy: 'The matrix stays in your browser and in the link.',
  tooLong: 'The matrix is larger than a link can hold: the page link no longer carries it.',
  fileName: 'raci-matrix.csv',
  separator: ',',
};

export const RACI_WORDS = { fr: FR, en: EN };
