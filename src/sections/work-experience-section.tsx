"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkStation, workStations } from "@/utils/work-stations";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";

const WorkExperienceSection: React.FC = () => {
  const t = useTranslations("Work");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div
      className="min-h-screen w-full py-16 md:py-28"
      id="work"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300 h-full md:block"
          />

          <div className="space-y-6 md:space-y-8">
            {workStations().map((work: WorkStation, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="md:ml-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full h-full flex flex-col">
                      {/* Image Section - Mobile Top */}
                      {work.image && (
                        <div className="relative w-full h-32 md:hidden">
                          <a href={work.link} target="_blank" rel="noreferrer">
                            <Image
                              src={work.image as StaticImageData}
                              alt={`${t(work.company)} logo`}
                              fill
                              className="object-contain p-4"
                            />
                          </a>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row justify-between">
                        {/* Content Section */}
                        <div className="w-full p-4 md:p-6">
                          <CardHeader className="p-0 mb-4">
                            <div className="flex items-center gap-4">
                              {work.image && (
                                <div className="hidden md:block w-12 h-12 relative">
                                  <Image
                                    src={work.image as StaticImageData}
                                    alt={`${t(work.company)} logo`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              <div>
                                <CardTitle className="text-lg md:text-xl font-bold">
                                  <a
                                    href={work.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-blue-600 transition-colors"
                                  >
                                    {t(work.company)}
                                  </a>
                                </CardTitle>
                                <CardDescription className="text-sm md:text-base text-gray-600">
                                  {t(work.role)}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-0">
                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                              {t(work.duration)}
                            </p>
                            <ul className="space-y-1.5 md:space-y-2">
                              {work.bulletpoints.map(
                                (bulletPoint: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm md:text-base text-gray-600"
                                  >
                                    <span className="text-blue-500 mt-1.5">
                                      •
                                    </span>
                                    <span>{t(bulletPoint)}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </CardContent>
                        </div>

                        {/* Image Section - Desktop Right */}
                        {work.image && (
                          <div className="hidden md:block relative w-full md:w-1/4 h-48 md:h-auto">
                            <a
                              href={work.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Image
                                src={work.image as StaticImageData}
                                alt={`${t(work.company)} logo`}
                                fill
                                className="object-contain"
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceSection;
