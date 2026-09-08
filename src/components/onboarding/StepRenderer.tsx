"use client";

import FieldRenderer from "@/components/onboarding/fields/FieldRenderer";
import type { Answers, Step } from "@/config/onboarding/types";
import { isVisible } from "@/lib/onboarding/schema";
import { useFormContext, useWatch } from "react-hook-form";

interface StepRendererProps {
  step: Step;
  answers: Answers;
}

export default function StepRenderer({ step, answers }: StepRendererProps) {
  const { control } = useFormContext();
  const stepValues = useWatch({ control });
  const values = { ...answers, ...stepValues };

  return (
    <div className="space-y-8">
      {step.fields
        .filter((field) => isVisible(field, values))
        .map((field) => (
          // Wrapper trägt den React-Key: twin.d.ts überschreibt global
          // JSX.IntrinsicAttributes, dadurch nimmt keine eigene Komponente `key` an.
          <div key={field.id}>
            <FieldRenderer field={field} name={field.id} answers={answers} />
          </div>
        ))}
    </div>
  );
}
