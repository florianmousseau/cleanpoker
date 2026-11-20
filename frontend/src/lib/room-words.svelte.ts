import { loadDictionary, loadExtras } from '#lib/dictionaries.ts';
import type { Extras, Translation } from '#lib/i18n.ts';
import { lang, type Lang } from '#lib/lang.svelte.ts';

type Sources = {
  load: (l: Lang) => Promise<Translation>;
  loadExtras: (l: Lang) => Promise<Extras>;
  lang: () => Lang;
  apply: (l: Lang) => void;
};

const BROWSER: Sources = {
  load: loadDictionary,
  loadExtras,
  lang: () => lang.current,
  apply: (l) => lang.set(l),
};

/**
 * The words of a room: the dictionary the page was loaded with, until the
 * visitor picks another language in the footer, and the extras once the
 * options, the QR code or the local AI ask for them.
 *
 * The words and the language change together, once the new dictionary is
 * here: no half-translated room in between. The last language asked wins,
 * and a fetch that fails leaves the room in the language it already speaks.
 */
export function roomWords(loaded: () => Translation, from: Sources = BROWSER) {
  let chosen = $state.raw<Translation | null>(null);
  let extras = $state.raw<Extras | null>(null);
  let extrasWanted = false;
  // The language a switch is fetching, null when none is under way.
  let wanted: Lang | null = null;
  const target = () => wanted ?? from.lang();
  return {
    get current(): Translation { return chosen ?? loaded(); },
    get extras(): Extras | null { return extras; },
    wantExtras(): void {
      if (extrasWanted) return;
      extrasWanted = true;
      const l = target();
      from.loadExtras(l).then(
        (x) => { if (target() === l) extras = x; },
        () => { extrasWanted = false; },
      );
    },
    async change(l: Lang): Promise<void> {
      wanted = l;
      try {
        const [next, nextExtras] = await Promise.all([from.load(l), extrasWanted ? from.loadExtras(l) : null]);
        if (wanted !== l) return;
        chosen = next;
        if (nextExtras) extras = nextExtras;
        from.apply(l);
      } catch {
        // Offline, or a deploy in between: nothing changed, nothing to show.
      } finally {
        if (wanted === l) wanted = null;
      }
    },
  };
}
