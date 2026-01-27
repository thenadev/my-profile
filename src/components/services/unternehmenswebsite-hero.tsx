"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";

// Number Counter Hook
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
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
    }
  }, [isInView, end, duration, start, isVisible]);

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

  // Number counters
  const projectsCount = useCountUp(50, 2000);
  const weeksCount = useCountUp(4, 1500);
  const satisfactionCount = useCountUp(100, 2000);
  
  // Scroll progress
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Refs für Scroll-Animationen
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);
  const trustBadgesRef = useRef(null);
  const statsRef = useRef(null);

  // Viewport-Margins für Animation-Trigger
  const badgeInView = useInView(badgeRef, { once: true, margin: "-20px" });
  const headlineInView = useInView(headlineRef, { once: true, margin: "-50px" });
  const subtitleInView = useInView(subtitleRef, { once: true, margin: "-50px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });
  const trustBadgesInView = useInView(trustBadgesRef, { once: true, margin: "-50px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

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
      className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center bg-turquoise-800 overflow-hidden"
    >
      {/* Subtiler Hintergrund */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-turquoise-700/30 via-turquoise-800/20 to-turquoise-900/30"></div>
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turquoise-700/80 text-white text-sm font-semibold border border-turquoise-600/50 shadow-sm cursor-default backdrop-blur-sm"
            >
              <span>📍</span>
              <span>Ihr lokaler Webdesigner aus Wetzlar</span>
                  <span className="text-turquoise-300">•</span>
              <span className="text-xs">Gießen • Frankfurt • Mittelhessen</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              ref={headlineRef}
              initial={{ opacity: 0, y: 40 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={headlineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-white block"
              >
                Ihre Website bringt keine Kunden?
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={headlineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-r from-turquoise-500 via-turquoise-600 to-turquoise-500 bg-clip-text text-transparent block mt-2"
              >
                Wir erstellen Websites, die konvertieren
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              ref={subtitleRef}
              initial={{ opacity: 0, y: 25 }}
              animate={subtitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base md:text-lg lg:text-xl text-gray-200 font-medium leading-relaxed">
                Als Webdesigner aus Wetzlar entwickle ich maßgeschneiderte Unternehmenswebsites, die nicht nur gut aussehen, sondern auch neue Kunden bringen.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.96 }}
                initial={{ scale: 0.9 }}
                animate={ctaInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                  onClick={() => handleCTAClick("contact_form")}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative z-10">Kostenlose Erstberatung vereinbaren</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
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
                  animate={trustBadgesInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.08, y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-md border border-white/20 hover:border-turquoise-400 hover:bg-turquoise-700/30 transition-all cursor-default"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.6 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm font-semibold text-white">{badge}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Social Proof - Zahlen */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-3 md:gap-4 pt-4 max-w-xl mx-auto lg:mx-0 relative z-10"
            >
              <motion.div
                ref={projectsCount.ref}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center lg:text-left cursor-default bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20"
              >
                <motion.div
                  key={projectsCount.count}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-turquoise-300"
                >
                  {projectsCount.count}+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                  className="text-[10px] md:text-xs text-gray-200 mt-1 font-medium"
                >
                  Erfolgreiche Projekte
                </motion.div>
              </motion.div>
              <motion.div
                ref={weeksCount.ref}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center lg:text-left cursor-default bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20"
              >
                <motion.div
                  key={weeksCount.count}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-turquoise-400"
                >
                  {weeksCount.count === 4 ? "2-4" : weeksCount.count}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.3 }}
                  className="text-[10px] md:text-xs text-gray-200 mt-1 font-medium"
                >
                  Wochen Umsetzung
                </motion.div>
              </motion.div>
              <motion.div
                ref={satisfactionCount.ref}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center lg:text-left cursor-default bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20"
              >
                <motion.div
                  key={satisfactionCount.count}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-green-600"
                >
                  {satisfactionCount.count}%
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.4 }}
                  className="text-[10px] md:text-xs text-gray-200 mt-1 font-medium"
                >
                  Zufriedene Kunden
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Bild und Benefits */}
          <motion.div
            className="flex flex-col justify-center items-center lg:items-end relative order-first lg:order-last lg:pl-8 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Organische Blobs im Hintergrund */}
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.25, 0.32, 0.25],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-[650px] h-[650px] md:w-[750px] md:h-[750px] lg:w-[850px] lg:h-[850px] bg-gradient-to-br from-turquoise-600/40 via-turquoise-500/35 to-turquoise-700/40 blur-3xl transform rotate-[-6deg] z-[1]"
              style={{ borderRadius: '140px 90px 150px 100px' }}
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.28, 0.35, 0.28],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] bg-gradient-to-br from-turquoise-500/45 via-turquoise-400/40 to-turquoise-600/45 blur-2xl transform rotate-[5deg] z-[1]"
              style={{ borderRadius: '130px 80px 140px 90px' }}
            ></motion.div>
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-[550px] h-[550px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] bg-gradient-to-br from-turquoise-400/50 via-turquoise-300/45 to-turquoise-500/50 blur-xl transform rotate-[-4deg] z-[1]"
              style={{ borderRadius: '120px 70px 130px 80px' }}
            ></div>
            
            {/* Dunkelblauer Akzent */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.2, 0.28, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-turquoise-600/30 to-turquoise-800/25 rounded-[70px 50px 90px 60px] blur-2xl transform rotate-[10deg] z-[1]"
            ></motion.div>

            {/* Container für Bild und Benefits */}
            <div className="relative w-full lg:w-auto flex flex-col items-center justify-center">
              {/* Bild - Über dem Benefits-Container */}
              <motion.div
                className="relative z-50 mb-[-20px] md:mb-[-100px] lg:mb-[-130px] w-full max-w-[280px] md:max-w-[360px] lg:max-w-[440px] flex items-center justify-center pointer-events-none"
                style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 280, damping: 22 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.06, y: -10 }}
                  transition={{ type: "spring", stiffness: 380, damping: 16 }}
                >
                  <Image
                    src="/me_no_background.webp"
                    alt="Thomas Schwabauer - Webdesigner aus Wetzlar"
                    width={500}
                    height={700}
                    className="w-full h-auto object-contain"
                    priority
                    style={{ 
                      filter: 'drop-shadow(0 30px 60px -15px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 20px -5px rgba(0, 0, 0, 0.15))',
                    }}
                  />
                  
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
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-turquoise-500/40 via-turquoise-400/35 to-turquoise-600/40 rounded-full blur-3xl scale-130"
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
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-turquoise-400/30 via-turquoise-500/35 to-turquoise-400/30 rounded-full blur-2xl scale-110"
                  ></motion.div>
                </motion.div>
              </motion.div>
              
              {/* Benefits Container */}
              <motion.div
                ref={benefitsRef}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={benefitsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative w-full lg:w-auto lg:min-w-[540px] z-30 pt-12 md:pt-28 lg:pt-36"
              >
                {/* Benefits Content - Glassmorphism */}
                <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-5 md:p-6 lg:p-7 border border-white/80 shadow-2xl cursor-default">
                  <p className="text-sm md:text-base font-bold text-gray-900 mb-4">
                    Was Sie von mir bekommen:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-left">
                    {[
                    { num: 1, bgColor: "bg-turquoise-100", hoverBg: "group-hover:bg-turquoise-200", textColor: "text-turquoise-600", title: "Persönliche Beratung", desc: "Vor Ort in Wetzlar oder online" },
                    { num: 2, bgColor: "bg-turquoise-100", hoverBg: "group-hover:bg-turquoise-200", textColor: "text-turquoise-600", title: "Maßgeschneidert", desc: "Auf Ihr Unternehmen zugeschnitten" },
                    { num: 3, bgColor: "bg-turquoise-100", hoverBg: "group-hover:bg-turquoise-200", textColor: "text-turquoise-600", title: "Schnelle Umsetzung", desc: "Ihre Website in 2-4 Wochen live" },
                    ].map((benefit, index) => (
                      <motion.div
                        key={benefit.num}
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={benefitsInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
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
                            animate={benefitsInView ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 0.5, delay: 0.9 + index * 0.15 }}
                          >
                            {benefit.num}
                          </motion.span>
                        </motion.div>
                        <div className="flex-1">
                          <motion.div
                            className="font-semibold text-gray-900 text-xs md:text-sm mb-0.5"
                            whileHover={{ color: benefit.textColor }}
                          >
                            {benefit.title}
                          </motion.div>
                          <div className="text-[10px] md:text-xs text-gray-600 leading-tight">{benefit.desc}</div>
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
