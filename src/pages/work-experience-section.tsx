import { workStations } from "@/utils/work-stations";
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
    <div className="pt-20 bg-primary" id="work">
      <div className="min-h-screen flex flex-col mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Work</h2>
        <div className="w-full flex flex-col items-center justify-center">
          {workStations.map((work, index) => (
            <Card
              key={index}
              className="bg-gray-800 text-white shadow-lg rounded-lg p-6 m-4 md:w-4/6 w-11/12"
            >
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
                  <p className="text-sm text-gray-400">{work.duration}</p>
                </div>
                <ul className="list-disc list-inside text-gray-300 text-left mb-4">
                  {work.bulletpoints.map((bulletpoint, idx) => (
                    <li key={idx}>{bulletpoint}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceSection;
