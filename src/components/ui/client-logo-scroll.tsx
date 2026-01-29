"use client";

import { clientLogos, type ClientLogo } from "@/config/client-logos";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ClientLogoScrollProps {
  /** Optionale eigene Logos (überschreibt Standard) */
  logos?: ClientLogo[];
  /** Variante: "compact" für kleinere Karten (z.B. Home), "default" für größere */
  variant?: "compact" | "default";
  /** Zusätzliche CSS-Klassen für den Wrapper */
  className?: string;
}

function LogoCard({
  client,
  variant,
}: {
  client: ClientLogo;
  variant: "compact" | "default";
}) {
  const isCompact = variant === "compact";
  return (
    <div
      className={cn(
        "flex-shrink-0 flex items-center justify-center rounded-lg border border-border bg-white/95 dark:bg-white/20 shadow-sm",
        isCompact ? "w-28 h-14 p-2" : "w-32 h-16 p-3 md:p-4",
      )}
    >
      <Image
        src={client.logo}
        alt={`${client.name} Logo`}
        width={isCompact ? 80 : 96}
        height={isCompact ? 32 : 40}
        className={cn(
          "object-contain filter grayscale hover:grayscale-0 transition-all",
          isCompact ? "max-w-20 max-h-8" : "max-w-24 max-h-10",
        )}
      />
    </div>
  );
}

export function ClientLogoScroll({
  logos,
  variant = "default",
  className,
}: ClientLogoScrollProps) {
  const logosToUse = logos ?? clientLogos;
  const dupLogos = [...logosToUse, ...logosToUse];
  const row1 = [
    ...logosToUse.slice(0, Math.ceil(logosToUse.length / 2)),
    ...logosToUse.slice(0, Math.ceil(logosToUse.length / 2)),
  ];
  const row2 = [
    ...logosToUse.slice(Math.ceil(logosToUse.length / 2)),
    ...logosToUse.slice(Math.ceil(logosToUse.length / 2)),
  ];

  return (
    <div className={cn("relative overflow-hidden -mx-2 md:-mx-4", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Mobile: 2 Reihen, je horizontal durchlaufend (Reihe 2 gegenläufig) */}
      <div className="flex flex-col gap-3 md:hidden">
        <div
          className="flex gap-4 items-center py-2 logo-scroll-animation"
          style={{ width: "max-content" }}
        >
          {row1.map((client, index) => (
            <div key={`row1-${client.name}-${index}`} className="flex-shrink-0">
              <LogoCard client={client} variant={variant} />
            </div>
          ))}
        </div>
        <div
          className="flex gap-4 items-center py-2 logo-scroll-animation-reverse"
          style={{ width: "max-content" }}
        >
          {row2.map((client, index) => (
            <div key={`row2-${client.name}-${index}`} className="flex-shrink-0">
              <LogoCard client={client} variant={variant} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 1 Reihe horizontal durchlaufend */}
      <div className="hidden md:block">
        <div
          className="flex gap-6 md:gap-8 items-center py-2 logo-scroll-animation"
          style={{ width: "max-content" }}
        >
          {dupLogos.map((client, index) => (
            <div
              key={`desktop-${client.name}-${index}`}
              className="flex-shrink-0"
            >
              <LogoCard client={client} variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
