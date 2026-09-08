import type { Answers, OnboardingConfig } from "@/config/onboarding/types";
import {
  buildConfirmationHtml,
  buildOwnerHtml,
  buildOwnerText,
  escapeHtml,
  secretsAttachmentName,
  type EmailPalette,
} from "@/lib/onboarding/email";
import { describe, expect, it } from "vitest";

const palette: EmailPalette = {
  primary: "#0B878E",
  sectionBg: "#f8f9fa",
  sectionBorder: "#00B0B0",
  hintBg: "#e9ecef",
  hintText: "#6c757d",
  text: "#333333",
};

const testConfig: OnboardingConfig = {
  slug: "muster",
  clientName: "Muster GmbH",
  projectTitle: "Umstellung",
  intro: "Intro",
  notifyEmail: "owner@example.de",
  confirmationTo: "contactEmail",
  afterSubmit: { notes: [] },
  steps: [
    {
      id: "kontakt",
      title: "Kontakt",
      fields: [
        { id: "contactEmail", type: "email", label: "E-Mail" },
        { id: "note", type: "textarea", label: "Notiz" },
        {
          id: "toggle",
          type: "radio",
          label: "Sichtbar?",
          options: [
            { value: "yes", label: "Ja" },
            { value: "no", label: "Nein" },
          ],
        },
        {
          id: "hidden",
          type: "text",
          label: "Nur bei Ja",
          visibleIf: { fieldId: "toggle", equals: "yes" },
        },
      ],
    },
    {
      id: "zugang",
      title: "Zugangsdaten",
      fields: [
        { id: "ionosPassword", type: "secret", label: "IONOS-Passwort" },
        {
          id: "mailboxPasswords",
          type: "repeater",
          label: "Postfächer",
          itemsFrom: {
            fieldId: "mailAddresses",
            itemField: "mailAddress",
            into: "mailboxAddress",
          },
          fields: [
            { id: "mailboxPassword", type: "secret", label: "Passwort" },
          ],
        },
      ],
    },
  ],
};

const answers: Answers = {
  contactEmail: "kunde@example.de",
  note: '<script>alert("xss")</script> & mehr',
  toggle: "no",
  hidden: "sollte nicht auftauchen",
  mailboxPasswords: [{ mailboxAddress: "<b>info@firma.de</b>" }],
};

describe("escapeHtml", () => {
  it("entschärft die HTML-Sonderzeichen", () => {
    expect(escapeHtml('<a href="x">&\'</a>')).toBe(
      "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;",
    );
  });
});

describe("buildOwnerHtml", () => {
  const html = buildOwnerHtml(
    testConfig,
    answers,
    palette,
    "secrets-muster-2026-09-08.json",
  );

  it("escapt jeden Nutzerwert", () => {
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;b&gt;info@firma.de&lt;/b&gt;");
  });

  it("lässt unsichtbare Felder weg", () => {
    expect(html).not.toContain("sollte nicht auftauchen");
  });

  it("nennt statt der Zugangsdaten den Anhang", () => {
    expect(html).toContain("secrets-muster-2026-09-08.json");
    expect(html).toContain("verschlüsselt im Anhang");
  });

  it("gruppiert nach Schritten mit den Beschriftungen aus der Konfiguration", () => {
    expect(html).toContain("Kontakt");
    expect(html).toContain("Zugangsdaten");
    expect(html).toContain("IONOS-Passwort");
  });
});

describe("buildOwnerText", () => {
  it("enthält die Angaben, aber keinen Zugangsdaten-Wert", () => {
    const text = buildOwnerText(testConfig, answers);

    expect(text).toContain("kunde@example.de");
    expect(text).toContain("IONOS-Passwort: verschlüsselt im Anhang");
    expect(text).not.toContain("sollte nicht auftauchen");
  });
});

describe("buildConfirmationHtml", () => {
  it("enthält weder Angaben noch Zugangsdaten", () => {
    const html = buildConfirmationHtml(
      testConfig,
      palette,
      "Nächster Schritt",
      {
        name: "Thomas Schwabauer",
        homepage: "https://thomas-schwabauer.de",
        email: "email@thomas-schwabauer.de",
      },
    );

    expect(html).toContain("Nächster Schritt");
    expect(html).not.toContain("kunde@example.de");
    expect(html).not.toContain("info@firma.de");
    expect(html).not.toContain("IONOS");
  });
});

describe("secretsAttachmentName", () => {
  it("benennt den Anhang nach Slug und Datum", () => {
    expect(
      secretsAttachmentName("muster", new Date("2026-09-08T10:00:00.000Z")),
    ).toBe("secrets-muster-2026-09-08.json");
  });
});
