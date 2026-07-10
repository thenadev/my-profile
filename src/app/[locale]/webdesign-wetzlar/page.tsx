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
import { WEBDESIGN_WETZLAR_FAQS } from "@/data/webdesign-wetzlar";
import WebdesignWetzlarContent from "./WebdesignWetzlarContent";

const PATH = "/webdesign-wetzlar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: PATH,
    title: t("webdesignWetzlar.title"),
    description: t("webdesignWetzlar.description"),
    // Rein lokale, deutschsprachige Landingpage — kein EN-Pendant.
    // Canonical zeigt immer auf die DE-URL, keine hreflang-Alternates
    // (analog zum Blog, verhindert Duplicate Content).
    canonicalLocale: "de",
  });
}

export default async function WebdesignWetzlarPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Meta" });
  const nav = await getTranslations({ locale, namespace: "Navbar" });

  // Landingpage existiert nur auf Deutsch → alle Schema-URLs auf die
  // DE-Variante fixieren, damit sie zur Canonical passen.
  const url = localizedUrl("de", PATH);
  const serviceSchema = buildServiceSchema({
    name: "Webdesign Wetzlar",
    description: t("webdesignWetzlar.description"),
    url,
    areaServed: ["Wetzlar", "Gießen", "Mittelhessen"],
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: nav("home"), url: localizedUrl("de", "/") },
    { name: "Webdesign Wetzlar", url },
  ]);
  const faqSchema = buildFaqSchema(WEBDESIGN_WETZLAR_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema,
          breadcrumbSchema,
          faqSchema
        )}
      />
      <WebdesignWetzlarContent />
    </>
  );
}
