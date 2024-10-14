// RootLayout.tsx - Server Component (No "use client")
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import "./globals.css";
import ClientLayout from "./layout-client";

export const metadata = {
  title: "Thomas Schwabauer",
  description:
    "Freelancer | Senior Fullstack Entwickler | Testautomation | Android",
  author: "Thomas Schwabauer",
  keywords:
    "thomas schwabauer, freelancer, senior fullstack developer, testautomation, android, flutter, scrum",
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
