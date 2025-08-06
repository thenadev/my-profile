"use client";

import CookieConsentDialog from "@/components/cookie-consent-dialog";
import SiteFooter from "@/components/layout/Footer";
import NavigationDesktop from "@/components/layout/NavigationDesktop";
import NavigationMobile from "@/components/layout/NavigationMobile";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const sections = [
  { id: "home", label: "Start" },
  { id: "about", label: "Über mich" },
  { id: "work", label: "Erfahrung" },
  { id: "projects", label: "Projekte" },
  { id: "contact", label: "Kontakt" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true);

  // Only run this in production
  if (process.env.NODE_ENV === "production") {
    const TRACKING_ID = "G-63C2KDFQHT";
    ReactGA.initialize(TRACKING_ID);
  }

  useEffect(() => {
    // Set the initial locale from the cookie
    const cookieConsent = Cookies.get("cookieConsent");
    setShowCookieConsent(cookieConsent !== "true");
  }, []);

  return (
    <>
      {isMobile() ? <NavigationMobile /> : <NavigationDesktop />}
      {showCookieConsent && <CookieConsentDialog />}
      {children}
      <div className="moving-gradient-overlay" />
      <SiteFooter />
    </>
  );
}
