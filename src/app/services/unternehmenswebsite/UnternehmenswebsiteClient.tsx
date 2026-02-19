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
  CircleCheck,
  Clock,
  ImageIcon,
  Layout,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const ANIMATION = {
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.5,
};
/** Verzögerung zwischen Elementen beim Einblenden (nach und nach sichtbar) */
const STAGGER = {
  header: 0,
  start: 0.2,
  item: 0.12,
} as const;

/** Viewport für Karten: Animation triggert, wenn die Karte selbst sichtbar wird */
const CARD_VIEWPORT = { once: true, margin: "-60px 0px -60px 0px" } as const;

/** Bildgröße für Package-Karten – große Icons (einheitlich mit Startup/App) */
const PACKAGE_IMAGE = {
  size: 220,
  sizes: "(max-width: 768px) 100vw, 33vw",
} as const;

/** Relaunch-Karte ist hervorgehoben und größer als die anderen */
const RELAUNCH_SCALE = 1.06;
/** Erste Website und Online-Shop – gleich groß, etwas kleiner als Relaunch */
const STANDARD_CARDS_SCALE = 0.94;

export default function UnternehmenswebsiteClient() {
  const router = useRouter();
  const zielgruppeRef = useRef(null);
  const paketeRef = useRef(null);
  const warumRef = useRef(null);
  const seoRef = useRef(null);
  const faqRef = useRef(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );
  const zielgruppeInView = useInView(zielgruppeRef, {
    once: true,
    margin: "-80px",
  });
  const paketeInView = useInView(paketeRef, { once: true, margin: "-80px" });
  const warumInView = useInView(warumRef, { once: true, margin: "-80px" });
  const seoInView = useInView(seoRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  const handleCTAClick = (ctaType: string, packageId?: string) => {
    if (packageId) setSelectedPackageId(packageId);
    sendGoogleEvent("cta_click", {
      cta_type: ctaType,
      location: "landing_page",
      service: "unternehmenswebsite",
      ...(packageId && { package: packageId }),
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
              Ich unterstütze Unternehmen, die online sichtbar werden wollen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ob ohne Website, mit veralteter Präsenz oder als Neugründer – ich
              baue maßgeschneiderte Websites für kleine Unternehmen und
              Selbstständige.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {TARGET_AUDIENCES.map((audience, index) => (
              <motion.div
                key={index}
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
                  {/* Bildbereich – feste Größe für einheitliche Cards */}
                  <div className="relative h-[200px] sm:h-[220px] flex-shrink-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-muted/20">
                    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                      <Image
                        src={audience.image}
                        alt={audience.title}
                        width={480}
                        height={480}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="max-h-[160px] sm:max-h-[180px] w-auto object-contain drop-shadow-[0_4px_24px_rgba(26,181,189,0.2)] group-hover:scale-105 group-hover:drop-shadow-[0_8px_40px_rgba(26,181,189,0.3)] transition-all duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-t-lg ring-1 ring-inset ring-white/5 pointer-events-none" />
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

        {/* Pakete – strukturiert nach Zielgruppe */}
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
              Webdesign-Pakete für Ihr Unternehmen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparente Preise, klare Leistungen – wählen Sie das Paket, das
              zu Ihrer Situation passt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
            {WEBSITE_PACKAGES.map((pkg, index) => (
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
                    pkg.id === "relaunch"
                      ? RELAUNCH_SCALE
                      : STANDARD_CARDS_SCALE,
                }}
                viewport={CARD_VIEWPORT}
                onClick={() => {
                  sendGoogleEvent("package_click", {
                    package: pkg.id,
                    location: "landing_page",
                  });
                  handleCTAClick("contact_form", pkg.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    sendGoogleEvent("package_click", {
                      package: pkg.id,
                      location: "landing_page",
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
                    pkg.id === "relaunch"
                      ? RELAUNCH_SCALE * 1.03
                      : STANDARD_CARDS_SCALE * 1.03,
                  transition: {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  key={pkg.id}
                  className={`relative overflow-visible border-2 bg-card flex flex-col min-h-[520px] transition-all duration-300 group/card ${
                    pkg.badge === "beliebt"
                      ? "border-primary/50 shadow-lg"
                      : "border-border hover:border-primary/30"
                  } group-hover:border-primary/60 group-hover:shadow-2xl group-hover:shadow-primary/25 group-hover:ring-2 group-hover:ring-primary/30`}
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
                    <Button className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground pointer-events-none">
                      {pkg.ctaText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
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
              Warum Webdesign aus Wetzlar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nahbar, unkompliziert und mit Fokus auf Ihr Ergebnis – so arbeite
              ich mit Ihnen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={CARD_VIEWPORT}
            transition={{
              duration: ANIMATION.duration,
              delay: 0,
              ease: ANIMATION.ease,
            }}
            className="relative w-full max-w-2xl mx-auto aspect-[16/10] rounded-xl overflow-hidden border border-border"
          >
            <Image
              src="/me_local.jpeg"
              alt="Thomas Schwabauer – Webdesigner aus Wetzlar"
              width={672}
              height={420}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {[
              {
                icon: Sparkles,
                title: "Wenig Aufwand – maximales Ergebnis",
                desc: "Sie liefern Stichpunkte, Logo und Bilder – ich übernehme Konzept, Design und Umsetzung. Hochwertiger Output ohne Projektchaos.",
              },
              {
                icon: Target,
                title: "Lokale Expertise",
                desc: `Aus Wetzlar, für Wetzlar – Sie haben einen Ansprechpartner, keinen anonymen Dienstleister. Über ${getYearsOfExperience()} Jahre Erfahrung in der Region.`,
              },
              {
                icon: Zap,
                title: "Schnelle Umsetzung",
                desc: "In 2–4 Wochen live – ohne dass Sie sich wochenlang kümmern müssen. Sie geben Feedback, den Rest erledige ich.",
              },
              {
                icon: RefreshCw,
                title: "Überarbeitung, bis es passt",
                desc: "Ich feile so lange am Ergebnis, bis es zu 100 % zu Ihnen passt. Kein Abnahme-Druck – Qualität, die überzeugt.",
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

        {/* So arbeiten wir zusammen */}
        <motion.div
          ref={seoRef}
          id="so-arbeiten-wir"
          className="w-full max-w-6xl space-y-8 scroll-mt-20"
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={seoInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: ANIMATION.duration,
              delay: STAGGER.header,
              ease: ANIMATION.ease,
            }}
          >
            <Badge variant="secondary" className="text-sm">
              Ihr Weg zur Website
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              So arbeiten wir zusammen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kein langes Briefing, keine endlosen Abstimmungen – ein klares
              Vorgehen mit direktem Draht zu Ihnen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {[
              {
                icon: MessageCircle,
                step: "1",
                title: "Kurzes Gespräch",
                desc: "Sie sagen mir, was Sie brauchen – ich stelle die richtigen Fragen. Kein Formular-Marathon, ein lockeres Kennenlernen.",
              },
              {
                icon: Layout,
                step: "2",
                title: "Ich konzipiere & gestalte",
                desc: "Sie liefern Logo, Texte oder Stichpunkte – ich übernehme Konzept, Design und Umsetzung. Sie müssen kaum eingreifen.",
              },
              {
                icon: CircleCheck,
                step: "3",
                title: "Feinschliff gemeinsam",
                desc: "Sie geben Feedback, ich überarbeite – so lange, bis alles zu 100 % passt. Dann geht Ihre Website live.",
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

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={CARD_VIEWPORT}
          transition={{
            duration: ANIMATION.duration,
            delay: 0,
            ease: ANIMATION.ease,
          }}
          className="w-full"
        >
          <UnternehmenswebsiteSocialProof />
        </motion.div>

        {/* Portfolio Section */}
        <motion.div
          id="portfolio"
          className="w-full scroll-mt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={CARD_VIEWPORT}
          transition={{
            duration: ANIMATION.duration,
            delay: STAGGER.item,
            ease: ANIMATION.ease,
          }}
        >
          <UnternehmenswebsitePortfolio />
        </motion.div>

        {/* Kontaktformular Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={CARD_VIEWPORT}
          transition={{
            duration: ANIMATION.duration,
            delay: 0,
            ease: ANIMATION.ease,
          }}
          className="w-full"
        >
          <UnternehmenswebsiteContactForm
            selectedPackageId={selectedPackageId}
            onPackageAcknowledged={() => setSelectedPackageId(null)}
          />
        </motion.div>

        {/* FAQ Section – unter Contact */}
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
            <UnternehmenswebsiteFAQ />
          </motion.div>
        </motion.div>

        {/* Final CTA Section */}
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
          <UnternehmenswebsiteFinalCTA
            onContactClick={() => handleCTAClick("contact_form")}
          />
        </motion.div>
      </div>
    </div>
  );
}
