"use client";

import { GA_MEASUREMENT_ID } from "@/config/analytics";
// Bewusst next/navigation statt @/i18n/navigation: GA soll den echten
// URL-Pfad inklusive /en-Präfix tracken.
// eslint-disable-next-line no-restricted-imports
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sendet page_view an GA4 bei Client-Side-Navigation.
 * Behebt "Nicht getaggt" für Seiten wie /documents, /imprint, /privacy,
 * die oft per SPA-Navigation erreicht werden (ohne Full-Page-Reload).
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
