#!/usr/bin/env node
import { constants, createDecipheriv, privateDecrypt } from "node:crypto";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SUPPORTED_VERSION = 1;
const SUPPORTED_ALGORITHM = "RSA-OAEP-256+AES-256-GCM";
const AUTH_TAG_LENGTH_BYTES = 16;
const DEFAULT_PRIVATE_KEY_PATH = resolve(
  homedir(),
  ".config/onboarding/private.pem",
);

export function decryptSecrets(payload, privateKeyPem) {
  if (!payload || payload.v !== SUPPORTED_VERSION) {
    throw new Error(`Unbekannte Nutzlast-Version: ${payload?.v}`);
  }
  if (payload.alg !== SUPPORTED_ALGORITHM) {
    throw new Error(`Unbekanntes Verfahren: ${payload.alg}`);
  }

  const sessionKey = privateDecrypt(
    {
      key: privateKeyPem,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(payload.encryptedKey, "base64"),
  );

  // Web Crypto hängt den GCM-Auth-Tag an den Ciphertext an, node:crypto erwartet ihn getrennt.
  const sealed = Buffer.from(payload.ciphertext, "base64");
  const authTag = sealed.subarray(sealed.length - AUTH_TAG_LENGTH_BYTES);
  const ciphertext = sealed.subarray(0, sealed.length - AUTH_TAG_LENGTH_BYTES);

  const decipher = createDecipheriv(
    "aes-256-gcm",
    sessionKey,
    Buffer.from(payload.iv, "base64"),
  );
  decipher.setAuthTag(authTag);

  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return JSON.parse(plaintext.toString("utf8"));
}

function main() {
  const [file, keyPathArg] = process.argv.slice(2);

  if (!file) {
    console.error(
      "Aufruf: node scripts/onboarding-decrypt.mjs <datei.json> [pfad/zum/private.pem]",
    );
    process.exit(1);
  }

  const keyPath = resolve(
    keyPathArg ??
      process.env.ONBOARDING_PRIVATE_KEY_PATH ??
      DEFAULT_PRIVATE_KEY_PATH,
  );

  const payload = JSON.parse(readFileSync(resolve(file), "utf8"));
  const privateKeyPem = readFileSync(keyPath, "utf8");

  console.log(JSON.stringify(decryptSecrets(payload, privateKeyPem), null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main();
}
