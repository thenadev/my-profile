/**
 * Zentrale Statistik-Konfiguration für einheitliche Werte
 * auf Startseite, Unternehmenswebsite und weiteren Seiten
 */

/** Jahr, ab dem Berufserfahrung gezählt wird (immer bis aktuell) */
export const EXPERIENCE_START_YEAR = 2019;

/** Anzahl Projekte für Stats-Bereich (z.B. Home About) */
export const PROJECT_COUNT_STATS = 20;

/** Anzahl zufriedener Kunden */
export const SATISFIED_CUSTOMERS_COUNT = 10;

/** Zufriedenheits-Prozent (für Hero, Final CTA) */
export const SATISFACTION_PERCENT = 100;

/**
 * Berechnet Jahre Erfahrung ab 2019 bis aktuell
 * @returns Anzahl Jahre (z.B. 2025 → 6, 2026 → 7)
 */
export function getYearsOfExperience(): number {
  return new Date().getFullYear() - EXPERIENCE_START_YEAR;
}

/**
 * Formatiert Jahre Erfahrung für Anzeige (z.B. "6+ Jahre")
 */
export function getYearsOfExperienceDisplay(): string {
  const years = getYearsOfExperience();
  return `${years}+`;
}
