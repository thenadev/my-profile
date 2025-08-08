"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WorkExperienceCard from "@/components/work/WorkExperienceCard";
import { WorkStation, workStations } from "@/config/work-stations";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { FaRocket } from "react-icons/fa";

const HomeWorkExperience: React.FC = () => {
  const t = useTranslations("Home.WorkExperience");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const router = useRouter();

  return (
    <div
      className="min-h-screen w-full py-16 md:py-28"
      id="work"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Work Experience Timeline */}
        {workStations().length > 0 && (
          <div className="relative">
            {/* Vertical Timeline Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 h-full hidden md:block"
            />

            <div className="space-y-8 md:space-y-12">
              {workStations().map((work: WorkStation, index: number) => (
                <motion.div
                  key={"work" + index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                  }
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center md:items-stretch gap-6 md:gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 hidden md:block">
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
                  >
                    <WorkExperienceCard work={work} />
                  </div>

                  {/* Visual Element - Desktop Only */}
                  <div className="hidden md:block w-1/2">
                    <div className="h-full flex items-center justify-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t("callToAction.title")}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t("callToAction.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 hover:rotate-[0.5deg] font-semibold"
                onClick={() => {
                  router.push("/contact");
                }}
              >
                {t("callToAction.discussProject")}
                <FaRocket className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:rotate-[0.5deg] font-semibold"
                onClick={() => {
                  router.push("/documents");
                }}
              >
                {t("callToAction.viewResume")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeWorkExperience;
