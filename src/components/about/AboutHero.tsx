"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const AboutHero: React.FC = () => {
  const t = useTranslations("About.Hero");

  return (
    <section className="text-center mb-16">
      <Badge variant="secondary" className="mb-4">
        {t("badge")}
      </Badge>
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] via-[var(--hero-portrait-bg-mid)] to-[var(--hero-portrait-bg-bright)] bg-clip-text text-transparent mb-6 animate-fadeIn">
        {t("title")}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-200 mb-8">
        {t("description")}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 font-semibold"
        >
          <Link href="/contact" className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {t("cta.discussProject")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-2 border-border hover:bg-muted px-8 py-6 font-semibold"
        >
          <Link href="/documents" className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t("cta.viewResume")}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default AboutHero;
