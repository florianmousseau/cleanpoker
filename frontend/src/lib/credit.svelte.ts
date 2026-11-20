import { deviceStorage, loadCredit, saveCredit } from '#lib/seat.ts';

// Read while the module loads: the box and the copy button agree from the
// first render. The server has no storage and answers yes, the default.
let on = $state(loadCredit(deviceStorage()));

/** Whether a copied result ends with the line that names PokerAgile. */
export const credit = {
  get on(): boolean { return on; },
  set(value: boolean) {
    on = value;
    saveCredit(deviceStorage(), value);
  },
  /** The line to append, or null when the person turned it off. */
  line(text: string): string | null {
    return on ? text : null;
  },
};
