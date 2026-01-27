"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Mail, Search, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFoundPage(): React.ReactElement {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 md:px-6 py-12 md:py-20 bg-turquoise-800">
      <section className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
      
            {/* Headline */}
            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight">
                <span className="bg-gradient-to-r from-turquoise-500 via-turquoise-600 to-turquoise-500 bg-clip-text text-transparent">
                  Seite nicht gefunden
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed font-normal">
                Die gesuchte Seite existiert nicht oder wurde verschoben. Kein Problem – hier sind ein paar schnelle Wege zurück.
              </p>
            </div>

            {/* Quick Links */}
            <div className="w-full max-w-md space-y-4 pt-2">
              <Link
                href="/"
                className="flex items-center justify-center lg:justify-start gap-3 px-8 py-4 bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 font-bold text-base group hover:scale-105 active:scale-95"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Zur Startseite</span>
                <ArrowLeft className="h-4 w-4 ml-auto group-hover:-translate-x-2 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="flex items-center justify-center lg:justify-start gap-3 px-8 py-4 bg-turquoise-800/90 border-2 border-turquoise-600/30 hover:border-turquoise-400 text-white hover:text-turquoise-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 font-semibold text-base group hover:scale-105 active:scale-95"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Kontakt aufnehmen</span>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="w-full max-w-md pt-6 border-t border-turquoise-600/30">
              <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                Beliebte Seiten
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/services/unternehmenswebsite"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-200 hover:text-turquoise-400 hover:bg-turquoise-700/30 rounded-lg transition-all border border-turquoise-600/30 hover:border-turquoise-400/50"
                >
                  <Search className="h-4 w-4" />
                  <span>Webdesign</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-200 hover:text-turquoise-400 hover:bg-turquoise-700/30 rounded-lg transition-all border border-turquoise-600/30 hover:border-turquoise-400/50"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Über mich</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative group">
              {/* Animated background glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-turquoise-500/30 via-turquoise-500/30 to-turquoise-500/30 rounded-3xl blur-3xl group-hover:blur-[40px] transition-all duration-700 animate-pulse"></div>
              <div className="absolute -inset-3 bg-gradient-to-br from-turquoise-600/20 to-turquoise-600/20 rounded-3xl blur-xl"></div>
              
              {/* Image container */}
              <div className="relative z-10">
                <Image
                  src="/thomas_schwabauer.webp"
                  alt={t("imageAlt")}
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 object-cover border-4 border-turquoise-600/50 backdrop-blur-sm"
                  width={600}
                  height={600}
                  priority
                />
                
                {/* Decorative floating elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-turquoise-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-turquoise-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
