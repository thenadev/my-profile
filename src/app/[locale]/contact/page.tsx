import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import ContactClient from "./ContactClient";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("contact.title"),
    description: t("contact.description"),
  });
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt - Thomas Schwabauer",
  description:
    "Kontaktieren Sie Thomas Schwabauer für Webentwicklung und Mobile Apps. Wetzlar, Gießen, Mittelhessen.",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.authorName,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.zipCode,
    },
  },
};

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactClient />
    </>
  );
}
