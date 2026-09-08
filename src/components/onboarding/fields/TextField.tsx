"use client";

import FieldShell, {
  describedBy,
  fieldDomId,
  inputClassName,
  inputErrorClassName,
  useFieldError,
  type FieldProps,
} from "@/components/onboarding/fields/FieldShell";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const INPUT_TYPES: Record<string, string> = {
  email: "email",
  tel: "tel",
};

export default function TextField({ field, name }: FieldProps) {
  const { register } = useFormContext();
  const error = useFieldError(name);

  return (
    <FieldShell name={name} field={field} error={error}>
      <Input
        id={fieldDomId(name)}
        type={INPUT_TYPES[field.type] ?? "text"}
        inputMode={field.type === "tel" ? "tel" : undefined}
        autoComplete={field.type === "email" ? "email" : "off"}
        placeholder={field.placeholder}
        aria-required={field.required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, !!field.help, !!error)}
        className={cn(inputClassName, error && inputErrorClassName)}
        {...register(name)}
      />
    </FieldShell>
  );
}
