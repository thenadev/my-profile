"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SiFreelancermap } from "react-icons/si";
import { siteConfig } from "../../config/site";

const SiteFooter = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-turquoise-950 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hauptbereich */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Über mich */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/thomas_schwabauer.webp"
                alt="Thomas Schwabauer"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <h3 className="text-xl font-bold">Thomas Schwabauer</h3>
            </div>
            <p className="text-gray-300 mb-4">
              {t("fullstackDeveloper")} {t("location")}. {t("specialization")}.
            </p>
          </div>

          {/* Links und Rechtliches Container */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2">
            {/* Links */}
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {t("services")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {t("blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Rechtliches */}
            <div className="text-left">
              <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {t("privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/imprint"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {t("imprint")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documents"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {t("documents")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media & Kontakt */}
        <div className="border-t border-turquoise-700/50 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Kontakt */}
            <div className="flex items-center gap-4">
              <a
                href={"mailto:" + siteConfig.contactEmail}
                className="flex items-center gap-2 text-gray-300 hover:text-white hover:underline transition-colors"
                aria-label="E-Mail senden"
              >
                <IoMdMail size={20} />
                <span>{t("email")}</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.links.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn Profil"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub Profil"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={siteConfig.links.freelancermap}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Freelancermap Profil"
              >
                <SiFreelancermap size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-turquoise-700/50 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Thomas Schwabauer.{" "}
            {t("allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
