"use client";

import MyAvatar from "@/assets/me-laptop.png";
import { menuItems } from "@/config/menuItems";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function NavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [locale, setLocale] = useState<string>("en");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const router = useRouter();
  const pathname = usePathname();

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActiveLink = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    // Get the initial locale from the cookie
    const savedLocale = Cookies.get("NEXT_LOCALE") || "en";
    setLocale(savedLocale);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLanguageChange = (lang: string) => {
    setLocale(lang);
    Cookies.set("NEXT_LOCALE", lang, { path: "/" });
    router.refresh();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out overflow-hidden ${
        isScrolled ? "top-2" : "top-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className={`rounded-full transition-all duration-500 ease-in-out ${
            isScrolled
              ? "bg-turquoise-800/95 backdrop-blur-md shadow-lg border border-turquoise-600/30"
              : "bg-turquoise-800/90 backdrop-blur-sm border border-turquoise-600/20"
          }`}
        >
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center group transition-all duration-200 hover:scale-105"
                aria-label="Zur Startseite"
              >
                <h1
                  className={`text-xl font-bold tracking-wide transition-colors duration-300 ${
                    isScrolled
                      ? "text-white group-hover:text-turquoise-300"
                      : "text-white group-hover:text-turquoise-300"
                  }`}
                >
                  Thomas Schwabauer
                </h1>
              </Link>
            </div>

            {/* Language Switcher and Mobile Navigation Button */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div
                className={`flex items-center rounded-full px-2 py-1 transition-all duration-300 ${
                  isScrolled ? "bg-turquoise-700/50" : "bg-turquoise-700/50"
                }`}
              >
                <button
                  onClick={() => handleLanguageChange("de")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turquoise-300 focus:ring-opacity-50 ${
                    isScrolled
                      ? locale === "de"
                        ? "text-white bg-turquoise-500/90 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/60"
                      : locale === "de"
                        ? "text-white bg-turquoise-500/30 shadow-sm"
                        : "text-gray-200 hover:text-gray-100 hover:bg-gray-500/30"
                  }`}
                  aria-label="Sprache auf Deutsch wechseln"
                  aria-pressed={locale === "de"}
                >
                  DE
                </button>
                <span
                  className={`text-sm mx-1 transition-colors duration-300 ${
                    isScrolled ? "text-gray-400" : "text-gray-400"
                  }`}
                  aria-hidden="true"
                >
                  /
                </span>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-turquoise-300 focus:ring-opacity-50 ${
                    isScrolled
                      ? locale === "en"
                        ? "text-white bg-turquoise-500/90 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/60"
                      : locale === "en"
                        ? "text-white bg-turquoise-500/30 shadow-sm"
                        : "text-gray-200 hover:text-gray-100 hover:bg-gray-500/30"
                  }`}
                  aria-label="Switch to English"
                  aria-pressed={locale === "en"}
                >
                  EN
                </button>
              </div>

              {/* Mobile Navigation Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-turquoise-300 focus:ring-opacity-50 ${
                  isScrolled
                    ? "text-white hover:text-turquoise-300"
                    : "text-white hover:text-turquoise-300"
                }`}
                aria-label="Toggle menu"
              >
                <motion.svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                </motion.svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 overflow-hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: isOpen ? "0" : "100%",
              opacity: isOpen ? 1 : 0,
            }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3,
            }}
            className="fixed inset-0 w-full bg-gradient-to-br from-turquoise-900/95 via-turquoise-800/90 to-turquoise-900/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full overflow-auto overflow-x-hidden">
              <div className="p-6 flex flex-col h-full justify-between mx-auto pt-8">
                <div className="space-y-6">
                  {/* Header mit Branding */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                        <Image
                          src={MyAvatar}
                          alt="Thomas Schwabauer"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-lg">
                          Thomas Schwabauer
                        </h2>
                        <p className="text-white/70 text-sm">
                          Fullstack Developer
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110 p-3 rounded-full hover:bg-white/15 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Menü schließen"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-3">
                    {menuItems.map((item) => {
                      const isActive = isActiveLink(item.href);
                      return (
                        <div key={item.title} className="space-y-2">
                          {item.subItems.length > 0 ? (
                            <>
                              <button
                                onClick={() => toggleItem(item.title)}
                                className={`flex items-center gap-4 text-lg font-medium w-full text-left h-14 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                                  isActive
                                    ? "text-turquoise-300 bg-white/20 border-l-4 border-turquoise-300 shadow-lg font-semibold"
                                    : "text-white hover:text-turquoise-200 hover:bg-white/10"
                                }`}
                              >
                                <span
                                  className={`text-xl transition-all duration-200 ${
                                    isActive ? "text-turquoise-300" : "text-white"
                                  }`}
                                >
                                  {item.icon}
                                </span>
                                <span
                                  className={`${isActive ? "font-semibold" : "font-medium"}`}
                                >
                                  {item.title}
                                </span>
                                <motion.svg
                                  className="h-5 w-5 ml-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  animate={{
                                    rotate: expandedItems[item.title] ? 180 : 0,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </motion.svg>
                              </button>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: expandedItems[item.title]
                                    ? "auto"
                                    : 0,
                                  opacity: expandedItems[item.title] ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 ml-6 space-y-1">
                                  {item.subItems.map((subItem, index) => (
                                    <motion.div
                                      key={subItem.title}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{
                                        opacity: expandedItems[item.title]
                                          ? 1
                                          : 0,
                                        x: expandedItems[item.title] ? 0 : -10,
                                      }}
                                      transition={{
                                        duration: 0.2,
                                        delay: expandedItems[item.title]
                                          ? index * 0.05
                                          : 0,
                                      }}
                                    >
                                      <Link
                                        href={subItem.href}
                                        className="flex items-center gap-2 py-2 px-3 text-sm text-white/70 hover:text-white hover:translate-x-1 rounded-lg transition-all duration-200 active:scale-[0.98]"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        <span className="text-turquoise-300 text-xs">
                                          •
                                        </span>
                                        {subItem.title}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              className={`flex items-center gap-4 text-lg font-medium h-14 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                                isActive
                                  ? "text-turquoise-300 bg-white/20 border-l-4 border-turquoise-300 shadow-lg font-semibold"
                                  : "text-white hover:text-turquoise-200 hover:bg-white/10"
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <span
                                className={`text-xl transition-all duration-200 ${
                                  isActive ? "text-turquoise-300" : "text-white"
                                }`}
                              >
                                {item.icon}
                              </span>
                              <span
                                className={`${isActive ? "font-semibold" : "font-medium"}`}
                              >
                                {item.title}
                              </span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </div>

                {/* Sticky Contact Button */}
                <div className="pt-6">
                  <Link
                    href="/contact"
                    className={`flex items-center justify-center gap-4 w-full h-16 rounded-xl transition-all duration-200 font-semibold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-turquoise-300 focus:ring-opacity-50 bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white hover:from-turquoise-600 hover:to-turquoise-700 shadow-turquoise-500/25 ring-2 ring-turquoise-500/20`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FaEnvelope className="text-xl" />
                    Kontakt aufnehmen
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </nav>
  );
}
