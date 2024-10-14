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
  id,
  imageSrc,
  descriptionKey,
  technologiesKey,
  githubLink,
  livePreviewLink,
}) => {
  const t = useTranslations("Projects");

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 z-40">
      {/* Card Component with Fixed Height */}
      <Card className="transition-transform transform hover:scale-110 h-96 shadow-lg group">
        {/* Image Section with Overlay for Icons */}
        <div className="relative p-4 h-2/4">
          <Image
            className="w-full h-48 object-cover rounded-t-xl"
            src={imageSrc}
            alt={t(descriptionKey)} // Use translation key in alt text
          />
          <div
            className="absolute inset-0 gap-2 flex 
          justify-center items-center opacity-0 group-hover:opacity-100 
          bg-opacity-80 transition-opacity duration-300"
          >
            {githubLink && (
              <Button className="transition-transform duration-300 transform hover:scale-110">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 p-1 rounded-full 
                flex items-center justify-center bg-white hover:bg-gray-200"
                >
                  <FaGithub className="text-gray-800" />
                </a>
              </Button>
            )}
            {livePreviewLink && (
              <Button className="transition-transform duration-300 transform hover:scale-110">
                <a
                  href={livePreviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 p-1 rounded-full 
                flex items-center justify-center bg-gray-200 hover:bg-gray-300"
                >
                  <FaGlobe className="text-gray-800" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="h-2/4 w-full p-2">
          <CardHeader>
            <CardTitle>{t(descriptionKey)}</CardTitle>{" "}
            {/* Localized description */}
          </CardHeader>
          <div className="mx-4 text-black">
            <CardDescription>{t("technologies_used")}:</CardDescription>
            <p className="text-sm">{t(technologiesKey)}</p>{" "}
            {/* Localized technologies */}
          </div>
        </CardContent>

        {/* Card Footer (Optional, if you have footer content) */}
        <CardFooter>
          {/* You can add additional footer content here if necessary */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectItem;
