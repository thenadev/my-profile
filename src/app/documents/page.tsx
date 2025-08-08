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
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

const typeToIcon: Record<string, React.ReactNode> = {
  cv: <FileText className="h-4 w-4" />,
  degree: <GraduationCap className="h-4 w-4" />,
  certificate: <BadgeCheck className="h-4 w-4" />,
};

function filterDocuments(
  items: DocumentItem[],
  query: string,
  typeFilter: string
) {
  return items.filter((d) => {
    const matchesQuery = query
      ? [d.title, d.description, d.platform, ...(d.tags ?? [])]
          .filter(Boolean)
          .some((val) =>
            (val as string).toLowerCase().includes(query.toLowerCase())
          )
      : true;
    const matchesType = typeFilter ? d.type === typeFilter : true;
    return matchesQuery && matchesType;
  });
}

const DocumentsPage: React.FC = () => {
  const t = useTranslations("Documents");
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const filtered = React.useMemo(
    () => filterDocuments(documents, query, typeFilter),
    [query, typeFilter]
  );

  return (
    <div
      className="flex flex-col items-center z-20 relative px-4 md:px-6 py-24"
      id="documents"
    >
      <div className="w-full max-w-5xl">
        {/* Hero Section */}
        <div className="rounded-2xl border bg-white/50 dark:bg-neutral-900/50 backdrop-blur p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {t("title")}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                {t("heroIntro")}
              </p>
              <Link href="/contact">
                <Button size="sm">{t("heroCta")}</Button>
              </Link>
            </div>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border shadow-sm">
              <Image
                src="/thomas_schwabauer.webp"
                alt={t("heroImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 128px"
                priority
              />
            </div>
          </div>
        </div>

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
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger aria-label={t("filterAria")}>
                <SelectValue placeholder={t("filterByType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t("allTypes")}</SelectItem>
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
          <div className="text-sm text-muted-foreground border rounded-md p-6 flex items-center justify-center">
            {t("emptyState")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((doc, index) => (
              <Card
                key={index}
                className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur shadow-sm rounded-lg flex flex-col justify-between overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-md border p-1.5 text-neutral-600 dark:text-neutral-300">
                        {typeToIcon[doc.type]}
                      </div>
                      <CardTitle className="text-sm sm:text-base font-semibold">
                        {t(doc.title)}
                      </CardTitle>
                    </div>
                    {doc.platform && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] sm:text-xs"
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
                          <Badge variant="outline" className="text-[10px]">
                            {tag}
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
                          className="transition-transform duration-200 hover:scale-[1.02]"
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
                      variant="secondary"
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
