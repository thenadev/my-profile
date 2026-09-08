import { ermaganConfig } from "./clients/ermagan";
import type { OnboardingConfig } from "./types";

// Kein `import "server-only"`: Dieses Modul wird auch von der Pages-Router-Route
// src/pages/api/onboarding/submit.ts geladen, wo das Marker-Paket zur Laufzeit wirft.
// Es darf ausschließlich serverseitig importiert werden.

export const TOKEN_PATTERN = /^[a-f0-9]{32}$/;

const CLIENT_CONFIGS: Record<string, OnboardingConfig> = {
  [ermaganConfig.slug]: ermaganConfig,
};

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

export function isExpired(
  config: OnboardingConfig,
  now: Date = new Date(),
): boolean {
  if (!config.expiresAt) return false;

  const expiry = Date.parse(config.expiresAt);
  if (Number.isNaN(expiry)) return false;

  return now.getTime() > expiry;
}

export function resolveToken(
  token: string,
  now: Date = new Date(),
): TokenResolution {
  if (!isValidTokenFormat(token)) return { status: "unknown" };

  const slug = readTokenMap()[token];
  if (!slug) return { status: "unknown" };

  const config = CLIENT_CONFIGS[slug];
  if (!config) return { status: "unknown" };

  return isExpired(config, now)
    ? { status: "expired", config }
    : { status: "ok", config };
}

export function getConfigByToken(token: string): OnboardingConfig | null {
  const resolution = resolveToken(token);
  return resolution.status === "ok" ? resolution.config : null;
}

export function getAllClientConfigs(): OnboardingConfig[] {
  return Object.values(CLIENT_CONFIGS);
}
