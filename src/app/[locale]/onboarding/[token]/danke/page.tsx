import { resolveToken } from "@/config/onboarding";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vielen Dank",
  robots: { index: false, follow: false },
};

interface ThanksPageProps {
  params: { locale: string; token: string };
}

export default async function OnboardingThanksPage({
  params,
}: ThanksPageProps) {
  unstable_setRequestLocale(params.locale);

  const resolution = await resolveToken(params.token);
  if (resolution.status === "unknown") notFound();

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Onboarding",
  });
  const { afterSubmit, clientName, projectTitle } = resolution.config;

  return (
    <main className="min-h-screen px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-medium text-primary">{clientName}</p>
        <h1 className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">
          {afterSubmit.headline ?? t("thanks.heading")}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">{projectTitle}</p>

        {afterSubmit.notes.length > 0 ? (
          <section className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              {t("thanks.notesHeading")}
            </h2>
            <ul className="mt-4 space-y-4">
              {afterSubmit.notes.map((note) => (
                <li
                  key={note}
                  className="border-l-4 border-primary pl-4 text-base leading-relaxed text-foreground"
                >
                  {note}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-8 text-base text-muted-foreground">
          {t("thanks.contact", { email: siteConfig.contactEmail })}
        </p>
      </div>
    </main>
  );
}
