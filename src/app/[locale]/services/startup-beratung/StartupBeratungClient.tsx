"use client";

import StartupBeratungFAQ from "@/components/services/startup-beratung-faq";
import StartupBeratungFinalCTA from "@/components/services/startup-beratung-final-cta";
import StartupBeratungHero from "@/components/services/startup-beratung-hero";
import StartupBeratungQuickNav from "@/components/services/startup-beratung-quick-nav";
import StartupBeratungTerminForm from "@/components/services/startup-beratung-termin-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  STARTUP_PACKAGES,
  STARTUP_TARGET_AUDIENCES,
} from "@/config/startup-packages";
import type { StartupProductId } from "@/config/startup-packages";
import { getYearsOfExperience } from "@/config/stats";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle,
  Clock,
  FileText,
  Lightbulb,
  MessageCircle,
  Rocket,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const ANIMATION = {
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.5,
};
const STAGGER = {
  header: 0,
  start: 0.2,
  item: 0.12,
} as const;
const CARD_VIEWPORT = { once: true, margin: "-60px 0px -60px 0px" } as const;

const BERATUNG_SCALE = 1.06;
const STANDARD_CARDS_SCALE = 0.94;

/** Bildgröße für Package-Karten – wie Unternehmenswebsite (große Icons, einheitlich) */
const PACKAGE_IMAGE = {
  size: 220,
  sizes: "(max-width: 768px) 100vw, 33vw",
} as const;

/** Icon-Namen aus Config auf Lucide-Komponenten */
const PACKAGE_ICONS: Record<string, LucideIcon> = {
  Lightbulb,
  Rocket,
  Wrench,
};

export default function StartupBeratungClient() {
  const zielgruppeRef = useRef(null);
  const paketeRef = useRef(null);
  const warumRef = useRef(null);
  const ablaufRef = useRef(null);
  const faqRef = useRef(null);
  const [selectedProductId, setSelectedProductId] =
    useState<StartupProductId | null>(null);

  const zielgruppeInView = useInView(zielgruppeRef, {
    once: true,
    margin: "-80px",
  });
  const paketeInView = useInView(paketeRef, { once: true, margin: "-80px" });
  const warumInView = useInView(warumRef, { once: true, margin: "-80px" });
  const ablaufInView = useInView(ablaufRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  const handleCTAClick = (ctaType: string, productId?: StartupProductId) => {
    if (productId) setSelectedProductId(productId);
    sendGoogleEvent("cta_click", {
      cta_type: ctaType,
      location: "landing_page",
      service: "startup_beratung",
      ...(productId && { package: productId }),
    });
    const formId = "termin-formular";
    setTimeout(() => {
      document
        .getElementById(formId)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-8 md:gap-12 bg-background">
      <StartupBeratungHero onTerminClick={() => handleCTAClick("termin_form")} />
      <StartupBeratungQuickNav />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center gap-8 md:gap-12">
        {/* Für wen? */}
        <motion.div
          ref={zielgruppeRef}
          id="zielgruppen"
          className="w-full max-w-7xl space-y-10 scroll-mt-20"
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={zielgruppeInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: ANIMATION.duration,
              delay: STAGGER.header,
              ease: ANIMATION.ease,
            }}
          >
            <Badge variant="secondary" className="text-sm">
              Für wen?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Für Gründer und Unternehmen mit Ideen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ob erste Idee, MVP-Planung oder Erweiterung bestehender Software –
              ich unterstütze Sie mit technischer Beratung und Umsetzung.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {STARTUP_TARGET_AUDIENCES.map((audience, index) => (
              <motion.div
                key={audience.title}
                className="flex min-h-[360px]"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={CARD_VIEWPORT}
                transition={{
                  duration: ANIMATION.duration,
                  delay: index * STAGGER.item,
                  ease: ANIMATION.ease,
                }}
              >
                <Card className="overflow-hidden bg-card border border-border/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col w-full min-h-full">
                  <div className="relative h-[200px] sm:h-[220px] flex-shrink-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-muted/20">
                    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                      <Image
                        src={audience.image}
                        alt={audience.title}
                        width={480}
                        height={480}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="max-h-[160px] sm:max-h-[180px] w-auto object-contain drop-shadow-[0_4px_24px_rgba(26,181,189,0.2)] group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1 min-h-0">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">
                      {audience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1 line-clamp-4">
                      {audience.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Preise & Pakete */}
        <motion.div
          ref={paketeRef}
          id="preise"
          className="w-full max-w-6xl space-y-8 scroll-mt-20"
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={paketeInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: ANIMATION.duration,
              delay: STAGGER.header,
              ease: ANIMATION.ease,
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Beratung, MVP und Feature-Erweiterung
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Klarer Einstieg: 1h Beratung (80€) inkl. schriftlichem
              Umsetzungsplan. Danach MVP oder Features für bestehende Produkte.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
            {STARTUP_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                role="button"
                tabIndex={0}
                className="cursor-pointer group"
                initial={{ opacity: 0, y: 32, scale: STANDARD_CARDS_SCALE }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale:
                    pkg.id === "beratung" ? BERATUNG_SCALE : STANDARD_CARDS_SCALE,
                }}
                viewport={CARD_VIEWPORT}
                onClick={() => {
                  sendGoogleEvent("package_click", {
                    package: pkg.id,
                    location: "landing_page",
                    service: "startup_beratung",
                  });
                  handleCTAClick("contact_form", pkg.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    sendGoogleEvent("package_click", {
                      package: pkg.id,
                      location: "landing_page",
                      service: "startup_beratung",
                    });
                    handleCTAClick("contact_form", pkg.id);
                  }
                }}
                transition={{
                  duration: ANIMATION.duration,
                  delay: index * STAGGER.item,
                  ease: ANIMATION.ease,
                }}
                whileHover={{
                  y: -12,
                  scale:
                    pkg.id === "beratung"
                      ? BERATUNG_SCALE * 1.03
                      : STANDARD_CARDS_SCALE * 1.03,
                  transition: {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`relative overflow-visible border-2 bg-card flex flex-col min-h-[520px] transition-all duration-300 ${
                    pkg.badge === "beliebt"
                      ? "border-primary/50 shadow-lg"
                      : "border-border hover:border-primary/30"
                  } group-hover:border-primary/60 group-hover:shadow-2xl group-hover:shadow-primary/25 group-hover:ring-2 group-hover:ring-primary/30`}
                >
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
                    <div className="absolute top-3 right-3 z-10">
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
                  {pkg.image ? (
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
                  ) : pkg.icon && PACKAGE_ICONS[pkg.icon] ? (
                    <div className="flex min-h-[220px] items-center justify-center bg-muted/30">
                      <div className="flex h-[220px] w-[220px] items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[0_2px_12px_rgba(26,181,189,0.15)]">
                        {(() => {
                          const IconComponent = PACKAGE_ICONS[pkg.icon!];
                          return <IconComponent className="h-28 w-28" />;
                        })()}
                      </div>
                    </div>
                  ) : null}
                  <CardHeader className="text-center pb-3 pt-6">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {pkg.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {pkg.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      {pkg.priceFrom > 0 ? (
                        <>
                          <div className="text-2xl font-bold text-primary">
                            €{pkg.priceFrom.toLocaleString("de-DE")}
                            {pkg.priceTo
                              ? `–${pkg.priceTo.toLocaleString("de-DE")}`
                              : pkg.priceUnit ?? ""}
                          </div>
                          {pkg.priceNote && (
                            <span className="text-sm text-muted-foreground">
                              {pkg.priceNote}
                            </span>
                          )}
                        </>
                      ) : (
                        <div className="text-2xl font-bold text-primary">
                          Individuell
                        </div>
                      )}
                    </div>
                    {pkg.deliveryWeeks && (
                      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Lieferzeit: {pkg.deliveryWeeks}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col pt-0">
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
                    <Button className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground pointer-events-none">
                      {pkg.ctaText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ablauf */}
        <motion.div
          ref={ablaufRef}
          id="ablauf"
          className="w-full max-w-6xl space-y-8 scroll-mt-20"
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={ablaufInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: ANIMATION.duration,
              delay: STAGGER.header,
              ease: ANIMATION.ease,
            }}
          >
            <Badge variant="secondary" className="text-sm">
              So läuft die Beratung
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              So arbeiten wir zusammen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Idee angeben, Termin buchen – ich bereite mich vor. Dann 1h
              Gespräch und ein schriftlicher Plan inkl. Kostenschätzung.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {[
              {
                icon: Lightbulb,
                step: "1",
                title: "Idee angeben & Termin buchen",
                desc: "Sie beschreiben Ihre Idee im Formular – ich lese mich ein und bereite mich auf das Gespräch vor. So nutzen wir die Stunde optimal.",
              },
              {
                icon: MessageCircle,
                step: "2",
                title: "1h Gespräch",
                desc: "Wir sprechen eine Stunde über die technische Umsetzung Ihrer Idee: Was ist sinnvoll, was ist machbar, welche Schritte kommen zuerst.",
              },
              {
                icon: FileText,
                step: "3",
                title: "Schriftlicher Plan",
                desc: "Nach dem Gespräch erhalten Sie einen Umsetzungsplan inkl. Kostenschätzung. Der nächste Schritt kann dann die MVP-Entwicklung sein.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={CARD_VIEWPORT}
                  transition={{
                    duration: ANIMATION.duration,
                    delay: index * STAGGER.item,
                    ease: ANIMATION.ease,
                  }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="flex h-full"
                >
                  <Card className="relative h-full w-full p-6 bg-card border-border text-center flex flex-col items-center">
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0 mt-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2 text-foreground">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground flex-1 min-h-0">
                      {item.desc}
                    </CardDescription>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Warum Startup-Beratung? */}
        <motion.div ref={warumRef} className="w-full max-w-6xl space-y-8">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={warumInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: ANIMATION.duration,
              delay: STAGGER.header,
              ease: ANIMATION.ease,
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Warum Startup-Beratung bei mir?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ich bereite mich auf Ihre Idee vor und konzentriere die Stunde auf
              Technik und Umsetzung – kein generisches Gespräch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {[
              {
                icon: Lightbulb,
                title: "Vorbereitung auf Ihre Idee",
                desc: "Sie geben die Idee vorab an – ich lese mich ein. In der Stunde geht es direkt in die Tiefe.",
              },
              {
                icon: Target,
                title: "Fokus auf Technik & Umsetzung",
                desc: "Eine Stunde nur für Ihre Idee: Was ist technisch nötig, welche Reihenfolge, was kostet es.",
              },
              {
                icon: FileText,
                title: "Schriftlicher Plan",
                desc: "Nach dem Gespräch erhalten Sie einen Umsetzungsplan mit Kostenschätzung als Entscheidungsgrundlage.",
              },
              {
                icon: Zap,
                title: "Klare Kostenschätzung",
                desc: `Über ${getYearsOfExperience()} Jahre Erfahrung in der Umsetzung – realistische Schätzungen, keine leeren Versprechen.`,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="flex h-full"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={CARD_VIEWPORT}
                  transition={{
                    duration: ANIMATION.duration,
                    delay: index * STAGGER.item,
                    ease: ANIMATION.ease,
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card className="flex flex-col flex-1 w-full text-center p-6 bg-card border-border">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg mb-2 text-foreground">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground flex-1 min-h-0">
                      {item.desc}
                    </CardDescription>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <StartupBeratungTerminForm
          selectedProductId={selectedProductId}
          onProductAcknowledged={() => setSelectedProductId(null)}
        />

        <motion.div ref={faqRef} id="faq" className="w-full scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: ANIMATION.duration,
              delay: STAGGER.header,
              ease: ANIMATION.ease,
            }}
          >
            <StartupBeratungFAQ />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={CARD_VIEWPORT}
          transition={{
            duration: ANIMATION.duration,
            delay: 0,
            ease: ANIMATION.ease,
          }}
          className="w-full flex justify-center pb-16 md:pb-24"
        >
          <StartupBeratungFinalCTA
            onTerminClick={() => handleCTAClick("contact_form")}
          />
        </motion.div>
      </div>
    </div>
  );
}
