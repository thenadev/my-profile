"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiBriefcase,
  FiDollarSign,
  FiFileText,
  FiHome,
  FiMail,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import MyLogo from "../assets/logo-owl-simple.png";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const Logo = () => (
    <Link href={`/#home`} onClick={() => scrollToSection("home")}>
      <div className="flex items-center px-12">
        <Image
          src={MyLogo}
          alt="Logo"
          height={100}
          width={100}
          className="h-16 w-auto mr-4 text-gray-700"
        />
        <span className="text-sm md:text-xl font-bold">
          Thomas <br />
          Schwabauer
        </span>
      </div>
    </Link>
  );

  // Navigation items structure
  interface NavItem {
    id: string;
    label: string; // Using direct label instead of t(id) for simplicity here
    icon: JSX.Element;
    href: string;
    isPageLink?: boolean; // Optional: true if it's a direct page link
  }

  const mainNavItems: NavItem[] = [
    { id: "home", label: t("home"), icon: <FiHome className="w-5 h-5" />, href: "/#home", isPageLink: false },
    { id: "about", label: t("about"), icon: <FiUser className="w-5 h-5" />, href: "/#about", isPageLink: false },
    { id: "work", label: t("work"), icon: <FiBriefcase className="w-5 h-5" />, href: "/#work", isPageLink: false },
    { id: "projects", label: t("projects"), icon: <FiFileText className="w-5 h-5" />, href: "/#projects", isPageLink: false },
    { id: "blog", label: "Blog", icon: <FiFileText className="w-5 h-5" />, href: "/blog", isPageLink: true },
    { id: "documents", label: t("documents"), icon: <FiFileText className="w-5 h-5" />, href: "/documents", isPageLink: true },
  ];

  const actionNavItems: NavItem[] = [
    {
      id: "preisrechner",
      label: t("preisrechner"),
      icon: <FiDollarSign className="w-5 h-5" />,
      href: "/preisrechner",
      isPageLink: true,
    },
    { id: "contact", label: t("contact"), icon: <FiMail className="w-5 h-5" />, href: "/#contact", isPageLink: false },
  ];

  // Consolidate mobile nav items based on main and action items for consistency
  // Adding 'Documents' and 'Blog' as page links explicitly
  const mobileNavItems: NavItem[] = [
    { id: "home", label: t("home"), icon: <FiHome className="w-5 h-5" />, href: "/#home" },
    { id: "about", label: t("about"), icon: <FiUser className="w-5 h-5" />, href: "/#about" },
    { id: "work", label: t("work"), icon: <FiBriefcase className="w-5 h-5" />, href: "/#work" },
    { id: "projects", label: t("projects"), icon: <FiFileText className="w-5 h-5" />, href: "/#projects" },
    { id: "blog", label: "Blog", icon: <FiFileText className="w-5 h-5" />, href: "/blog", isPageLink: true },
    { id: "documents", label: t("documents"), icon: <FiFileText className="w-5 h-5" />, href: "/documents", isPageLink: true },
    { id: "preisrechner", label: t("preisrechner"), icon: <FiDollarSign className="w-5 h-5" />, href: "/preisrechner", isPageLink: true },
    { id: "contact", label: t("contact"), icon: <FiMail className="w-5 h-5" />, href: "/#contact" },
  ];


  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="w-full">
        <div className="flex items-center justify-between text-gray-700 px-4 py-3">
          <Logo />

          {/* Hauptnavigation in der Mitte */}
          <ul className="hidden md:flex space-x-2 text-base font-medium">
            {mainNavItems.map((item) => (
              <li key={item.id} className="group">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (!item.isPageLink) {
                      e.preventDefault(); // Prevent default for scroll links
                      scrollToSection(item.id);
                    }
                    // For page links, NextLink will handle navigation
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 group-hover:text-blue-600"
                >
                  {item.icon}
                  <span>{item.label}</span> {/* Use item.label */}
                </Link>
              </li>
            ))}
          </ul>

          {/* Aktions-Buttons rechts */}
          <div className="hidden md:flex items-center gap-2">
            {actionNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (!item.isPageLink) {
                     e.preventDefault(); // Prevent default for scroll links
                    scrollToSection(item.id);
                  }
                   // For page links, NextLink will handle navigation
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  item.id === "preisrechner"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.icon}
                <span>{item.label}</span> {/* Use item.label */}
              </Link>
            ))}
          </div>

          <button
            className="block md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-screen w-64 bg-white/95 backdrop-blur-md border-l ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col w-full text-base pt-20">
            <ul className="list-none p-0 m-0">
              {mobileNavItems.map((item) => {
                // Determine if it's a page link or a scroll-to-section link
                const isPageLink = item.isPageLink || (item.href && !item.href.startsWith("/#"));

                return (
                  <li key={item.id}>
                    {isPageLink ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)} // Close menu on navigation
                        className={`flex items-center gap-3 py-4 px-6 w-full transition-colors ${
                          item.id === "preisrechner"
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-100" // Special style for preisrechner
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button // Use a button for scroll actions for accessibility
                        onClick={() => {
                          // Extract section ID from href like "/#about" -> "about"
                          const sectionId = item.href.startsWith("/#") ? item.href.substring(2) : item.id;
                          scrollToSection(sectionId);
                          setIsMenuOpen(false); // Close menu after clicking
                        }}
                        className={`flex items-center gap-3 py-4 px-6 w-full text-left transition-colors hover:bg-gray-100`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
