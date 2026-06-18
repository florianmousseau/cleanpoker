import { browser } from '$app/environment';

export type Lang = 'fr' | 'en' | 'es' | 'de' | 'pt';

let _lang = $state<Lang>(
  browser ? ((localStorage.getItem('lang') as Lang) ?? 'fr') : 'fr'
);

export const lang = {
  get current(): Lang { return _lang; },
  set(l: Lang) {
    _lang = l;
    if (browser) localStorage.setItem('lang', l);
  },
};
