#!/usr/bin/env node
import { generateKeyPairSync } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";

const MODULUS_LENGTH_BITS = 4096;
const PRIVATE_KEY_FILE_MODE = 0o600;
const DEFAULT_PRIVATE_KEY_PATH = resolve(
  homedir(),
  ".config/onboarding/private.pem",
);

const args = process.argv.slice(2);
const force = args.includes("--force");
const targetPath = resolve(
  args.find((arg) => !arg.startsWith("--")) ?? DEFAULT_PRIVATE_KEY_PATH,
);

if (existsSync(targetPath) && !force) {
  console.error(
    `Es liegt bereits ein privater Schlüssel unter ${targetPath}.\n` +
      "Überschreiben würde alle bisher verschlüsselten Übermittlungen unlesbar machen.\n" +
      "Mit --force überschreiben oder einen anderen Pfad angeben.",
  );
  process.exit(1);
}

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: MODULUS_LENGTH_BITS,
});

mkdirSync(dirname(targetPath), { recursive: true, mode: 0o700 });
writeFileSync(targetPath, privateKey.export({ type: "pkcs8", format: "pem" }), {
  mode: PRIVATE_KEY_FILE_MODE,
});

const spkiBase64 = publicKey
  .export({ type: "spki", format: "der" })
  .toString("base64");

console.error(`Privater Schlüssel geschrieben: ${targetPath} (Modus 600)`);
console.error(
  "Dieser Schlüssel gehört ausschließlich auf diesen Rechner — nicht ins Repo, nicht auf den Server.",
);
console.error("Öffentlichen Schlüssel in die Server-ENV eintragen:\n");

console.log(`ONBOARDING_PUBLIC_KEY=${spkiBase64}`);
