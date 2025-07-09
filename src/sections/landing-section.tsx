"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { initialOrbs } from "@/config/orbs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getRandomOrbPosition } from "@/utils/getRandomOrbPos";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState, useCallback, useMemo } from "react";
// Optimized icon imports - only import what we need
import { FaCalculator, FaGithub, FaLinkedin, FaMapPin } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { SiFreelancermap } from "react-icons/si";
import MyAvatar from "../assets/me-laptop.webp";

const LandingSection: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredOrbIndex, setHoveredOrbIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const t = useTranslations("Home");

  // Optimize orb positions with state management
  const [orbPositions, setOrbPositions] = useState(() => 
    initialOrbs.slice(0, 5).map((orb) => ({
      ...orb,
      top: "50%",
      left: "50%",
    }))
  );

  const scrollToContact = useCallback(() => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Optimize orb position updates
  const updateOrbPosition = useCallback((orb: any) => {
    return {
      ...orb,
      ...getRandomOrbPosition(hasScrolled, orb),
    };
  }, [hasScrolled]);

  useEffect(() => {
    // Lazy load animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (window.scrollY > 550) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Reduce animation frequency for better performance
    const intervalIds = orbPositions.map((orb) => {
      return setInterval(
        () => {
          if (hoveredOrbIndex !== orb.id && isVisible) {
            setOrbPositions((prevPositions) =>
              prevPositions.map((currentOrb) => {
                if (currentOrb.id === orb.id) {
                  return updateOrbPosition(currentOrb);
                }
                return currentOrb;
              })
            );
          }
        },
        Math.random() * 3000 + 2000 // Increased interval for better performance
      );
    });

    return () => {
      intervalIds.forEach((id) => clearInterval(id));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [hasScrolled, hoveredOrbIndex, orbPositions, updateOrbPosition, isVisible]);

  return (
    <div
      className="pt-16 min-h-screen flex items-center justify-center"
      id="home"
    >
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-10 px-4 md:px-10">
        <div className="">
          {orbPositions.map((orb) => (
            <div
              key={`orb-key-${orb.id}`}
              className={hoveredOrbIndex === orb.id ? "z-50" : "z-10"}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div
                    className={cn("orb", `orb-${orb.id}`)}
                    style={{
                      backgroundColor: orb.color,
                      position: "absolute",
                      width: `${(orb.knowledge / 100) * (isMobile ? 50 : 100)}px`,
                      height: `${(orb.knowledge / 100) * (isMobile ? 50 : 100)}px`,
                      top: orb.top,
                      left: orb.left,
                      transition: "top 1s ease-in-out, left 1s ease-in-out",
                      borderRadius: "50%",
                      opacity: hasScrolled && isMobile ? 0.2 : 0.6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      willChange: "transform", // Optimize for animations
                    }}
                    onMouseEnter={() => setHoveredOrbIndex(orb.id)}
                    onMouseLeave={() => setHoveredOrbIndex(null)}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: `${(orb.knowledge / 100) * (isMobile ? 30 : 60)}px`,
                      }}
                    >
                      {orb.icon}
                    </span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="z-50 relative">
                  <h4 className="">{t(`orb_${orb.id}`)}</h4>
                  <a href={orb.link} target="_blank" className="text-blue-500">
                    {t("learnMore")}
                  </a>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left p-6 md:p-10 text-black animate-slideIn">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl xl:text-6xl">
            {t("welcome")}
          </h1>
          <h2 className="mb-4 text-2xl md:text-4xl">{t("title")}</h2>
          <h2 className="mb-4 font-light text-base md:text-lg lg:text-xl">
            Next.js | Angular | React.js | Spring Boot | Java | TypeScript |
            Flutter | Kotlin
          </h2>
          <h2 className="mb-6 flex flex-row items-center justify-center md:justify-start">
            <FaMapPin className="mr-2" />{" "}
            <a
              className="hover:underline hover:font-bold"
              target="_blank"
              href="https://maps.app.goo.gl/uyiFNiF11si4jY4v6"
            >
              {t("location")}
            </a>
          </h2>
          <div className="w-full md:w-auto mb-8">
            <Link href="/preisrechner" passHref legacyBehavior>
              <button className="group flex items-center justify-center gap-3 px-6 py-3 text-lg md:text-xl text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-auto">
                <FaCalculator className="text-2xl group-hover:animate-bounce" />
                <span className="font-semibold">{t("priceCalculator")}</span>
                <span className="hidden md:inline-block bg-blue-500 px-2 py-1 text-sm rounded-full">
                  NEU
                </span>
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 z-40 mb-4 md:mb-0 justify-center md:justify-start">
            <div className="w-full md:w-auto mb-2">
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center text-sm px-3 py-2 md:text-base text-white bg-[#3377b6] rounded shadow-md transition-transform duration-300 transform hover:scale-105 w-full md:w-auto"
              >
                <FaMessage className="mr-2" />
                {t("contact")}
              </button>
            </div>
            <div className="w-full md:w-auto mb-2">
              <a
                href={siteConfig.links.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <button className="flex items-center justify-center px-3 py-2 text-sm md:text-base text-white bg-[#0077b5] rounded shadow-md transition-transform duration-300 transform hover:scale-105 w-full md:w-auto">
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </button>
              </a>
            </div>
            <div className="w-full md:w-auto">
              <a
                href={siteConfig.links.freelancermap}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <button className="flex items-center justify-center px-3 py-2 text-sm md:text-base text-white bg-black rounded shadow-md transition-transform duration-300 transform hover:scale-105 w-full md:w-auto">
                  <SiFreelancermap className="mr-2" />
                  freelancermap
                </button>
              </a>
            </div>
            <div className="w-full md:w-auto mb-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <button className="flex items-center justify-center px-3 py-2 text-sm md:text-base text-white bg-[#333333] rounded shadow-md transition-transform duration-300 transform hover:scale-105 w-full md:w-auto">
                  <FaGithub className="mr-2" />
                  GitHub
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4 md:p-6">
          <Image
            src={MyAvatar}
            className="max-w-[200px] sm:max-w-[300px] md:max-w-[400px] h-auto rounded-full shadow-lg animate-fadeIn"
            alt="Avatar"
            height={300}
            width={400}
            priority
            style={{
              filter: "drop-shadow(5px 5px 5px #222)",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default LandingSection;
