"use client";

import {
  useFieldError,
  type FieldProps,
} from "@/components/onboarding/fields/FieldShell";
import { Button } from "@/components/ui/button";
import type { Field } from "@/config/onboarding/types";
import { buildEmptyRepeaterItem } from "@/lib/onboarding/schema";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface RepeaterFieldProps extends FieldProps {
  renderChild: (child: Field, childName: string) => ReactNode;
}

export default function RepeaterField({
  field,
  name,
  renderChild,
}: RepeaterFieldProps) {
  const t = useTranslations("Onboarding");
  const { control } = useFormContext();
  const { fields: items, append, remove } = useFieldArray({ control, name });
  const error = useFieldError(name);

  const derivedFromSource = !!field.itemsFrom;
  const minItems = field.minItems ?? 0;
  const canRemove = !derivedFromSource && items.length > Math.max(minItems, 1);

  return (
    <fieldset className="border-0 p-0">
      <legend className="text-sm font-medium text-foreground">
        {field.label}
        {field.required ? (
          <span className="ml-1 text-destructive">*</span>
        ) : null}
      </legend>

      {field.help ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {field.help}
        </p>
      ) : null}

      <div className="mt-4 space-y-4">
        {items.map((item, index) => {
          const heading = derivedFromSource
            ? String(
                (item as Record<string, unknown>)[field.itemsFrom!.into] ?? "",
              )
            : t("fields.entry", { number: index + 1 });

          return (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="break-all text-sm font-semibold text-foreground">
                  {heading}
                </p>
                {canRemove ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    aria-label={t("fields.removeItem")}
                    className="h-10 shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>

              <div className="space-y-5">
                {(field.fields ?? []).map((child) =>
                  renderChild(child, `${name}.${index}.${child.id}`),
                )}
              </div>
            </div>
          );
        })}
      </div>

      {derivedFromSource ? null : (
        <Button
          type="button"
          variant="outline"
          onClick={() => append(buildEmptyRepeaterItem(field))}
          className="mt-4 h-12 w-full text-base"
        >
          <Plus className="mr-2 h-4 w-4" />
          {field.addLabel ?? t("fields.addItem")}
        </Button>
      )}

      {error ? (
        <p role="alert" className="mt-2 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
