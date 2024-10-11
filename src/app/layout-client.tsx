"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import CookieConsentDialog from "../components/cookie-consent-dialog";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true);

  const TRACKING_ID = "G-63C2KDFQHT";
  ReactGA.initialize(TRACKING_ID);

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
