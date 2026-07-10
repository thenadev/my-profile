import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * KI-Crawler, die wir ausdrücklich erlauben, damit die Inhalte in
 * ChatGPT, Claude, Perplexity & Co. auftauchen können. Faktisch deckt
 * die `*`-Regel sie schon ab — die expliziten Einträge sind ein klares
 * Positiv-Signal und robust dagegen, dass `*` später verschärft wird.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI (Training)
  "OAI-SearchBot", // OpenAI (ChatGPT Search)
  "ChatGPT-User", // OpenAI (Live-Abruf bei Nutzeranfrage)
  "ClaudeBot", // Anthropic (Training/Index)
  "Claude-Web", // Anthropic (Live-Abruf)
  "anthropic-ai", // Anthropic (Legacy)
  "PerplexityBot", // Perplexity (Index)
  "Perplexity-User", // Perplexity (Live-Abruf)
  "Google-Extended", // Google Gemini / Vertex AI
  "Applebot-Extended", // Apple Intelligence
  "cohere-ai", // Cohere
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/admin"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
