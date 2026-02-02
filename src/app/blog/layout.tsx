import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog von Thomas Schwabauer – Fullstack Developer aus Wetzlar. Artikel zu Webentwicklung, React, Flutter, Angular, Mobile Apps und Software-Engineering. Wetzlar, Gießen, Mittelhessen.",
  keywords: [
    "blog thomas schwabauer",
    "webentwicklung blog",
    "react entwickler blog",
    "flutter blog",
    "software entwickler wetzlar",
  ].join(", "),
  openGraph: {
    title: "Blog | Thomas Schwabauer - Fullstack Developer Wetzlar",
    description:
      "Artikel zu Webentwicklung, React, Flutter und Mobile Apps. Insights von einem Fullstack Developer aus Wetzlar.",
    url: "https://www.thomas-schwabauer.de/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thomas-schwabauer.de/blog",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog - Thomas Schwabauer",
  description:
    "Artikel zu Webentwicklung, React, Flutter, Angular und Mobile Apps. Thomas Schwabauer - Fullstack Developer aus Wetzlar.",
  url: "https://www.thomas-schwabauer.de/blog",
  publisher: {
    "@type": "Person",
    name: "Thomas Schwabauer",
    url: "https://www.thomas-schwabauer.de",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {children}
    </>
  );
}
