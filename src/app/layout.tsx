// RootLayout.tsx - Server Component (No "use client")
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ReactNode } from "react";
import "./globals.css";
import ClientLayout from "./layout-client";

export const metadata = {
  title: "Thomas Schwabauer",
  description:
    "Freelancer | Senior Fullstack Entwickler | Web & Mobile (Java, Flutter, Android, Angular, React, NestJS, NextJS)",
  author: "Thomas Schwabauer",
  keywords:
    "thomas schwabauer, freelancer, senior fullstack developer, testautomation, android, flutter, scrum, android, ios, react, angular, nestjs, nextjs, java, typescript, javascript, mobile development, web development, software engineering, agile, devops, ci/cd, testing, quality assurance, consulting, fullstack, backend, frontend, cross-platform, cloud computing, aws, azure",
  alternates: {
    canonical: "https://www.thomas-schwabauer.de",
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
