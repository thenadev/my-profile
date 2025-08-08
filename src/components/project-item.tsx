"use client";

import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { FaGithub, FaGlobe } from "react-icons/fa"; // GitHub and Globe icons
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export interface ProjectProps {
  key: number;
  id: number; // This prop is explicitly provided and can be used in the component
  imageSrc: StaticImageData;
  descriptionKey: string; // Changed to use translation key
  technologiesKey: string; // Changed to use translation key
  githubLink?: string;
  livePreviewLink?: string;
}

const ProjectItem: React.FC<ProjectProps> = ({
  imageSrc,
  descriptionKey,
  technologiesKey,
  githubLink,
  livePreviewLink,
}) => {
  const t = useTranslations("Projects");

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      {/* Card Component with Consistent Height */}
      <Card className="h-full flex flex-col shadow-lg group">
        {/* Image Section with Overlay for Icons */}
        <div className="relative h-48 flex-shrink-0">
          <Image
            className="object-contain w-full h-full rounded-t-lg"
            src={imageSrc}
            alt={t(descriptionKey)} // Use translation key in alt text
          />
          <div
            className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100
            rounded-t-lg bg-black bg-opacity-60 transition-opacity duration-300"
          >
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white hover:bg-gray-200 transition-transform duration-300 transform hover:scale-110"
              >
                <FaGithub className="text-gray-800" />
              </a>
            )}
            {livePreviewLink && (
              <a
                href={livePreviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform duration-300 transform hover:scale-110"
              >
                <FaGlobe className="text-gray-800" />
              </a>
            )}
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="flex flex-col justify-between flex-grow p-4">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              {t(descriptionKey)}
            </CardTitle>{" "}
            {/* Localized description */}
          </CardHeader>
          <div>
            <CardDescription className="text-xs text-gray-500">
              {t("technologies_used")}:
            </CardDescription>
            <p className="text-sm text-gray-700">{t(technologiesKey)}</p>{" "}
            {/* Localized technologies */}
          </div>
        </CardContent>

        {/* Card Footer (Optional) */}
        <CardFooter className="mt-4">
          {/* Footer content can be added here if necessary */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectItem;
