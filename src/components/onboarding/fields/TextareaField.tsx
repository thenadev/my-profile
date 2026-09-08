"use client";

import FieldShell, {
  describedBy,
  fieldDomId,
  inputErrorClassName,
  useFieldError,
  type FieldProps,
} from "@/components/onboarding/fields/FieldShell";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export default function TextareaField({ field, name }: FieldProps) {
  const { register } = useFormContext();
  const error = useFieldError(name);

  return (
    <FieldShell name={name} field={field} error={error}>
      <Textarea
        id={fieldDomId(name)}
        rows={4}
        placeholder={field.placeholder}
        aria-required={field.required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, !!field.help, !!error)}
        className={cn(
          "w-full rounded-lg border-2 border-border bg-background p-3 text-base shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40",
          error && inputErrorClassName,
        )}
        {...register(name)}
      />
    </FieldShell>
  );
}
