import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // Deutsch (Zielmarkt) bleibt auf den bestehenden URLs ohne Präfix,
  // Englisch liegt unter /en/... — so bleiben Indexierung und Backlinks erhalten.
  localePrefix: "as-needed",
  // Keine automatische Umleitung anhand Accept-Language/Cookie:
  // Googlebot muss auf / immer die deutsche Version mit Status 200 sehen.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
