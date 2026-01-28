"use client";

import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, FileCode2, Star, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Number Counter Hook (startOnMount: true = Animation startet beim Laden, ohne Scroll – z. B. für Hero oben)
function useCountUp(
  end: number,
  duration: number = 2000,
  start: number = 0,
  startOnMount: boolean = false,
) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Hero oben: Animation nach kurzer Verzögerung ohne Scroll starten
  useEffect(() => {
    if (!startOnMount) return;
    const id = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(id);
  }, [startOnMount]);

  useEffect(() => {
    const shouldStart = (isInView && !isVisible) || (startOnMount && isVisible);
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;
    if (!startOnMount) setIsVisible(true);
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, isVisible, startOnMount, end, duration, start]);

  return { count, ref };
}

export default function UnternehmenswebsiteHero() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax für Bild
  const imageY = useTransform(scrollYProgress, [0, 0.7], ["0%", "25%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const imageScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.96]);

  // Number counters (startOnMount: true, da Hero oben – Animation ohne Scroll)
  const projectsCount = useCountUp(50, 2000, 0, true);
  const weeksCount = useCountUp(4, 1500, 0, true);
  const satisfactionCount = useCountUp(100, 2000, 0, true);

  // Scroll progress
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Refs für Scroll-Animationen
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);
  const trustBadgesRef = useRef(null);
  const portraitCardsRef = useRef(null);

  // Viewport-Margins für Animation-Trigger
  const badgeInView = useInView(badgeRef, { once: true, margin: "-20px" });
  const headlineInView = useInView(headlineRef, {
    once: true,
    margin: "-50px",
  });
  const subtitleInView = useInView(subtitleRef, {
    once: true,
    margin: "-50px",
  });
  const benefitsInView = useInView(benefitsRef, {
    once: true,
    margin: "-50px",
  });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });
  const trustBadgesInView = useInView(trustBadgesRef, {
    once: true,
    margin: "-50px",
  });
  const portraitCardsInView = useInView(portraitCardsRef, {
    once: true,
    margin: "-80px",
  });

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
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity }}
      className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center bg-background overflow-hidden"
    >
      {/* Subtiler Hintergrund */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hero-portrait-bg-mid)]/30 via-[var(--hero-portrait-bg-dark)]/20 to-[var(--hero-portrait-bg-dark)]/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-5 md:space-y-6">
            {/* Badge */}
            <motion.div
              ref={badgeRef}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={badgeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-foreground text-sm font-semibold border border-border shadow-sm cursor-default backdrop-blur-sm"
            >
              <span>📍</span>
              <span>Ihr lokaler Webdesigner aus Wetzlar</span>
              <span className="text-primary">•</span>
              <span className="text-xs">Gießen • Frankfurt • Mittelhessen</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              ref={headlineRef}
              initial={{ opacity: 0, y: 40 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={headlineInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-foreground block"
              >
                Ihre Website bringt keine Kunden?
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={headlineInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] via-[var(--hero-portrait-bg-mid)] to-[var(--hero-portrait-bg-bright)] bg-clip-text text-transparent block mt-2"
              >
                Wir erstellen Websites, die konvertieren
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              ref={subtitleRef}
              initial={{ opacity: 0, y: 25 }}
              animate={subtitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-medium leading-relaxed">
                Als Webdesigner aus Wetzlar entwickle ich maßgeschneiderte
                Unternehmenswebsites, die nicht nur gut aussehen, sondern auch
                neue Kunden bringen.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.96 }}
                initial={{ scale: 0.9 }}
                animate={ctaInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] to-[var(--hero-portrait-bg-mid)] hover:opacity-90 text-primary-foreground px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                  onClick={() => handleCTAClick("contact_form")}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <span className="relative z-10">
                    Kostenlose Erstberatung vereinbaren
                  </span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              ref={trustBadgesRef}
              initial={{ opacity: 0, y: 20 }}
              animate={trustBadgesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3 md:gap-4 pt-3"
            >
              {[
                "Kostenlose Erstberatung vor Ort",
                "Unverbindliches Angebot",
                "5+ Jahre Erfahrung in Wetzlar",
              ].map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={
                    trustBadgesInView ? { opacity: 1, scale: 1, y: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  className="flex items-center gap-2 bg-muted/80 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-md border border-border hover:border-primary hover:bg-primary/20 transition-all cursor-default"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.6,
                    }}
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm font-semibold text-foreground">
                    {badge}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Bild und Benefits */}
          <motion.div
            className="flex flex-col justify-center items-center lg:items-end relative order-first lg:order-last lg:pl-8 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hintergrund-Schichtung wie Zielbild: kleinerer dunkler Blob unten links, großer Türkis-Blob zentral dahinter */}
            {/* 1) Kleinere, horizontal gestreckte dunkle Blob-Schicht (Navy/Charcoal) – unten links, darunter */}
            <div
              className="absolute bottom-0 left-0 w-[280px] h-[160px] md:w-[380px] md:h-[200px] lg:w-[420px] lg:h-[240px] z-[1] opacity-90"
              aria-hidden
            >
              <div
                className="absolute inset-0 rounded-[80px_60px_120px_40px] bg-[var(--hero-portrait-bg-dark)] blur-2xl scale-110"
                style={{ transformOrigin: "bottom left" }}
              />
            </div>
            {/* 2) Große organische Türkis-Blob zentral hinter dem Portrait – weiche Kanten, horizontal ausgedehnter */}
            <motion.div
              animate={{ opacity: [0.88, 0.98, 0.88] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-[620px] h-[440px] md:w-[760px] md:h-[520px] lg:w-[820px] lg:h-[560px] z-[2]"
              style={{ borderRadius: "55% 45% 50% 50%" }}
              aria-hidden
            >
              <div className="absolute inset-0 bg-[var(--hero-portrait-bg-bright)]/75 blur-3xl" />
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--hero-portrait-bg-bright)]/55 via-[var(--hero-portrait-bg-mid)]/45 to-transparent opacity-90"
                style={{ borderRadius: "inherit" }}
              />
            </motion.div>

            {/* Eckige polygonale Akzente (Zielbild: scharfe Kanten, dunkelgrau) – über Blobs */}
            <div
              className="absolute top-4 right-8 w-3 h-3 md:w-4 md:h-4 rotate-45 bg-[var(--hero-portrait-bg-dark)]/65 z-[50] pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute top-16 right-4 w-2 h-2 md:w-3 md:h-3 rotate-[30deg] bg-[var(--hero-portrait-bg-dark)]/55 z-[3] pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute bottom-24 right-6 w-3 h-3 md:w-4 md:h-4 rotate-12 bg-[var(--hero-portrait-bg-dark)]/60 z-[3] pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute bottom-12 right-20 w-2 h-2 rotate-[60deg] bg-[var(--hero-portrait-bg-dark)]/50 z-[3] pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute top-8 left-4 lg:left-8 w-2 h-2 md:w-3 md:h-3 rotate-[15deg] bg-[var(--hero-portrait-bg-dark)]/55 z-[3] pointer-events-none"
              aria-hidden
            />

            {/* Container für Bild und Benefits (über Punkten, Bild hinter Text) */}
            <div className="relative z-10 w-full lg:w-auto flex flex-col items-center justify-center">
              {/* Bild + schwebende Info-Karten (Referenz-Design in Website-Farben) */}
              <div
                ref={portraitCardsRef}
                className="relative z-[5] mb-[-20px] md:mb-[-100px] lg:mb-[-130px] w-full max-w-[280px] md:max-w-[360px] lg:max-w-[440px] flex items-center justify-center mx-auto lg:mx-0"
              >
                <motion.div
                  className="relative w-full flex items-center justify-center pointer-events-none"
                  style={{
                    y: imageY,
                    opacity: imageOpacity,
                    scale: imageScale,
                  }}
                  initial={{ scale: 0.85, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.06, y: -10 }}
                    transition={{ type: "spring", stiffness: 380, damping: 16 }}
                  >
                    {/* Gradient-Hintergrund hinter dem Portrait (wie HomeHero / Referenz) */}
                    <div
                      className="absolute -inset-4 sm:-inset-6 rounded-3xl hero-portrait-bg -z-20 overflow-hidden"
                      aria-hidden
                    />
                    {/* Dot-Pattern zwischen Bild-Hintergrund und Bild */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
                      <div className="absolute top-0 right-0 w-1/2 h-1/2">
                        <DotPattern
                          className="text-white/45"
                          width={20}
                          height={20}
                          cr={1}
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
                        <DotPattern
                          className="text-white/45"
                          width={20}
                          height={20}
                          cr={1}
                        />
                      </div>
                    </div>
                    <div className="relative z-10">
                      <Image
                        src="/me_no_background.webp"
                        alt="Thomas Schwabauer - Webdesigner aus Wetzlar"
                        width={500}
                        height={700}
                        className="w-full h-auto object-contain"
                        priority
                        style={{
                          filter:
                            "drop-shadow(0 30px 60px -15px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 20px -5px rgba(0, 0, 0, 0.15))",
                        }}
                      />
                    </div>

                    {/* Glow-Effekt um das Bild - Verstärkt */}
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.25, 0.4, 0.25],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--hero-portrait-bg-bright)]/40 via-[var(--hero-portrait-bg-bright)]/35 to-[var(--hero-portrait-bg-mid)]/40 rounded-full blur-3xl scale-130"
                    ></motion.div>

                    {/* Zusätzlicher innerer Glow für mehr Tiefe */}
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.45, 0.3],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--hero-portrait-bg-bright)]/30 via-[var(--hero-portrait-bg-mid)]/35 to-[var(--hero-portrait-bg-bright)]/30 rounded-full blur-2xl scale-110"
                    ></motion.div>
                  </motion.div>
                </motion.div>

                {/* Drei schwebende Info-Karten (Zielbild: weiße Karten, weicher Schatten, Website-Farben für Icons) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={
                    portraitCardsInView ? { opacity: 1, scale: 1, x: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-auto"
                >
                  <div className="flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-3 py-2.5 sm:px-4 sm:py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <FileCode2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                        {projectsCount.count}+
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">
                        Projekte
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={
                    portraitCardsInView ? { opacity: 1, scale: 1, x: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-auto"
                >
                  <div className="flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-3 py-2.5 sm:px-4 sm:py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                        {satisfactionCount.count}%
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">
                        Zufriedenheit
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={
                    portraitCardsInView ? { opacity: 1, scale: 1, y: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-[60] pointer-events-auto"
                >
                  <div className="flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-3 py-2.5 sm:px-4 sm:py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">
                        Webdesigner
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">
                        5+ Jahre
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Benefits Container */}
              <motion.div
                ref={benefitsRef}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={benefitsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative w-full lg:w-auto lg:min-w-[540px] z-20 pt-12 md:pt-28 lg:pt-36"
              >
                {/* Benefits Content - Glassmorphism */}
                <div className="relative bg-card/95 backdrop-blur-md rounded-3xl p-5 md:p-6 lg:p-7 border border-border shadow-2xl cursor-default">
                  <p className="text-sm md:text-base font-bold text-foreground mb-4">
                    Was Sie von mir bekommen:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-left">
                    {[
                      {
                        num: 1,
                        bgColor: "bg-primary/20",
                        hoverBg: "group-hover:bg-primary/30",
                        textColor: "text-primary",
                        title: "Persönliche Beratung",
                        desc: "Vor Ort in Wetzlar oder online",
                      },
                      {
                        num: 2,
                        bgColor: "bg-primary/20",
                        hoverBg: "group-hover:bg-primary/30",
                        textColor: "text-primary",
                        title: "Maßgeschneidert",
                        desc: "Auf Ihr Unternehmen zugeschnitten",
                      },
                      {
                        num: 3,
                        bgColor: "bg-primary/20",
                        hoverBg: "group-hover:bg-primary/30",
                        textColor: "text-primary",
                        title: "Schnelle Umsetzung",
                        desc: "Ihre Website in 2-4 Wochen live",
                      },
                    ].map((benefit, index) => (
                      <motion.div
                        key={benefit.num}
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={
                          benefitsInView ? { opacity: 1, x: 0, scale: 1 } : {}
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.7 + index * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start gap-2 group cursor-default"
                        whileHover={{ x: 5, y: -2, scale: 1.03 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.25, rotate: 12 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-7 h-7 rounded-full ${benefit.bgColor} ${benefit.hoverBg} flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors shadow-md`}
                        >
                          <motion.span
                            className={`${benefit.textColor} font-bold text-sm`}
                            animate={
                              benefitsInView ? { scale: [1, 1.3, 1] } : {}
                            }
                            transition={{
                              duration: 0.5,
                              delay: 0.9 + index * 0.15,
                            }}
                          >
                            {benefit.num}
                          </motion.span>
                        </motion.div>
                        <div className="flex-1">
                          <motion.div
                            className="font-semibold text-foreground text-xs md:text-sm mb-0.5"
                            whileHover={{ color: benefit.textColor }}
                          >
                            {benefit.title}
                          </motion.div>
                          <div className="text-[10px] md:text-xs text-muted-foreground leading-tight">
                            {benefit.desc}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
