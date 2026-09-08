"use client";

import FieldShell, {
  describedBy,
  fieldDomId,
  inputClassName,
  inputErrorClassName,
  useFieldError,
  type FieldProps,
} from "@/components/onboarding/fields/FieldShell";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function SecretField({ field, name }: FieldProps) {
  const t = useTranslations("Onboarding");
  const { register } = useFormContext();
  const error = useFieldError(name);
  const [visible, setVisible] = useState(false);

  return (
    <FieldShell name={name} field={field} error={error}>
      <div className="relative">
        <Input
          id={fieldDomId(name)}
          type={visible ? "text" : "password"}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={field.placeholder}
          aria-required={field.required}
          aria-invalid={!!error}
          aria-describedby={describedBy(name, !!field.help, !!error)}
          className={cn(inputClassName, "pr-14", error && inputErrorClassName)}
          {...register(name)}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? t("fields.hideSecret") : t("fields.showSecret")}
          className="absolute inset-y-0 right-0 flex h-12 w-12 items-center justify-center rounded-r-lg text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </FieldShell>
  );
}
