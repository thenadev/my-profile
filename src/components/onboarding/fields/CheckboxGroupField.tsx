"use client";

import FieldShell, {
  describedBy,
  fieldDomId,
  inputClassName,
  useFieldError,
  type FieldProps,
} from "@/components/onboarding/fields/FieldShell";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { CheckboxGroupValue } from "@/config/onboarding/types";
import { resolveOptions } from "@/lib/onboarding/schema";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

const EMPTY: CheckboxGroupValue = { selected: [], other: "" };

export default function CheckboxGroupField({
  field,
  name,
  answers,
}: FieldProps) {
  const t = useTranslations("Onboarding");
  const { control } = useFormContext();
  const error = useFieldError(name);
  const options = resolveOptions(field, answers);
  const otherId = `${fieldDomId(name)}-other`;

  return (
    <FieldShell name={name} field={field} error={error} variant="group">
      <Controller
        name={name}
        control={control}
        render={({ field: controlled }) => {
          const value: CheckboxGroupValue = controlled.value ?? EMPTY;

          const toggle = (optionValue: string, checked: boolean) => {
            const selected = checked
              ? Array.from(new Set([...value.selected, optionValue]))
              : value.selected.filter((entry) => entry !== optionValue);
            controlled.onChange({ ...value, selected });
          };

          return (
            <div
              aria-describedby={describedBy(name, !!field.help, !!error)}
              className="space-y-1"
            >
              {options.map((option) => {
                const optionId = `${fieldDomId(name)}-${option.value}`;
                return (
                  <label
                    key={option.value}
                    htmlFor={optionId}
                    className="flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border border-transparent px-1 py-3 hover:border-border"
                  >
                    <Checkbox
                      id={optionId}
                      checked={value.selected.includes(option.value)}
                      onCheckedChange={(checked) =>
                        toggle(option.value, checked === true)
                      }
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

              {field.allowOther ? (
                <div className="pt-2">
                  <label
                    htmlFor={otherId}
                    className="text-sm font-medium text-foreground"
                  >
                    {t("fields.other")}
                  </label>
                  <Input
                    id={otherId}
                    type="text"
                    autoComplete="off"
                    placeholder={t("fields.otherPlaceholder")}
                    value={value.other}
                    onChange={(event) =>
                      controlled.onChange({
                        ...value,
                        other: event.target.value,
                      })
                    }
                    className={`${inputClassName} mt-2`}
                  />
                </div>
              ) : null}
            </div>
          );
        }}
      />
    </FieldShell>
  );
}
