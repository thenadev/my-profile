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
    canonical: "https://www.thomas-schwabauer.de"
  },
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
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Render the client-side layout here */}
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
