import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Dezenter Hinweis auf ThenaDev: Agentur-Leistungen (Websites, Software, KI
 * für Unternehmen) liegen auf thenadev.de, diese Seite bleibt das
 * Freelancer-Profil. Normaler Link, kein nofollow.
 */
export default function HomeThenaDevHint() {
  const t = useTranslations("Home.ThenaDevHint");

  return (
    <section
      aria-label={t("label")}
      className="w-full px-4 md:px-8 pb-4 md:pb-8"
    >
      <div className="max-w-3xl mx-auto rounded-xl border border-border/60 bg-muted/30 px-5 py-4 text-center text-sm text-muted-foreground">
        {t("text")}{" "}
        <a
          href={siteConfig.links.thenadev}
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          {t("linkText")}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
