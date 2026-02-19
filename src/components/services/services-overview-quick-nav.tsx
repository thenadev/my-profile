"use client";

import { Badge } from "@/components/ui/badge";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { motion, useInView } from "framer-motion";
import { ArrowRight, LayoutGrid, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const QUICK_NAV_ITEMS = [
  {
    type: "scroll" as const,
    id: "services-grid",
    label: "Angebote",
    description: "Alle Services im Überblick",
    icon: LayoutGrid,
  },
  {
    type: "link" as const,
    href: "/about",
    label: "Über mich",
    description: "Mehr zu meiner Person und Erfahrung",
    icon: User,
  },
  {
    type: "link" as const,
    href: "/contact",
    label: "Kontakt",
    description: "Kontakt aufnehmen",
    icon: Mail,
  },
] as const;

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const ANIMATION = {
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.5,
};
const STAGGER = { header: 0, start: 0.2, item: 0.12 } as const;

const cardClassName =
  "group flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl bg-background border border-border hover:border-[var(--hero-portrait-bg-mid)] hover:shadow-md active:scale-[0.99] transition-all text-left focus:outline-none focus:ring-2 focus:ring-[var(--hero-portrait-bg-mid)] focus:ring-offset-2 min-h-[72px] md:min-h-0";

export default function ServicesOverviewQuickNav() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  const handleScrollClick = (sectionId: string, label: string) => {
    sendGoogleEvent("quick_nav_click", {
      section: sectionId,
      label,
      service: "services_overview",
    });
    scrollToSection(sectionId);
  };

  const handleLinkClick = (label: string, href: string) => {
    sendGoogleEvent("quick_nav_click", {
      section: href,
      label,
      service: "services_overview",
    });
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full border-y border-border bg-gradient-to-b from-primary/10 via-primary/5 to-transparent"
      aria-label="Schnellnavigation"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <motion.div
          ref={headerRef}
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: ANIMATION.duration,
            delay: STAGGER.header,
            ease: ANIMATION.ease,
          }}
        >
          <Badge variant="secondary" className="mb-3 text-xs font-medium">
            Schnellnavigation
          </Badge>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Wohin möchten Sie?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Springen Sie zu den Angeboten oder zu Über mich und Kontakt.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {QUICK_NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[var(--hero-portrait-bg-bright)]/15 flex items-center justify-center text-[var(--hero-portrait-bg-mid)] group-hover:bg-[var(--hero-portrait-bg-bright)]/25 transition-colors">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-foreground text-sm md:text-base group-hover:text-[var(--hero-portrait-bg-mid)] transition-colors">
                    {item.label}
                  </span>
                  <span className="block text-xs md:text-sm text-muted-foreground mt-0.5 line-clamp-2">
                    {item.description}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-muted-foreground group-hover:text-[var(--hero-portrait-bg-mid)] group-hover:translate-x-0.5 transition-all" />
              </>
            );
            if (item.type === "scroll") {
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleScrollClick(item.id, item.label)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: ANIMATION.duration,
                    delay: STAGGER.start + index * STAGGER.item,
                    ease: ANIMATION.ease,
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className={cardClassName}
                  aria-label={`Zu ${item.label} springen`}
                >
                  {content}
                </motion.button>
              );
            }
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: ANIMATION.duration,
                  delay: STAGGER.start + index * STAGGER.item,
                  ease: ANIMATION.ease,
                }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  onClick={() => handleLinkClick(item.label, item.href)}
                  className={cardClassName}
                  aria-label={`Zu ${item.label}`}
                >
                  {content}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
