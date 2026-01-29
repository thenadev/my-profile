"use client";

import UnternehmenswebsiteContactForm from "@/components/services/unternehmenswebsite-contact-form";
import UnternehmenswebsiteFAQ from "@/components/services/unternehmenswebsite-faq";
import UnternehmenswebsiteFinalCTA from "@/components/services/unternehmenswebsite-final-cta";
import UnternehmenswebsiteHero from "@/components/services/unternehmenswebsite-hero";
import UnternehmenswebsitePortfolio from "@/components/services/unternehmenswebsite-portfolio";
import UnternehmenswebsiteQuickNav from "@/components/services/unternehmenswebsite-quick-nav";
import UnternehmenswebsiteSocialProof from "@/components/services/unternehmenswebsite-social-proof";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getYearsOfExperience } from "@/config/stats";
import { TARGET_AUDIENCES, WEBSITE_PACKAGES } from "@/config/website-packages";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Globe,
  Lightbulb,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const ANIMATION = {
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.5,
};

/** Bildgröße für Package-Karten – Icons sind 800×800 (quadratisch) */
const PACKAGE_IMAGE = {
  size: 180,
  sizes: "(max-width: 768px) 100vw, 33vw",
} as const;

export default function UnternehmenswebsiteClient() {
  const router = useRouter();
  const zielgruppeRef = useRef(null);
  const paketeRef = useRef(null);
  const warumRef = useRef(null);
  const seoRef = useRef(null);
  const zielgruppeInView = useInView(zielgruppeRef, {
    once: true,
    margin: "-80px",
  });
  const paketeInView = useInView(paketeRef, { once: true, margin: "-80px" });
  const warumInView = useInView(warumRef, { once: true, margin: "-80px" });
  const seoInView = useInView(seoRef, { once: true, margin: "-80px" });

  const handleCTAClick = (ctaType: string) => {
    sendGoogleEvent("cta_click", {
      cta_type: ctaType,
      location: "landing_page",
      service: "unternehmenswebsite",
    });
    if (ctaType === "contact_form") {
      setTimeout(() => {
        document
          .getElementById("contact-form-section")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      router.push("/contact");
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-8 md:gap-12 bg-background">
      {/* Hero Section */}
      <UnternehmenswebsiteHero />

      {/* Schnell-Navigation – direkt unter Hero */}
      <UnternehmenswebsiteQuickNav />

      {/* Spacing für weitere Sections */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center gap-8 md:gap-12">
        {/* Zielgruppe – Für wen? */}
        <motion.div
          ref={zielgruppeRef}
          id="zielgruppen"
          className="w-full max-w-7xl space-y-10 scroll-mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={zielgruppeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
          >
            <Badge variant="secondary" className="text-sm">
              Für wen?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ich unterstütze Unternehmen, die online sichtbar werden wollen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ob ohne Website, mit veralteter Präsenz oder als Neugründer – ich
              baue maßgeschneiderte Websites für kleine Unternehmen und
              Selbstständige.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {TARGET_AUDIENCES.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                animate={zielgruppeInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: ANIMATION.duration,
                  delay: 0.1 + index * 0.08,
                  ease: ANIMATION.ease,
                }}
              >
                <Card
                  key={index}
                  className="overflow-hidden bg-card border border-border/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col"
                >
                  {/* Bildbereich – volle Breite, großzügig */}
                  <div className="relative aspect-[4/3] min-h-[240px] sm:min-h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-muted/20">
                    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                      <Image
                        src={audience.image}
                        alt={audience.title}
                        width={480}
                        height={480}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="max-h-[200px] sm:max-h-[260px] md:max-h-[300px] w-auto object-contain drop-shadow-[0_4px_24px_rgba(26,181,189,0.2)] group-hover:scale-105 group-hover:drop-shadow-[0_8px_40px_rgba(26,181,189,0.3)] transition-all duration-300"
                      />
                    </div>
                    {/* Dezenter Rahmen für Tiefe */}
                    <div className="absolute inset-0 rounded-t-lg ring-1 ring-inset ring-white/5 pointer-events-none" />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">
                      {audience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                      {audience.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pakete – strukturiert nach Zielgruppe */}
        <motion.div
          ref={paketeRef}
          id="preise"
          className="w-full max-w-6xl space-y-8 scroll-mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={paketeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Webdesign-Pakete für Ihr Unternehmen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparente Preise, klare Leistungen – wählen Sie das Paket, das
              zu Ihrer Situation passt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {WEBSITE_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 32 }}
                animate={paketeInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: ANIMATION.duration,
                  delay: 0.1 + index * 0.1,
                  ease: ANIMATION.ease,
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Card
                  key={pkg.id}
                  className={`relative overflow-visible border-2 bg-card hover:shadow-xl transition-all duration-300 flex flex-col ${
                    pkg.badge === "beliebt"
                      ? "border-primary/50 shadow-lg scale-[1.02] md:scale-105"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {/* Farbbalken oben */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      index === 0
                        ? "bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] to-[var(--hero-portrait-bg-mid)]"
                        : index === 1
                          ? "bg-gradient-to-r from-[var(--hero-portrait-bg-mid)] to-turquoise-600"
                          : "bg-gradient-to-r from-turquoise-600 to-turquoise-700"
                    }`}
                  />
                  {pkg.badge && (
                    <div className="absolute -top-2 -right-2 z-50 overflow-visible">
                      <Badge
                        className={
                          pkg.badge === "beliebt"
                            ? "bg-primary text-primary-foreground"
                            : pkg.badge === "spare"
                              ? "bg-green-600 text-white"
                              : "bg-primary/20 text-primary"
                        }
                      >
                        {pkg.badge === "beliebt"
                          ? "Am beliebtesten"
                          : pkg.badge === "spare"
                            ? "Günstigster Einstieg"
                            : "Neu"}
                      </Badge>
                    </div>
                  )}
                  {pkg.image && (
                    <div className="flex items-center justify-center bg-muted/30">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        width={PACKAGE_IMAGE.size}
                        height={PACKAGE_IMAGE.size}
                        sizes={`${PACKAGE_IMAGE.size}px`}
                        className="object-contain drop-shadow-[0_2px_12px_rgba(26,181,189,0.15)]"
                      />
                    </div>
                  )}
                  <CardHeader className="text-center pb-3 pt-6">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {pkg.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {pkg.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <div className="text-2xl font-bold text-primary">
                        €{pkg.priceFrom.toLocaleString("de-DE")}
                        {pkg.priceTo
                          ? `–${pkg.priceTo.toLocaleString("de-DE")}`
                          : pkg.priceNote
                            ? "+"
                            : ""}
                      </div>
                      {pkg.priceNote && (
                        <span className="text-sm text-muted-foreground">
                          {pkg.priceNote}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Lieferzeit: {pkg.deliveryWeeks}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col pt-0">
                    {/* Ideal für */}
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs font-semibold text-foreground mb-2">
                        Ideal für:
                      </p>
                      <ul className="space-y-1">
                        {pkg.idealFor.map((item, i) => (
                          <li
                            key={i}
                            className="text-xs text-muted-foreground flex items-center gap-2"
                          >
                            <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Leistungen */}
                    <ul className="space-y-2.5 flex-1">
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <CheckCircle
                            className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                              feature.highlight
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={
                              feature.highlight
                                ? "text-foreground font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => {
                        sendGoogleEvent("package_click", {
                          package: pkg.id,
                          location: "landing_page",
                        });
                        handleCTAClick("contact_form");
                      }}
                    >
                      {pkg.ctaText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          ref={warumRef}
          className="w-full max-w-6xl space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={warumInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Warum Webdesign aus Wetzlar?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Lokale Expertise",
                desc: `Webdesign-Experte aus Wetzlar mit über ${getYearsOfExperience()} Jahren Erfahrung in der Region`,
              },
              {
                icon: Zap,
                title: "Schnelle Umsetzung",
                desc: "Professionelle Websites in 2-4 Wochen - schnell zur Online-Präsenz",
              },
              {
                icon: Shield,
                title: "Sicher & Zuverlässig",
                desc: "Moderne Sicherheitsstandards und zuverlässige Hosting-Lösungen",
              },
              {
                icon: Globe,
                title: "SEO-Optimiert",
                desc: "Suchmaschinenoptimierung für bessere Sichtbarkeit in Wetzlar und Umgebung",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={warumInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: ANIMATION.duration,
                    delay: 0.1 + index * 0.08,
                    ease: ANIMATION.ease,
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card className="text-center p-6 bg-card border-border">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg mb-2 text-foreground">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {item.desc}
                    </CardDescription>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* SEO Section */}
        <motion.div
          ref={seoRef}
          className="w-full max-w-6xl space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={seoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Webdesign Wetzlar - Ihre Vorteile
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={seoInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: ANIMATION.duration,
                delay: 0.15,
                ease: ANIMATION.ease,
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
            >
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 text-foreground">
                      Lokale Präsenz
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      Als Webdesigner aus Wetzlar verstehe ich die lokale
                      Wirtschaft und kann Ihre Website optimal auf die Region
                      Mittelhessen ausrichten. Von Wetzlar über Gießen bis nach
                      Frankfurt - ich kenne die lokalen Märkte und Zielgruppen.
                    </CardDescription>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={seoInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: ANIMATION.duration,
                delay: 0.25,
                ease: ANIMATION.ease,
              }}
              whileHover={{ x: -4, transition: { duration: 0.2 } }}
            >
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 text-foreground">
                      Persönlicher Service
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      Direkter Kontakt ohne Zwischenhändler. Persönliche
                      Beratung, regelmäßige Updates und ein direkter
                      Ansprechpartner für alle Fragen rund um Ihr
                      Webdesign-Projekt in Wetzlar.
                    </CardDescription>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Social Proof Section */}
        <UnternehmenswebsiteSocialProof />

        {/* Portfolio Section */}
        <div id="portfolio" className="w-full scroll-mt-20">
          <UnternehmenswebsitePortfolio />
        </div>

        {/* FAQ Section */}
        <div id="faq" className="w-full scroll-mt-20">
          <UnternehmenswebsiteFAQ />
        </div>

        {/* Kontaktformular Section */}
        <UnternehmenswebsiteContactForm />

        {/* Final CTA Section */}
        <UnternehmenswebsiteFinalCTA
          onContactClick={() => handleCTAClick("contact_form")}
        />
      </div>
    </div>
  );
}
