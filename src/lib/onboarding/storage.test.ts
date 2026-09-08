import type { Field, Step } from "@/config/onboarding/types";
import { encryptSecrets } from "@/lib/onboarding/crypto";
import { buildSubmitPayload } from "@/lib/onboarding/payload";
import { partitionValues } from "@/lib/onboarding/schema";
import {
  clearProgress,
  loadProgress,
  saveProgress,
  storageKey,
} from "@/lib/onboarding/storage";
import { generateKeyPairSync } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const TOKEN = "0123456789abcdef0123456789abcdef";
const IONOS_PASSWORD = "IONOS-Klartext-2026";
const MAILBOX_PASSWORD = "Postfach-Klartext-2026";

class MemoryStorage {
  private entries = new Map<string, string>();

  get length() {
    return this.entries.size;
  }

  clear() {
    this.entries.clear();
  }

  getItem(key: string) {
    return this.entries.get(key) ?? null;
  }

  key(index: number) {
    return Array.from(this.entries.keys())[index] ?? null;
  }

  removeItem(key: string) {
    this.entries.delete(key);
  }

  setItem(key: string, value: string) {
    this.entries.set(key, value);
  }
}

const secretFields: Field[] = [
  { id: "ionosPassword", type: "secret", label: "IONOS-Passwort" },
  { id: "note", type: "text", label: "Notiz" },
  {
    id: "mailboxPasswords",
    type: "repeater",
    label: "Passwörter",
    itemsFrom: {
      fieldId: "mailAddresses",
      itemField: "mailAddress",
      into: "mailboxAddress",
    },
    fields: [{ id: "mailboxPassword", type: "secret", label: "Passwort" }],
  },
];

const secretStep: Step = {
  id: "zugangsdaten",
  title: "Zugangsdaten",
  fields: secretFields,
};

const filledValues = {
  ionosPassword: IONOS_PASSWORD,
  note: "unkritische Notiz",
  mailboxPasswords: [
    {
      mailboxAddress: "info@firma.de",
      mailboxPassword: MAILBOX_PASSWORD,
    },
  ],
};

let storage: MemoryStorage;

beforeEach(() => {
  storage = new MemoryStorage();
  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    configurable: true,
    writable: true,
  });
});

afterEach(() => {
  Reflect.deleteProperty(globalThis, "localStorage");
});

describe("saveProgress", () => {
  it("schreibt Version, Schritt und Antworten unter dem Token-Key", () => {
    saveProgress(TOKEN, 3, { note: "unkritische Notiz" });

    const raw = storage.getItem(storageKey(TOKEN));
    expect(raw).not.toBeNull();

    const stored = JSON.parse(raw as string);
    expect(stored.v).toBe(1);
    expect(stored.stepIndex).toBe(3);
    expect(stored.answers).toEqual({ note: "unkritische Notiz" });
    expect(Date.parse(stored.savedAt)).not.toBeNaN();
  });

  it("speichert keinen Wert eines secret-Feldes", () => {
    const { answers } = partitionValues(secretStep, filledValues);

    saveProgress(TOKEN, 8, answers);

    const raw = storage.getItem(storageKey(TOKEN)) as string;
    expect(raw).not.toContain(IONOS_PASSWORD);
    expect(raw).not.toContain(MAILBOX_PASSWORD);
    expect(raw).toContain("info@firma.de");
  });
});

describe("loadProgress", () => {
  it("liest den gespeicherten Stand zurück", () => {
    saveProgress(TOKEN, 2, { note: "x" });

    expect(loadProgress(TOKEN)?.stepIndex).toBe(2);
  });

  it("verwirft beschädigte oder fremdversionierte Einträge", () => {
    storage.setItem(storageKey(TOKEN), "kein json");
    expect(loadProgress(TOKEN)).toBeNull();

    storage.setItem(
      storageKey(TOKEN),
      JSON.stringify({ v: 99, stepIndex: 1, answers: {} }),
    );
    expect(loadProgress(TOKEN)).toBeNull();
  });

  it("gibt ohne Eintrag null zurück", () => {
    expect(loadProgress(TOKEN)).toBeNull();
  });
});

describe("clearProgress", () => {
  it("entfernt den Eintrag", () => {
    saveProgress(TOKEN, 1, { note: "x" });
    clearProgress(TOKEN);

    expect(storage.getItem(storageKey(TOKEN))).toBeNull();
    expect(loadProgress(TOKEN)).toBeNull();
  });
});

describe("Request-Body", () => {
  it("enthält für Zugangsdaten ausschließlich das Chiffrat", async () => {
    const { publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    const { answers, secrets } = partitionValues(secretStep, filledValues);

    const encryptedSecrets = await encryptSecrets(
      secrets,
      publicKey.export({ type: "spki", format: "der" }).toString("base64"),
    );
    const body = JSON.stringify(
      buildSubmitPayload(TOKEN, answers, encryptedSecrets),
    );

    expect(body).not.toContain(IONOS_PASSWORD);
    expect(body).not.toContain(MAILBOX_PASSWORD);
    expect(body).toContain(encryptedSecrets.ciphertext);
    expect(body).toContain("info@firma.de");
  });
});
