"use client";

import { useTranslations } from "next-intl";

interface ProgressBarProps {
  current: number;
  total: number;
  title: string;
}

export default function ProgressBar({
  current,
  total,
  title,
}: ProgressBarProps) {
  const t = useTranslations("Onboarding");
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">
        {t("progress.label", { current, total })}
      </p>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={t("progress.current")}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <h2 className="pt-2 text-2xl font-bold text-foreground">{title}</h2>
    </div>
  );
}
