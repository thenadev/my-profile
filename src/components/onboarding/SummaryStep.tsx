"use client";

import { Button } from "@/components/ui/button";
import type {
  Answers,
  CheckboxGroupValue,
  Field,
  OnboardingConfig,
  RepeaterItemValue,
  Secrets,
  Step,
} from "@/config/onboarding/types";
import { isVisible, resolveOptions } from "@/lib/onboarding/schema";
import { useTranslations } from "next-intl";

const SECRET_MASK = "••••••";

interface SummaryStepProps {
  config: OnboardingConfig;
  answers: Answers;
  secrets: Secrets;
  onEdit: (stepIndex: number) => void;
}

function optionLabel(field: Field, answers: Answers, value: string): string {
  return (
    resolveOptions(field, answers).find((option) => option.value === value)
      ?.label ?? value
  );
}

function formatValue(
  field: Field,
  value: unknown,
  answers: Answers,
): string | null {
  if (field.type === "checkboxGroup") {
    const group = value as CheckboxGroupValue | undefined;
    const labels = (group?.selected ?? []).map((entry) =>
      optionLabel(field, answers, entry),
    );
    if (group?.other?.trim()) labels.push(group.other.trim());
    return labels.length > 0 ? labels.join(", ") : null;
  }

  if (field.type === "select" || field.type === "radio") {
    const raw = typeof value === "string" ? value : "";
    return raw ? optionLabel(field, answers, raw) : null;
  }

  const raw = typeof value === "string" ? value.trim() : "";
  return raw.length > 0 ? raw : null;
}

export default function SummaryStep({
  config,
  answers,
  secrets,
  onEdit,
}: SummaryStepProps) {
  const t = useTranslations("Onboarding");

  const renderScalar = (field: Field, value: unknown) => {
    const formatted = formatValue(field, value, answers);
    return (
      <p className="mt-1 whitespace-pre-line break-words text-base text-foreground">
        {formatted ?? (
          <span className="text-muted-foreground">{t("summary.empty")}</span>
        )}
      </p>
    );
  };

  const renderSecret = (path: string) => {
    const filled = (secrets[path]?.value ?? "").length > 0;
    return (
      <p className="mt-1 text-base text-foreground">
        {SECRET_MASK}{" "}
        <span className="text-sm text-muted-foreground">
          ({filled ? t("summary.secretFilled") : t("summary.secretEmpty")})
        </span>
      </p>
    );
  };

  const renderField = (field: Field) => {
    if (field.type === "info") return null;

    if (field.type === "secret") {
      return (
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {field.label}
          </p>
          {renderSecret(field.id)}
        </div>
      );
    }

    if (field.type === "repeater") {
      const items = Array.isArray(answers[field.id])
        ? (answers[field.id] as RepeaterItemValue[])
        : [];
      const headingKey = field.itemsFrom?.into;

      return (
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {field.label}
          </p>
          {items.length === 0 ? (
            <p className="mt-1 text-base text-muted-foreground">
              {t("summary.empty")}
            </p>
          ) : (
            <ul className="mt-2 space-y-3">
              {items.map((item, index) => (
                <li
                  key={`${field.id}-${index}`}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  {headingKey ? (
                    <p className="break-all text-sm font-semibold text-foreground">
                      {String(item[headingKey] ?? "")}
                    </p>
                  ) : null}
                  <dl className="mt-1 space-y-1">
                    {(field.fields ?? []).map((child) => (
                      <div key={child.id}>
                        <dt className="text-sm text-muted-foreground">
                          {child.label}
                        </dt>
                        <dd>
                          {child.type === "secret"
                            ? renderSecret(`${field.id}.${index}.${child.id}`)
                            : renderScalar(child, item[child.id])}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {field.label}
        </p>
        {renderScalar(field, answers[field.id])}
      </div>
    );
  };

  const renderStep = (step: Step, index: number) => (
    <section
      key={step.id}
      className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onEdit(index)}
          className="h-10 shrink-0"
        >
          {t("summary.edit")}
        </Button>
      </div>
      <div className="space-y-4">
        {step.fields
          .filter((field) => isVisible(field, answers))
          .map((field) => (
            <div key={field.id}>{renderField(field)}</div>
          ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {t("summary.heading")}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {t("summary.text")}
        </p>
      </div>

      <div className="space-y-4">{config.steps.map(renderStep)}</div>
    </div>
  );
}
