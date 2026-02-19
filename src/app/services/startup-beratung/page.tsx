import { Metadata } from "next";
import StartupBeratungClient from "./StartupBeratungClient";

export const metadata: Metadata = {
  title: "Startup-Beratung 80€/h – Umsetzungsplan & MVP | Thomas Schwabauer",
  description:
    "Startup-Idee? Termin buchen (80€/h): Idee angeben, 1h Gespräch, schriftlicher Umsetzungsplan inkl. Kostenschätzung. Danach MVP-Entwicklung oder Feature-Erweiterung.",
  keywords: [
    "startup beratung",
    "beratungstermin 80 euro",
    "idee umsetzen lassen",
    "mvp entwickeln",
    "umsetzungsplan kostenschätzung",
    "startup gründen hilfe",
    "app idee umsetzen",
    "feature erweiterung software",
    "gründer beratung",
    "technische umsetzung idee",
  ].join(", "),
  openGraph: {
    title: "Startup-Beratung 80€/h – Umsetzungsplan & MVP | Thomas Schwabauer",
    description:
      "Termin buchen: Idee angeben, 1h Gespräch, schriftlicher Umsetzungsplan inkl. Kostenschätzung. MVP-Entwicklung und Feature-Erweiterung.",
    url: "https://www.thomas-schwabauer.de/services/startup-beratung",
    type: "website",
    siteName: "Thomas Schwabauer - Fullstack Development Wetzlar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup-Beratung 80€/h – Umsetzungsplan & MVP",
    description:
      "Termin buchen: Idee angeben, 1h Gespräch, schriftlicher Umsetzungsplan inkl. Kostenschätzung.",
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/services/startup-beratung",
  },
};

export default function StartupBeratungPage() {
  return <StartupBeratungClient />;
}
