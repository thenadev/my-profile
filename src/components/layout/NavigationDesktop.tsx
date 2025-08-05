"use client";

import { menuItems } from "@/config/menuItems";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function NavigationDesktop() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [locale, setLocale] = useState<string>("en");
  const router = useRouter();

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "top-2" : "top-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-gray-600/70 backdrop-blur-md shadow-lg"
              : "bg-gray-700 backdrop-blur-sm"
          }`}
        >
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  Thomas Schwabauer
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Language Switcher and Contact Button */}
            <div className="flex items-center space-x-4">
              {/* Contact Button */}
              <Link
                href="/contact"
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 font-medium text-sm hover:scale-105"
              >
                <FaEnvelope className="text-lg" />
                Kontakt
              </Link>

              {/* Language Switcher */}
              <div className="flex items-center">
                <button
                  onClick={() => handleLanguageChange("de")}
                  className={`px-1 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    locale === "de"
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  DE
                </button>
                <span className="text-gray-500 text-sm">/</span>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-1 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    locale === "en"
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
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
