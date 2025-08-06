"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { initialOrbs } from "@/config/orbs";
import { cn } from "@/lib/utils";
import { getRandomOrbPosition } from "@/utils/getRandomOrbPos";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface TechStackOrbsProps {
  isMobile: boolean;
  hasScrolled: boolean;
}

const TechStackOrbs: React.FC<TechStackOrbsProps> = ({ isMobile, hasScrolled }) => {
  const [hoveredOrbIndex, setHoveredOrbIndex] = useState<number | null>(null);
  const t = useTranslations("Home");

  const [orbPositions, setOrbPositions] = useState(() =>
    initialOrbs.map((orb) => ({
      ...orb,
      top: "50%",
      left: "50%",
    }))
  );

  useEffect(() => {
    setOrbPositions((prevPositions) =>
      prevPositions.map((orb) => ({
        ...orb,
        ...getRandomOrbPosition(false, orb),
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
    const intervalIds = orbPositions.map((orb) => {
      return setInterval(
        () => {
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
        Math.random() * 2000 + 1000
      );
    });

    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [hasScrolled, hoveredOrbIndex, orbPositions]);

  return (
    <div className="relative w-full md:w-1/2 h-96 md:h-full">
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
  );
};

export default TechStackOrbs; 