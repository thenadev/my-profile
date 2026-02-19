import { Metadata } from "next";
import ServicesOverviewClient from "./ServicesOverviewClient";

export const metadata: Metadata = {
  title: "Services – Startup-Beratung, App-Entwicklung, Webdesign | Thomas Schwabauer",
  description:
    "Startup-Beratung (80€/h), Flutter-App-Entwicklung für Android & iOS, Unternehmenswebsites aus Wetzlar. Beratung, MVP und Feature-Entwicklung.",
  keywords: [
    "startup beratung",
    "app entwicklung",
    "flutter",
    "unternehmenswebsite",
    "webdesign wetzlar",
    "mvp entwicklung",
    "thomas schwabauer",
  ].join(", "),
  openGraph: {
    title: "Services | Thomas Schwabauer",
    description:
      "Startup-Beratung, App-Entwicklung mit Flutter, Unternehmenswebsites – Beratung, MVP und Umsetzung.",
    url: "https://www.thomas-schwabauer.de/services",
    siteName: "Thomas Schwabauer",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/services",
  },
};

export default function ServicesPage() {
  return <ServicesOverviewClient />;
}
