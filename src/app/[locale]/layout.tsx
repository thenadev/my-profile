import { GTM_ID } from "@/config/analytics";
import CookieConsent from "@/components/CookieConsent";
import GoogleConsentScript from "@/components/GoogleConsentScript";
import GoogleTagManager from "@/components/GoogleTagManager";
import PageViewTracker from "@/components/PageViewTracker";
import SiteFooter from "@/components/layout/Footer";
import NavigationWrapper from "@/components/navigation-wrapper";
import { routing, type Locale } from "@/i18n/routing";
import {
  jsonLd,
  PersonSchema,
  ProfessionalServiceSchema,
  WebsiteSchema,
} from "@/lib/schema";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(SITE_URL),
    authors: [{ name: "Thomas Schwabauer" }],
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
    ...buildMetadata({
      locale: locale as Locale,
      path: "/",
      title: t("home.title"),
      description: t("home.description"),
    }),
    // Nach buildMetadata, damit das Template greift: Unterseiten liefern
    // ihren Titel OHNE Suffix, das Template hängt "| Thomas Schwabauer" an.
    title: {
      default: t("home.title"),
      template: "%s | Thomas Schwabauer",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html suppressHydrationWarning={true} lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(
            PersonSchema,
            WebsiteSchema,
            ProfessionalServiceSchema
          )}
        />
        <GoogleConsentScript />
        <GoogleTagManager />
      </head>
      <body className="overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <NavigationWrapper />
          <CookieConsent />
          <PageViewTracker />
          {children}
          <div className="moving-gradient-overlay" />
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
