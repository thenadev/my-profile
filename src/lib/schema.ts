import { siteConfig } from "@/config/site";
import { SITE_URL } from "@/lib/seo";

export const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: siteConfig.authorName,
  jobTitle: "Senior Fullstack Developer",
  url: SITE_URL,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedIn,
    siteConfig.links.twitter,
    siteConfig.links.freelancermap,
  ],
  knowsAbout: [
    "Web Development",
    "Mobile Development",
    "Flutter",
    "Android",
    "React",
    "Angular",
    "Next.js",
    "Node.js",
  ],
};

export const WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Thomas Schwabauer Portfolio",
  url: SITE_URL,
};

export const ProfessionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: `${siteConfig.authorName} - Fullstack Development`,
  url: SITE_URL,
  image: `${SITE_URL}/me-laptop.png`,
  email: siteConfig.contactEmail,
  telephone: siteConfig.contactPhone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.streetAddress,
    addressLocality: siteConfig.city,
    postalCode: siteConfig.zipCode,
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: ["Wetzlar", "Gießen", "Mittelhessen", "Frankfurt", "Deutschland"],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.5558,
    longitude: 8.5039,
  },
  founder: { "@id": `${SITE_URL}/#person` },
  priceRange: "€€",
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedIn,
    siteConfig.links.twitter,
    siteConfig.links.freelancermap,
  ],
};

interface BreadcrumbItem {
  name: string;
  /** Absolute URL des Breadcrumb-Eintrags */
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface ServiceSchemaOptions {
  name: string;
  description: string;
  url: string;
  /**
   * Bediente Region(en). Default "DE" (bundesweit). Für lokale
   * Landingpages gezielt z.B. ["Wetzlar", "Gießen", "Mittelhessen"]
   * setzen — stärkeres lokales Signal als bundesweites "DE".
   */
  areaServed?: string | string[];
  offers?: { price: number; priceCurrency: string; unitText?: string };
}

export function buildServiceSchema({
  name,
  description,
  url,
  areaServed = "DE",
  offers,
}: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed,
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        ...(offers.unitText && {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: offers.price,
            priceCurrency: offers.priceCurrency,
            unitText: offers.unitText,
          },
        }),
      },
    }),
  };
}

interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  /** Falls nicht gepflegt: Fallback = datePublished. */
  dateModified?: string;
  author?: string;
  image?: string;
  /** Themen-Keywords (z.B. aus den Tags). */
  keywords?: string[];
  /** Rubrik/Thema des Beitrags. */
  articleSection?: string;
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = siteConfig.authorName,
  image = `${SITE_URL}/me-laptop.png`,
  keywords,
  articleSection,
}: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image,
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
    ...(articleSection && { articleSection }),
    author: {
      "@type": "Person",
      name: author,
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#business` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

interface FaqQuestion {
  question: string;
  answer: string;
}

/**
 * FAQPage-Schema aus einer Liste von Frage/Antwort-Paaren.
 * Die Texte müssen dem sichtbaren FAQ-Inhalt der Seite entsprechen.
 */
export function buildFaqSchema(questions: FaqQuestion[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/** JSON-LD-Objekt(e) als script-Tag-Props serialisieren. */
export function jsonLd(...schemas: object[]) {
  return {
    __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
  };
}
