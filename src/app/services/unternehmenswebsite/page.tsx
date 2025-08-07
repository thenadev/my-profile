import { Metadata } from "next";
import UnternehmenswebsiteClient from "./UnternehmenswebsiteClient";

export const metadata: Metadata = {
  title:
    "Webdesign Wetzlar - Professionelle Unternehmenswebsites | Thomas Schwabauer",
  description:
    "Webdesign Wetzlar - Professionelle Unternehmenswebsites aus Wetzlar. Moderne, responsive und SEO-optimierte Webdesigns für Unternehmen in Wetzlar, Gießen und Mittelhessen. Kostenlose Beratung.",
  keywords: [
    "webdesign wetzlar",
    "website wetzlar",
    "unternehmenswebsite wetzlar",
    "webdesigner wetzlar",
    "website erstellen wetzlar",
    "webdesign hessen",
    "website design wetzlar",
    "responsive webdesign wetzlar",
    "seo webdesign wetzlar",
    "ecommerce website wetzlar",
    "online shop wetzlar",
    "webentwicklung wetzlar",
    "webdesign mittelhessen",
    "website agentur wetzlar",
    "webdesign studio wetzlar",
    "wetzlar",
    "gießen",
    "mittelhessen",
    "hessen",
    "deutschland",
  ].join(", "),
  openGraph: {
    title:
      "Webdesign Wetzlar - Professionelle Unternehmenswebsites | Thomas Schwabauer",
    description:
      "Webdesign Wetzlar - Professionelle Unternehmenswebsites aus Wetzlar. Moderne, responsive und SEO-optimierte Webdesigns für Unternehmen in Wetzlar, Gießen und Mittelhessen.",
    url: "https://www.thomas-schwabauer.de/services/unternehmenswebsite",
    siteName: "Thomas Schwabauer - Webdesign Wetzlar",
    images: [
      {
        url: "/me-laptop.jpg",
        width: 600,
        height: 600,
        alt: "Thomas Schwabauer - Webdesigner aus Wetzlar",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webdesign Wetzlar - Professionelle Unternehmenswebsites",
    description:
      "Webdesign Wetzlar - Professionelle Unternehmenswebsites aus Wetzlar. Moderne, responsive und SEO-optimierte Webdesigns.",
    images: ["/me-laptop.jpg"],
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/services/unternehmenswebsite",
  },
};

export default function UnternehmenswebsitePage() {
  return <UnternehmenswebsiteClient />;
}
