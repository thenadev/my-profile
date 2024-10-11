"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import About from "@/sections/about-section";
import ContactSection from "@/sections/contact-section";
import DocumentSection from "@/sections/document-section";
import LandingSection from "@/sections/landing-section";
import ProjectsSection from "@/sections/projects-section";
import WorkExperienceSection from "@/sections/work-experience-section";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import "./globals.css";
import { initialOrbs } from "@/config/orbs";
import { getRandomOrbPosition } from "@/utils/getRandomOrbPos";
import { cn } from "@/lib/utils";

const HomePage: React.FC = () => {
  ReactGA.send("pageview");

  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state to check if device is mobile
  const [hoveredOrbIndex, setHoveredOrbIndex] = useState<number | null>(null); // Store the hovered orb index

  // Default initial orb positions - static and consistent for SSR
  const [orbPositions, setOrbPositions] = useState(() =>
    initialOrbs.map((orb) => ({
      ...orb,
      top: "50%", // Default centered value
      left: "50%", // Default centered value
    }))
  );

  // Set random orb positions on client side after mount
  useEffect(() => {
    setOrbPositions((prevPositions) =>
      prevPositions.map((orb) => ({
        ...orb,
        ...getRandomOrbPosition(false, orb), // Update to random position on client-side
      }))
    );
  }, []);

  const updateOrbPosition = (orb: any) => {
    return {
      ...orb,
      ...getRandomOrbPosition(hasScrolled, orb),
    };
  };

  useEffect(() => {
    // Check if device is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check and event listener for resize
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resizing

    const handleScroll = () => {
      if (window.scrollY > 550) {
        setHasScrolled(true); // User has scrolled down between the defined range
      } else {
        setHasScrolled(false); // Reset if outside the defined range
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Create an interval for each orb
    const intervalIds = orbPositions.map((orb) => {
      return setInterval(
        () => {
          // Only update position if the orb is not hovered
          if (hoveredOrbIndex !== orb.id) {
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
        Math.random() * 4000 + 1000
      ); // Random interval between 1s and 5s
    });

    // Cleanup the intervals, scroll event, and resize event listener on component unmount
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [hasScrolled, hoveredOrbIndex, orbPositions]);

  return (
    <>
      <div className="fixed inset-0">
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
                    position: "fixed",
                    width: `${(orb.knowledge / 100) * 100}px`,
                    height: `${(orb.knowledge / 100) * 100}px`,
                    top: orb.top,
                    left: orb.left,
                    transition: "top 1s ease-in-out, left 1s ease-in-out", // Smooth transition
                    borderRadius: "50%", // Make it round
                    opacity: hasScrolled && isMobile ? 0.2 : 0.6, // Transparency
                    display: "flex", // Use flexbox to center content
                    alignItems: "center", // Center vertically
                    justifyContent: "center", // Center horizontally
                  }}
                  onMouseEnter={() => setHoveredOrbIndex(orb.id)} // Set hovered orb index on mouse enter
                  onMouseLeave={() => setHoveredOrbIndex(null)} // Reset on mouse leave
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: `${(orb.knowledge / 100) * 60}px`,
                    }}
                  >
                    {orb.icon}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="z-50 relative">
                <h4 className="">{orb.description}</h4>
                <a href={orb.link} target="_blank" className="text-blue-500">
                  Learn More
                </a>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>
      <LandingSection />
      <About />
      <WorkExperienceSection />
      <ProjectsSection />
      <DocumentSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
