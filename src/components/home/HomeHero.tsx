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
    { icon: SiNextdotjs, name: "Next.js", color: "text-black" },
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
      className="pt-16 min-h-[100svh] max-w-7xl mx-auto flex items-center justify-center overflow-hidden"
      id="home"
    >
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center md:justify-between py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10 gap-6 md:gap-8 lg:gap-12 max-w-full">
        {/* Left side with orbs */}
        {/* <TechStackOrbs isMobile={isMobile} hasScrolled={hasScrolled} /> */}

        {/* Center content */}
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left p-4 sm:p-6 md:p-10 text-black animate-slideIn w-full md:w-1/2 max-w-lg lg:max-w-md xl:max-w-xl">
          {/* Intro text */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-2 font-medium">
            {t("introText")}
          </p>

          {/* Main title - SEO optimiert */}
          <h1 className="mb-2 text-3xl sm:text-4xl font-extrabold leading-tight md:text-6xl xl:text-7xl">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl text-gray-600 font-light italic">
            {t("subtitle")}
          </h2>

          {/* Description */}
          <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-md">
            {t("description")}
          </p>

          {/* Tech Stack mit visueller Verankerung */}
          <div className="mb-4 sm:mb-6 w-full">
            <div className="border-t border-gray-200 pt-4 sm:pt-6 pb-3 sm:pb-4">
              <p className="text-xs md:text-sm text-gray-500 mb-3 sm:mb-4 font-semibold uppercase tracking-wide">
                {t("technologiesTitle")}
              </p>
              <div className="flex flex-wrap justify-start gap-2 max-w-[600px]">
                {techStack.map((tech) => {
                  const TechIcon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 hover:shadow-md px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-105"
                      title={`Erfahren in der Entwicklung mit ${tech.name}`}
                      aria-label={`Technologie: ${tech.name} - Klicken für mehr Details`}
                    >
                      <TechIcon
                        className={`text-lg sm:text-xl ${tech.color}`}
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm font-medium text-gray-800">
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
              className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 hover:rotate-[0.5deg] font-semibold text-sm sm:text-base md:text-lg h-10 sm:h-12"
              aria-label={t("projectStartAriaLabel")}
            >
              <FaMessage className="text-lg sm:text-xl" aria-hidden="true" />
              {t("projectStartButton")}
            </Link>
            <Link
              href="/documents"
              className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:rotate-[0.5deg] font-semibold text-sm sm:text-base md:text-lg h-10 sm:h-12"
              aria-label={t("cvAriaLabel")}
            >
              <FaFilePdf className="text-lg sm:text-xl" aria-hidden="true" />
              {t("cvButton")}
            </Link>
          </div>

          {/* Micro-Copy */}
          <small className="text-xs text-gray-500 mb-3 sm:mb-4 text-center md:text-left">
            {t("microCopy")}
          </small>

          {/* Visuelle Trennung - sichtbarer gemacht */}
          <hr className="w-16 sm:w-20 border-gray-400 my-3 sm:my-4" />

          {/* Location mit verbesserter Sichtbarkeit */}
          <div className="flex items-center justify-center md:justify-start">
            <FaMapPin
              className="mr-2 text-gray-500 text-sm"
              aria-hidden="true"
            />
            <a
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
              target="_blank"
              href="https://maps.app.goo.gl/uyiFNiF11si4jY4v6"
              aria-label={t("locationAriaLabel")}
            >
              {t("location")}
            </a>
          </div>
        </div>

        {/* Right side - Avatar mit deutlich größerer Größe und besserer Balance */}
        <div className="flex justify-center md:justify-end p-3 sm:p-4 md:p-6 w-full md:w-1/2 mt-4 sm:mt-6 md:-ml-4">
          <div className="relative group">
            <Image
              src={MyAvatar}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 3xl:w-[28rem] 3xl:h-[28rem] md:max-h-[85vh] md:min-w-[320px] rounded-2xl shadow-2xl animate-fadeIn animate-zoomIn transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-2xl border-2 border-blue-500/20 object-cover cursor-pointer"
              alt={t("avatarAlt")}
              width={600}
              height={600}
              style={{
                filter: "drop-shadow(10px 10px 20px rgba(0,0,0,0.3))",
              }}
              title={t("avatarTitle")}
              priority
            />
            {/* Decorative background element */}
            <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300"></div>
            {/* Card-like background for better integration */}
            <div className="absolute -inset-4 bg-white/5 backdrop-blur-sm rounded-3xl -z-30"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
