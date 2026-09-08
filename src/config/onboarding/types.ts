export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "radio"
  | "checkboxGroup"
  | "repeater"
  | "secret"
  | "info";

export interface FieldOption {
  value: string;
  label: string;
  hint?: string;
}

/** checkboxGroup: Optionen aus den Einträgen eines repeater-Feldes eines früheren Schritts. */
export interface OptionsFrom {
  fieldId: string;
  itemField: string;
}

/**
 * repeater: Einträge entstehen aus den Werten eines anderen repeater-Feldes.
 * Der Quellwert landet im Eintrag unter `into` und dient als Überschrift;
 * Einträge lassen sich weder hinzufügen noch entfernen.
 */
export interface ItemsFrom {
  fieldId: string;
  itemField: string;
  into: string;
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  help?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: unknown;
  options?: FieldOption[];
  optionsFrom?: OptionsFrom;
  allowOther?: boolean;
  fields?: Field[];
  itemsFrom?: ItemsFrom;
  minItems?: number;
  addLabel?: string;
  visibleIf?: { fieldId: string; equals: unknown };
  validation?: { pattern?: string; minLength?: number; maxLength?: number };
}

export interface Step {
  id: string;
  title: string;
  intro?: string;
  fields: Field[];
}

export interface AfterSubmit {
  headline?: string;
  notes: string[];
}

export interface OnboardingConfig {
  slug: string;
  clientName: string;
  projectTitle: string;
  contactName?: string;
  intro: string;
  steps: Step[];
  expiresAt?: string;
  notifyEmail: string;
  confirmationTo?: string;
  confirmationText?: string;
  afterSubmit: AfterSubmit;
}

export interface CheckboxGroupValue {
  selected: string[];
  other: string;
}

export type RepeaterItemValue = Record<string, unknown>;

export type AnswerValue =
  | string
  | CheckboxGroupValue
  | RepeaterItemValue[]
  | undefined;

export type Answers = Record<string, AnswerValue>;

export interface SecretEntry {
  label: string;
  value: string;
  /** Überschrift des repeater-Eintrags, zu dem das Feld gehört. */
  item?: string;
}

export type Secrets = Record<string, SecretEntry>;
