"use client";

import { Card } from "@/components/ui/card";
import { ClientLogoScroll } from "@/components/ui/client-logo-scroll";
import { clientLogos } from "@/config/client-logos";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const TESTIMONIALS = [
  { name: "Amsel UG", key: "amsel", rating: 5 },
  { name: "Tricon GmbH", key: "tricon", rating: 5 },
] as const;

export default function UnternehmenswebsiteSocialProof() {
  const t = useTranslations("Unternehmenswebsite.socialProof");
  return (
    <>
      {/* Social Proof - Kundenlogos: Mobile = horizontaler Auto-Scroll */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("expertiseHeading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("expertiseSubheading")}
          </p>
        </div>

        {/* Einheitliche ClientLogoScroll-Komponente (wie Startseite) */}
        <ClientLogoScroll logos={clientLogos.slice(0, 8)} variant="default" />
      </div>

      {/* Testimonials Section */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("testimonialsHeading")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border backdrop-blur-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "{t(`testimonials.${testimonial.key}.text`)}"
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(`testimonials.${testimonial.key}.company`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
