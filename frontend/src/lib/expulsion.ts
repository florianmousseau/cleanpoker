/**
 * QA-107: "Expulser" used to take someone out of the meeting on the first
 * click, vote lost, with no question and no way back. The button sits on every
 * row and is offered to everyone, so a slip of the finger was enough. Removing
 * a person now asks first, and only a yes sends anything.
 *
 * Returns whether the removal was sent.
 */
export function expulserApresAccord(
  question: string,
  demander: (question: string) => boolean,
  expulser: () => void
): boolean {
  if (!demander(question)) return false;
  expulser();
  return true;
}
