/**
 * Cookie Consent Utilities
 * Hilfsfunktionen für die Verwaltung von Cookie-Consent
 */

export interface CookieConsentStatus {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
  timestamp: number;
}

/**
 * Prüft ob vanilla-cookieconsent verfügbar ist
 */
export function isVanillaCookieConsentAvailable(): boolean {
  return typeof window !== "undefined" && !!window.CookieConsent;
}

/**
 * Holt den aktuellen Cookie-Consent-Status
 */
export function getCookieConsentStatus(): CookieConsentStatus | null {
  if (typeof window === "undefined") return null;

  // Prüfe vanilla-cookieconsent zuerst
  if (isVanillaCookieConsentAvailable() && window.CookieConsent) {
    try {
      const cookie = window.CookieConsent.getCookie();
      if (cookie) {
        return {
          necessary: cookie.categories?.includes("necessary") || true,
          analytics: cookie.categories?.includes("analytics") || false,
          marketing: cookie.categories?.includes("marketing") || false,
          functionality: cookie.categories?.includes("functionality") || false,
          timestamp: cookie.consentTimestamp ? parseInt(cookie.consentTimestamp) : Date.now(),
        };
      }
    } catch (error) {
      console.warn("Error reading vanilla-cookieconsent status:", error);
    }
  }

  // Fallback: Prüfe legacy cookie
  const legacyCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cookieConsent="));
  
  if (legacyCookie) {
    const value = legacyCookie.split("=")[1];
    return {
      necessary: true,
      analytics: value === "true",
      marketing: value === "true",
      functionality: value === "true",
      timestamp: Date.now(),
    };
  }

  return null;
}

/**
 * Prüft ob eine bestimmte Cookie-Kategorie akzeptiert wurde
 */
export function isCategoryAccepted(category: keyof Omit<CookieConsentStatus, "timestamp">): boolean {
  const status = getCookieConsentStatus();
  if (!status) return false;

  switch (category) {
    case "necessary":
      return status.necessary;
    case "analytics":
      return status.analytics;
    case "marketing":
      return status.marketing;
    case "functionality":
      return status.functionality;
    default:
      return false;
  }
}

/**
 * Prüft ob Google Analytics aktiviert werden darf
 */
export function canUseAnalytics(): boolean {
  return isCategoryAccepted("analytics");
}

/**
 * Prüft ob Marketing-Cookies verwendet werden dürfen
 */
export function canUseMarketing(): boolean {
  return isCategoryAccepted("marketing");
}

/**
 * Prüft ob Funktionalitäts-Cookies verwendet werden dürfen
 */
export function canUseFunctionality(): boolean {
  return isCategoryAccepted("functionality");
}

/**
 * Zeigt den Cookie-Consent-Dialog an (nur für vanilla-cookieconsent)
 */
export function showCookieConsent(): void {
  if (isVanillaCookieConsentAvailable() && window.CookieConsent) {
    try {
      window.CookieConsent.show();
    } catch (error) {
      console.warn("Error showing cookie consent:", error);
    }
  }
}

/**
 * Zeigt die Cookie-Präferenzen an (nur für vanilla-cookieconsent)
 */
export function showCookiePreferences(): void {
  if (isVanillaCookieConsentAvailable() && window.CookieConsent) {
    try {
      window.CookieConsent.showPreferences();
    } catch (error) {
      console.warn("Error showing cookie preferences:", error);
    }
  }
}

/**
 * Löscht alle Cookie-Consent-Daten
 */
export function clearCookieConsent(): void {
  if (isVanillaCookieConsentAvailable() && window.CookieConsent) {
    try {
      window.CookieConsent.reset(true);
    } catch (error) {
      console.warn("Error clearing cookie consent:", error);
    }
  } else {
    // Legacy cookie löschen
    document.cookie = "cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}
