"use client";

import Link from "next/link";
import {
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMailBulk,
  FaTwitter,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { siteConfig } from "../config/site";

export function SiteFooter() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 px-4 z-40 relative">
      <div className="container mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Footer Links */}
        <div className="flex flex-col items-center gap-4 md:items-start">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 md:gap-8">
            <Link href="/privacy" passHref legacyBehavior>
              <a className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                Privacy Policy
              </a>
            </Link>
            <Link href="/imprint" passHref legacyBehavior>
              <a className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                Imprint
              </a>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <a className="hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
                Contact
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

      {/* Copyright and Attribution */}
      <div className="container mx-auto mt-8 text-center">
        <p className="text-xs leading-loose text-muted-foreground">
          © 2024 Thomas Schwabauer
          {/* <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-blue-400"
          >
            GitHub
          </a> */}
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
