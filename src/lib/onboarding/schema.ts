import type {
  Answers,
  CheckboxGroupValue,
  Field,
  FieldOption,
  OnboardingConfig,
  RepeaterItemValue,
  Secrets,
  Step,
} from "@/config/onboarding/types";
import { z } from "zod";

const TEL_PATTERN = /^[+()\/\d\s.-]{6,}$/;

export interface ValidationMessages {
  required: string;
  email: string;
  tel: string;
  minLength: string;
  maxLength: string;
  pattern: string;
  minItems: string;
}

export const defaultValidationMessages: ValidationMessages = {
  required: "Bitte füllen Sie dieses Feld aus.",
  email:
    "Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@firma.de.",
  tel: "Bitte geben Sie eine Telefonnummer mit Vorwahl ein.",
  minLength: "Bitte geben Sie mindestens {min} Zeichen ein.",
  maxLength: "Bitte kürzen Sie die Eingabe auf höchstens {max} Zeichen.",
  pattern: "Bitte prüfen Sie das Format Ihrer Eingabe.",
  minItems: "Bitte geben Sie mindestens {count} Eintrag an.",
};

function fill(template: string, values: Record<string, number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function isVisible(
  field: Field,
  values: Record<string, unknown>,
): boolean {
  if (!field.visibleIf) return true;
  return values[field.visibleIf.fieldId] === field.visibleIf.equals;
}

export function isSecretField(field: Field): boolean {
  return field.type === "secret";
}

export function hasSecretFields(step: Step): boolean {
  return step.fields.some(
    (field) => isSecretField(field) || (field.fields ?? []).some(isSecretField),
  );
}

function sourceValues(
  answers: Answers,
  fieldId: string,
  itemField: string,
): string[] {
  const items = answers[fieldId];
  if (!Array.isArray(items)) return [];

  const values = items
    .map((item) => item?.[itemField])
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  return Array.from(new Set(values));
}

export function resolveOptions(field: Field, answers: Answers): FieldOption[] {
  const derived = field.optionsFrom
    ? sourceValues(
        answers,
        field.optionsFrom.fieldId,
        field.optionsFrom.itemField,
      ).map((value) => ({ value, label: value }))
    : [];

  const options = [...(field.options ?? []), ...derived];
  const seen = new Set<string>();

  return options.filter((option) => {
    if (seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

export function resolveItemLabels(field: Field, answers: Answers): string[] {
  if (!field.itemsFrom) return [];
  return sourceValues(
    answers,
    field.itemsFrom.fieldId,
    field.itemsFrom.itemField,
  );
}

function emptyCheckboxGroup(): CheckboxGroupValue {
  return { selected: [], other: "" };
}

function defaultScalar(field: Field): string {
  return typeof field.defaultValue === "string" ? field.defaultValue : "";
}

export function buildEmptyRepeaterItem(field: Field): RepeaterItemValue {
  return defaultRepeaterItem(field);
}

function defaultRepeaterItem(field: Field): RepeaterItemValue {
  const item: RepeaterItemValue = {};
  for (const child of field.fields ?? []) {
    item[child.id] = defaultFieldValue(child, {});
  }
  return item;
}

function defaultFieldValue(field: Field, answers: Answers): unknown {
  switch (field.type) {
    case "checkboxGroup": {
      const preset = field.defaultValue as CheckboxGroupValue | undefined;
      return preset?.selected
        ? { selected: [...preset.selected], other: preset.other ?? "" }
        : emptyCheckboxGroup();
    }
    case "repeater": {
      if (field.itemsFrom) {
        return resolveItemLabels(field, answers).map((label) => ({
          ...defaultRepeaterItem(field),
          [field.itemsFrom!.into]: label,
        }));
      }
      if (Array.isArray(field.defaultValue)) {
        return field.defaultValue.map((item) => ({
          ...defaultRepeaterItem(field),
          ...(item as RepeaterItemValue),
        }));
      }
      return Array.from({ length: field.minItems ?? 0 }, () =>
        defaultRepeaterItem(field),
      );
    }
    case "info":
      return undefined;
    default:
      return defaultScalar(field);
  }
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function secretPath(fieldId: string, index: number, childId: string): string {
  return `${fieldId}.${index}.${childId}`;
}

function readSecret(
  secrets: Secrets,
  path: string,
  item: string | undefined,
): string {
  if (item) {
    const match = Object.values(secrets).find((entry) => entry.item === item);
    if (match) return match.value;
  }
  return secrets[path]?.value ?? "";
}

/** Formularwerte eines Schritts: gespeicherte Antworten, ergänzt um die Secrets der Sitzung. */
export function buildStepDefaults(
  step: Step,
  answers: Answers,
  secrets: Secrets,
): Record<string, unknown> {
  const values: Record<string, unknown> = {};

  for (const field of step.fields) {
    if (field.type === "info") continue;

    if (isSecretField(field)) {
      values[field.id] = readSecret(secrets, field.id, undefined);
      continue;
    }

    if (field.type === "repeater") {
      const fallback = defaultFieldValue(field, answers) as RepeaterItemValue[];
      const saved = Array.isArray(answers[field.id])
        ? (answers[field.id] as RepeaterItemValue[])
        : [];

      const items = field.itemsFrom
        ? fallback.map((item) => {
            const label = item[field.itemsFrom!.into];
            const match = saved.find(
              (candidate) => candidate[field.itemsFrom!.into] === label,
            );
            return { ...item, ...(match ?? {}) };
          })
        : saved.length > 0
          ? saved
          : fallback;

      values[field.id] = items.map((item, index) => {
        const restored: RepeaterItemValue = { ...item };
        for (const child of field.fields ?? []) {
          if (!isSecretField(child)) continue;
          restored[child.id] = readSecret(
            secrets,
            secretPath(field.id, index, child.id),
            field.itemsFrom
              ? (item[field.itemsFrom.into] as string | undefined)
              : undefined,
          );
        }
        return restored;
      });
      continue;
    }

    values[field.id] =
      answers[field.id] !== undefined
        ? answers[field.id]
        : defaultFieldValue(field, answers);
  }

  return values;
}

export interface Partitioned {
  answers: Answers;
  secrets: Secrets;
}

/**
 * Einziger Trennpunkt zwischen Angaben und Zugangsdaten: Nur was hier in
 * `answers` landet, darf gespeichert oder im Klartext verschickt werden.
 */
export function partitionValues(
  step: Step,
  values: Record<string, unknown>,
): Partitioned {
  const answers: Answers = {};
  const secrets: Secrets = {};

  for (const field of step.fields) {
    if (field.type === "info") continue;
    if (!isVisible(field, values)) continue;

    if (isSecretField(field)) {
      secrets[field.id] = {
        label: field.label,
        value: asString(values[field.id]),
      };
      continue;
    }

    if (field.type === "repeater") {
      const items = Array.isArray(values[field.id])
        ? (values[field.id] as RepeaterItemValue[])
        : [];
      const itemLabelKey = field.itemsFrom?.into;

      answers[field.id] = items.map((item, index) => {
        const answerItem: RepeaterItemValue = {};
        if (itemLabelKey) answerItem[itemLabelKey] = item[itemLabelKey];

        for (const child of field.fields ?? []) {
          if (isSecretField(child)) {
            secrets[secretPath(field.id, index, child.id)] = {
              label: child.label,
              value: asString(item[child.id]),
              item: itemLabelKey
                ? (item[itemLabelKey] as string | undefined)
                : undefined,
            };
            continue;
          }
          answerItem[child.id] = item[child.id];
        }
        return answerItem;
      });
      continue;
    }

    answers[field.id] = values[field.id] as Answers[string];
  }

  return { answers, secrets };
}

function scalarSchema(
  field: Field,
  messages: ValidationMessages,
): z.ZodTypeAny {
  let schema = z.string();

  if (field.validation?.minLength) {
    schema = schema.min(
      field.validation.minLength,
      fill(messages.minLength, { min: field.validation.minLength }),
    );
  }
  if (field.validation?.maxLength) {
    schema = schema.max(
      field.validation.maxLength,
      fill(messages.maxLength, { max: field.validation.maxLength }),
    );
  }
  if (field.validation?.pattern) {
    schema = schema.regex(
      new RegExp(field.validation.pattern),
      messages.pattern,
    );
  }

  if (field.type === "email") {
    schema = schema.email(messages.email);
  }
  if (field.type === "tel") {
    schema = schema.regex(TEL_PATTERN, messages.tel);
  }

  if (field.required) {
    return schema.min(1, messages.required);
  }

  // Leere Eingabe eines optionalen Feldes darf nicht an Format-Prüfungen scheitern.
  return z.union([z.literal(""), schema]);
}

function checkboxGroupSchema(
  field: Field,
  messages: ValidationMessages,
): z.ZodTypeAny {
  const schema = z.object({
    selected: z.array(z.string()),
    other: z.string(),
  });

  if (!field.required) return schema;

  return schema.refine(
    (value) => value.selected.length > 0 || value.other.trim().length > 0,
    { message: messages.required },
  );
}

function repeaterSchema(
  field: Field,
  messages: ValidationMessages,
  includeSecrets: boolean,
): z.ZodTypeAny {
  const shape: z.ZodRawShape = {};

  if (field.itemsFrom) {
    shape[field.itemsFrom.into] = z.string();
  }
  for (const child of field.fields ?? []) {
    if (child.type === "info") continue;
    if (!includeSecrets && isSecretField(child)) continue;
    shape[child.id] = buildFieldSchema(child, messages, includeSecrets);
  }

  const schema = z.array(z.object(shape));
  const minItems = field.itemsFrom ? 0 : (field.minItems ?? 0);

  return minItems > 0
    ? schema.min(minItems, fill(messages.minItems, { count: minItems }))
    : schema;
}

function buildFieldSchema(
  field: Field,
  messages: ValidationMessages,
  includeSecrets: boolean,
): z.ZodTypeAny {
  switch (field.type) {
    case "checkboxGroup":
      return checkboxGroupSchema(field, messages);
    case "repeater":
      return repeaterSchema(field, messages, includeSecrets);
    default:
      return scalarSchema(field, messages);
  }
}

export interface StepSchemaOptions {
  messages?: ValidationMessages;
  includeSecrets?: boolean;
}

export function buildStepSchema(
  step: Step,
  values: Record<string, unknown>,
  options: StepSchemaOptions = {},
): z.ZodObject<z.ZodRawShape> {
  const messages = options.messages ?? defaultValidationMessages;
  const includeSecrets = options.includeSecrets ?? true;
  const shape: z.ZodRawShape = {};

  for (const field of step.fields) {
    if (field.type === "info") continue;
    if (!isVisible(field, values)) continue;
    if (!includeSecrets && isSecretField(field)) continue;

    shape[field.id] = buildFieldSchema(field, messages, includeSecrets);
  }

  return z.object(shape);
}

export function buildAnswersSchema(
  config: OnboardingConfig,
  answers: Answers,
  options: StepSchemaOptions = {},
): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};

  for (const step of config.steps) {
    const stepShape = buildStepSchema(step, answers, {
      ...options,
      includeSecrets: false,
    }).shape;
    Object.assign(shape, stepShape);
  }

  return z.object(shape);
}
