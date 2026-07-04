"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { useLocale, useTranslations } from "next-intl";
import { MdLocationOn } from "react-icons/md";
import { useState } from "react";

/**
 * Google-Maps-Einbettung mit Klick-zum-Laden (Zwei-Klick-Lösung).
 * Vor dem Klick wird KEINE Anfrage an Google gesendet (keine Cookies),
 * daher DSGVO-konform ohne vorherige Einwilligung. Nutzt die keyless
 * Embed-Variante (?output=embed) – kein API-Key, kein pb-Token nötig.
 */
export default function ConsentMap() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);

  const address = `${siteConfig.streetAddress}, ${siteConfig.zipCode} ${siteConfig.city}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address,
  )}&z=15&hl=${locale}&output=embed`;

  const handleLoad = () => {
    sendGoogleEvent("map_consent_load", { location: "contact" });
    setLoaded(true);
  };

  if (loaded) {
    return (
      <div className="relative">
        <iframe
          title={t("mapTitle")}
          src={embedUrl}
          width="100%"
          height="320"
          className="rounded-2xl border-0 shadow-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-border">
          <p className="text-sm font-semibold text-foreground">
            {t("locationCity")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("locationDescription")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-muted/40 p-6 text-center shadow-lg">
      <MdLocationOn className="h-10 w-10 text-primary" />
      <div>
        <p className="text-sm font-semibold text-foreground">{address}</p>
        <p className="mx-auto mt-2 max-w-sm text-xs text-muted-foreground">
          {t("mapConsentNotice")}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button onClick={handleLoad} className="bg-primary hover:bg-primary/90">
          {t("mapConsentButton")}
        </Button>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          {t("mapOpenExternal")}
        </a>
      </div>
    </div>
  );
}
