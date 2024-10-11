// RootLayout.tsx - Server Component (No "use client")
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body>
        {/* Render the client-side layout here */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
