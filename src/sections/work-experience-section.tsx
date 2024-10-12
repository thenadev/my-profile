import { workStations } from "@/utils/work-stations";
import Image, { StaticImageData } from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"; // Adjust import based on your file structure

const WorkExperienceSection: React.FC = () => {
  return (
    <div className="min-h-screen flex w-full z-20 relative" id="work">
      <div className="pt-28 flex flex-col w-full mx-auto px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
          Work
        </h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute left-1/2 border-l-2 border-gray-300 h-full top-0 hidden md:block" />
          <div className="flex flex-col w-full items-center relative">
            {workStations.map((work, index) => (
              <div
                key={index}
                className="mb-8 sm:mb-10 flex flex-col md:flex-row items-center justify-center relative w-full sm:w-5/6 lg:w-3/4"
              >
                <Card className="flex flex-col md:flex-row items-center md:items-start justify-between rounded-lg shadow-xl p-4 md:p-6 m-2 md:m-4 w-full bg-white z-30">
                  <div className="w-full md:w-4/6 mb-4 md:mb-0">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-semibold text-center md:text-left">
                        <a href={work.link} target="_blank" rel="noreferrer">
                          {work.company}
                        </a>
                      </CardTitle>
                      <CardDescription className="text-base sm:text-lg font-medium text-center md:text-left">
                        {work.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row items-center md:justify-between mb-2 text-center md:text-left">
                        <p className="text-xs sm:text-sm text-gray-500">
                          {work.duration}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row items-start">
                        <ul className="list-disc list-inside text-gray-600 text-left text-sm sm:text-base mb-4 flex-1">
                          {work.bulletpoints.map((bulletpoint, idx) => (
                            <li key={idx}>{bulletpoint}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>

                  <div className="w-full h-full md:w-2/6 flex items-center justify-center z-40 cursor-pointer mb-4 md:mb-0">
                    {work.image && (
                      <div className="h-full flex items-center justify-center yw-3/4 sm:w-2/3 md:w-auto md:mr-8">
                        <a href={work.link} target="_blank" rel="noreferrer">
                          <Image
                            src={work.image as StaticImageData}
                            alt={`${work.company} logo`}
                            height={250}
                            className="object-contain rounded-2xl shadow-2xl cursor-pointer" // Added cursor-pointer here
                          />
                        </a>
                      </div>
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
