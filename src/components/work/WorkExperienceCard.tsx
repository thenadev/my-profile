"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WorkStation } from "@/config/work-stations";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface WorkExperienceCardProps {
  work: WorkStation;
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ work }) => {
  const t = useTranslations("Home.WorkExperience");
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm shadow-xl group">
      <CardContent className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {work.image && (
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg bg-white p-2">
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
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {t(work.company)}
                </h3>
                {/* Link to company */}
                {work.link && (
                  <Link href={work.link} target="_blank">
                    <FaExternalLinkAlt className="opacity-60" />
                  </Link>
                )}
                <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-gray-200 bg-white text-gray-600 text-xs md:text-sm">
                  {t(work.employmentType)}
                </span>
              </div>
              <p className="text-lg text-blue-600 font-semibold">
                {t(work.role)}
              </p>
            </div>
          </div>
        </div>

        {/* Duration & Location */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span>{t(work.duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
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

        {/* Animated Description */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden mt-4 border-t border-gray-100 pt-4"
            >
              <div className="space-y-3">
                {work.bulletpoints.map((bp, i) => (
                  <motion.div
                    key={`${work.slug}-detail-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.04 * i }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{t(bp)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technologies (unter Details) */}
        {work.technologies?.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {work.technologies.map((technology: string) => (
                <span
                  key={`${work.slug}-${technology}`}
                  className="text-xs inline-flex px-2.5 py-1 rounded-full border border-gray-200 bg-white"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceCard;
