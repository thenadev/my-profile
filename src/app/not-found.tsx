"use client";

import { ArrowLeft, HelpCircle, Home, Mail, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFoundPage(): React.ReactElement {
  const t = useTranslations("NotFound");

  return (
    <div className="overflow-hidden min-h-screen bg-turquoise-800">
      <div className="flex min-h-screen w-full">
        {/* Türkise Seitenleiste links – konsistent mit Home-Seite */}
        <div
          className="flex-shrink-0 w-6 sm:w-12 lg:w-24 bg-turquoise-800"
          aria-hidden
        />
        {/* Dunkler Mittelstreifen */}
        <main className="flex-1 flex min-w-0 flex-col relative z-10">
          <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col bg-background min-h-screen">
            <section className="container mx-auto max-w-6xl flex-1 flex items-center px-4 md:px-6 py-12 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full">
                {/* Left Column - Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
                  {/* Headline */}
                  <div className="space-y-5">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
                      <span className="bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] via-[var(--hero-portrait-bg-mid)] to-[var(--hero-portrait-bg-bright)] bg-clip-text text-transparent">
                        {t("title")}
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-normal">
                      {t("description")}
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="w-full max-w-md space-y-4 pt-2">
                    <Link
                      href="/"
                      className="flex items-center justify-center lg:justify-start gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 font-bold text-base group hover:scale-105 active:scale-95"
                    >
                      <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>{t("goHome")}</span>
                      <ArrowLeft className="h-4 w-4 ml-auto group-hover:-translate-x-2 transition-transform" />
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center justify-center lg:justify-start gap-3 px-8 py-4 border-2 border-border bg-muted/50 hover:bg-accent/10 hover:border-accent text-foreground rounded-xl shadow-md hover:shadow-xl transition-all duration-300 font-semibold text-base group hover:scale-105 active:scale-95"
                    >
                      <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>{t("contact")}</span>
                    </Link>
                  </div>

                  {/* Helpful Links */}
                  <div className="w-full max-w-md pt-6 border-t border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">
                      {t("popularPages")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/services/unternehmenswebsite"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all border border-border hover:border-accent"
                      >
                        <Search className="h-4 w-4" />
                        <span>{t("webdesign")}</span>
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all border border-border hover:border-accent"
                      >
                        <HelpCircle className="h-4 w-4" />
                        <span>{t("aboutMe")}</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Column - Image */}
                <div className="flex justify-center lg:justify-end relative">
                  <div className="relative group">
                    {/* Animated background glow */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-3xl group-hover:blur-[40px] transition-all duration-700 animate-pulse" />
                    <div className="absolute -inset-3 bg-gradient-to-br from-primary/15 to-primary/15 rounded-3xl blur-xl" />

                    {/* Image container */}
                    <div className="relative z-10">
                      <Image
                        src="/thomas_schwabauer.webp"
                        alt={t("imageAlt")}
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 object-cover border-4 border-primary/30 backdrop-blur-sm"
                        width={600}
                        height={600}
                        priority
                      />

                      {/* Decorative floating elements */}
                      <div
                        className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/20 rounded-full blur-2xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        {/* Türkise Seitenleiste rechts – konsistent mit Home-Seite */}
        <div
          className="flex-shrink-0 w-6 sm:w-12 lg:w-24 bg-turquoise-800"
          aria-hidden
        />
      </div>
    </div>
  );
}
