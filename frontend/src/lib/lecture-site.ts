/**
 * Reads a company site at most once per address, and lets the room creation
 * wait for the read in flight. Typing an address used to do nothing until
 * the visitor pressed Enter or the button: the room opened without the logo.
 */
export function lecteurDeSite(lire: (site: string) => Promise<boolean>) {
  let lu = '';
  let enCours: Promise<void> = Promise.resolve();
  return {
    /** Starts a read unless this address was already read with success. */
    lire(site: string): Promise<void> {
      const adresse = site.trim();
      if (!adresse || adresse === lu) return enCours;
      lu = adresse;
      enCours = lire(adresse).then((ok) => {
        if (!ok && lu === adresse) lu = '';
      });
      return enCours;
    },
    /** Records an address already applied, kept from an earlier visit. */
    deja(site: string) {
      lu = site.trim();
    },
  };
}
