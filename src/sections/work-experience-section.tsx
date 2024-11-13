"use client";

import { WorkStation, workStations } from "@/utils/work-stations";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkExperienceSection: React.FC = () => {
  const t = useTranslations("Work");

  return (
      <div className="min-h-screen flex w-full z-20 relative" id="work">
        <div className="pt-20 flex flex-col w-full mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            {t("title")}
          </h2>
          <div className="relative flex flex-col items-center">
            <div className="absolute left-1/2 border-l-2 border-gray-200 h-full top-0 hidden md:block" />
            <div className="flex flex-col w-full items-center">
              {workStations().map((work: WorkStation, index: number) => (
                  <div
                      key={index}
                      className="mb-6 flex flex-col md:flex-row items-center relative w-full sm:w-4/5 lg:w-3/5"
                  >
                    <Card className="flex flex-col md:flex-row items-center rounded-md shadow-md p-3 md:p-4 w-full bg-white">
                      <div className="w-full md:w-3/5 mb-3 md:mb-0">
                        <CardHeader>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-center md:text-left">
                            <a href={work.link} target="_blank" rel="noreferrer">
                              {t(work.company)}
                            </a>
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 text-center md:text-left">
                            {t(work.role)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-gray-500 mb-2 text-center md:text-left">
                            {t(work.duration)}
                          </p>
                          <ul className="list-disc list-inside text-gray-600 text-sm mb-2">
                            {work.bulletpoints.map((bulletPoint: string, idx: number) => (
                                <li key={idx}>{t(bulletPoint)}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </div>

                      <div className="w-full md:w-2/5 flex items-center justify-center">
                        {work.image && (
                            <a href={work.link} target="_blank" rel="noreferrer">
                              <Image
                                  src={work.image as StaticImageData}
                                  alt={`${t(work.company)} logo`}
                                  height={150}
                                  className="object-contain rounded-md shadow-md"
                              />
                            </a>
                        )}
                      </div>
                    </Card>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default WorkExperienceSection;
