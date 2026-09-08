import type { Secrets } from "@/config/onboarding/types";
import {
  encryptSecrets,
  SECRETS_ALGORITHM,
  SECRETS_PAYLOAD_VERSION,
} from "@/lib/onboarding/crypto";
import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "vitest";
import { decryptSecrets } from "../../../scripts/onboarding-decrypt.mjs";

const MODULUS_LENGTH_BITS = 2048;

function keyPair() {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: MODULUS_LENGTH_BITS,
  });

  return {
    privateKeyPem: privateKey
      .export({ type: "pkcs8", format: "pem" })
      .toString(),
    publicKeySpkiBase64: publicKey
      .export({ type: "spki", format: "der" })
      .toString("base64"),
  };
}

const secrets: Secrets = {
  ionosPassword: { label: "IONOS-Passwort", value: "Höchst-Geheim/2026!" },
  "mailboxPasswords.0.mailboxPassword": {
    label: "Passwort",
    value: "abc123",
    item: "finanzen@muster-gmbh.de",
  },
};

describe("encryptSecrets", () => {
  it("liefert eine Nutzlast im vereinbarten Format", async () => {
    const { publicKeySpkiBase64 } = keyPair();

    const payload = await encryptSecrets(secrets, publicKeySpkiBase64);

    expect(payload.v).toBe(SECRETS_PAYLOAD_VERSION);
    expect(payload.alg).toBe(SECRETS_ALGORITHM);
    expect(payload.encryptedKey).toMatch(/^[A-Za-z0-9+/]+=*$/);
    expect(payload.iv).toMatch(/^[A-Za-z0-9+/]+=*$/);
    expect(payload.ciphertext).toMatch(/^[A-Za-z0-9+/]+=*$/);
    expect(Date.parse(payload.createdAt)).not.toBeNaN();
  });

  it("enthält keinen Klartext eines Geheimnisses", async () => {
    const { publicKeySpkiBase64 } = keyPair();

    const serialized = JSON.stringify(
      await encryptSecrets(secrets, publicKeySpkiBase64),
    );

    expect(serialized).not.toContain("Höchst-Geheim/2026!");
    expect(serialized).not.toContain("abc123");
  });

  it("erzeugt je Absendung einen neuen Sitzungsschlüssel und IV", async () => {
    const { publicKeySpkiBase64 } = keyPair();

    const first = await encryptSecrets(secrets, publicKeySpkiBase64);
    const second = await encryptSecrets(secrets, publicKeySpkiBase64);

    expect(first.iv).not.toBe(second.iv);
    expect(first.ciphertext).not.toBe(second.ciphertext);
    expect(first.encryptedKey).not.toBe(second.encryptedKey);
  });
});

describe("Round-Trip verschlüsseln → entschlüsseln", () => {
  it("gibt mit dem passenden privaten Schlüssel exakt die Eingabe zurück", async () => {
    const { privateKeyPem, publicKeySpkiBase64 } = keyPair();

    const payload = await encryptSecrets(secrets, publicKeySpkiBase64);

    expect(decryptSecrets(payload, privateKeyPem)).toEqual(secrets);
  });

  it("scheitert mit einem fremden privaten Schlüssel", async () => {
    const { publicKeySpkiBase64 } = keyPair();
    const foreign = keyPair();

    const payload = await encryptSecrets(secrets, publicKeySpkiBase64);

    expect(() => decryptSecrets(payload, foreign.privateKeyPem)).toThrow();
  });

  it("weist eine unbekannte Nutzlast-Version ab", async () => {
    const { privateKeyPem, publicKeySpkiBase64 } = keyPair();

    const payload = await encryptSecrets(secrets, publicKeySpkiBase64);

    expect(() => decryptSecrets({ ...payload, v: 99 }, privateKeyPem)).toThrow(
      /Version/,
    );
  });

  it("erkennt einen veränderten Ciphertext", async () => {
    const { privateKeyPem, publicKeySpkiBase64 } = keyPair();

    const payload = await encryptSecrets(secrets, publicKeySpkiBase64);
    const tampered = Buffer.from(payload.ciphertext, "base64");
    tampered[0] ^= 0xff;

    expect(() =>
      decryptSecrets(
        { ...payload, ciphertext: tampered.toString("base64") },
        privateKeyPem,
      ),
    ).toThrow();
  });
});
