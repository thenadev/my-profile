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

export const APP_TARGET_AUDIENCES = [
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
] as const;

export const APP_PACKAGES: AppPackage[] = [
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
];
