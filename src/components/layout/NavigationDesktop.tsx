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
        isScrolled ? "top-0" : "top-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-full transition-all duration-500 ease-in-out ${
            isScrolled
              ? "bg-turquoise-800/95 backdrop-blur-md shadow-md border border-turquoise-600/30"
              : "bg-turquoise-800/90 backdrop-blur-md shadow-sm border border-turquoise-600/20"
          }`}
        >
          <div className="flex justify-between items-center h-14 md:h-16 px-4 md:px-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center group transition-all duration-200"
                aria-label="Zur Startseite"
              >
                <h1 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-turquoise-300 transition-colors duration-300">
                  Thomas Schwabauer
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
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
                      className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 ${
                        isActive
                          ? "text-turquoise-300 bg-turquoise-700/50"
                          : "text-gray-200 hover:text-turquoise-300 hover:bg-turquoise-700/30"
                      }`}
                    >
                      {item.title}
                    </Link>

                    {/* Dropdown Menu */}
                    {hasSubItems && hoveredItem === item.title && (
                      <div className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg border border-turquoise-600/30 bg-turquoise-800/95 backdrop-blur-md transition-all duration-200 ease-in-out">
                        <div className="py-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm text-white hover:text-turquoise-300 hover:bg-turquoise-700/30 transition-all duration-200"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Language Switcher and Contact Button */}
            <div className="flex items-center space-x-3">
              {/* Contact Button */}
              <Link
                href="/contact"
                className="px-4 md:px-6 py-2 rounded-full bg-turquoise-500 text-white hover:bg-turquoise-600 transition-all duration-200 flex items-center gap-2 font-medium text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-turquoise-300"
                aria-label="Kontakt aufnehmen"
              >
                <FaEnvelope className="text-base" />
                <span className="hidden sm:inline">Kontakt</span>
              </Link>

              {/* Language Switcher */}
              <div className="flex items-center rounded-full px-1.5 py-1 bg-turquoise-700/50">
                <button
                  onClick={() => handleLanguageChange("de")}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-turquoise-300 ${
                    locale === "de"
                      ? "text-white bg-turquoise-500 shadow-sm"
                      : "text-gray-200 hover:text-white"
                  }`}
                  aria-label="Sprache auf Deutsch wechseln"
                  aria-pressed={locale === "de"}
                >
                  DE
                </button>
                <span className="text-xs mx-1 text-gray-400" aria-hidden="true">
                  /
                </span>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-turquoise-300 ${
                    locale === "en"
                      ? "text-white bg-turquoise-500 shadow-sm"
                      : "text-gray-200 hover:text-white"
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
