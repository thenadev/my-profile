"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Car, Music, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const ProfessionalJourney: React.FC = () => {
  const t = useTranslations("About.ProfessionalJourney");

  return (
    <section className="w-full space-y-8">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">
        {t("title")}
      </h2>

      <div className="max-w-6xl mx-auto">
        {/* Valtech Case Study Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-md -z-10 group-hover:blur-lg transition-all duration-300" />

          <Card className="w-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur border border-gray-100 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md overflow-hidden transition-all">
            <CardHeader className="pb-6 border-b border-gray-100 dark:border-neutral-800">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t("valtech.title")}
                </CardTitle>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {t("valtech.subtitle")}
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Media Section */}
                <div className="lg:col-span-1 space-y-4 pl-4 py-6">
                  <video
                    src="/about/valtech_testfahrt.mp4"
                    className="w-full aspect-video object-cover rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <video
                    src="/about/valtech_short.mp4"
                    className="w-full aspect-video object-cover rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                {/* Content Section */}
                <div className="lg:col-span-1 p-8 space-y-10 ">
                  {/* Tätigkeit */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("valtech.activity.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.activity.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.activity.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.activity.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Verantwortung */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("valtech.responsibility.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.responsibility.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.responsibility.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.responsibility.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Learnings */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t("valtech.learnings.title")}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.learnings.items.0")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.learnings.items.1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{t("valtech.learnings.items.2")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("valtech.technologies.0")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("valtech.technologies.1")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("valtech.technologies.2")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("valtech.technologies.3")}
                      </span>
                      <span className="px-3 py-1 bg-white/70 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {t("valtech.technologies.4")}
                      </span>
                    </div>
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

export default ProfessionalJourney;
