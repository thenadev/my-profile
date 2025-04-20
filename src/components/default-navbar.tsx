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

  const mainNavItems = [
    { id: "home", icon: <FiHome className="w-5 h-5" />, href: "/" },
    { id: "about", icon: <FiUser className="w-5 h-5" />, href: "/#about" },
    { id: "work", icon: <FiBriefcase className="w-5 h-5" />, href: "/#work" },
    {
      id: "projects",
      icon: <FiFileText className="w-5 h-5" />,
      href: "/#projects",
    },
    {
      id: "documents",
      icon: <FiFileText className="w-5 h-5" />,
      href: "/documents",
    },
  ];

  const actionNavItems = [
    {
      id: "preisrechner",
      icon: <FiDollarSign className="w-5 h-5" />,
      href: "/preisrechner",
    },
    { id: "contact", icon: <FiMail className="w-5 h-5" />, href: "/#contact" },
  ];

  const mobileNavItems = [
    { id: "home", icon: <FiHome className="w-5 h-5" /> },
    { id: "about", icon: <FiUser className="w-5 h-5" /> },
    { id: "work", icon: <FiBriefcase className="w-5 h-5" /> },
    { id: "projects", icon: <FiFileText className="w-5 h-5" /> },
    { id: "preisrechner", icon: <FiDollarSign className="w-5 h-5" /> },
    { id: "contact", icon: <FiMail className="w-5 h-5" /> },
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 group-hover:text-blue-600"
                >
                  {item.icon}
                  <span>{t(item.id)}</span>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  item.id === "preisrechner"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.icon}
                <span>{t(item.id)}</span>
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
              {mobileNavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 py-4 px-6 w-full transition-colors ${
                      item.id === "preisrechner"
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{t(item.id)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
