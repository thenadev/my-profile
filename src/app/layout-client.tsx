"use client";

import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CookieConsentDialog from "../components/cookie-consent-dialog";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// Function to generate random position
const getRandomPosition = () => {
  const top = Math.random() * 100; // Random percentage for top
  const left = Math.random() * 100; // Random percentage for left
  return { top: `${top}%`, left: `${left}%` };
};

// Orb data with colors
const initialOrbs = [
  { id: 1, color: "rgba(51, 119, 182, 0.3)" }, // orb-1
  { id: 2, color: "rgba(222, 171, 90, 0.3)" }, // orb-2
  { id: 3, color: "rgba(229, 218, 190, 0.3)" }, // orb-3
  { id: 4, color: "rgba(0, 0, 0, 0.3)" }, // orb-4
  { id: 5, color: "rgb(51, 119, 182)" }, // orb-5
  { id: 6, color: "rgb(222, 171, 90)" }, // orb-6
  { id: 7, color: "rgb(222, 171, 90)" }, // orb-7
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true);
  const [orbPositions, setOrbPositions] = useState(() =>
    initialOrbs.map((orb) => ({
      ...orb,
      ...getRandomPosition(), // Assign random positions
    }))
  );

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    setShowCookieConsent(cookieConsent !== "true");

    // Create an interval for each orb
    const intervalIds = orbPositions.map((orb) => {
      return setInterval(
        () => {
          setOrbPositions((prevPositions) =>
            prevPositions.map((currentOrb) => {
              if (currentOrb.id === orb.id) {
                return {
                  ...currentOrb,
                  ...getRandomPosition(), // Assign new random positions
                };
              }
              return currentOrb;
            })
          );
        },
        Math.random() * 2000 + 1000
      ); // Random interval between 1s and 3s
    });

    // Cleanup the intervals on component unmount
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [orbPositions]);

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 z-10">
        {orbPositions.map((orb) => (
          <div
            key={orb.id}
            className={cn("orb", `orb-${orb.id}`)}
            style={{
              backgroundColor: orb.color, // Use color from the orb object
              position: "fixed",
              width: orb.id % 2 === 0 ? "120px" : "100px",
              height: orb.id % 2 === 0 ? "120px" : "100px",
              top: orb.top,
              left: orb.left,
              transition: "top 1s ease-in-out, left 1s ease-in-out", // Smooth transition
              borderRadius: "50%", // Make it round
              opacity: 0.3, // Transparency
              pointerEvents: "none", // Prevents mouse interactions with the orbs
            }}
          />
        ))}
      </div>
      {showCookieConsent && <CookieConsentDialog />}
      {children}
      <Footer />
    </>
  );
}
