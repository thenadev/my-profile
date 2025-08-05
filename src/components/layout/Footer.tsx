"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SiFreelancermap } from "react-icons/si";
import { siteConfig } from "../../config/site";

const SiteFooter = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-gray-900 text-white py-12 px-4 z-40 relative">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Thomas Schwabauer</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Fullstack Developer & Freelancer
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Next.js | Angular | React.js | Spring Boot
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/imprint"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {t("imprint")}
              </Link>
              <Link
                href="/blog"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {t("blog")}
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href={"mailto:" + siteConfig.contactEmail}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                <IoMdMail size={18} />
                <span>Email</span>
              </a>
              <a
                href={siteConfig.links.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <a
                href={siteConfig.links.freelancermap}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                <SiFreelancermap size={18} />
                <span>freelancermap</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Thomas Schwabauer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
