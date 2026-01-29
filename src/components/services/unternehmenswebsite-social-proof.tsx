"use client";

import { Card } from "@/components/ui/card";
import { ClientLogoScroll } from "@/components/ui/client-logo-scroll";
import { clientLogos } from "@/config/client-logos";
import { Star } from "lucide-react";

// Testimonials
const testimonials = [
  {
    name: "Amsel UG",
    company: "E-Commerce Unternehmen",
    text: "Dank des Redesigns hat unsere Website jetzt ein komplett neues Aussehen und unsere Kunden interagieren viel häufiger mit unseren Angeboten. Die Zusammenarbeit war professionell und effizient.",
    rating: 5,
  },
  {
    name: "Tricon GmbH",
    company: "Technologieunternehmen",
    text: "Professionelle Umsetzung unserer Unternehmenswebsite. Schnelle Reaktionszeiten und sehr zufriedenstellendes Ergebnis. Die SEO-Optimierung zeigt bereits erste Erfolge.",
    rating: 5,
  },
];

export default function UnternehmenswebsiteSocialProof() {
  return (
    <>
      {/* Social Proof - Kundenlogos: Mobile = horizontaler Auto-Scroll */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Vertrauen Sie auf unsere Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir haben bereits für namhafte Unternehmen erfolgreich Websites
            entwickelt
          </p>
        </div>

        {/* Einheitliche ClientLogoScroll-Komponente (wie Startseite) */}
        <ClientLogoScroll logos={clientLogos.slice(0, 8)} variant="default" />
      </div>

      {/* Testimonials Section */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Was unsere Kunden sagen
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
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
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
