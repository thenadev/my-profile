"use client";

import FieldShell, {
  describedBy,
  fieldDomId,
  useFieldError,
  type FieldProps,
} from "@/components/onboarding/fields/FieldShell";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { resolveOptions } from "@/lib/onboarding/schema";
import { Controller, useFormContext } from "react-hook-form";

export default function RadioField({ field, name, answers }: FieldProps) {
  const { control } = useFormContext();
  const error = useFieldError(name);
  const options = resolveOptions(field, answers);

  return (
    <FieldShell name={name} field={field} error={error} variant="group">
      <Controller
        name={name}
        control={control}
        render={({ field: controlled }) => (
          <RadioGroup
            value={controlled.value ?? ""}
            onValueChange={controlled.onChange}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={describedBy(name, !!field.help, !!error)}
            className="gap-0"
          >
            {options.map((option) => {
              const optionId = `${fieldDomId(name)}-${option.value}`;
              return (
                <label
                  key={option.value}
                  htmlFor={optionId}
                  className="flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border border-transparent px-1 py-3 hover:border-border"
                >
                  <RadioGroupItem
                    id={optionId}
                    value={option.value}
                    className="mt-1 h-5 w-5"
                  />
                  <span className="text-base leading-tight text-foreground">
                    {option.label}
                    {option.hint ? (
                      <span className="block text-sm text-muted-foreground">
                        {option.hint}
                      </span>
                    ) : null}
                  </span>
                </label>
              );
            })}
          </RadioGroup>
        )}
      />
    </FieldShell>
  );
}
