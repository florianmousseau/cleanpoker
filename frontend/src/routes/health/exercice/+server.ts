/**
 * `POST /health/exercice`: the probe served, with one source cut for this
 * single response (`{"couper": ["fichiers"]}`). Reserved to the OIDC token
 * GitHub signs for a job of `main`: `exercice-de-panne.yml` cuts each source
 * in turn and fails when the probe does not see it (D-128).
 */
import type { RequestHandler } from "@sveltejs/kit";
import { PUBLIC_API_URL } from "$app/env/public";
import { recevoirLExercice } from "#lib/exercice.ts";
import { lireLesClesDeGithub } from "#lib/jeton-github.ts";
import {
  lecteursDeLaPlateforme,
  reponseDeSonde,
} from "#lib/sonde-plateforme.ts";

export const prerender = false;

export const POST: RequestHandler = async ({
  fetch: fetchInterne,
  platform,
  request,
  url,
}) => {
  const jeton = (request.headers.get("authorization") ?? "").replace(
    /^Bearer\s+/i,
    "",
  );
  const demande: unknown = await request.json().catch(() => null);
  const lecteurs = lecteursDeLaPlateforme({
    fetchInterne,
    assets: platform?.env?.ASSETS,
    url,
    serveur: PUBLIC_API_URL,
    commit: __COMMIT__,
  });
  const { status, corps } = await recevoirLExercice(
    jeton,
    lireLesClesDeGithub(fetch),
    demande,
    lecteurs,
  );
  return reponseDeSonde(corps, status);
};
