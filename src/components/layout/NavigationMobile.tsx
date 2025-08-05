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

  const handleLanguageChange = (lang: string) => {
    setLocale(lang);
    Cookies.set("NEXT_LOCALE", lang, { path: "/" });
    router.refresh();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "top-2" : "top-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-full transition-all duration-500 ease-in-out ${
            isScrolled
              ? "bg-white/80 backdrop-blur-md shadow-lg border border-gray-200/40"
              : "bg-gray-700/90 backdrop-blur-sm border border-gray-600/30"
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
                      ? "text-gray-800 group-hover:text-gray-600"
                      : "text-gray-100 group-hover:text-gray-200"
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
                  isScrolled ? "bg-gray-100/70" : "bg-gray-600/50"
                }`}
              >
                <button
                  onClick={() => handleLanguageChange("de")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                    isScrolled
                      ? locale === "de"
                        ? "text-white bg-blue-500/90 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/60"
                      : locale === "de"
                        ? "text-white bg-blue-500/30 shadow-sm"
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
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                    isScrolled
                      ? locale === "en"
                        ? "text-white bg-blue-500/90 shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/60"
                      : locale === "en"
                        ? "text-white bg-blue-500/30 shadow-sm"
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
                className={`transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                  isScrolled
                    ? "text-gray-800 hover:text-gray-600"
                    : "text-gray-100 hover:text-gray-200"
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
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
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
            className="fixed top-0 left-0 h-screen w-full bg-gradient-to-br from-zinc-900/95 via-zinc-800/90 to-zinc-900/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col h-full justify-between mx-auto pt-8">
              <div className="space-y-6">
                {/* Header mit Branding */}
                <div className="flex items-center justify-between pb-6 border-b border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={MyAvatar}
                        alt="Thomas Schwabauer"
                        width={40}
                        height={40}
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
                    className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-white/10 active:scale-95"
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
                                  ? "text-blue-300 bg-white/20 border-l-4 border-blue-300 shadow-lg font-semibold"
                                  : "text-white hover:text-blue-200 hover:bg-white/10"
                              }`}
                            >
                              <span
                                className={`text-xl transition-all duration-200 ${
                                  isActive ? "text-blue-300" : "text-white"
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
                                height: expandedItems[item.title] ? "auto" : 0,
                                opacity: expandedItems[item.title] ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-14 space-y-2">
                                {item.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.title}
                                    href={subItem.href}
                                    className="block py-3 px-4 text-sm hover:text-blue-300 hover:bg-white/10 rounded-lg transition-all duration-200 active:scale-[0.98]"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className={`flex items-center gap-4 text-lg font-medium h-14 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                              isActive
                                ? "text-blue-300 bg-white/20 border-l-4 border-blue-300 shadow-lg font-semibold"
                                : "text-white hover:text-blue-200 hover:bg-white/10"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <span
                              className={`text-xl transition-all duration-200 ${
                                isActive ? "text-blue-300" : "text-white"
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
                  className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl transition-all duration-200 font-medium shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                    isScrolled
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25"
                      : "bg-white text-black hover:bg-gray-100 shadow-lg"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaEnvelope className="text-lg" />
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </nav>
  );
}
