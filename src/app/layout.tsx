// RootLayout.tsx - Server Component (No "use client")
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ReactNode } from "react";
import "./globals.css";
import ClientLayout from "./layout-client";

export const metadata = {
  title: {
    default:
      "Thomas Schwabauer - Fullstack Developer | React, Flutter & Angular",
    template: "%s | Thomas Schwabauer - React, Flutter & Angular",
  },
  description:
    "Senior Fullstack Developer & Freelancer aus Wetzlar. React.js | Flutter | Angular | Java | Spezialisiert auf Web- & Mobile-Entwicklung. ✓ 5+ Jahre Erfahrung ✓ Agile Entwicklung",
  author: "Thomas Schwabauer",
  keywords: [
    "fullstack entwickler",
    "freelancer",
    "webentwicklung",
    "mobile app entwicklung",
    "react entwickler",
    "flutter entwickler",
    "angular entwickler",
    "java entwickler",
    "software engineering",
    "wetzlar",
    "frankfurt",
  ].join(", "),
  alternates: {
    canonical: "https://www.thomas-schwabauer.de",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    url: "https://www.thomas-schwabauer.de",
    siteName: "Thomas Schwabauer - Fullstack Development",
    title: "Thomas Schwabauer - React, Flutter & Angular Developer",
    description:
      "Senior Fullstack Developer & Freelancer aus Wetzlar. Experte für React.js, Flutter & Angular. Moderne Webanwendungen & Mobile Apps. Kontaktieren Sie mich für Ihr nächstes Projekt!",
    images: [
      {
        url: "/me-laptop.jpg",
        width: 600,
        height: 600,
        alt: "Thomas Schwabauer - React, Flutter & Angular Developer aus Wetzlar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThenaDev",
    creator: "@ThenaDev",
    title: "Thomas Schwabauer - React, Flutter & Angular Developer",
    description:
      "Web & Mobile Entwicklung | ⚡ React.js ⚡ Flutter ⚡ Angular | Freelancer aus Wetzlar",
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
  // Get the language from the cookie set by middleware
  // const cookieStore = cookies();
  // const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

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
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Render the client-side layout here */}
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
