import { Metadata } from "next";
import BugFixingAIClient from "./BugFixingAIClient";

export const metadata: Metadata = {
  title: "Bug-Fixing & AI-Integration – Services für moderne Softwareentwicklung | Thomas Schwabauer",
  description:
    "Bug-Fixing, AI-Integration und Service-Optimierung: Fehleranalyse, KI-Features (OpenAI, Claude), Performance-Optimierung. Beratung und Umsetzung.",
  keywords: [
    "bug fixing",
    "fehleranalyse",
    "ai integration",
    "ki integration",
    "openai integration",
    "chatbot entwicklung",
    "service optimierung",
    "performance optimierung",
    "code refactoring",
    "thomas schwabauer",
  ].join(", "),
  openGraph: {
    title: "Bug-Fixing & AI-Integration | Thomas Schwabauer",
    description:
      "Fehleranalyse, KI-Integration (OpenAI, Claude), Service-Optimierung – Beratung und nachhaltige Umsetzung.",
    url: "https://www.thomas-schwabauer.de/services/bug-fixing-ai-integration",
    type: "website",
    siteName: "Thomas Schwabauer - Fullstack Development Wetzlar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bug-Fixing & AI-Integration",
    description:
      "Fehleranalyse, KI-Features und Service-Optimierung für nachhaltige Softwareentwicklung.",
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/services/bug-fixing-ai-integration",
  },
};

export default function BugFixingAIPage() {
  return <BugFixingAIClient />;
}
