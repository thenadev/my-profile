"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Code,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const PersonalStory: React.FC = () => {
  const t = useTranslations("About.PersonalStory");

  return (
    <section className="w-full space-y-16">
      {/* SECTION 1: Intro & Tech-Story (2-Spalten Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Text Content - 60% */}
        <div className="lg:col-span-3 space-y-6 max-w-prose">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <div className="space-y-6">
            <p className="text-xl font-medium text-muted-foreground leading-relaxed">
              {t("intro")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("story1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("story2")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("story3")}
            </p>
          </div>
        </div>

        {/* Image - 40% */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

            <Card className="w-full shadow-xl bg-card backdrop-blur-sm rounded-2xl border border-border overflow-hidden hover:scale-[1.02] hover:border-primary/40 transition-all duration-300">
              <Image
                src="/about/dsid_me.jpg"
                alt={t("imageAlt")}
                className="w-full aspect-square object-cover transition-all duration-300 group-hover:scale-105"
                width={400}
                height={400}
                style={{
                  filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
                }}
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    {t("imageTitle")}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("imageDescription")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* SECTION 2: Arbeitsweise & Werte (Full Width Cards) */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
            {t("workStyle.title")}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("workStyle.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border border-border hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-primary font-semibold mb-2">
                {t("workStyle.strategic.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("workStyle.strategic.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-primary font-semibold mb-2">
                {t("workStyle.creative.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("workStyle.creative.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-primary font-semibold mb-2">
                {t("workStyle.pragmatic.title")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("workStyle.pragmatic.description")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-prose mx-auto text-center space-y-4">
          <h4 className="text-xl font-semibold text-primary">
            {t("startupWork.title")}
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {t("startupWork.description")}
          </p>
        </div>
      </div>

      {/* SECTION 3: Hintergrund & Bodybuilding (Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Text Content - 60% */}
        <div className="lg:col-span-3 space-y-6 max-w-prose">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {t("background.title")}
          </h3>

          <div className="bg-card rounded-2xl p-6 border border-border backdrop-blur-sm">
            <div className="flex items-start gap-3 mb-4">
              <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <blockquote className="text-muted-foreground italic">
                {t("background.quote")}
              </blockquote>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("background.quoteDescription")}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {t("background.bodybuilding")}
          </p>
        </div>

        {/* Image - 40% */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-2xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

            <Card className="w-full shadow-lg bg-card backdrop-blur-sm rounded-2xl border border-border overflow-hidden hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 p-0">
              <Image
                src="/about/gnbf_placing.jpg"
                alt={t("bodybuildingImageAlt")}
                className="w-full aspect-[4/3] object-contain transition-all duration-300 group-hover:scale-105"
                width={400}
                height={300}
                style={{
                  filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
                }}
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    {t("bodybuildingTitle")}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("bodybuildingDescription")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Inline CTA */}
      <div className="rounded-2xl border border-border bg-muted/80 p-8 md:p-12 shadow-xl max-w-4xl mx-auto backdrop-blur-sm">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
          {t("cta.title")}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-center">
          {t("cta.description")}
        </p>
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <Link href="/contact" className="flex items-center gap-2">
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalStory;
