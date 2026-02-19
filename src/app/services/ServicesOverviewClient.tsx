"use client";

import ServicesOverviewHero from "@/components/services/services-overview-hero";
import ServicesOverviewQuickNav from "@/components/services/services-overview-quick-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Headphones,
  Layers,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { FaMobileAlt, FaRocket, FaGlobe } from "react-icons/fa";

const ANIMATION = { ease: [0.16, 1, 0.3, 1] as const, duration: 0.5 };

const SERVICES = [
  {
    id: "startup-beratung",
    href: "/services/startup-beratung",
    title: "Startup-Beratung",
    description:
      "Idee angeben, Termin buchen (80€/h) – 1h Gespräch, danach schriftlicher Umsetzungsplan inkl. Kostenschätzung. MVP und Feature-Erweiterung im Anschluss.",
    icon: FaRocket,
    badge: "Beratung & Umsetzung",
    features: ["80€/h Beratung", "Umsetzungsplan + Kostenschätzung", "MVP ab 2.500€"],
  },
  {
    id: "app-entwicklung",
    href: "/services/app-entwicklung",
    title: "App-Entwicklung",
    description:
      "Flutter-Apps für Android & iOS aus einer Codebasis. Beratungsgespräch, MVP-Umsetzung oder Feature- und Bug-Entwicklung für bestehende Apps.",
    icon: FaMobileAlt,
    badge: "Flutter · Android & iOS",
    features: ["Beratung 80€/h", "MVP mit Flutter", "Features & Bugs"],
  },
  {
    id: "unternehmenswebsite",
    href: "/services/unternehmenswebsite",
    title: "Unternehmenswebsite",
    description:
      "Professionelle Unternehmenswebsites aus Wetzlar – moderne, responsive und SEO-optimierte Webdesigns für Ihr Unternehmen.",
    icon: FaGlobe,
    badge: "Webdesign Wetzlar",
    features: ["Basic ab 1.200€", "Professional ab 3.500€", "E-Commerce ab 8.000€"],
  },
];

export default function ServicesOverviewClient() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  const warumRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const warumInView = useInView(warumRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  const WARUM_ITEMS = [
    {
      icon: Headphones,
      title: "Beratung vor Umsetzung",
      desc: "Idee besprechen, Plan erhalten – dann entscheiden Sie.",
    },
    {
      icon: Layers,
      title: "Eine Anlaufstelle",
      desc: "Idee, App und Website – aus einer Hand.",
    },
    {
      icon: MapPin,
      title: "Lokaler Ansprechpartner",
      desc: "Aus Wetzlar, für Mittelhessen und darüber hinaus.",
    },
    {
      icon: MessageCircle,
      title: "Persönliche Kommunikation",
      desc: "Direkter Draht ohne Agentur-Filter.",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background">
      <ServicesOverviewHero />
      <ServicesOverviewQuickNav />

      <motion.section
        id="services-grid"
        ref={sectionRef}
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 scroll-mt-20"
      >
        <motion.div
          className="text-center space-y-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
        >
          <Badge variant="secondary" className="text-sm">
            Angebote
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Meine Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der Startup-Idee über Apps bis zur Unternehmenswebsite – Beratung,
            MVP-Entwicklung und Erweiterung aus einer Hand.
          </p>
        </motion.div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: ANIMATION.duration,
                  delay: index * 0.1,
                  ease: ANIMATION.ease,
                }}
              >
                <Card className="h-full flex flex-col border-2 hover:border-primary/50 transition-colors overflow-hidden group">
                  <div className="h-1.5 w-full bg-primary shrink-0" />
                  <CardHeader>
                    <Badge variant="outline" className="w-fit text-xs">
                      {service.badge}
                    </Badge>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl md:text-2xl">
                        {service.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 flex-1">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant="default" className="w-full sm:w-auto mt-auto group-hover:bg-primary/90" asChild>
                      <Link href={service.href}>
                        Mehr erfahren
                        <ChevronRight className="ml-1 h-4 w-4 inline" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Warum ich? */}
      <motion.section
        ref={warumRef}
        id="warum"
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 scroll-mt-20"
      >
        <motion.div
          className="text-center space-y-4 mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={warumInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
        >
          <Badge variant="secondary" className="text-sm">
            Warum ich?
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Eine Anlaufstelle für Beratung, Apps und Web
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Persönlich, vor Ort und mit Fokus auf Ihre Ziele.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {WARUM_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={warumInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: ANIMATION.duration,
                  delay: index * 0.08,
                  ease: ANIMATION.ease,
                }}
              >
                <Card className="h-full border border-border hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        ref={ctaRef}
        className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-20 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
          className="w-full max-w-4xl mx-auto text-center space-y-6 bg-card backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Noch Fragen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gerne per Kontakt melden – ich antworte zeitnah.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3" asChild>
              <Link href="/contact">
                Kontakt aufnehmen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
