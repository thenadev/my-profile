"use client";

import { menuItems } from "@/config/menuItems";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
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
                <h1 className="text-xl font-bold text-white tracking-wide">
                  Thomas Schwabauer
                </h1>
              </Link>
            </div>

            {/* Language Switcher and Mobile Navigation Button */}
            <div className="flex items-center space-x-4">
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

              {/* Mobile Navigation Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="white"
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
          className="fixed inset-0 top-22 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ y: "0%", opacity: 0 }}
            animate={{
              y: isOpen ? "0" : "-100%",
              opacity: isOpen ? 1 : 0,
            }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              duration: 0.5,
            }}
            className="fixed top-22 right-0 h-[calc(100vh-5.5rem)] w-full text-white shadow-lg z-40 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              {menuItems.map((item) => (
                <div key={item.title} className="space-y-4">
                  {item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleItem(item.title)}
                        className="flex items-center gap-3 text-xl font-semibold w-full text-left h-10"
                      >
                        {item.icon}
                        {item.title}
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
                        <div className="pl-6 space-y-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block py-2 text-base hover:text-secondary transition-colors"
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
                      className="flex items-center gap-3 text-xl font-semibold h-10"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  )}
                  <hr className="border-t border-gray-300 my-4" />
                </div>
              ))}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-full hover:bg-gray-100 transition-colors text-center mt-6"
                onClick={() => setIsOpen(false)}
              >
                <FaEnvelope />
                Kontakt
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </nav>
  );
}
