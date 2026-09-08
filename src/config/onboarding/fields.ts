import type { Field, OnboardingConfig, Step } from "./types";

export interface FlatField {
  field: Field;
  step: Step;
  /** Repeater, in dessen Einträgen das Feld liegt — undefined bei Feldern auf Schrittebene. */
  parent?: Field;
}

export function flattenFields(config: OnboardingConfig): FlatField[] {
  const flat: FlatField[] = [];

  for (const step of config.steps) {
    for (const field of step.fields) {
      flat.push({ field, step });
      for (const child of field.fields ?? []) {
        flat.push({ field: child, step, parent: field });
      }
    }
  }

  return flat;
}

export function findField(
  config: OnboardingConfig,
  fieldId: string,
): Field | undefined {
  return flattenFields(config).find((entry) => entry.field.id === fieldId)
    ?.field;
}

export function isInputField(field: Field): boolean {
  return field.type !== "info";
}
