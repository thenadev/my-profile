"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, Globe, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const BlockchainSection: React.FC = () => {
  const t = useTranslations("About.BlockchainSection");

  return (
    <section className="w-full space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Digitalsocial.ID Case Study Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-md -z-10 group-hover:blur-lg transition-all duration-300" />

          <Card className="w-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur border border-gray-100 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md overflow-hidden">
            <CardHeader className="pb-6 border-b border-gray-100 dark:border-neutral-800">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t("dsid.title")}
                </CardTitle>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {t("dsid.subtitle")}
                </p>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {t("dsid.convention.title")}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {t("dsid.convention.description")}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {t("dsid.convention.location")}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content Section */}
                <div className="lg:col-span-1 p-8 space-y-6">
                  {/* Tätigkeit */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("dsid.activity.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.activity.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.activity.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.activity.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Verantwortung */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("dsid.responsibility.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.responsibility.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.responsibility.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.responsibility.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Learnings */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("dsid.learnings.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.learnings.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.learnings.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("dsid.learnings.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("dsid.technologies.0")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("dsid.technologies.1")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("dsid.technologies.2")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("dsid.technologies.3")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("dsid.technologies.4")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Media Section */}
                <div className="lg:col-span-1 space-y-4 pr-4 pt-6">
                  {/* Images */}
                  <div className="space-y-4">
                    <Image
                      src="/about/dsid_stand.jpg"
                      alt={t("dsid.images.presentation")}
                      className="w-full h-60 object-cover rounded-lg"
                      width={900}
                      height={600}
                    />
                    <Image
                      src="/about/dsid_stage.jpg"
                      alt={t("dsid.images.stand")}
                      className="w-full h-60 object-cover rounded-lg"
                      width={900}
                      height={600}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlockchainSection;
