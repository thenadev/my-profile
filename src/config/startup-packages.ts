/**
 * Startup-Beratung – Pakete und Zielgruppen
 * Fokus: Termin 80€/h → Umsetzungsplan → MVP → Feature-Erweiterung
 */

export type StartupProductId = "beratung" | "mvp" | "feature";

export interface StartupPackage {
  id: StartupProductId;
  title: string;
  subtitle: string;
  /** Für wen ist dieses Paket ideal? */
  idealFor: string[];
  priceFrom: number;
  priceTo?: number;
  priceNote?: string;
  /** Einheit: z. B. "/h" oder "ab" */
  priceUnit?: string;
  /** Lieferzeit / Dauer */
  deliveryWeeks?: string;
  features: {
    text: string;
    highlight?: boolean;
  }[];
  ctaText: string;
  badge?: "beliebt" | "neu" | "spare";
  image?: string;
  /** Lucide-Icon-Name für die Paket-Karte (z. B. Lightbulb, Rocket, Wrench) */
  icon?: string;
}

type Locale = "de" | "en";
const pick = (locale: string): Locale => (locale === "en" ? "en" : "de");

export interface StartupTargetAudience {
  icon: string;
  image: string;
  title: string;
  description: string;
}

const startupTargetAudiencesByLocale: Record<Locale, StartupTargetAudience[]> = {
  de: [
    {
      icon: "Lightbulb",
      image: "/services/startup-beratung/consultation.png",
      title: "Gründer mit Idee",
      description:
        "Sie haben eine konkrete Idee für eine App oder Web-Anwendung? Gemeinsam machen wir daraus einen umsetzbaren Plan mit Kostenschätzung.",
    },
    {
      icon: "Rocket",
      image: "/services/startup-beratung/mvp.png",
      title: "Startup vor dem MVP",
      description:
        "Sie wollen Ihr Minimum Viable Product entwickeln – nach der Beratung wissen Sie, was technisch nötig ist und was es kostet.",
    },
    {
      icon: "Wrench",
      image: "/services/startup-beratung/feature.png",
      title: "Unternehmen mit bestehender App",
      description:
        "Sie haben bereits eine Software oder App und möchten neue Features, Erweiterungen oder Wartung – ich unterstütze Sie gezielt.",
    },
  ],
  en: [
    {
      icon: "Lightbulb",
      image: "/services/startup-beratung/consultation.png",
      title: "Founder with an idea",
      description:
        "Do you have a concrete idea for an app or web application? Together we turn it into an actionable plan with a cost estimate.",
    },
    {
      icon: "Rocket",
      image: "/services/startup-beratung/mvp.png",
      title: "Startup before the MVP",
      description:
        "You want to build your Minimum Viable Product – after the consulting you'll know what's technically needed and what it costs.",
    },
    {
      icon: "Wrench",
      image: "/services/startup-beratung/feature.png",
      title: "Company with an existing app",
      description:
        "You already have software or an app and want new features, extensions or maintenance – I support you in a targeted way.",
    },
  ],
};

const startupPackagesByLocale: Record<Locale, StartupPackage[]> = {
  de: [
    {
      id: "beratung",
      title: "Startup-Beratung",
      subtitle: "1h Termin → Umsetzungsplan inkl. Kostenschätzung",
      idealFor: [
        "Gründer mit Idee",
        "Startup vor dem MVP",
        "Unklare technische Umsetzung",
      ],
      priceFrom: 80,
      priceNote: "pro Stunde",
      priceUnit: "/h",
      deliveryWeeks: "1h Gespräch",
      features: [
        {
          text: "Sie geben Ihre Idee im Formular an – ich bereite mich vor",
          highlight: true,
        },
        { text: "1 Stunde Videocall oder Telefon" },
        { text: "Fokus: technische Umsetzung Ihrer Idee" },
        { text: "Schriftlicher Umsetzungsplan nach dem Gespräch" },
        { text: "Kostenschätzung für die Umsetzung inklusive" },
      ],
      ctaText: "Termin buchen (80€/h)",
      badge: "spare",
      image: "/services/startup-beratung/icon_consultation.png",
    },
    {
      id: "mvp",
      title: "MVP-Entwicklung",
      subtitle: "Nächster Schritt nach der Beratung",
      idealFor: [
        "Startup mit klarem Konzept",
        "Nach Beratungstermin",
        "Schnell zur Marktreife",
      ],
      priceFrom: 2500,
      priceTo: 5000,
      priceNote: "je nach Umfang",
      deliveryWeeks: "4–8 Wochen",
      features: [
        { text: "Komplette MVP-Entwicklung (Web-App)", highlight: true },
        { text: "Moderne Technologien (React/Next.js)" },
        { text: "Responsive Design & Mobile-First" },
        { text: "User-Authentifizierung & Datenbank" },
        { text: "Deployment & Hosting-Einrichtung" },
        { text: "3 Monate Support & Wartung inklusive" },
      ],
      ctaText: "MVP anfragen",
      badge: "beliebt",
      image: "/services/startup-beratung/icon_mvp.png",
    },
    {
      id: "feature",
      title: "Feature-Erweiterung",
      subtitle: "Neue Funktionen für bestehende Produkte",
      idealFor: [
        "Bestehende App/Software",
        "Neue Features gewünscht",
        "Wartung & Erweiterung",
      ],
      priceFrom: 0,
      priceNote: "individuell",
      deliveryWeeks: "nach Absprache",
      features: [
        { text: "Erweiterung Ihrer bestehenden Software", highlight: true },
        { text: "Neue Features und Module" },
        { text: "Technische Wartung und Updates" },
        { text: "Individuelles Angebot nach Analyse" },
      ],
      ctaText: "Features anfragen",
      image: "/services/startup-beratung/icon_feature.png",
    },
  ],
  en: [
    {
      id: "beratung",
      title: "Startup Consulting",
      subtitle: "1h session → implementation plan incl. cost estimate",
      idealFor: [
        "Founder with an idea",
        "Startup before the MVP",
        "Unclear technical implementation",
      ],
      priceFrom: 80,
      priceNote: "per hour",
      priceUnit: "/h",
      deliveryWeeks: "1h call",
      features: [
        {
          text: "You describe your idea in the form – I prepare accordingly",
          highlight: true,
        },
        { text: "1 hour video call or phone" },
        { text: "Focus: technical implementation of your idea" },
        { text: "Written implementation plan after the call" },
        { text: "Cost estimate for the implementation included" },
      ],
      ctaText: "Book a slot (€80/h)",
      badge: "spare",
      image: "/services/startup-beratung/icon_consultation.png",
    },
    {
      id: "mvp",
      title: "MVP Development",
      subtitle: "The next step after the consulting",
      idealFor: [
        "Startup with a clear concept",
        "After the consulting session",
        "Fast to market readiness",
      ],
      priceFrom: 2500,
      priceTo: 5000,
      priceNote: "depending on scope",
      deliveryWeeks: "4–8 weeks",
      features: [
        { text: "Complete MVP development (web app)", highlight: true },
        { text: "Modern technologies (React/Next.js)" },
        { text: "Responsive design & mobile-first" },
        { text: "User authentication & database" },
        { text: "Deployment & hosting setup" },
        { text: "3 months of support & maintenance included" },
      ],
      ctaText: "Request an MVP",
      badge: "beliebt",
      image: "/services/startup-beratung/icon_mvp.png",
    },
    {
      id: "feature",
      title: "Feature Extension",
      subtitle: "New features for existing products",
      idealFor: [
        "Existing app/software",
        "New features wanted",
        "Maintenance & extension",
      ],
      priceFrom: 0,
      priceNote: "individual",
      deliveryWeeks: "by arrangement",
      features: [
        { text: "Extension of your existing software", highlight: true },
        { text: "New features and modules" },
        { text: "Technical maintenance and updates" },
        { text: "Individual offer after analysis" },
      ],
      ctaText: "Request features",
      image: "/services/startup-beratung/icon_feature.png",
    },
  ],
};

export function getStartupTargetAudiences(
  locale: string,
): StartupTargetAudience[] {
  return startupTargetAudiencesByLocale[pick(locale)];
}

export function getStartupPackages(locale: string): StartupPackage[] {
  return startupPackagesByLocale[pick(locale)];
}
