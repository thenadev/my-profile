import { Metadata } from "next";
import AppEntwicklungClient from "./AppEntwicklungClient";

export const metadata: Metadata = {
  title: "App-Entwicklung Flutter – Android & iOS | Thomas Schwabauer",
  description:
    "Flutter-Apps für Android und iOS: Beratungsgespräch, MVP-Umsetzung, Feature- und Bug-Entwicklung. Eine Codebasis, beide Plattformen.",
  keywords: [
    "app entwicklung",
    "flutter app",
    "android app entwickeln",
    "ios app entwickeln",
    "flutter entwickler",
    "mvp app",
    "app beratung",
    "feature entwicklung app",
    "bug fixing app",
    "hybrid app",
  ].join(", "),
  openGraph: {
    title: "App-Entwicklung Flutter – Android & iOS | Thomas Schwabauer",
    description:
      "Beratung, MVP und Feature/Bug-Entwicklung für Apps mit Flutter. Android und iOS aus einer Codebasis.",
    url: "https://www.thomas-schwabauer.de/services/app-entwicklung",
    type: "website",
    siteName: "Thomas Schwabauer - Fullstack Development Wetzlar",
  },
  twitter: {
    card: "summary_large_image",
    title: "App-Entwicklung Flutter – Android & iOS",
    description:
      "Beratung, MVP und Feature/Bug-Entwicklung für Apps mit Flutter.",
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/services/app-entwicklung",
  },
};

export default function AppEntwicklungPage() {
  return <AppEntwicklungClient />;
}
