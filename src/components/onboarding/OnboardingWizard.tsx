"use client";

import ProgressBar from "@/components/onboarding/ProgressBar";
import StepRenderer from "@/components/onboarding/StepRenderer";
import SummaryStep from "@/components/onboarding/SummaryStep";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type {
  Answers,
  OnboardingConfig,
  Secrets,
  Step,
} from "@/config/onboarding/types";
import { siteConfig } from "@/config/site";
import { Link, useRouter } from "@/i18n/navigation";
import { encryptSecrets } from "@/lib/onboarding/crypto";
import { buildSubmitPayload } from "@/lib/onboarding/payload";
import {
  buildStepDefaults,
  buildStepSchema,
  partitionValues,
  type ValidationMessages,
} from "@/lib/onboarding/schema";
import {
  clearProgress,
  loadProgress,
  saveProgress,
} from "@/lib/onboarding/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Send, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Resolver,
} from "react-hook-form";

const SUBMIT_ENDPOINT = "/api/onboarding/submit";

interface OnboardingWizardProps {
  token: string;
  config: OnboardingConfig;
  publicKey: string;
}

interface StepFormProps {
  step: Step;
  answers: Answers;
  secrets: Secrets;
  messages: ValidationMessages;
  isFirst: boolean;
  onAutosave: (values: FieldValues) => void;
  onBack: (values: FieldValues) => void;
  onNext: (values: FieldValues) => void;
}

function StepForm({
  step,
  answers,
  secrets,
  messages,
  isFirst,
  onAutosave,
  onBack,
  onNext,
}: StepFormProps) {
  const t = useTranslations("Onboarding");

  const resolver: Resolver<FieldValues> = (values, context, options) => {
    const schema = buildStepSchema(
      step,
      { ...answers, ...values },
      { messages },
    );
    return zodResolver(schema)(values, context, options);
  };

  const form = useForm<FieldValues>({
    defaultValues: buildStepDefaults(step, answers, secrets),
    resolver,
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((values) => onAutosave(values as FieldValues));
    return () => subscription.unsubscribe();
  }, [watch, onAutosave]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onNext)} noValidate>
        {step.intro ? (
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            {step.intro}
          </p>
        ) : null}

        <StepRenderer step={step} answers={answers} />

        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {isFirst ? (
            <span />
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => onBack(form.getValues())}
              className="h-12 w-full text-base sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("nav.back")}
            </Button>
          )}
          <Button type="submit" className="h-12 w-full text-base sm:w-auto">
            {t("nav.next")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default function OnboardingWizard({
  token,
  config,
  publicKey,
}: OnboardingWizardProps) {
  const t = useTranslations("Onboarding");
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [secrets, setSecrets] = useState<Secrets>({});
  const [resumeOffer, setResumeOffer] = useState<{
    stepIndex: number;
    answers: Answers;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const answersRef = useRef<Answers>({});
  answersRef.current = answers;

  // t.raw statt t: Die Platzhalter {min}/{max}/{count} füllt der Schema-Generator
  // mit den Werten aus der Konfiguration, nicht die ICU-Formatierung.
  const rawMessage = (key: string) => String(t.raw(key));
  const validationMessages: ValidationMessages = {
    required: rawMessage("validation.required"),
    email: rawMessage("validation.email"),
    tel: rawMessage("validation.tel"),
    minLength: rawMessage("validation.minLength"),
    maxLength: rawMessage("validation.maxLength"),
    pattern: rawMessage("validation.pattern"),
    minItems: rawMessage("validation.minItems"),
  };

  useEffect(() => {
    const stored = loadProgress(token);
    if (!stored) return;

    setResumeOffer({
      stepIndex: Math.min(stored.stepIndex, config.steps.length),
      answers: stored.answers,
    });
  }, [token, config.steps.length]);

  const isSummary = stepIndex >= config.steps.length;
  const currentStep = config.steps[stepIndex];

  const applyStepValues = useCallback(
    (step: Step, values: FieldValues) => {
      const partitioned = partitionValues(step, values);

      const nextAnswers: Answers = { ...answersRef.current };
      const nextSecrets: Secrets = { ...secrets };
      for (const field of step.fields) {
        if (field.type === "info") continue;
        delete nextAnswers[field.id];
        delete nextSecrets[field.id];
        for (const key of Object.keys(nextSecrets)) {
          if (key.startsWith(`${field.id}.`)) delete nextSecrets[key];
        }
      }

      const merged = { ...nextAnswers, ...partitioned.answers };
      setAnswers(merged);
      setSecrets({ ...nextSecrets, ...partitioned.secrets });
      return merged;
    },
    [secrets],
  );

  const handleAutosave = useCallback(
    (values: FieldValues) => {
      if (!currentStep) return;
      const partitioned = partitionValues(currentStep, values);
      saveProgress(token, stepIndex, {
        ...answersRef.current,
        ...partitioned.answers,
      });
    },
    [currentStep, stepIndex, token],
  );

  const goToStep = (step: Step, values: FieldValues, nextIndex: number) => {
    const merged = applyStepValues(step, values);
    saveProgress(token, nextIndex, merged);
    setStepIndex(nextIndex);
    setSubmitError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const encryptedSecrets = await encryptSecrets(secrets, publicKey);
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          buildSubmitPayload(token, answers, encryptedSecrets),
        ),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      clearProgress(token);
      router.push(`/onboarding/${token}/danke`);
    } catch {
      setSubmitError(t("error.generic", { email: siteConfig.contactEmail }));
      setSubmitting(false);
    }
  };

  const resumeDialog = resumeOffer ? (
    <AlertDialog open>
      <AlertDialogContent className="max-w-md rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            {t("resume.heading")}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <p className="text-base leading-relaxed text-muted-foreground">
          {t("resume.text", {
            number: Math.min(resumeOffer.stepIndex + 1, config.steps.length),
            title:
              config.steps[
                Math.min(resumeOffer.stepIndex, config.steps.length - 1)
              ]?.title ?? "",
          })}
        </p>
        <p className="text-sm text-muted-foreground">{t("resume.note")}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            className="h-12 flex-1 text-base"
            onClick={() => {
              setAnswers(resumeOffer.answers);
              setStepIndex(resumeOffer.stepIndex);
              setStarted(true);
              setPrivacyAccepted(true);
              setResumeOffer(null);
            }}
          >
            {t("resume.continue")}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 flex-1 text-base"
            onClick={() => {
              clearProgress(token);
              setResumeOffer(null);
            }}
          >
            {t("resume.discard")}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;

  if (!started) {
    return (
      <>
        {resumeDialog}
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-foreground">
            {config.intro}
          </p>

          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="flex items-center gap-2 font-semibold text-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
              {t("privacy.heading")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("privacy.text")}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="onboarding-privacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) => {
                setPrivacyAccepted(checked === true);
                if (checked === true) setPrivacyError(false);
              }}
              className="mt-1 h-5 w-5"
              aria-describedby={
                privacyError ? "onboarding-privacy-error" : undefined
              }
            />
            <label
              htmlFor="onboarding-privacy"
              className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
            >
              {t.rich("privacy.consent", {
                link: (chunks) => (
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="font-medium text-primary hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </label>
          </div>

          {privacyError ? (
            <p
              id="onboarding-privacy-error"
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {t("privacy.consentRequired")}
            </p>
          ) : null}

          <Button
            type="button"
            className="h-12 w-full text-base sm:w-auto"
            onClick={() => {
              if (!privacyAccepted) {
                setPrivacyError(true);
                return;
              }
              setStarted(true);
            }}
          >
            {t("intro.start")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-sm text-muted-foreground">{t("intro.duration")}</p>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-8">
      {resumeDialog}

      <ProgressBar
        current={stepIndex + 1}
        total={config.steps.length + 1}
        title={isSummary ? t("summary.heading") : (currentStep?.title ?? "")}
      />

      {isSummary || !currentStep ? (
        <div className="space-y-6">
          <SummaryStep
            config={config}
            answers={answers}
            secrets={secrets}
            onEdit={(index) => {
              setStepIndex(index);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />

          {submitError ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive"
            >
              {submitError}
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStepIndex(config.steps.length - 1)}
              className="h-12 w-full text-base sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("nav.back")}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="h-12 w-full text-base sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              {submitting ? t("nav.submitting") : t("nav.submit")}
            </Button>
          </div>
        </div>
      ) : (
        // Der Key erzwingt beim Schrittwechsel ein frisches Formular mit neuen
        // Vorbelegungen; er sitzt auf dem Wrapper, weil twin.d.ts global
        // JSX.IntrinsicAttributes überschreibt.
        <div key={currentStep.id}>
          <StepForm
            step={currentStep}
            answers={answers}
            secrets={secrets}
            messages={validationMessages}
            isFirst={stepIndex === 0}
            onAutosave={handleAutosave}
            onBack={(values) => goToStep(currentStep, values, stepIndex - 1)}
            onNext={(values) => goToStep(currentStep, values, stepIndex + 1)}
          />
        </div>
      )}
    </div>
  );
}
