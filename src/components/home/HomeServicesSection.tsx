"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FaMobileAlt, FaRocket, FaGlobe } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

const ANIMATION = { ease: [0.16, 1, 0.3, 1] as const, duration: 0.5 };

const SERVICES = [
  {
    href: "/services/startup-beratung",
    title: "Startup-Beratung",
    description:
      "Termin buchen (80€/h), Idee angeben – 1h Gespräch, danach schriftlicher Umsetzungsplan inkl. Kostenschätzung. MVP & Feature-Erweiterung.",
    icon: FaRocket,
  },
  {
    href: "/services/app-entwicklung",
    title: "App-Entwicklung",
    description:
      "Flutter-Apps für Android & iOS. Beratung, MVP-Umsetzung oder Feature- und Bug-Entwicklung für bestehende Apps.",
    icon: FaMobileAlt,
  },
  {
    href: "/services/unternehmenswebsite",
    title: "Unternehmenswebsite",
    description:
      "Professionelle Websites aus Wetzlar – modern, responsive und SEO-optimiert. Von Basic bis E-Commerce.",
    icon: FaGlobe,
  },
];

export default function HomeServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full py-16 md:py-24 px-4 md:px-8 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center space-y-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
        >
          <p className="text-sm font-medium text-primary">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Was ich für Sie tun kann
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Beratung, MVP-Entwicklung und Umsetzung – von der Idee bis zur
            fertigen App oder Website.
          </p>
        </motion.div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 24 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: ANIMATION.duration,
                  delay: index * 0.08,
                  ease: ANIMATION.ease,
                }}
              >
                <Link
                  href={service.href}
                  className="block h-full rounded-xl border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Mehr erfahren
                    <ChevronRight className="ml-0.5 h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : {}}
          transition={{ duration: ANIMATION.duration, delay: 0.3 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Alle Services anzeigen
            <ChevronRight className="ml-0.5 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
