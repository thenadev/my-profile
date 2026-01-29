"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { documents, type DocumentItem } from "@/config/docs";
import { BadgeCheck, FileText, GraduationCap, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const typeToIcon: Record<string, React.ReactNode> = {
  cv: <FileText className="h-4 w-4" />,
  degree: <GraduationCap className="h-4 w-4" />,
  certificate: <BadgeCheck className="h-4 w-4" />,
};

function filterDocuments(
  items: DocumentItem[],
  query: string,
  typeFilter: string,
  translate: (key: string) => string,
) {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((doc) => {
    const matchesType = typeFilter ? doc.type === typeFilter : true;
    if (!normalizedQuery) return matchesType;

    const titleText = translate(doc.title).toLowerCase();
    const descriptionText = translate(doc.description).toLowerCase();
    const platformText = (doc.platform ?? "").toLowerCase();
    const tagTexts = (doc.tags ?? []).map((tag) =>
      translate(`tags.${tag}`).toLowerCase(),
    );
    const typeLabel = translate(`types.${doc.type}`).toLowerCase();
    const linkLangs =
      "links" in doc && doc.links
        ? doc.links.map((l) =>
            translate(`language.${l.language}`).toLowerCase(),
          )
        : [];

    const haystack = [
      titleText,
      descriptionText,
      platformText,
      typeLabel,
      ...tagTexts,
      ...linkLangs,
    ];

    const matchesQuery = haystack.some((text) =>
      text.includes(normalizedQuery),
    );
    return matchesType && matchesQuery;
  });
}

const DocumentsPage: React.FC = () => {
  const t = useTranslations("Documents");
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const filtered = React.useMemo(
    () => filterDocuments(documents, query, typeFilter, t),
    [query, typeFilter, t],
  );

  return (
    <div
      className="flex flex-col items-center z-20 relative px-4 md:px-6 pt-16 pb-20 bg-background min-h-screen"
      id="documents"
    >
      <div className="w-full max-w-7xl">
        {/* Hero Section – aligned with HomeHero & Unternehmenswebsite */}
        <section className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between py-6 sm:py-8 md:py-10 px-0 sm:px-2 gap-6 md:gap-8 lg:gap-12 max-w-full">
          <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left p-0 text-foreground w-full md:w-1/2 max-w-lg lg:max-w-md xl:max-w-xl">
            <h2 className="mb-2 text-2xl sm:text-3xl font-extrabold leading-tight md:text-5xl text-foreground">
              {t("title")}
            </h2>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-md">
              {t("heroIntro")}
            </p>
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg shadow-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl font-semibold text-sm sm:text-base h-10 sm:h-12"
                aria-label={t("heroCta")}
              >
                {t("heroCta")}
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end p-3 sm:p-4 w-full md:w-1/2 mt-2 sm:mt-4 md:-ml-4">
            <div className="relative group">
              <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-turquoise-400/25 blur-3xl -z-40 group-hover:bg-turquoise-400/35 transition-all duration-300" />
              <div className="absolute -inset-2 rounded-2xl bg-muted border border-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] -z-30" />
              <div className="absolute -inset-2 rounded-2xl hero-portrait-bg -z-25" />
              <Image
                src="/thomas_schwabauer.webp"
                alt={t("heroImageAlt")}
                className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_rgba(26,181,189,0.35)] object-cover"
                width={600}
                height={600}
                priority
              />
            </div>
          </div>
        </section>

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                aria-label={t("searchAria")}
                placeholder={t("searchPlaceholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 bg-muted border-border"
              />
            </div>
            <Select
              value={typeFilter || undefined}
              onValueChange={(v) => setTypeFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger
                aria-label={t("filterAria")}
                className="bg-muted border-border"
              >
                <SelectValue placeholder={t("filterByType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allTypes")}</SelectItem>
                <SelectItem value="cv">{t("types.cv")}</SelectItem>
                <SelectItem value="degree">{t("types.degree")}</SelectItem>
                <SelectItem value="certificate">
                  {t("types.certificate")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-sm text-muted-foreground border border-border rounded-xl p-6 flex items-center justify-center bg-muted">
            {t("emptyState")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((doc, index) => (
              <Card
                key={index}
                className="bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-md border border-border bg-primary/15 p-1.5 text-primary">
                        {typeToIcon[doc.type]}
                      </div>
                      <CardTitle className="text-sm sm:text-base font-semibold text-foreground">
                        {t(doc.title)}
                      </CardTitle>
                    </div>
                    {doc.platform && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] sm:text-xs bg-muted border-border text-foreground"
                      >
                        {doc.platform}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                    {t(doc.description)}
                  </CardDescription>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {doc.tags.map((tag) => (
                        <span key={tag}>
                          <Badge
                            variant="outline"
                            className="text-[10px] border-border bg-muted text-foreground"
                          >
                            {t(`tags.${tag}`)}
                          </Badge>
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-3 sm:p-4">
                  {"links" in doc && doc.links ? (
                    <div className="flex flex-row flex-wrap gap-2 items-center">
                      {doc.links.map((link, idx) => (
                        <Button
                          key={idx}
                          onClick={() => window.open(link.url, "_blank")}
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/20 transition-all duration-200"
                          title={t("viewDocumentLang", {
                            language: t(`language.${link.language}`),
                          })}
                        >
                          <span className="font-semibold">
                            {t("language." + link.language).toUpperCase()}
                          </span>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Button
                      onClick={() => doc.url && window.open(doc.url, "_blank")}
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/20 transition-all duration-200"
                    >
                      {t("viewDocument")}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
