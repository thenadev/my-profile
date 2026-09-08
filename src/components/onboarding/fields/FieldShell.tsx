"use client";

import { Label } from "@/components/ui/label";
import type { Answers, Field } from "@/config/onboarding/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

export interface FieldProps {
  field: Field;
  name: string;
  answers: Answers;
}

export const inputClassName =
  "h-12 w-full rounded-lg border-2 border-border bg-background px-3 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary";

export const inputErrorClassName =
  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30";

export function fieldDomId(name: string): string {
  return `onboarding-${name.replace(/\./g, "-")}`;
}

export function describedBy(
  name: string,
  hasHelp: boolean,
  hasError: boolean,
): string | undefined {
  const ids = [
    hasHelp ? `${fieldDomId(name)}-help` : null,
    hasError ? `${fieldDomId(name)}-error` : null,
  ].filter((id): id is string => id !== null);

  return ids.length > 0 ? ids.join(" ") : undefined;
}

export function useFieldError(name: string): string | undefined {
  const { getFieldState, formState } = useFormContext();
  const message = getFieldState(name, formState).error?.message;
  return typeof message === "string" ? message : undefined;
}

interface FieldShellProps {
  name: string;
  field: Field;
  error?: string;
  /** Gruppen (Radio, Mehrfachauswahl) brauchen fieldset/legend statt eines label-Bezugs. */
  variant?: "control" | "group";
  children: ReactNode;
}

export default function FieldShell({
  name,
  field,
  error,
  variant = "control",
  children,
}: FieldShellProps) {
  const t = useTranslations("Onboarding");
  const domId = fieldDomId(name);

  const label = (
    <>
      {field.label}
      {field.required ? (
        <span
          className="ml-1 text-destructive"
          title={t("fields.requiredMark")}
        >
          *
        </span>
      ) : null}
    </>
  );

  const body = (
    <>
      {variant === "group" ? (
        <legend className="text-sm font-medium text-foreground">{label}</legend>
      ) : (
        <Label htmlFor={domId} className="text-sm font-medium text-foreground">
          {label}
        </Label>
      )}

      <div className="mt-2">{children}</div>

      {field.help ? (
        <p
          id={`${domId}-help`}
          className="mt-2 text-sm leading-relaxed text-muted-foreground"
        >
          {field.help}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${domId}-error`}
          role="alert"
          className="mt-2 text-sm font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </>
  );

  return variant === "group" ? (
    <fieldset className={cn("border-0 p-0")}>{body}</fieldset>
  ) : (
    <div>{body}</div>
  );
}
