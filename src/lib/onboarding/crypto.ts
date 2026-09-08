import type { Secrets } from "@/config/onboarding/types";

export const SECRETS_PAYLOAD_VERSION = 1;
export const SECRETS_ALGORITHM = "RSA-OAEP-256+AES-256-GCM";

const AES_KEY_LENGTH_BITS = 256;
const IV_LENGTH_BYTES = 12;

export interface EncryptedSecrets {
  v: number;
  alg: string;
  encryptedKey: string;
  iv: string;
  ciphertext: string;
  createdAt: string;
}

function toBase64(bytes: ArrayBuffer): string {
  const view = new Uint8Array(bytes);
  let binary = "";
  for (let index = 0; index < view.length; index += 1) {
    binary += String.fromCharCode(view[index]);
  }
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function importPublicKey(publicKeyBase64: string): Promise<CryptoKey> {
  const spki = fromBase64(publicKeyBase64.replace(/\s/g, ""));

  return crypto.subtle.importKey(
    "spki",
    spki,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );
}

export async function encryptSecrets(
  secrets: Secrets,
  publicKeyBase64: string,
): Promise<EncryptedSecrets> {
  const publicKey = await importPublicKey(publicKeyBase64);

  const sessionKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: AES_KEY_LENGTH_BITS },
    true,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH_BYTES));

  const plaintext = new TextEncoder().encode(JSON.stringify(secrets));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    sessionKey,
    plaintext,
  );

  const rawSessionKey = await crypto.subtle.exportKey("raw", sessionKey);
  const encryptedKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawSessionKey,
  );

  return {
    v: SECRETS_PAYLOAD_VERSION,
    alg: SECRETS_ALGORITHM,
    encryptedKey: toBase64(encryptedKey),
    iv: toBase64(iv.buffer as ArrayBuffer),
    ciphertext: toBase64(ciphertext),
    createdAt: new Date().toISOString(),
  };
}
