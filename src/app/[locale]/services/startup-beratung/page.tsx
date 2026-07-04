import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  jsonLd,
} from "@/lib/schema";
import { startupBeratungFaqs } from "@/data/service-faqs";
import StartupBeratungClient from "./StartupBeratungClient";

const PATH = "/services/startup-beratung";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: PATH,
    title: t("servicesStartupBeratung.title"),
    description: t("servicesStartupBeratung.description"),
  });
}

export default async function StartupBeratungPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  const url = localizedUrl(locale, PATH);
  const serviceSchema = buildServiceSchema({
    name: t("servicesStartupBeratung.title"),
    description: t("servicesStartupBeratung.description"),
    url,
    offers: { price: 80, priceCurrency: "EUR", unitText: "HOUR" },
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: localizedUrl(locale, "/") },
    { name: "Leistungen", url: localizedUrl(locale, "/services") },
    { name: "Startup-Beratung", url },
  ]);
  const faqSchema = buildFaqSchema(startupBeratungFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(serviceSchema, breadcrumbSchema, faqSchema)}
      />
      <StartupBeratungClient />
    </>
  );
}
