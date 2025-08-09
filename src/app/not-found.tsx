"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFoundPage(): React.ReactElement {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4 md:px-6 pt-20 pb-24">
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 max-w-7xl">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 max-w-lg lg:max-w-md xl:max-w-xl">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 text-gray-600 text-xs mb-3">
            404
          </span>
          <h1 className="mb-2 text-2xl sm:text-3xl font-extrabold leading-tight md:text-5xl text-gray-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="mb-5 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-md">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 font-semibold text-sm sm:text-base h-10 sm:h-12"
              aria-label={t("goHome")}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("goHome")}
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] font-semibold text-sm sm:text-base h-10 sm:h-12"
              aria-label={t("contact")}
            >
              <Mail className="h-4 w-4" />
              {t("contact")}
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end p-3 sm:p-4 w-full md:w-1/2 mt-2 sm:mt-4 md:-ml-4">
          <div className="relative group">
            <Image
              src="/thomas_schwabauer.webp"
              alt={t("imageAlt")}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-2xl border-2 border-blue-500/20 object-cover"
              width={600}
              height={600}
              priority
            />
            <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
