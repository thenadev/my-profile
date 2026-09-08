import { ermaganConfig } from "@/config/onboarding/clients/ermagan";
import {
  getConfigByToken,
  isExpired,
  isValidTokenFormat,
  resolveToken,
} from "@/config/onboarding";
import type { OnboardingConfig } from "@/config/onboarding/types";
import { afterEach, describe, expect, it } from "vitest";

const KNOWN_TOKEN = "0123456789abcdef0123456789abcdef";
const UNKNOWN_TOKEN = "ffffffffffffffffffffffffffffffff";

function withTokenEnv(value: string | undefined) {
  if (value === undefined) {
    delete process.env.ONBOARDING_TOKENS;
  } else {
    process.env.ONBOARDING_TOKENS = value;
  }
}

afterEach(() => {
  withTokenEnv(undefined);
});

describe("isValidTokenFormat", () => {
  it("akzeptiert 32 Hex-Zeichen in Kleinschreibung", () => {
    expect(isValidTokenFormat(KNOWN_TOKEN)).toBe(true);
  });

  it("lehnt zu kurze, großgeschriebene und fremde Zeichen ab", () => {
    expect(isValidTokenFormat("abc")).toBe(false);
    expect(isValidTokenFormat(KNOWN_TOKEN.toUpperCase())).toBe(false);
    expect(isValidTokenFormat("../../etc/passwd")).toBe(false);
  });
});

describe("resolveToken", () => {
  it("liefert die Konfiguration zu einem bekannten Token", () => {
    withTokenEnv(JSON.stringify({ [KNOWN_TOKEN]: "ermagan" }));

    const resolution = resolveToken(KNOWN_TOKEN);

    expect(resolution.status).toBe("ok");
    expect(resolution.status === "ok" && resolution.config.slug).toBe(
      "ermagan",
    );
  });

  it("liefert unknown für ein Token, das nicht in der ENV steht", () => {
    withTokenEnv(JSON.stringify({ [KNOWN_TOKEN]: "ermagan" }));

    expect(resolveToken(UNKNOWN_TOKEN).status).toBe("unknown");
  });

  it("liefert unknown, wenn der Slug keiner Konfiguration entspricht", () => {
    withTokenEnv(JSON.stringify({ [KNOWN_TOKEN]: "gibtsnicht" }));

    expect(resolveToken(KNOWN_TOKEN).status).toBe("unknown");
  });

  it("liefert unknown ohne gesetzte ENV", () => {
    withTokenEnv(undefined);

    expect(resolveToken(KNOWN_TOKEN).status).toBe("unknown");
  });

  it("liefert unknown bei ungültigem JSON oder falschem Typ in der ENV", () => {
    withTokenEnv("kein json");
    expect(resolveToken(KNOWN_TOKEN).status).toBe("unknown");

    withTokenEnv('["ermagan"]');
    expect(resolveToken(KNOWN_TOKEN).status).toBe("unknown");

    withTokenEnv(JSON.stringify({ [KNOWN_TOKEN]: 42 }));
    expect(resolveToken(KNOWN_TOKEN).status).toBe("unknown");
  });
});

describe("getConfigByToken", () => {
  it("gibt null für ein unbekanntes Token zurück", () => {
    withTokenEnv(JSON.stringify({ [KNOWN_TOKEN]: "ermagan" }));

    expect(getConfigByToken(UNKNOWN_TOKEN)).toBeNull();
    expect(getConfigByToken(KNOWN_TOKEN)?.slug).toBe("ermagan");
  });
});

describe("isExpired", () => {
  const withExpiry = (expiresAt?: string): OnboardingConfig => ({
    ...ermaganConfig,
    expiresAt,
  });

  it("ist ohne expiresAt nie abgelaufen", () => {
    expect(isExpired(withExpiry(undefined), new Date("2099-01-01"))).toBe(
      false,
    );
  });

  it("erkennt ein überschrittenes Datum", () => {
    const config = withExpiry("2026-01-31T23:59:59.000Z");

    expect(isExpired(config, new Date("2026-02-01T00:00:00.000Z"))).toBe(true);
    expect(isExpired(config, new Date("2026-01-30T00:00:00.000Z"))).toBe(false);
  });

  it("behandelt ein unlesbares Datum als nicht abgelaufen", () => {
    expect(isExpired(withExpiry("irgendwann"), new Date())).toBe(false);
  });
});
