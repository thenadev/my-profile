"use client";

// Bewusst next/navigation statt @/i18n/navigation: Die Entscheidung hängt am
// echten URL-Pfad inklusive /en-Präfix.
// eslint-disable-next-line no-restricted-imports
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const UNTRACKED_PATH_SEGMENT = "/onboarding/";

/**
 * Nimmt das Onboarding-Formular von Tracking und Cookie-Banner aus: Dort werden
 * Zugangsdaten eingegeben, dafür wird kein Analyse-Tag geladen.
 */
export default function TrackingGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.includes(UNTRACKED_PATH_SEGMENT)) return null;

  return <>{children}</>;
}
