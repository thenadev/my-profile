// RootLayout.tsx - Server Component (No "use client")
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ReactNode } from "react";
import "./globals.css";
import ClientLayout from "./layout-client";

export const metadata = {
  metadataBase: new URL('https://www.thomas-schwabauer.de'),
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
