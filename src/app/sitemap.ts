import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";
import { routing } from "@/i18n/routing";

/**
 * Konfiguration je statischer Route: gepflegtes lastmod-Datum,
 * changeFrequency und priority. Präfixlose Pfade (Default-Locale = de).
 *
 * WICHTIG: lastModified stammt aus dieser gepflegten Map — NIEMALS aus
 * `new Date()` pro Request (früherer Bug: lastmod war dadurch immer "heute").
 *
 * Leistungen, Blog und /webdesign-wetzlar sind auf thenadev.de umgezogen
 * (301 in next.config.mjs) und gehören nicht mehr in diese Sitemap.
 */
interface StaticRouteConfig {
  path: string;
  lastModified: string; // "YYYY-MM-DD"
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

const STATIC_ROUTES: StaticRouteConfig[] = [
  { path: "/", lastModified: "2026-10-31", changeFrequency: "monthly", priority: 1.0 },
  { path: "/about", lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.6 },
  { path: "/documents", lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", lastModified: "2026-10-31", changeFrequency: "monthly", priority: 0.5 },
  { path: "/imprint", lastModified: "2026-10-31", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", lastModified: "2026-07-04", changeFrequency: "yearly", priority: 0.3 },
];

/** hreflang-Alternates (de/en) für einen präfixlosen Pfad. */
function alternates(path: string) {
  return {
    languages: {
      de: localizedUrl("de", path),
      en: localizedUrl("en", path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    url: localizedUrl(routing.defaultLocale, route.path),
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: alternates(route.path),
  }));
}
