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

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    setShowCookieConsent(cookieConsent !== "true");
  }, []);

  return (
    <>
      <Navbar />
      {showCookieConsent && <CookieConsentDialog />}
      {children}
      <div className="moving-gradient-overlay" />
      <Footer />
    </>
  );
}
