import { SITE_URL, localizedUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";

/**
 * /llms.txt — strukturierte Kurzübersicht der Website für KI-Systeme
 * (ChatGPT, Claude, Perplexity …) nach dem llms.txt-Vorschlag
 * (llmstxt.org). Die Seite ist das persönliche Freelancer-Profil;
 * Agentur-Leistungen und Ratgeber liegen bei ThenaDev (thenadev.de).
 */
export function GET(): Response {
  const de = (path: string) => localizedUrl("de", path);
  const thenadev = siteConfig.links.thenadev;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.authorName} – Freelance Fullstack- und Flutter-Entwickler`);
  lines.push("");
  lines.push(
    `> Persönliches Profil von ${siteConfig.authorName}, freiberuflicher ` +
      `Senior Fullstack-Entwickler (Flutter, React, Angular, Next.js, Java/Spring Boot, Kotlin). ` +
      `Verfügbar für Projekte als Freelancer, remote oder vor Ort.`
  );
  lines.push("");
  lines.push(
    `Kontakt: ${siteConfig.contactEmail}, ${siteConfig.contactPhoneDisplay}. ` +
      `Website: ${SITE_URL}`
  );
  lines.push("");

  lines.push("## Seiten");
  lines.push(`- [Startseite](${de("/")}): Profil, Werdegang, Projekte und Kontakt.`);
  lines.push(`- [Über mich](${de("/about")}): Werdegang und Arbeitsweise von ${siteConfig.authorName}.`);
  lines.push(`- [Lebenslauf und Dokumente](${de("/documents")}): Lebenslauf, Zeugnisse und Zertifikate als PDF.`);
  lines.push(`- [Kontakt](${de("/contact")}): Projektanfrage für Freelance-Einsätze.`);
  lines.push("");

  lines.push("## Agentur-Leistungen");
  lines.push(
    `- [ThenaDev](${thenadev}/): Websites, Software und KI für Unternehmen ` +
      `(Inhaber ${siteConfig.authorName}). Leistungen, Preise und Ratgeber stehen dort, nicht auf dieser Seite.`
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
