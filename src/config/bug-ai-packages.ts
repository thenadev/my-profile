/**
 * Bug-Fixing & AI-Integration – Pakete und Zielgruppen
 * Services für Fehleranalyse, KI-Integration und technische Optimierung
 */

export type BugAIProductId = "bug_analysis" | "ai_integration" | "tech_optimization";

export interface BugAIPackage {
  id: BugAIProductId;
  title: string;
  subtitle: string;
  idealFor: string[];
  priceFrom: number;
  priceTo?: number;
  priceNote?: string;
  priceUnit?: string;
  deliveryWeeks?: string;
  features: {
    text: string;
    highlight?: boolean;
  }[];
  ctaText: string;
  badge?: "beliebt" | "neu" | "spare";
  image?: string;
  icon?: string;
}

export const BUG_AI_TARGET_AUDIENCES = [
  {
    icon: "Bug",
    image: "/services/bug-ai/bug-fixing.png",
    title: "Unternehmen mit technischen Problemen",
    description:
      "Sie haben Bugs oder Performance-Probleme in Ihrer bestehenden Software? Ich analysiere und behebe Fehler systematisch und nachhaltig.",
  },
  {
    icon: "Brain",
    image: "/services/bug-ai/ai-integration.png",
    title: "Unternehmen vor der KI-Integration",
    description:
      "Sie möchten KI-Features in Ihre Anwendung integrieren? Von Chatbots über Datenanalyse bis zur Automatisierung – ich berate und setze um.",
  },
  {
    icon: "Zap",
    image: "/services/bug-ai/optimization.png",
    title: "Bestehende Services optimieren",
    description:
      "Ihre Services laufen langsam oder instabil? Ich optimiere Performance, Architektur und Code-Qualität für nachhaltige Verbesserungen.",
  },
] as const;

export const BUG_AI_PACKAGES: BugAIPackage[] = [
  {
    id: "bug_analysis",
    title: "Bug-Fixing & Analyse",
    subtitle: "Systematische Fehleranalyse und nachhaltige Behebung",
    idealFor: [
      "Kritische Produktionsfehler",
      "Wiederkehrende Bugs",
      "Performance-Probleme",
    ],
    priceFrom: 80,
    priceNote: "pro Stunde",
    priceUnit: "/h",
    deliveryWeeks: "nach Absprache",
    features: [
      {
        text: "Detaillierte Fehleranalyse und Root-Cause-Identifikation",
        highlight: true,
      },
      { text: "Systematisches Debugging mit modernen Tools" },
      { text: "Nachhaltige Behebung statt Quick-Fixes" },
      { text: "Dokumentation der Lösung" },
      { text: "Optional: Automatisierte Tests zur Vermeidung" },
    ],
    ctaText: "Bug-Analyse anfragen",
    badge: "spare",
    image: "/services/bug-ai/icon_bug.png",
    icon: "Bug",
  },
  {
    id: "ai_integration",
    title: "KI-Integration",
    subtitle: "AI-Features in Ihre Anwendung integrieren",
    idealFor: [
      "Chatbots & Assistenten",
      "Automatisierung von Prozessen",
      "Datenanalyse & Insights",
    ],
    priceFrom: 2500,
    priceTo: 10000,
    priceNote: "je nach Umfang",
    deliveryWeeks: "4–8 Wochen",
    features: [
      { text: "Integration von OpenAI, Claude, Gemini & Co.", highlight: true },
      { text: "Beratung: Welche KI passt zu Ihrem Use-Case?" },
      { text: "RAG-Systeme (Retrieval-Augmented Generation)" },
      { text: "Custom AI-Workflows & Automatisierung" },
      { text: "Prompt Engineering & Fine-Tuning" },
      { text: "API-Design & Sicherheit" },
    ],
    ctaText: "KI-Integration anfragen",
    badge: "beliebt",
    image: "/services/bug-ai/icon_ai.png",
    icon: "Brain",
  },
  {
    id: "tech_optimization",
    title: "Service-Optimierung",
    subtitle: "Performance, Architektur & Code-Qualität verbessern",
    idealFor: [
      "Langsame Services",
      "Instabile Systeme",
      "Legacy Code modernisieren",
    ],
    priceFrom: 0,
    priceNote: "individuell",
    deliveryWeeks: "nach Analyse",
    features: [
      { text: "Performance-Analyse & Optimierung", highlight: true },
      { text: "Architektur-Review & Refactoring" },
      { text: "Code-Qualität & Best Practices" },
      { text: "Monitoring & Observability" },
      { text: "Skalierbarkeit & Zuverlässigkeit" },
    ],
    ctaText: "Optimierung anfragen",
    image: "/services/bug-ai/icon_optimization.png",
    icon: "Zap",
  },
];
