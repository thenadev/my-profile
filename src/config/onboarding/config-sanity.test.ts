import ermaganConfig from "@/config/onboarding/clients/ermagan";
import { flattenFields } from "@/config/onboarding/fields";
import type {
  Field,
  FieldType,
  OnboardingConfig,
} from "@/config/onboarding/types";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CLIENTS_DIR = join(process.cwd(), "src/config/onboarding/clients");

const ALL_FIELD_TYPES: FieldType[] = [
  "text",
  "email",
  "tel",
  "textarea",
  "select",
  "radio",
  "checkboxGroup",
  "repeater",
  "secret",
  "info",
];

function isConfig(value: unknown): value is OnboardingConfig {
  const candidate = value as OnboardingConfig | undefined;
  return (
    !!candidate &&
    typeof candidate.slug === "string" &&
    Array.isArray(candidate.steps)
  );
}

function clientSlugs(): string[] {
  return readdirSync(CLIENTS_DIR)
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
    .map((file) => file.replace(/\.ts$/, ""));
}

async function loadConfigsFromDisk(): Promise<OnboardingConfig[]> {
  const configs: OnboardingConfig[] = [];

  for (const slug of clientSlugs()) {
    const module = (await import(`./clients/${slug}.ts`)) as {
      default?: unknown;
    };
    expect(
      isConfig(module.default),
      `${slug}.ts hat keinen Default-Export vom Typ OnboardingConfig`,
    ).toBe(true);
    configs.push(module.default as OnboardingConfig);
  }

  expect(configs.length).toBeGreaterThan(0);
  return configs;
}

function repeaterOf(
  config: OnboardingConfig,
  fieldId: string,
): Field | undefined {
  return flattenFields(config).find(
    (item) => item.field.id === fieldId && item.field.type === "repeater",
  )?.field;
}

describe("Kundenkonfigurationen", () => {
  it("benennt jede Datei unter clients/ nach ihrem Slug", async () => {
    const slugs = clientSlugs();
    const configs = await loadConfigsFromDisk();

    expect(configs.map((config) => config.slug)).toEqual(slugs);
  });

  it("hat konfigurationsweit eindeutige Feld-IDs", async () => {
    for (const config of await loadConfigsFromDisk()) {
      const ids = flattenFields(config).map((entry) => entry.field.id);
      const intoKeys = flattenFields(config)
        .map((entry) => entry.field.itemsFrom?.into)
        .filter((key): key is string => !!key);

      const all = [...ids, ...intoKeys];
      const duplicates = all.filter((id, index) => all.indexOf(id) !== index);

      expect(duplicates, `${config.slug}: doppelte Feld-IDs`).toEqual([]);
    }
  });

  it("hat eindeutige Schritt-IDs", async () => {
    for (const config of await loadConfigsFromDisk()) {
      const ids = config.steps.map((step) => step.id);
      expect(new Set(ids).size, `${config.slug}`).toBe(ids.length);
    }
  });

  it("verweist mit visibleIf auf existierende Felder", async () => {
    for (const config of await loadConfigsFromDisk()) {
      const ids = new Set(flattenFields(config).map((entry) => entry.field.id));

      for (const { field } of flattenFields(config)) {
        if (!field.visibleIf) continue;
        expect(
          ids.has(field.visibleIf.fieldId),
          `${config.slug}/${field.id}.visibleIf → ${field.visibleIf.fieldId}`,
        ).toBe(true);
      }
    }
  });

  it("verweist mit optionsFrom auf ein Unterfeld eines repeaters", async () => {
    for (const config of await loadConfigsFromDisk()) {
      for (const { field } of flattenFields(config)) {
        if (!field.optionsFrom) continue;

        expect(field.type, `${config.slug}/${field.id}`).toBe("checkboxGroup");

        const source = repeaterOf(config, field.optionsFrom.fieldId);
        expect(
          source,
          `${config.slug}/${field.id}.optionsFrom → kein repeater`,
        ).toBeDefined();
        expect(
          source?.fields?.some(
            (child) => child.id === field.optionsFrom?.itemField,
          ),
          `${config.slug}/${field.id}.optionsFrom.itemField unbekannt`,
        ).toBe(true);
      }
    }
  });

  it("verweist mit itemsFrom auf ein Unterfeld eines repeaters", async () => {
    for (const config of await loadConfigsFromDisk()) {
      for (const { field } of flattenFields(config)) {
        if (!field.itemsFrom) continue;

        expect(field.type, `${config.slug}/${field.id}`).toBe("repeater");

        const source = repeaterOf(config, field.itemsFrom.fieldId);
        expect(
          source,
          `${config.slug}/${field.id}.itemsFrom → kein repeater`,
        ).toBeDefined();
        expect(
          source?.fields?.some(
            (child) => child.id === field.itemsFrom?.itemField,
          ),
          `${config.slug}/${field.id}.itemsFrom.itemField unbekannt`,
        ).toBe(true);
      }
    }
  });

  it("liest die Bestätigungsadresse aus einem E-Mail-Feld auf Schrittebene", async () => {
    for (const config of await loadConfigsFromDisk()) {
      if (!config.confirmationTo) continue;

      const entry = flattenFields(config).find(
        (item) => item.field.id === config.confirmationTo,
      );

      expect(
        entry,
        `${config.slug}: confirmationTo → ${config.confirmationTo}`,
      ).toBeDefined();
      expect(entry?.parent).toBeUndefined();
      expect(entry?.field.type).toBe("email");
    }
  });

  it("gibt Auswahlfeldern Optionen und repeatern Unterfelder", async () => {
    for (const config of await loadConfigsFromDisk()) {
      for (const { field } of flattenFields(config)) {
        const where = `${config.slug}/${field.id}`;

        if (field.type === "select" || field.type === "radio") {
          expect(field.options?.length, `${where} ohne Optionen`).toBeTruthy();
        }
        if (field.type === "checkboxGroup") {
          expect(
            !!field.options?.length || !!field.optionsFrom,
            `${where} ohne Optionen`,
          ).toBe(true);
        }
        if (field.type === "repeater") {
          expect(field.fields?.length, `${where} ohne Unterfelder`).toBeTruthy();
        }
      }
    }
  });

  it("nutzt in der Ermagan-Konfiguration jeden Feldtyp mindestens einmal", () => {
    const used = new Set(
      flattenFields(ermaganConfig).map((entry) => entry.field.type),
    );

    expect(ALL_FIELD_TYPES.filter((type) => !used.has(type))).toEqual([]);
  });
});
