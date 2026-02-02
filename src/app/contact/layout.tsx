import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Thomas Schwabauer – Fullstack Developer aus Wetzlar. Projektanfragen, Webentwicklung, Mobile Apps. Schnelle Antwort innerhalb von 24 Stunden. Wetzlar, Gießen, Mittelhessen.",
  keywords: [
    "kontakt thomas schwabauer",
    "fullstack entwickler kontakt",
    "webentwicklung wetzlar kontakt",
    "freelancer wetzlar anfragen",
    "projekt anfrage entwickler",
  ].join(", "),
  openGraph: {
    title: "Kontakt | Thomas Schwabauer - Fullstack Developer Wetzlar",
    description:
      "Kontaktieren Sie mich für Ihr nächstes Projekt. Webentwicklung, Mobile Apps, Beratung. Wetzlar, Gießen, Mittelhessen.",
    url: "https://www.thomas-schwabauer.de/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/contact",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt - Thomas Schwabauer",
  description:
    "Kontaktieren Sie Thomas Schwabauer für Webentwicklung und Mobile Apps. Wetzlar, Gießen, Mittelhessen.",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.authorName,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.zipCode,
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
