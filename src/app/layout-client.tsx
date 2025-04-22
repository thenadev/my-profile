"use client";

import CookieConsentDialog from "@/components/cookie-consent-dialog";
import Navbar from "@/components/default-navbar";
import SiteFooter from "@/components/site-footer";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
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
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  // Only run this in production
  if (process.env.NODE_ENV === "production" || true) {
    const TRACKING_ID = "G-63C2KDFQHT";
    ReactGA.initialize(TRACKING_ID);
  }

  useEffect(() => {
    // Set the initial locale from the cookie
    const cookieConsent = Cookies.get("cookieConsent");
    setShowCookieConsent(cookieConsent !== "true");

    // Intersection Observer für die Sektionen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Beobachte alle Sektionen
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Berechne die Position unter Berücksichtigung der Navbar-Höhe
      const navbarHeight = 80; // Höhe der Navbar in Pixel
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Prüfe, ob wir uns auf der Startseite befinden
  const isHomePage = pathname === "/";

  return (
    <>
      <Navbar />
      {showCookieConsent && <CookieConsentDialog />}
      {children}
      <div className="moving-gradient-overlay" />
      <SiteFooter />

      {/* Sticky Navigation - nur auf der Startseite */}
      {isHomePage && (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:block z-50">
          <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-full"
                    layoutId="activeSection"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
