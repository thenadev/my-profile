"use client";

import type { FieldProps } from "@/components/onboarding/fields/FieldShell";
import { Info } from "lucide-react";

export default function InfoField({ field }: Pick<FieldProps, "field">) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-muted/40 p-4">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
      <p className="text-sm leading-relaxed text-foreground">{field.label}</p>
    </div>
  );
}
