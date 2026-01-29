"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, Car, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ProfessionalJourney: React.FC = () => {
  const t = useTranslations("About.ProfessionalJourney");

  return (
    <section className="w-full space-y-8">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">
        {t("title")}
      </h2>

      <div className="max-w-6xl mx-auto">
        {/* Valtech Case Study Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/10 rounded-2xl blur-md -z-10 group-hover:blur-lg transition-all duration-300" />

          <Card className="w-full bg-card backdrop-blur border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 overflow-hidden transition-all">
            <CardHeader className="pb-6 border-b border-border">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold text-foreground">
                  {t("valtech.title")}
                </CardTitle>
                <p className="text-base text-muted-foreground">
                  {t("valtech.subtitle")}
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Media Section */}
                <div className="lg:col-span-1 space-y-4 pl-4 py-6">
                  <video
                    src="/about/valtech_testfahrt.mp4"
                    className="w-full aspect-video object-cover rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <video
                    src="/about/valtech_short.mp4"
                    className="w-full aspect-video object-cover rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                {/* Content Section */}
                <div className="lg:col-span-1 p-8 space-y-10 ">
                  {/* Tätigkeit */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold text-foreground">
                        {t("valtech.activity.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.activity.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.activity.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.activity.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Verantwortung */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold text-foreground">
                        {t("valtech.responsibility.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.responsibility.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.responsibility.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.responsibility.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Learnings */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold text-foreground">
                        {t("valtech.learnings.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.learnings.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.learnings.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.learnings.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted border border-border text-muted-foreground rounded-full text-xs font-medium">
                        {t("valtech.technologies.0")}
                      </span>
                      <span className="px-3 py-1 bg-muted border border-border text-muted-foreground rounded-full text-xs font-medium">
                        {t("valtech.technologies.1")}
                      </span>
                      <span className="px-3 py-1 bg-muted border border-border text-muted-foreground rounded-full text-xs font-medium">
                        {t("valtech.technologies.2")}
                      </span>
                      <span className="px-3 py-1 bg-muted border border-border text-muted-foreground rounded-full text-xs font-medium">
                        {t("valtech.technologies.3")}
                      </span>
                      <span className="px-3 py-1 bg-muted border border-border text-muted-foreground rounded-full text-xs font-medium">
                        {t("valtech.technologies.4")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inline CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-muted/80 p-6 md:p-8 max-w-3xl mx-auto backdrop-blur-sm">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 text-center">
            {t("cta.title")}
          </h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto text-center text-sm md:text-base">
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
      </div>
    </section>
  );
};

export default ProfessionalJourney;
