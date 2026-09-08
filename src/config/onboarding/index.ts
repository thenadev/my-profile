import type { OnboardingConfig } from "./types";

// Kein `import "server-only"`: Dieses Modul wird auch von der Pages-Router-Route
// src/pages/api/onboarding/submit.ts geladen, wo das Marker-Paket zur Laufzeit wirft.
// Es darf ausschließlich serverseitig importiert werden.

export const TOKEN_PATTERN = /^[a-f0-9]{32}$/;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

export type TokenResolution =
  | { status: "unknown" }
  | { status: "expired"; config: OnboardingConfig }
  | { status: "ok"; config: OnboardingConfig };

export function isValidTokenFormat(token: string): boolean {
  return TOKEN_PATTERN.test(token);
}

function readTokenMap(): Record<string, string> {
  const raw = process.env.ONBOARDING_TOKENS;
  if (!raw) return {};

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const map: Record<string, string> = {};
    for (const [token, slug] of Object.entries(parsed)) {
      if (typeof slug === "string") map[token] = slug;
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Lädt die Kundenkonfiguration allein anhand des Slugs — ein neuer Kunde braucht
 * damit nur eine Datei unter clients/ und einen Token-Eintrag in der ENV.
 * Das Muster (dynamischer Import mit Template-Literal) nutzt das Projekt bereits
 * in src/i18n/request.ts; der Bundler nimmt dadurch alle Dateien des Ordners auf.
 */
async function loadClientConfig(slug: string): Promise<OnboardingConfig | null> {
  if (!SLUG_PATTERN.test(slug)) return null;

  try {
    const module = (await import(`./clients/${slug}`)) as {
      default?: OnboardingConfig;
    };
    const config = module.default;

    return config && config.slug === slug ? config : null;
  } catch {
    return null;
  }
}

export function isExpired(
  config: OnboardingConfig,
  now: Date = new Date(),
): boolean {
  if (!config.expiresAt) return false;

  const expiry = Date.parse(config.expiresAt);
  if (Number.isNaN(expiry)) return false;

  return now.getTime() > expiry;
}

export async function resolveToken(
  token: string,
  now: Date = new Date(),
): Promise<TokenResolution> {
  if (!isValidTokenFormat(token)) return { status: "unknown" };

  const slug = readTokenMap()[token];
  if (!slug) return { status: "unknown" };

  const config = await loadClientConfig(slug);
  if (!config) return { status: "unknown" };

  return isExpired(config, now)
    ? { status: "expired", config }
    : { status: "ok", config };
}

export async function getConfigByToken(
  token: string,
): Promise<OnboardingConfig | null> {
  const resolution = await resolveToken(token);
  return resolution.status === "ok" ? resolution.config : null;
}
