import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

/**
 * Konfiguration je statischer Route: gepflegtes lastmod-Datum,
 * changeFrequency und priority. Präfixlose Pfade (Default-Locale = de).
 *
 * WICHTIG: lastModified stammt aus dieser gepflegten Map bzw. dem
 * Blog-Datum — NIEMALS aus `new Date()` pro Request (früherer Bug:
 * lastmod war dadurch immer "heute").
 */
interface StaticRouteConfig {
  path: string;
  lastModified: string; // "YYYY-MM-DD"
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /** Inhalt existiert nur auf Deutsch (canonicalLocale "de") → keine hreflang-Alternates. */
  deOnly?: boolean;
}

const STATIC_ROUTES: StaticRouteConfig[] = [
  { path: "/", lastModified: "2026-07-04", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.5 },
  { path: "/services", lastModified: "2026-07-04", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/app-entwicklung", lastModified: "2026-07-04", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/startup-beratung", lastModified: "2026-07-04", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/unternehmenswebsite", lastModified: "2026-07-04", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.5 },
  { path: "/blog", lastModified: "2026-07-04", changeFrequency: "weekly", priority: 0.7, deOnly: true },
  { path: "/documents", lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.5 },
  { path: "/imprint", lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.3 },
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
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: localizedUrl(routing.defaultLocale, route.path),
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.deOnly ? {} : { alternates: alternates(route.path) }),
  }));

  // Blog-Inhalte existieren nur auf Deutsch – daher KEINE en-Alternate
  // (verhindert Duplicate Content durch identische de/en-URLs).
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const path = `/blog/${encodeURIComponent(post.slug)}`;
    return {
      url: localizedUrl(routing.defaultLocale, path),
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
