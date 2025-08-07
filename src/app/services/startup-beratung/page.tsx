import { Metadata } from "next";
import StartupBeratungClient from "./StartupBeratungClient";

export const metadata: Metadata = {
  title: "App entwickeln lassen & Ideen umsetzen | Thomas Schwabauer",
  description:
    "Sie haben eine App-Idee oder Website-Idee? Ich helfe Ihnen dabei, Ihre Idee ohne Programmierkenntnisse umzusetzen. MVP-Entwicklung in 4-8 Wochen.",
  keywords: [
    "app entwickeln lassen",
    "website erstellen lassen",
    "ideen umsetzen",
    "mvp entwickeln",
    "startup gründen hilfe",
    "app idee umsetzen",
    "website bauen lassen",
    "app programmieren lassen",
    "startup beratung",
    "gründer beratung",
    "mvp erstellen lassen deutschland",
    "app entwickeln ohne programmierkenntnisse",
    "startup gründen ohne technische erfahrung",
  ].join(", "),
  openGraph: {
    title: "App entwickeln lassen & Ideen umsetzen | Thomas Schwabauer",
    description:
      "Sie haben eine App-Idee oder Website-Idee? Ich helfe Ihnen dabei, Ihre Idee ohne Programmierkenntnisse umzusetzen. MVP-Entwicklung in 4-8 Wochen.",
    url: "https://www.thomas-schwabauer.de/services/startup-beratung",
    type: "website",
    siteName: "Thomas Schwabauer - Fullstack Development Wetzlar",
  },
  twitter: {
    card: "summary_large_image",
    title: "App entwickeln lassen & Ideen umsetzen | Thomas Schwabauer",
    description:
      "Sie haben eine App-Idee oder Website-Idee? Ich helfe Ihnen dabei, Ihre Idee ohne Programmierkenntnisse umzusetzen.",
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/services/startup-beratung",
  },
};

export default function StartupBeratungPage() {
  return <StartupBeratungClient />;
}
