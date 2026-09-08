"use client";

import FieldShell, {
  describedBy,
  fieldDomId,
  inputClassName,
  inputErrorClassName,
  useFieldError,
  type FieldProps,
} from "@/components/onboarding/fields/FieldShell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resolveOptions } from "@/lib/onboarding/schema";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

export default function SelectField({ field, name, answers }: FieldProps) {
  const t = useTranslations("Onboarding");
  const { control } = useFormContext();
  const error = useFieldError(name);
  const options = resolveOptions(field, answers);

  return (
    <FieldShell name={name} field={field} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field: controlled }) => (
          <Select
            value={controlled.value || undefined}
            onValueChange={controlled.onChange}
          >
            <SelectTrigger
              id={fieldDomId(name)}
              aria-required={field.required}
              aria-invalid={!!error}
              aria-describedby={describedBy(name, !!field.help, !!error)}
              className={cn(inputClassName, error && inputErrorClassName)}
            >
              <SelectValue placeholder={t("fields.selectPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FieldShell>
  );
}
