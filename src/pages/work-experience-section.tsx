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
    <div className="min-h-screen w-full" id="work">
      <div className="pt-28 flex flex-col w-full mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Work</h2>
        <div className="relative flex flex-col items-center">
          <div
            className={`absolute left-1/2 border-l-2 border-gray-300 h-full top-0`}
          />
          <div className="flex flex-col w-full items-center relative">
            {workStations.map((work, index) => (
              <div
                key={index}
                className="mb-10 flex items-center justify-center relative w-3/4"
              >
                <Card className="flex flex-row items-center justify-between rounded-lg shadow-xl p-6 m-4 w-full bg-white z-30">
                  <div className="w-4/6">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold">
                        <a href={work.link} target="_blank" rel="noreferrer">
                          {work.company}
                        </a>
                      </CardTitle>
                      <CardDescription className="text-lg font-medium">
                        {work.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-row items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">{work.duration}</p>
                      </div>
                      <div className="flex flex-row items-start">
                        <ul className="list-disc list-inside text-gray-600 text-left mb-4 flex-1">
                          {work.bulletpoints.map((bulletpoint, idx) => (
                            <li key={idx}>{bulletpoint}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>

                  <div className="w-2/6 z-40 cursor-pointer">
                    {work.image && (
                      <div className="mr-8">
                        <a href={work.link} target="_blank" rel="noreferrer">
                          <Image
                            src={work.image as StaticImageData}
                            alt={`${work.company} logo`}
                            height={400}
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
