import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://www.thomas-schwabauer.de";

const OG_LOCALES: Record<Locale, string> = {
  de: "de_DE",
  en: "en_US",
};

/**
 * Absolute URL einer Seite für eine Locale.
 * Deutsch (Default) ohne Präfix, Englisch unter /en — muss zur
 * localePrefix-Strategie "as-needed" in src/i18n/routing.ts passen.
 */
export function localizedUrl(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${normalized}` || SITE_URL;
}

/**
 * Standard-Social-Preview (1200×630), gerendert aus scripts/og-image.html
 * (headless Chrome). Maße werden nur für dieses Bild behauptet — überschreibt
 * eine Seite ogImage, bleiben width/height weg.
 */
const DEFAULT_OG_IMAGE = "/og-image.png";

interface BuildMetadataOptions {
  locale: Locale;
  /** Pfad ohne Locale-Präfix, z.B. "/" oder "/services/app-entwicklung" */
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
  /**
   * Erzwingt Canonical + og:url auf die URL dieser Locale und lässt
   * die hreflang-Alternates weg. Für Seiten, deren Inhalt nur in einer
   * Sprache existiert (z.B. der Blog nur auf Deutsch): so zeigt die
   * EN-Variante als Canonical auf die DE-URL und es werden keine
   * de/en-hreflang-Paare behauptet (verhindert Duplicate Content).
   */
  canonicalLocale?: Locale;
}

/**
 * Erzeugt Canonical, hreflang-Alternates, Open Graph und Twitter-Metadata
 * für eine Seite. x-default zeigt auf die deutsche Version (Zielmarkt DE).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  canonicalLocale,
}: BuildMetadataOptions): Metadata {
  const canonical = localizedUrl(canonicalLocale ?? locale, path);

  // width/height nur für das Default-Bild behaupten — bei einem von der
  // Seite überschriebenen ogImage sind die Maße unbekannt.
  const ogImageEntry =
    ogImage === DEFAULT_OG_IMAGE
      ? { url: ogImage, width: 1200, height: 630 }
      : { url: ogImage };

  // hreflang-Alternates nur, wenn der Inhalt tatsächlich in mehreren
  // Sprachen existiert. Bei canonicalLocale entfällt hreflang komplett.
  let languages: Record<string, string> | undefined;
  if (!canonicalLocale) {
    languages = Object.fromEntries(
      routing.locales.map((l) => [l, localizedUrl(l, path)])
    );
    languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(languages && { languages }),
    },
    openGraph: {
      type: ogType,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l]),
      url: canonical,
      siteName: "Thomas Schwabauer - Fullstack Development Wetzlar",
      title,
      description,
      images: [ogImageEntry],
    },
    twitter: {
      // 1200×630-Bild → großes Preview.
      card: "summary_large_image",
      site: "@ThenaDev",
      creator: "@ThenaDev",
      title,
      description,
      images: [ogImage],
    },
  };
}
