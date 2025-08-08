"use client";
import { Card, CardContent } from "@/components/ui/card";
import { WorkStation } from "@/config/work-stations";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const WorkExperienceCard: React.FC<{
  work: WorkStation;
}> = ({ work }) => {
  const t = useTranslations("Home.WorkExperience");
  const [expanded, setExpanded] = useState(false);
  const translateOrEmpty = (key: string): string => {
    const value = t(key);
    if (typeof value !== "string") return "";
    return value.startsWith("workStations.") ? "" : value;
  };

  const introTexts = useMemo(() => {
    return (work.introTexts || [])
      .map((key) => translateOrEmpty(key))
      .filter((v) => v);
  }, [work]);

  const highlights = useMemo(() => {
    return (work.highlights || [])
      .map((key) => translateOrEmpty(key))
      .filter((v) => v);
  }, [work]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className={
        expanded
          ? `relative md:z-30 ${
              work.side === "right"
                ? "md:w-[calc(200%+4rem)] md:ml-[calc(-100%-4rem)]"
                : "md:w-[calc(200%+4rem)]"
            }`
          : "relative md:w-full"
      }
    >
      <Card
        className={
          "h-full overflow-hidden transition-all duration-300 bg-white/50 dark:bg-neutral-900/50 backdrop-blur border border-gray-100 dark:border-neutral-800 shadow-sm " +
          (expanded ? "md:shadow-md" : "hover:shadow-md")
        }
      >
        <CardContent className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {work.image && (
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow bg-white/80 dark:bg-neutral-900/80 border border-gray-100 dark:border-neutral-800 p-2">
                  <Image
                    src={work.image as StaticImageData}
                    alt={`${t(work.company)} logo`}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                    {t(work.company)}
                  </h3>
                  {/* Link to company */}
                  {work.link && (
                    <Link href={work.link} target="_blank">
                      <FaExternalLinkAlt className="opacity-60" />
                    </Link>
                  )}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 text-gray-700 dark:text-gray-300 text-xs md:text-sm">
                    {t(work.employmentType)}
                  </span>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                  {t(work.role)}
                </p>
              </div>
            </div>
          </div>

          {/* Duration & Location */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400 dark:text-gray-500" />
              <span>{t(work.duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500" />
              <span>{t("location")}</span>
            </div>
          </div>

          {/* Toggle Details */}
          <div className="mt-5 flex items-center justify-start text-sm text-gray-700">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors"
            >
              {expanded ? t("hideDetails") : t("viewDetails")}{" "}
              {expanded ? (
                <FaChevronUp className="opacity-60" />
              ) : (
                <FaChevronDown className="opacity-60" />
              )}
            </button>
          </div>

          {/* Animated Description (inline) */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="details-inline"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden mt-4 border-t border-gray-100 pt-4"
              >
                {introTexts.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {introTexts.map((txt, i) => (
                      <p
                        key={`intro-${i}`}
                        className="text-gray-700 leading-relaxed"
                      >
                        {txt}
                      </p>
                    ))}
                  </div>
                )}
                {highlights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {t("highlightsTitle", {
                        namespace: "Home.WorkExperience",
                      }) || "Highlights"}
                    </h4>
                    <div className="space-y-2">
                      {highlights.map((h, i) => (
                        <motion.div
                          key={`hl-${i}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.03 * i }}
                          className="flex items-start gap-3"
                        >
                          <FaCheckCircle className="mt-0.5 text-blue-500 flex-shrink-0" />
                          <p className="text-gray-800 leading-relaxed">{h}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technologies (unter Details) */}
          {work.technologies?.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
              <div className="flex flex-wrap gap-2">
                {work.technologies.map((technology: string) => (
                  <span
                    key={`${work.slug}-${technology}`}
                    className="text-xs inline-flex px-2.5 py-1 rounded-full border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 text-gray-700 dark:text-gray-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Kein Overlay/Backdrop – Details bleiben in der Card */}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WorkExperienceCard;
