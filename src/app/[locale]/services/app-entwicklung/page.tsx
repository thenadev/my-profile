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
import { getAppEntwicklungFaqs } from "@/data/service-faqs";
import AppEntwicklungClient from "./AppEntwicklungClient";

const PATH = "/services/app-entwicklung";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: PATH,
    title: t("servicesAppEntwicklung.title"),
    description: t("servicesAppEntwicklung.description"),
  });
}

export default async function AppEntwicklungPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Meta" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });

  const url = localizedUrl(locale, PATH);
  const serviceSchema = buildServiceSchema({
    name: t("servicesAppEntwicklung.title"),
    description: t("servicesAppEntwicklung.description"),
    url,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: nav("home"), url: localizedUrl(locale, "/") },
    { name: nav("services"), url: localizedUrl(locale, "/services") },
    { name: nav("appEntwicklung"), url },
  ]);
  const faqSchema = buildFaqSchema(getAppEntwicklungFaqs(locale));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(serviceSchema, breadcrumbSchema, faqSchema)}
      />
      <AppEntwicklungClient />
    </>
  );
}
