"use client";

import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { siteConfig } from "../config/site";

const SiteFooter = () => {
  const router = useRouter();
  const t = useTranslations("Footer");
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    // Get the initial locale from the cookie
    const savedLocale = Cookies.get("NEXT_LOCALE") || "en";
    setLocale(savedLocale);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLocale(lang);
    Cookies.set("NEXT_LOCALE", lang, { path: "/" });
    router.refresh();
  };

  return (
    <footer className="w-full bg-gray-800 text-white py-8 px-4 z-40 relative">
      <div className="container mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Footer Links */}
        <div className="flex flex-col items-center gap-4 md:items-start">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 md:gap-8">
            <Link href="/privacy" passHref legacyBehavior>
              <a className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                {t("privacy")}
              </a>
            </Link>
            <Link href="/imprint" passHref legacyBehavior>
              <a className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                {t("imprint")}
              </a>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <a className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                {t("blog")}
              </a>
            </Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 items-center justify-center mt-4 md:mt-0">
          <a
            href={"mailto:" + siteConfig.contactEmail}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <IoMdMail size={20} />
          </a>
          <a
            href={siteConfig.links.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="container mx-auto mt-8 text-center">
        <label htmlFor="language-select" className="text-sm sm:text-base mr-2">
          {t("language")}:
        </label>
        <select
          id="language-select"
          value={locale}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-gray-700 text-white p-1 rounded"
        >
          <option value="en">{t("language_en")}</option>
          <option value="de">{t("language_de")}</option>
        </select>
      </div>

      {/* Copyright and Attribution */}
      <div className="container mx-auto mt-8 text-center">
        <p className="text-xs leading-loose text-muted-foreground">
          © {new Date().getFullYear()} Thomas Schwabauer
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
