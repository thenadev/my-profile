import { SITE_URL, localizedUrl } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

/**
 * /llms.txt — strukturierte Kurzübersicht der Website für KI-Systeme
 * (ChatGPT, Claude, Perplexity …) nach dem llms.txt-Vorschlag
 * (llmstxt.org). Wird beim wöchentlichen Rebuild statisch erzeugt und
 * nimmt so automatisch neue, bereits veröffentlichte Blogartikel auf
 * (getAllPosts filtert Drafts und in der Zukunft datierte Beiträge).
 */
export function GET(): Response {
  const de = (path: string) => localizedUrl("de", path);

  const services = [
    {
      title: "Webdesign Wetzlar",
      url: de("/webdesign-wetzlar"),
      desc: "Lokale Landingpage: individuelle, SEO-optimierte Websites für Unternehmen aus Wetzlar und Mittelhessen.",
    },
    {
      title: "Unternehmenswebsite erstellen lassen",
      url: de("/services/unternehmenswebsite"),
      desc: "Moderne Firmenwebsites zum Festpreis – Design, Entwicklung, Hosting.",
    },
    {
      title: "App-Entwicklung (Flutter)",
      url: de("/services/app-entwicklung"),
      desc: "Native iOS- und Android-Apps aus einer Codebasis mit Flutter.",
    },
    {
      title: "Startup-Beratung & MVP",
      url: de("/services/startup-beratung"),
      desc: "Technische Beratung für Gründer: Tech-Stack, Machbarkeit, MVP-Umsetzung.",
    },
  ];

  const posts = getAllPosts();

  const lines: string[] = [];
  lines.push(`# ${siteConfig.authorName} – Webdesign & Fullstack-Entwicklung aus Wetzlar`);
  lines.push("");
  lines.push(
    `> Freelance Fullstack-Entwickler aus Wetzlar. Individuelle Websites, ` +
      `Web-Apps, Flutter-Apps und technische Startup-Beratung für Unternehmen ` +
      `in Wetzlar, Gießen und ganz Mittelhessen – direkt vom Entwickler, ` +
      `ohne Baukasten und ohne Agentur-Overhead.`
  );
  lines.push("");
  lines.push(
    `Standort: ${siteConfig.streetAddress}, ${siteConfig.zipCode} ${siteConfig.city}, Hessen. ` +
      `Kontakt: ${siteConfig.contactEmail}, ${siteConfig.contactPhoneDisplay}. ` +
      `Website: ${SITE_URL}`
  );
  lines.push("");

  lines.push("## Leistungen");
  for (const s of services) {
    lines.push(`- [${s.title}](${s.url}): ${s.desc}`);
  }
  lines.push("");

  lines.push("## Wichtige Seiten");
  lines.push(`- [Startseite](${de("/")}): Überblick über Person, Leistungen und Referenzen.`);
  lines.push(`- [Über mich](${de("/about")}): Werdegang und Arbeitsweise von ${siteConfig.authorName}.`);
  lines.push(`- [Leistungen](${de("/services")}): Alle angebotenen Dienstleistungen im Überblick.`);
  lines.push(`- [Kontakt](${de("/contact")}): Anfrage und kostenloses Erstgespräch.`);
  lines.push("");

  lines.push("## Blog");
  for (const post of posts) {
    const url = de(`/blog/${encodeURIComponent(post.slug)}`);
    const desc = post.description ? `: ${post.description}` : "";
    lines.push(`- [${post.title}](${url})${desc}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
