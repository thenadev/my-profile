import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import { resolveToken } from "@/config/onboarding";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Ohne dies würde Next die Seite beim ersten Aufruf statisch erzeugen und
// dauerhaft ausliefern — die Konfiguration hängt aber am Token.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projektstart",
  robots: { index: false, follow: false },
};

interface OnboardingPageProps {
  params: { locale: string; token: string };
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  unstable_setRequestLocale(params.locale);

  const resolution = await resolveToken(params.token);
  if (resolution.status === "unknown") notFound();

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Onboarding",
  });
  const config = resolution.config;
  const publicKey = process.env.ONBOARDING_PUBLIC_KEY;

  return (
    <main className="min-h-screen px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-primary">
            {config.clientName}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">
            {config.projectTitle}
          </h1>
        </header>

        {resolution.status === "expired" ? (
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              {t("expired.heading")}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              {t("expired.text")}
            </p>
          </section>
        ) : !publicKey ? (
          <section className="rounded-xl border border-destructive/40 bg-destructive/10 p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {t("error.heading")}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-foreground">
              {t("error.unavailable")}
            </p>
          </section>
        ) : (
          <OnboardingWizard
            token={params.token}
            config={config}
            publicKey={publicKey}
          />
        )}
      </div>
    </main>
  );
}
