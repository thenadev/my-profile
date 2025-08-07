import { NextRequest } from "next/server";

interface SitemapPage {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export async function GET(request: NextRequest) {
  const baseUrl = "https://www.thomas-schwabauer.de";
  const currentDate = new Date().toISOString().split("T")[0];

  // Statische Seiten
  const staticPages: SitemapPage[] = [
    {
      url: "/",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      url: "/about",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/services/startup-beratung",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/services/unternehmenswebsite",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/preisrechner",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      url: "/contact",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/documents",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      url: "/blog",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      url: "/imprint",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.3",
    },
    {
      url: "/privacy",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.3",
    },
  ];

  // Dynamische Blog-Posts (falls vorhanden)
  const blogPosts: SitemapPage[] = [
    // Hier können dynamisch Blog-Posts aus der Datenbank hinzugefügt werden
    // Beispiel:
    // {
    //   url: '/blog/mein-erster-blog-post',
    //   lastmod: '2024-01-15',
    //   changefreq: 'monthly',
    //   priority: '0.6',
    // },
  ];

  // Alle Seiten kombinieren
  const allPages = [...staticPages, ...blogPosts];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages
  .map(
    (page) => `    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
