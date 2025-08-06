"use client";

import { menuItems } from "@/config/menuItems";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function NavigationDesktop() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [locale, setLocale] = useState<string>("en");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const router = useRouter();
  const pathname = usePathname();

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

  const isActiveLink = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleMouseEnter = (itemTitle: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setHoveredItem(itemTitle);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // 150ms Verzögerung
    setDropdownTimeout(timeout);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
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
                  className={`text-2xl font-bold tracking-wide transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-800 group-hover:text-gray-600"
                      : "text-gray-100 group-hover:text-gray-200"
                  }`}
                >
                  Thomas Schwabauer
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => {
                const isActive = isActiveLink(item.href);
                const hasSubItems = item.subItems && item.subItems.length > 0;

                return (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 transition-all duration-300 text-sm font-medium relative group ${
                        isScrolled
                          ? isActive
                            ? "text-gray-800"
                            : "text-gray-600 hover:text-gray-800"
                          : isActive
                            ? "text-gray-100"
                            : "text-gray-200 hover:text-gray-100"
                      }`}
                      aria-label={`Navigation zu ${item.title}`}
                    >
                      <span
                        className={`text-lg transition-all duration-300 ${
                          isScrolled
                            ? isActive
                              ? "text-blue-500"
                              : "group-hover:text-blue-400"
                            : isActive
                              ? "text-blue-300"
                              : "group-hover:text-blue-200"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {item.title}
                      {hasSubItems && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${
                            hoveredItem === item.title ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                      {/* Active indicator */}
                      {isActive && (
                        <div
                          className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                            isScrolled ? "bg-blue-500" : "bg-blue-300"
                          }`}
                        ></div>
                      )}
                      {/* Hover indicator */}
                      <div
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                          isScrolled
                            ? "bg-blue-500/0 group-hover:bg-blue-500/50"
                            : "bg-blue-300/0 group-hover:bg-blue-300/50"
                        }`}
                      ></div>
                    </Link>

                    {/* Dropdown Menu */}
                    {hasSubItems && hoveredItem === item.title && (
                      <div className="absolute top-full left-0 mt-2 w-48 rounded-xl shadow-lg transition-all duration-200 opacity-100 transform translate-y-0">
                        <div
                          className={`rounded-xl border transition-all duration-200 ${
                            isScrolled
                              ? "bg-white/95 backdrop-blur-md border-gray-200/40 shadow-xl"
                              : "bg-gray-800/95 backdrop-blur-md border-gray-600/40 shadow-xl"
                          }`}
                        >
                          <div className="py-2">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`block px-4 py-3 text-sm transition-all duration-200 hover:bg-opacity-10 ${
                                  isScrolled
                                    ? "text-gray-700 hover:text-gray-900 hover:bg-blue-500"
                                    : "text-gray-200 hover:text-gray-100 hover:bg-blue-400"
                                }`}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Extended hover area */}
                        <div className="absolute -top-4 -bottom-4 -left-4 -right-4 z-[-1]"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Language Switcher and Contact Button */}
            <div className="flex items-center space-x-4">
              {/* Contact Button */}
              <Link
                href="/contact"
                className={`px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 font-medium text-sm hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                  isScrolled
                    ? "bg-black/80 text-white hover:bg-black/90 hover:shadow-lg"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-lg"
                }`}
                aria-label="Kontakt aufnehmen"
              >
                <FaEnvelope className="text-lg" />
                Kontakt
              </Link>

              {/* Language Switcher - verbesserte Accessibility */}
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
