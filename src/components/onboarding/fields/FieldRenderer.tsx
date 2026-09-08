"use client";

import CheckboxGroupField from "@/components/onboarding/fields/CheckboxGroupField";
import type { FieldProps } from "@/components/onboarding/fields/FieldShell";
import InfoField from "@/components/onboarding/fields/InfoField";
import RadioField from "@/components/onboarding/fields/RadioField";
import RepeaterField from "@/components/onboarding/fields/RepeaterField";
import SecretField from "@/components/onboarding/fields/SecretField";
import SelectField from "@/components/onboarding/fields/SelectField";
import TextareaField from "@/components/onboarding/fields/TextareaField";
import TextField from "@/components/onboarding/fields/TextField";

export default function FieldRenderer({ field, name, answers }: FieldProps) {
  switch (field.type) {
    case "info":
      return <InfoField field={field} />;
    case "textarea":
      return <TextareaField field={field} name={name} answers={answers} />;
    case "select":
      return <SelectField field={field} name={name} answers={answers} />;
    case "radio":
      return <RadioField field={field} name={name} answers={answers} />;
    case "checkboxGroup":
      return <CheckboxGroupField field={field} name={name} answers={answers} />;
    case "secret":
      return <SecretField field={field} name={name} answers={answers} />;
    case "repeater":
      return (
        <RepeaterField
          field={field}
          name={name}
          answers={answers}
          renderChild={(child, childName) => (
            <div key={childName}>
              <FieldRenderer field={child} name={childName} answers={answers} />
            </div>
          )}
        />
      );
    default:
      return <TextField field={field} name={name} answers={answers} />;
  }
}
