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
import { unternehmenswebsiteFaqs } from "@/data/service-faqs";
import UnternehmenswebsiteClient from "./UnternehmenswebsiteClient";

const PATH = "/services/unternehmenswebsite";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: PATH,
    title: t("servicesUnternehmenswebsite.title"),
    description: t("servicesUnternehmenswebsite.description"),
  });
}

export default async function UnternehmenswebsitePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  const url = localizedUrl(locale, PATH);
  const serviceSchema = buildServiceSchema({
    name: t("servicesUnternehmenswebsite.title"),
    description: t("servicesUnternehmenswebsite.description"),
    url,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: localizedUrl(locale, "/") },
    { name: "Leistungen", url: localizedUrl(locale, "/services") },
    { name: "Unternehmenswebsite", url },
  ]);
  const faqSchema = buildFaqSchema(unternehmenswebsiteFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(serviceSchema, breadcrumbSchema, faqSchema)}
      />
      <UnternehmenswebsiteClient />
    </>
  );
}
