"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MyLogo from "../assets/logo-owl.png";

const Logo = () => (
  <div className="flex items-center px-12">
    <Image
      src={MyLogo}
      alt="Logo"
      height={100}
      width={100}
      className="h-16 w-auto mr-4" // Adjust height for logo
    />
    <span className="text-sm md:text-xl font-bold">
      Thomas <br />
      Schwabauer
    </span>
  </div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after navigating
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
      <nav className="w-full">
        <div className="flex items-center text-gray-700 px-4 py-3">
          <Logo />

          <ul className="hidden md:flex space-x-4 text-base font-semibold cursor-pointer">
            {["home", "about", "work", "projects", "documents", "contact"].map(
              (section) => (
                <li key={section} className="hover:bg-gray-200 py-2 px-4">
                  <Link
                    href={`/#${section}`}
                    onClick={() => scrollToSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </li>
              )
            )}
          </ul>

          <button
            className="block md:hidden py-3 px-4 rounded focus:outline-none hover:bg-gray-200"
            onClick={toggleMenu}
          >
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600"></div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-screen w-8/12 bg-white border transition-all duration-300 ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col w-full text-base cursor-pointer pt-10 text-left">
            <ul className="list-none p-0 m-0">
              {[
                "home",
                "about",
                "work",
                "projects",
                "documents",
                "contact",
              ].map((section) => (
                <li
                  key={section}
                  className="hover:bg-gray-200 py-4 px-6 w-full"
                >
                  <Link
                    href={`/#${section}`}
                    onClick={() => scrollToSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
