// RootLayout.tsx - Server Component (No "use client")
import { GTM_ID } from "@/config/analytics";
import CookieConsent from "@/components/CookieConsent";
import GoogleConsentScript from "@/components/GoogleConsentScript";
import GoogleTagManager from "@/components/GoogleTagManager";
import PageViewTracker from "@/components/PageViewTracker";
import SiteFooter from "@/components/layout/Footer";
import NavigationWrapper from "@/components/navigation-wrapper";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://www.thomas-schwabauer.de";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thomas Schwabauer - Fullstack Developer aus Wetzlar",
    template: "%s | Thomas Schwabauer - Fullstack Developer Wetzlar",
  },
  description:
    "Senior Fullstack Developer & Freelancer aus Wetzlar (Hessen). React.js | Flutter | Angular | Java | Spezialisiert auf Web- & Mobile-Entwicklung.",
  author: "Thomas Schwabauer",
  keywords: [
    "fullstack entwickler wetzlar",
    "freelancer wetzlar",
    "webentwicklung hessen",
    "mobile app entwicklung",
    "react entwickler",
    "flutter entwickler",
    "angular entwickler",
    "java entwickler",
    "software engineering",
    "wetzlar",
    "frankfurt",
    "mittelhessen",
  ].join(", "),
  alternates: {
    canonical: "https://www.thomas-schwabauer.de",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: "https://www.thomas-schwabauer.de",
    siteName: "Thomas Schwabauer - Fullstack Development Wetzlar",
    title: "Thomas Schwabauer - React, Flutter & Angular Developer aus Wetzlar",
    description:
      "Senior Fullstack Developer & Freelancer aus Wetzlar (Hessen). Experte für React.js, Flutter & Angular. Moderne Webanwendungen & Mobile Apps. Kontaktieren Sie mich für Ihr nächstes Projekt!",
    images: [
      {
        url: "/me-laptop.jpg",
        width: 600,
        height: 600,
        alt: "Thomas Schwabauer - React, Flutter & Angular Developer aus Wetzlar, Hessen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThenaDev",
    creator: "@ThenaDev",
    title: "Thomas Schwabauer - React, Flutter & Angular Developer aus Wetzlar",
    description:
      "Web & Mobile Entwicklung aus Wetzlar | React.js | Flutter | Angular | Freelancer in Mittelhessen",
    images: ["/me-laptop.jpg"],
  },
};

export const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Thomas Schwabauer",
  jobTitle: "Senior Fullstack Developer",
  url: "https://www.thomas-schwabauer.de",
  sameAs: [
    "https://github.com/thenadev",
    "https://www.linkedin.com/in/thomas-schwabauer-a3a525163/",
    "https://x.com/ThenaDev",
  ],
  knowsAbout: [
    "Web Development",
    "Mobile Development",
    "Flutter",
    "Android",
    "React",
    "Angular",
    "Next.js",
    "Node.js",
  ],
};

export const WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Thomas Schwabauer Portfolio",
  url: "https://www.thomas-schwabauer.de",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning={true} lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([PersonSchema, WebsiteSchema]),
          }}
        />
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
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
