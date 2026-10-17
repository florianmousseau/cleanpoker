/**
 * The site's probe: what a visitor's browser would meet, read now. The rules
 * live in `#lib/sonde.ts`; this file only hands it the platform's readers.
 */
import type { RequestHandler } from "@sveltejs/kit";
import { PUBLIC_API_URL } from "$app/env/public";
import { sonder } from "#lib/sonde.ts";
import {
  lecteursDeLaPlateforme,
  reponseDeSonde,
} from "#lib/sonde-plateforme.ts";

// Prerendered, the probe would serve a verdict frozen at build time.
export const prerender = false;

export const GET: RequestHandler = async ({
  fetch: fetchInterne,
  platform,
  url,
}) => {
  const lecteurs = lecteursDeLaPlateforme({
    fetchInterne,
    assets: platform?.env?.ASSETS,
    url,
    serveur: PUBLIC_API_URL,
    commit: __COMMIT__,
  });
  return reponseDeSonde(await sonder(lecteurs));
};
