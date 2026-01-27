"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaFilePdf, FaJava, FaMapPin } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import {
  SiAngular,
  SiFlutter,
  SiKotlin,
  SiNextdotjs,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import MyAvatar from "../../assets/me-laptop.webp";

const HomeHero: React.FC = () => {
  const t = useTranslations("Home.Hero");

  // Tech Stack Icons mit Labels
  const techStack = [
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { icon: SiAngular, name: "Angular", color: "text-red-600" },
    { icon: SiReact, name: "React", color: "text-blue-500" },
    { icon: SiSpringboot, name: "Spring Boot", color: "text-green-600" },
    { icon: FaJava, name: "Java", color: "text-orange-600" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-600" },
    { icon: SiFlutter, name: "Flutter", color: "text-blue-400" },
    { icon: SiKotlin, name: "Kotlin", color: "text-purple-600" },
  ];

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="pt-16 min-h-[100svh] flex w-full items-center justify-center overflow-hidden"
      id="home"
    >
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center md:justify-between py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10 gap-6 md:gap-8 lg:gap-12 max-w-full">
        {/* Left side with orbs */}
        {/* <TechStackOrbs isMobile={isMobile} hasScrolled={hasScrolled} /> */}

        {/* Center content */}
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left p-4 sm:p-6 md:p-10 text-foreground animate-slideIn w-full md:w-1/2 max-w-lg lg:max-w-md xl:max-w-xl">
          {/* Intro text */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2 font-medium">
            {t("introText")}
          </p>

          {/* Main title - SEO optimiert */}
          <h1 className="mb-2 text-3xl sm:text-4xl font-extrabold leading-tight md:text-6xl xl:text-7xl text-foreground">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl text-muted-foreground font-light italic">
            {t("subtitle")}
          </h2>

          {/* Description */}
          <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-md">
            {t("description")}
          </p>

          {/* Tech Stack – dunkle Badges mit Border */}
          <div className="mb-4 sm:mb-6 w-full">
            <div className="border-t border-border pt-4 sm:pt-6 pb-3 sm:pb-4">
              <p className="text-xs md:text-sm text-muted-foreground mb-3 sm:mb-4 font-semibold uppercase tracking-wide">
                {t("technologiesTitle")}
              </p>
              <div className="flex flex-wrap justify-start gap-2 max-w-[600px]">
                {techStack.map((tech) => {
                  const TechIcon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1 sm:gap-2 bg-muted hover:bg-muted/80 border border-border rounded-full px-2 sm:px-3 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md"
                      title={`Erfahren in der Entwicklung mit ${tech.name}`}
                      aria-label={`Technologie: ${tech.name} - Klicken für mehr Details`}
                    >
                      <TechIcon
                        className={`text-lg sm:text-xl ${tech.color}`}
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm font-medium text-foreground">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTAs direkt nach Tech Stack - Mobile optimiert */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-6">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg shadow-lg hover:opacity-90 hover:shadow-xl transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg h-10 sm:h-12"
              aria-label={t("projectStartAriaLabel")}
            >
              <FaMessage className="text-lg sm:text-xl" aria-hidden="true" />
              {t("projectStartButton")}
            </Link>
            <Link
              href="/documents"
              className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-border text-foreground rounded-lg hover:bg-muted transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg h-10 sm:h-12"
              aria-label={t("cvAriaLabel")}
            >
              <FaFilePdf className="text-lg sm:text-xl" aria-hidden="true" />
              {t("cvButton")}
            </Link>
          </div>

          {/* Micro-Copy */}
          <small className="text-xs text-muted-foreground mb-3 sm:mb-4 text-center md:text-left">
            {t("microCopy")}
          </small>

          {/* Dunkle Trennlinie */}
          <hr className="w-16 sm:w-20 border-border my-3 sm:my-4" />

          {/* Location */}
          <div className="flex items-center justify-center md:justify-start text-muted-foreground">
            <FaMapPin className="mr-2 text-sm shrink-0" aria-hidden="true" />
            <a
              className="hover:text-foreground transition-colors text-sm"
              target="_blank"
              href="https://maps.app.goo.gl/uyiFNiF11si4jY4v6"
              aria-label={t("locationAriaLabel")}
            >
              {t("location")}
            </a>
          </div>
        </div>

        {/* Right side - Avatar mit Türkis–dunkelblau-Gradient (wie Referenz), ohne Text */}
        <div className="flex justify-center md:justify-end p-3 sm:p-4 md:p-6 w-full md:w-1/2 mt-4 sm:mt-6 md:-ml-4">
          <div className="relative group">
            {/* Großer heller Türkis-Glow hinter dem Bild */}
            <div
              className="absolute -inset-8 sm:-inset-12 md:-inset-16 rounded-[2rem] bg-turquoise-400/25 blur-3xl -z-40 group-hover:bg-turquoise-400/35 transition-all duration-300"
              aria-hidden
            />
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-turquoise-500/15 blur-2xl -z-[35]"
              aria-hidden
            />
            {/* Dunkle Basisfläche – Bühne hinter dem Bild */}
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-muted border border-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] -z-30"
              aria-hidden
            />
            {/* Gradient-Hintergrund: Türkis oben → dunkles Blau unten, Vignette (globale Klasse) */}
            <div
              className="absolute -inset-2 rounded-2xl hero-portrait-bg -z-25"
              aria-hidden
            />
            {/* Dunkler innerer Schatten-Rand */}
            <div
              className="absolute -inset-1 sm:-inset-1 rounded-2xl ring-2 ring-black/25 ring-inset -z-20"
              aria-hidden
            />
            <Image
              src={MyAvatar}
              className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 3xl:w-[28rem] 3xl:h-[28rem] md:max-h-[85vh] md:min-w-[320px] rounded-2xl object-cover cursor-pointer shadow-[0_0_40px_rgba(26,181,189,0.25),0_0_80px_rgba(0,176,176,0.15),0_20px_40px_rgba(0,0,0,0.4)] animate-fadeIn animate-zoomIn transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_rgba(26,181,189,0.35),0_0_100px_rgba(0,176,176,0.2),0_30px_60px_rgba(0,0,0,0.5)]"
              alt={t("avatarAlt")}
              width={600}
              height={600}
              title={t("avatarTitle")}
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
