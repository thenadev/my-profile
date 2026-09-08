import type { Answers, Field, Step } from "@/config/onboarding/types";
import {
  buildStepDefaults,
  buildStepSchema,
  isVisible,
  partitionValues,
  resolveItemLabels,
  resolveOptions,
} from "@/lib/onboarding/schema";
import { describe, expect, it } from "vitest";

function step(fields: Field[]): Step {
  return { id: "test", title: "Test", fields };
}

function errorFor(
  result: ReturnType<ReturnType<typeof buildStepSchema>["safeParse"]>,
  path: string,
): string | undefined {
  if (result.success) return undefined;
  return result.error.issues.find((issue) => issue.path.join(".") === path)
    ?.message;
}

describe("buildStepSchema", () => {
  it("verlangt Pflichtfelder und nennt einen Hinweis statt eines Codes", () => {
    const schema = buildStepSchema(
      step([{ id: "name", type: "text", label: "Name", required: true }]),
      {},
    );

    const result = schema.safeParse({ name: "" });

    expect(result.success).toBe(false);
    expect(errorFor(result, "name")).toMatch(/Bitte/);
  });

  it("lässt optionale Felder leer zu, prüft sie aber bei Eingabe", () => {
    const schema = buildStepSchema(
      step([{ id: "mail", type: "email", label: "E-Mail" }]),
      {},
    );

    expect(schema.safeParse({ mail: "" }).success).toBe(true);
    expect(schema.safeParse({ mail: "keine-adresse" }).success).toBe(false);
    expect(schema.safeParse({ mail: "kunde@example.de" }).success).toBe(true);
  });

  it("prüft E-Mail und Telefon mit passenden Basisprüfungen", () => {
    const schema = buildStepSchema(
      step([
        { id: "mail", type: "email", label: "E-Mail", required: true },
        { id: "phone", type: "tel", label: "Telefon", required: true },
      ]),
      {},
    );

    expect(
      schema.safeParse({ mail: "a@b.de", phone: "+49 176 56120050" }).success,
    ).toBe(true);
    expect(schema.safeParse({ mail: "a@b", phone: "0641 12345" }).success).toBe(
      false,
    );
    expect(schema.safeParse({ mail: "a@b.de", phone: "abc" }).success).toBe(
      false,
    );
  });

  it("übernimmt pattern, minLength und maxLength", () => {
    const schema = buildStepSchema(
      step([
        {
          id: "vatId",
          type: "text",
          label: "USt-IdNr.",
          required: true,
          validation: { pattern: "^DE\\d{9}$", minLength: 11, maxLength: 11 },
        },
      ]),
      {},
    );

    expect(schema.safeParse({ vatId: "DE123456789" }).success).toBe(true);
    expect(schema.safeParse({ vatId: "DE12345678" }).success).toBe(false);
    expect(schema.safeParse({ vatId: "FR123456789" }).success).toBe(false);
  });

  it("nimmt unsichtbare Felder aus dem Schema", () => {
    const fields: Field[] = [
      {
        id: "hasSignatures",
        type: "radio",
        label: "Signaturen?",
        options: [
          { value: "yes", label: "Ja" },
          { value: "no", label: "Nein" },
        ],
      },
      {
        id: "signatureDetails",
        type: "textarea",
        label: "Welche?",
        required: true,
        visibleIf: { fieldId: "hasSignatures", equals: "yes" },
      },
    ];

    const hidden = buildStepSchema(step(fields), { hasSignatures: "no" });
    const shown = buildStepSchema(step(fields), { hasSignatures: "yes" });

    expect(Object.keys(hidden.shape)).toEqual(["hasSignatures"]);
    expect(hidden.safeParse({ hasSignatures: "no" }).success).toBe(true);
    expect(
      shown.safeParse({ hasSignatures: "yes", signatureDetails: "" }).success,
    ).toBe(false);
  });

  it("lässt secret-Felder auf Wunsch aus dem Schema", () => {
    const fields: Field[] = [
      { id: "user", type: "text", label: "Benutzer" },
      { id: "password", type: "secret", label: "Passwort", required: true },
    ];

    const withSecrets = buildStepSchema(step(fields), {});
    const withoutSecrets = buildStepSchema(
      step(fields),
      {},
      {
        includeSecrets: false,
      },
    );

    expect(Object.keys(withSecrets.shape)).toContain("password");
    expect(Object.keys(withoutSecrets.shape)).not.toContain("password");
  });

  it("erzwingt minItems eines repeaters", () => {
    const schema = buildStepSchema(
      step([
        {
          id: "addresses",
          type: "repeater",
          label: "Adressen",
          minItems: 1,
          fields: [
            { id: "address", type: "email", label: "Adresse", required: true },
          ],
        },
      ]),
      {},
    );

    expect(schema.safeParse({ addresses: [] }).success).toBe(false);
    expect(
      schema.safeParse({ addresses: [{ address: "a@b.de" }] }).success,
    ).toBe(true);
    expect(schema.safeParse({ addresses: [{ address: "" }] }).success).toBe(
      false,
    );
  });

  it("verlangt bei einer Pflicht-Mehrfachauswahl mindestens eine Angabe", () => {
    const schema = buildStepSchema(
      step([
        {
          id: "systems",
          type: "checkboxGroup",
          label: "Systeme",
          required: true,
          allowOther: true,
          options: [{ value: "datev", label: "DATEV" }],
        },
      ]),
      {},
    );

    expect(
      schema.safeParse({ systems: { selected: [], other: "" } }).success,
    ).toBe(false);
    expect(
      schema.safeParse({ systems: { selected: ["datev"], other: "" } }).success,
    ).toBe(true);
    expect(
      schema.safeParse({ systems: { selected: [], other: "Lexware" } }).success,
    ).toBe(true);
  });
});

describe("isVisible", () => {
  const field: Field = {
    id: "detail",
    type: "text",
    label: "Detail",
    visibleIf: { fieldId: "toggle", equals: "yes" },
  };

  it("zeigt Felder ohne Bedingung immer", () => {
    expect(isVisible({ id: "a", type: "text", label: "A" }, {})).toBe(true);
  });

  it("vergleicht den Wert des referenzierten Feldes", () => {
    expect(isVisible(field, { toggle: "yes" })).toBe(true);
    expect(isVisible(field, { toggle: "no" })).toBe(false);
    expect(isVisible(field, {})).toBe(false);
  });
});

describe("resolveOptions und resolveItemLabels", () => {
  const answers: Answers = {
    mailAddresses: [
      { mailAddress: "info@firma.de" },
      { mailAddress: "  " },
      { mailAddress: "info@firma.de" },
      { mailAddress: "buchhaltung@firma.de" },
    ],
  };

  const derived: Field = {
    id: "mailboxes",
    type: "checkboxGroup",
    label: "Postfächer",
    options: [{ value: "sonstiges", label: "Sonstiges" }],
    optionsFrom: { fieldId: "mailAddresses", itemField: "mailAddress" },
  };

  it("hängt die Werte der Quelle an die statischen Optionen an", () => {
    expect(resolveOptions(derived, answers)).toEqual([
      { value: "sonstiges", label: "Sonstiges" },
      { value: "info@firma.de", label: "info@firma.de" },
      { value: "buchhaltung@firma.de", label: "buchhaltung@firma.de" },
    ]);
  });

  it("ignoriert leere Quellwerte und liefert ohne Quelle nichts", () => {
    expect(resolveOptions(derived, {})).toEqual([
      { value: "sonstiges", label: "Sonstiges" },
    ]);
  });

  it("leitet die Einträge eines repeaters aus der Quelle ab", () => {
    const repeater: Field = {
      id: "mailboxPasswords",
      type: "repeater",
      label: "Passwörter",
      itemsFrom: {
        fieldId: "mailAddresses",
        itemField: "mailAddress",
        into: "mailboxAddress",
      },
      fields: [{ id: "mailboxPassword", type: "secret", label: "Passwort" }],
    };

    expect(resolveItemLabels(repeater, answers)).toEqual([
      "info@firma.de",
      "buchhaltung@firma.de",
    ]);
  });
});

describe("partitionValues", () => {
  const secretStep = step([
    { id: "ionosUser", type: "secret", label: "IONOS-Benutzername" },
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
      fields: [
        { id: "mailboxPassword", type: "secret", label: "Passwort" },
        { id: "mailboxNote", type: "text", label: "Hinweis" },
      ],
    },
  ]);

  const values = {
    ionosUser: "kunde-4711",
    note: "unkritisch",
    mailboxPasswords: [
      {
        mailboxAddress: "info@firma.de",
        mailboxPassword: "streng-geheim",
        mailboxNote: "Sammelpostfach",
      },
    ],
  };

  it("trennt Secrets auch in Repeater-Kindern von den Angaben", () => {
    const { answers, secrets } = partitionValues(secretStep, values);

    expect(JSON.stringify(answers)).not.toContain("kunde-4711");
    expect(JSON.stringify(answers)).not.toContain("streng-geheim");
    expect(answers.note).toBe("unkritisch");
    expect(answers.mailboxPasswords).toEqual([
      { mailboxAddress: "info@firma.de", mailboxNote: "Sammelpostfach" },
    ]);

    expect(secrets.ionosUser).toEqual({
      label: "IONOS-Benutzername",
      value: "kunde-4711",
    });
    expect(secrets["mailboxPasswords.0.mailboxPassword"]).toEqual({
      label: "Passwort",
      value: "streng-geheim",
      item: "info@firma.de",
    });
  });

  it("übernimmt unsichtbare Felder in keine der beiden Seiten", () => {
    const conditional = step([
      {
        id: "toggle",
        type: "radio",
        label: "Ja oder nein?",
        options: [
          { value: "yes", label: "Ja" },
          { value: "no", label: "Nein" },
        ],
      },
      {
        id: "detail",
        type: "text",
        label: "Detail",
        visibleIf: { fieldId: "toggle", equals: "yes" },
      },
      {
        id: "detailSecret",
        type: "secret",
        label: "Geheimes Detail",
        visibleIf: { fieldId: "toggle", equals: "yes" },
      },
    ]);

    const { answers, secrets } = partitionValues(conditional, {
      toggle: "no",
      detail: "verwaist",
      detailSecret: "verwaist",
    });

    expect(answers).toEqual({ toggle: "no" });
    expect(secrets).toEqual({});
  });
});

describe("buildStepDefaults", () => {
  const configuredStep = step([
    {
      id: "companyName",
      type: "text",
      label: "Firma",
      defaultValue: "Muster GmbH",
    },
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
  ]);

  const answers: Answers = {
    mailAddresses: [
      { mailAddress: "info@firma.de" },
      { mailAddress: "buchhaltung@firma.de" },
    ],
  };

  it("nutzt defaultValue, solange keine Antwort gespeichert ist", () => {
    expect(buildStepDefaults(configuredStep, {}, {}).companyName).toBe(
      "Muster GmbH",
    );
    expect(
      buildStepDefaults(configuredStep, { companyName: "Andere GmbH" }, {})
        .companyName,
    ).toBe("Andere GmbH");
  });

  it("erzeugt je Quellwert genau einen Eintrag", () => {
    const values = buildStepDefaults(configuredStep, answers, {});

    expect(values.mailboxPasswords).toEqual([
      { mailboxAddress: "info@firma.de", mailboxPassword: "" },
      { mailboxAddress: "buchhaltung@firma.de", mailboxPassword: "" },
    ]);
  });

  it("stellt Secrets der Sitzung anhand ihres Eintrags wieder her", () => {
    const values = buildStepDefaults(configuredStep, answers, {
      "mailboxPasswords.1.mailboxPassword": {
        label: "Passwort",
        value: "geheim",
        item: "buchhaltung@firma.de",
      },
    });

    expect(values.mailboxPasswords).toEqual([
      { mailboxAddress: "info@firma.de", mailboxPassword: "" },
      { mailboxAddress: "buchhaltung@firma.de", mailboxPassword: "geheim" },
    ]);
  });
});
