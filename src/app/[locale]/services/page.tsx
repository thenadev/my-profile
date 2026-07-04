import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import { buildBreadcrumbSchema, jsonLd } from "@/lib/schema";
import ServicesOverviewClient from "./ServicesOverviewClient";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: "/services",
    title: t("services.title"),
    description: t("services.description"),
  });
}

export default function ServicesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Startseite", url: localizedUrl(locale, "/") },
    { name: "Leistungen", url: localizedUrl(locale, "/services") },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)}
      />
      <ServicesOverviewClient />
    </>
  );
}
