import type { Handle } from "@sveltejs/kit/hooks";
import { sequence } from "@sveltejs/kit/hooks";
import { plateformeCloudflare } from "#lib/plateforme.ts";
import { building, dev } from "$app/env";
import { env, waitUntil } from "cloudflare:workers";
import { SKIP_LINK } from "#lib/skip-link.ts";
import { sansPrefixeEn } from "#lib/redirection-en.ts";
import { versNouveauDomaine } from "#lib/domaine.ts";
import { rangInconnu } from "#lib/fibonacci.ts";
import { accueilDuVisiteur, VARY_RACINE } from "#lib/redirection-langue.ts";

const LOCALES = ["fr", "es", "de", "pt"] as const;
type Locale = (typeof LOCALES)[number];

/**
 * Cloudflare Pages applies _headers to static assets only, never to the
 * responses this worker produces, so pages would otherwise ship with none of
 * them. Keep this table and the _headers file in sync.
 */
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    "connect-src 'self' https://salles.pokeragile.com wss://salles.pokeragile.com",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
};

function routeLocale(pathname: string): Locale | "en" {
  const match = LOCALES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  return match ?? "en";
}

/**
 * English lives at the root, not under /en. Six routes used to exist purely to
 * 301 away from it, each a +page.server.ts next to an unreachable +page.svelte.
 * One rule replaces the twelve files and covers the paths they missed: /en/
 * alternatives, /en/fibonacci and /en/estimation-agile had no redirect route
 * and fell through to /[id], which treats an unknown segment as a room id.
 */
const localeThemeAndHeaders: Handle = async ({ event, resolve }) => {
  const moved = versNouveauDomaine(event.url);
  if (moved !== null) {
    return new Response(null, { status: 301, headers: { location: moved } });
  }
  const target = sansPrefixeEn(event.url.pathname);
  if (target !== null) {
    return new Response(null, {
      status: 301,
      headers: { location: `${target}${event.url.search}` },
    });
  }

  /*
   * A rank page exists for 1 to 100. The route takes any segment, because a
   * param matcher or a load function would each add client code to every
   * page of the site. An unknown rank is handed to a path no route serves, so
   * the visitor gets the same 404 page as anywhere else.
   */
  if (rangInconnu(event.url.pathname)) {
    return event.fetch(`${event.url.pathname.replace(/\/$/, "")}/introuvable`);
  }

  const accueil = accueilDuVisiteur(
    event.url.pathname,
    event.request.headers.get("cookie") ?? "",
    event.request.headers.get("accept-language") ?? "",
  );
  if (accueil !== null) {
    return new Response(null, {
      status: 302,
      headers: {
        location: `${accueil}${event.url.search}`,
        vary: VARY_RACINE,
        "cache-control": "private, no-store",
      },
    });
  }

  const locale = routeLocale(event.url.pathname);

  const themeCookie = event.cookies.get("theme");
  const themeAttr =
    themeCookie === "dark"
      ? ' data-theme="dark"'
      : themeCookie === "light"
        ? ' data-theme="light"'
        : "";

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replace('<html lang="fr">', `<html lang="${locale}"${themeAttr}>`)
        .replace(
          'class="skip-link">Aller au contenu principal</a>',
          `class="skip-link">${SKIP_LINK[locale]}</a>`,
        ),
  });

  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(header, value);
  }
  if (event.url.pathname === "/") response.headers.set("vary", VARY_RACINE);

  return response;
};

/*
 * `plateformeCloudflare` runs FIRST, because adapter-cloudflare 8 passes no
 * `platform` and the routes read their bindings there. The in-site visitor
 * counter that ran last left on 2026-11-19: the zone Worker of the estate
 * counts pokeragile.com.
 */
const plateforme = plateformeCloudflare({
  env,
  waitUntil,
  actif: !dev && !building,
});

export const handle = sequence(plateforme, localeThemeAndHeaders);
