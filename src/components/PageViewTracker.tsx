"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-63C2KDFQHT";

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
