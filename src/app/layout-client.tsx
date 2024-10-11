"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { initialOrbs } from "@/config/orbs";
import { cn } from "@/lib/utils";
import { getRandomOrbPosition } from "@/utils/getRandomOrbPos";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CookieConsentDialog from "../components/cookie-consent-dialog";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hoveredOrbIndex, setHoveredOrbIndex] = useState<number | null>(null); // Store the hovered orb index
  const [orbPositions, setOrbPositions] = useState(() =>
    initialOrbs.map((orb) => ({
      ...orb,
      ...getRandomOrbPosition(false, orb),
    }))
  );

  const updateOrbPosition = (orb: any) => {
    return {
      ...orb,
      ...getRandomOrbPosition(hasScrolled, orb),
    };
  };

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    setShowCookieConsent(cookieConsent !== "true");

    const handleScroll = () => {
      if (window.scrollY > 550) {
        setHasScrolled(true); // User has scrolled down between the defined range
      } else {
        setHasScrolled(false); // Reset if outside the defined range
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Create an interval for each orb
    const intervalIds = orbPositions.map((orb, index) => {
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

    // Cleanup the intervals and scroll event listener on component unmount
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled, hoveredOrbIndex]);

  return (
    <>
      <Navbar />
      {showCookieConsent && <CookieConsentDialog />}
      {children}
      <div className="moving-gradient-overlay" />
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
                    opacity: 0.6, // Transparency
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
      <Footer />
    </>
  );
}
