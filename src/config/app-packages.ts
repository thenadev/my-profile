/**
 * App-Entwicklung – Pakete und Zielgruppen
 * Flutter (Android & iOS), Beratung, MVP, Feature-/Bug-Entwicklung
 */

export type AppProductId = "app_beratung" | "app_mvp" | "app_feature_bug";

export interface AppPackage {
  id: AppProductId;
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
  /** Bild für die Paket-Karte (z. B. aus public/services/app-entwicklung/icon_*.png) */
  image?: string;
  /** Lucide-Icon-Name als Fallback, wenn kein image */
  icon?: string;
}

type Locale = "de" | "en";
const pick = (locale: string): Locale => (locale === "en" ? "en" : "de");

export interface AppTargetAudience {
  icon: string;
  image: string;
  title: string;
  description: string;
}

const appTargetAudiencesByLocale: Record<Locale, AppTargetAudience[]> = {
  de: [
    {
      icon: "Smartphone",
      image: "/services/app-entwicklung/beratung.png",
      title: "Gründer / Unternehmen mit App-Idee",
      description:
        "Sie haben eine Idee für eine Mobile App? Im Beratungsgespräch klären wir die technische Umsetzung mit Flutter für Android und iOS.",
    },
    {
      icon: "Rocket",
      image: "/services/app-entwicklung/mvp.png",
      title: "Startup vor dem App-MVP",
      description:
        "Sie wollen Ihr App-MVP entwickeln – mit Flutter eine Codebasis für Android und iOS. Nach der Beratung wissen Sie, was möglich ist und was es kostet.",
    },
    {
      icon: "Wrench",
      image: "/services/app-entwicklung/feature.png",
      title: "Bestehende App (Features / Bugs)",
      description:
        "Sie haben bereits eine App und brauchen neue Features oder Fehlerbehebung – ich unterstütze Sie bei der Weiterentwicklung und Wartung.",
    },
  ],
  en: [
    {
      icon: "Smartphone",
      image: "/services/app-entwicklung/beratung.png",
      title: "Founders / companies with an app idea",
      description:
        "Do you have an idea for a mobile app? In the consulting call we clarify the technical implementation with Flutter for Android and iOS.",
    },
    {
      icon: "Rocket",
      image: "/services/app-entwicklung/mvp.png",
      title: "Startup before the app MVP",
      description:
        "You want to build your app MVP – with Flutter, one codebase for Android and iOS. After the consulting you'll know what's possible and what it costs.",
    },
    {
      icon: "Wrench",
      image: "/services/app-entwicklung/feature.png",
      title: "Existing app (features / bugs)",
      description:
        "You already have an app and need new features or bug fixes – I support you with further development and maintenance.",
    },
  ],
};

const appPackagesByLocale: Record<Locale, AppPackage[]> = {
  de: [
    {
      id: "app_beratung",
      title: "Beratungsgespräch",
      subtitle: "1h Termin – technische Umsetzung Ihrer App-Idee",
      idealFor: [
        "App-Idee noch unklar",
        "Startup vor dem MVP",
        "Technologie-Fragen (Flutter, Android, iOS)",
      ],
      priceFrom: 80,
      priceNote: "pro Stunde",
      priceUnit: "/h",
      deliveryWeeks: "1h Gespräch",
      features: [
        {
          text: "Sie geben Ihre Idee/Anliegen im Formular an – ich bereite mich vor",
          highlight: true,
        },
        { text: "1 Stunde Videocall oder Telefon" },
        { text: "Fokus: Flutter, Android & iOS, Machbarkeit" },
        { text: "Optional: schriftlicher Kurzplan oder Kostenschätzung" },
      ],
      ctaText: "Beratungstermin buchen (80€/h)",
      badge: "spare",
      image: "/services/app-entwicklung/icon_beratung.png",
      icon: "Lightbulb",
    },
    {
      id: "app_mvp",
      title: "MVP-Umsetzung",
      subtitle: "Flutter-App für Android & iOS",
      idealFor: [
        "Nach Beratungsgespräch",
        "Klare App-Idee",
        "Schnell auf beiden Plattformen",
      ],
      priceFrom: 3500,
      priceTo: 8000,
      priceNote: "je nach Umfang",
      deliveryWeeks: "6–12 Wochen",
      features: [
        { text: "Eine Codebasis – Flutter für Android & iOS", highlight: true },
        { text: "Moderne UI, nahe am nativen Look" },
        { text: "Backend/API-Anbindung nach Bedarf" },
        { text: "Testflight/Play Store Vorbereitung" },
        { text: "Übergabe inkl. Dokumentation" },
      ],
      ctaText: "MVP anfragen",
      badge: "beliebt",
      image: "/services/app-entwicklung/icon_mvp.png",
      icon: "Rocket",
    },
    {
      id: "app_feature_bug",
      title: "Feature- & Bug-Entwicklung",
      subtitle: "Erweiterung und Fehlerbehebung für bestehende Apps",
      idealFor: [
        "Bereits eine App im Einsatz",
        "Neue Funktionen gewünscht",
        "Bugs beheben, Wartung",
      ],
      priceFrom: 0,
      priceNote: "individuell",
      deliveryWeeks: "nach Absprache",
      features: [
        { text: "Neue Features in Ihrer bestehenden App", highlight: true },
        { text: "Bugfixes und Stabilität" },
        { text: "Flutter- und Native-Projekte" },
        { text: "Individuelles Angebot nach Analyse" },
      ],
      ctaText: "Features/Bugs anfragen",
      image: "/services/app-entwicklung/icon_feature.png",
      icon: "Wrench",
    },
  ],
  en: [
    {
      id: "app_beratung",
      title: "Consulting call",
      subtitle: "1h session – technical implementation of your app idea",
      idealFor: [
        "App idea still unclear",
        "Startup before the MVP",
        "Technology questions (Flutter, Android, iOS)",
      ],
      priceFrom: 80,
      priceNote: "per hour",
      priceUnit: "/h",
      deliveryWeeks: "1h call",
      features: [
        {
          text: "You describe your idea/request in the form – I prepare accordingly",
          highlight: true,
        },
        { text: "1 hour video call or phone" },
        { text: "Focus: Flutter, Android & iOS, feasibility" },
        { text: "Optional: short written plan or cost estimate" },
      ],
      ctaText: "Book a consulting call (€80/h)",
      badge: "spare",
      image: "/services/app-entwicklung/icon_beratung.png",
      icon: "Lightbulb",
    },
    {
      id: "app_mvp",
      title: "MVP delivery",
      subtitle: "Flutter app for Android & iOS",
      idealFor: [
        "After the consulting call",
        "Clear app idea",
        "Fast on both platforms",
      ],
      priceFrom: 3500,
      priceTo: 8000,
      priceNote: "depending on scope",
      deliveryWeeks: "6–12 weeks",
      features: [
        { text: "One codebase – Flutter for Android & iOS", highlight: true },
        { text: "Modern UI, close to the native look" },
        { text: "Backend/API integration as needed" },
        { text: "TestFlight/Play Store preparation" },
        { text: "Handover including documentation" },
      ],
      ctaText: "Request an MVP",
      badge: "beliebt",
      image: "/services/app-entwicklung/icon_mvp.png",
      icon: "Rocket",
    },
    {
      id: "app_feature_bug",
      title: "Feature & bug development",
      subtitle: "Extension and bug fixing for existing apps",
      idealFor: [
        "App already in use",
        "New features wanted",
        "Fix bugs, maintenance",
      ],
      priceFrom: 0,
      priceNote: "individual",
      deliveryWeeks: "by arrangement",
      features: [
        { text: "New features in your existing app", highlight: true },
        { text: "Bug fixes and stability" },
        { text: "Flutter and native projects" },
        { text: "Individual offer after analysis" },
      ],
      ctaText: "Request features/bugs",
      image: "/services/app-entwicklung/icon_feature.png",
      icon: "Wrench",
    },
  ],
};

export function getAppTargetAudiences(locale: string): AppTargetAudience[] {
  return appTargetAudiencesByLocale[pick(locale)];
}

export function getAppPackages(locale: string): AppPackage[] {
  return appPackagesByLocale[pick(locale)];
}
