import type {
  Answers,
  CheckboxGroupValue,
  Field,
  OnboardingConfig,
  RepeaterItemValue,
} from "@/config/onboarding/types";
import { isVisible, resolveOptions } from "@/lib/onboarding/schema";

export interface EmailPalette {
  primary: string;
  sectionBg: string;
  sectionBorder: string;
  hintBg: string;
  hintText: string;
  text: string;
}

const EMPTY_MARK = "—";
const SECRET_MARK = "verschlüsselt im Anhang";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function optionLabel(field: Field, answers: Answers, value: string): string {
  return (
    resolveOptions(field, answers).find((option) => option.value === value)
      ?.label ?? value
  );
}

export function formatAnswer(
  field: Field,
  value: unknown,
  answers: Answers,
): string {
  if (field.type === "checkboxGroup") {
    const group = value as CheckboxGroupValue | undefined;
    const labels = (group?.selected ?? []).map((entry) =>
      optionLabel(field, answers, entry),
    );
    if (group?.other?.trim()) labels.push(group.other.trim());
    return labels.length > 0 ? labels.join(", ") : EMPTY_MARK;
  }

  if (field.type === "select" || field.type === "radio") {
    const raw = typeof value === "string" ? value.trim() : "";
    return raw ? optionLabel(field, answers, raw) : EMPTY_MARK;
  }

  const raw = typeof value === "string" ? value.trim() : "";
  return raw.length > 0 ? raw : EMPTY_MARK;
}

function rowHtml(
  palette: EmailPalette,
  label: string,
  value: string,
  isSecret = false,
): string {
  const formatted = escapeHtml(value).replace(/\n/g, "<br>");
  const cell = isSecret
    ? `<em style="color:${palette.hintText};">${escapeHtml(SECRET_MARK)}</em>`
    : formatted;

  return `<tr>
  <td style="padding:6px 15px 6px 0; vertical-align:top; width:45%;"><strong style="color:${palette.primary};">${escapeHtml(label)}</strong></td>
  <td style="padding:6px 0; vertical-align:top;">${cell}</td>
</tr>`;
}

function repeaterHtml(
  palette: EmailPalette,
  field: Field,
  answers: Answers,
): string {
  const items = Array.isArray(answers[field.id])
    ? (answers[field.id] as RepeaterItemValue[])
    : [];

  if (items.length === 0) {
    return rowHtml(palette, field.label, EMPTY_MARK);
  }

  const headingKey = field.itemsFrom?.into;

  const blocks = items
    .map((item, index) => {
      const heading = headingKey
        ? String(item[headingKey] ?? "")
        : `Eintrag ${index + 1}`;

      const rows = (field.fields ?? [])
        .filter((child) => child.type !== "info")
        .map((child) =>
          rowHtml(
            palette,
            child.label,
            formatAnswer(child, item[child.id], answers),
            child.type === "secret",
          ),
        )
        .join("");

      return `<div style="margin:10px 0; padding:10px; background:#ffffff; border:1px solid ${palette.sectionBorder}; border-radius:6px;">
  <p style="margin:0 0 6px; font-weight:bold;">${escapeHtml(heading)}</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse;">${rows}</table>
</div>`;
    })
    .join("");

  return `<tr><td colspan="2" style="padding:6px 0;"><strong style="color:${palette.primary};">${escapeHtml(field.label)}</strong>${blocks}</td></tr>`;
}

export function buildOwnerHtml(
  config: OnboardingConfig,
  answers: Answers,
  palette: EmailPalette,
  attachmentName: string,
): string {
  const sections = config.steps
    .map((step) => {
      const rows = step.fields
        .filter((field) => field.type !== "info")
        .filter((field) => isVisible(field, answers))
        .map((field) =>
          field.type === "repeater"
            ? repeaterHtml(palette, field, answers)
            : rowHtml(
                palette,
                field.label,
                formatAnswer(field, answers[field.id], answers),
                field.type === "secret",
              ),
        )
        .join("");

      if (!rows) return "";

      return `<div style="background-color:${palette.sectionBg}; padding:20px; border-radius:8px; margin:20px 0; border-left:4px solid ${palette.sectionBorder};">
  <h2 style="color:${palette.primary}; margin-top:0; font-size:18px;">${escapeHtml(step.title)}</h2>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse;">${rows}</table>
</div>`;
    })
    .join("");

  return `<div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px; color:${palette.text};">
  <h1 style="color:${palette.primary}; border-bottom:2px solid ${palette.primary}; padding-bottom:10px;">
    Onboarding-Angaben: ${escapeHtml(config.clientName)}
  </h1>
  <p style="font-size:16px; line-height:1.6;">${escapeHtml(config.projectTitle)}</p>
  ${sections}
  <div style="background-color:${palette.hintBg}; padding:15px; border-radius:8px; margin:20px 0; font-size:12px; color:${palette.hintText};">
    <strong>Zugangsdaten:</strong> liegen ausschließlich verschlüsselt im Anhang <strong>${escapeHtml(attachmentName)}</strong>.
    Entschlüsseln mit <code>node scripts/onboarding-decrypt.mjs ${escapeHtml(attachmentName)}</code>.<br>
    <strong>Zeitstempel:</strong> ${escapeHtml(new Date().toLocaleString("de-DE"))}
  </div>
</div>`;
}

export function buildOwnerText(
  config: OnboardingConfig,
  answers: Answers,
): string {
  const lines: string[] = [
    `Onboarding-Angaben: ${config.clientName}`,
    config.projectTitle,
    "",
  ];

  for (const step of config.steps) {
    lines.push(step.title, "-".repeat(step.title.length));

    for (const field of step.fields) {
      if (field.type === "info") continue;
      if (!isVisible(field, answers)) continue;

      if (field.type === "secret") {
        lines.push(`${field.label}: ${SECRET_MARK}`);
        continue;
      }

      if (field.type === "repeater") {
        const items = Array.isArray(answers[field.id])
          ? (answers[field.id] as RepeaterItemValue[])
          : [];
        lines.push(`${field.label}:`);
        items.forEach((item, index) => {
          const headingKey = field.itemsFrom?.into;
          lines.push(
            `  ${headingKey ? String(item[headingKey] ?? "") : `Eintrag ${index + 1}`}`,
          );
          for (const child of field.fields ?? []) {
            if (child.type === "info") continue;
            lines.push(
              `    ${child.label}: ${
                child.type === "secret"
                  ? SECRET_MARK
                  : formatAnswer(child, item[child.id], answers)
              }`,
            );
          }
        });
        continue;
      }

      lines.push(
        `${field.label}: ${formatAnswer(field, answers[field.id], answers)}`,
      );
    }

    lines.push("");
  }

  return lines.join("\n");
}

export function buildConfirmationHtml(
  config: OnboardingConfig,
  palette: EmailPalette,
  nextStepText: string,
  sender: { name: string; homepage: string; email: string },
): string {
  return `<div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:20px; color:${palette.text};">
  <h1 style="color:${palette.primary}; border-bottom:2px solid ${palette.primary}; padding-bottom:10px;">
    Ihre Angaben sind angekommen
  </h1>
  <div style="background-color:${palette.sectionBg}; padding:20px; border-radius:8px; margin:20px 0; border-left:4px solid ${palette.sectionBorder};">
    <p style="margin:0 0 15px; font-size:16px; line-height:1.6;">Guten Tag,</p>
    <p style="margin:0 0 15px; font-size:16px; line-height:1.6;">
      vielen Dank — Ihre Angaben zum Projekt „${escapeHtml(config.projectTitle)}“ sind bei mir eingegangen.
    </p>
    <p style="margin:0; font-size:16px; line-height:1.6;">${escapeHtml(nextStepText)}</p>
  </div>
  <p style="font-size:16px; line-height:1.6;">
    Mit freundlichen Grüßen<br>
    <strong>${escapeHtml(sender.name)}</strong><br>
    <a href="${escapeHtml(sender.homepage)}" style="color:${palette.primary}; text-decoration:none;">${escapeHtml(sender.homepage)}</a>
  </p>
  <div style="background-color:${palette.hintBg}; padding:15px; border-radius:8px; margin:30px 0 0; font-size:12px; color:${palette.hintText};">
    <strong>Hinweis:</strong> Diese Bestätigung enthält aus Sicherheitsgründen weder Ihre Angaben noch Ihre Zugangsdaten.
    Fragen? Schreiben Sie an <a href="mailto:${escapeHtml(sender.email)}" style="color:${palette.primary};">${escapeHtml(sender.email)}</a>.
  </div>
</div>`;
}

export function secretsAttachmentName(slug: string, now: Date): string {
  const date = now.toISOString().slice(0, 10);
  return `secrets-${slug}-${date}.json`;
}
