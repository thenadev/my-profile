import { siteConfig } from "@/config/site";
import { SITE_URL } from "@/lib/seo";

/**
 * Person-Schema des Freelancer-Profils. Agentur-Leistungen (Websites,
 * Software, KI) laufen über ThenaDev auf thenadev.de – hier nur als
 * Arbeitgeber/Organisation verknüpft, ohne lokales Business-Schema.
 */
export const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: siteConfig.authorName,
  jobTitle: "Freelance Senior Fullstack Developer",
  url: SITE_URL,
  worksFor: {
    "@type": "Organization",
    "@id": `${siteConfig.links.thenadev}/#organization`,
    name: siteConfig.companyName,
    url: siteConfig.links.thenadev,
  },
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

/** JSON-LD-Objekt(e) als script-Tag-Props serialisieren. */
export function jsonLd(...schemas: object[]) {
  return {
    __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
  };
}
