"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import React from "react";
import { useTranslations } from "next-intl"; // Import the useTranslations hook

const getAge = () => {
  return moment().diff("1997-06-04", "years");
};

const AboutSection: React.FC = () => {
  const t = useTranslations('About'); // Load the "About" namespace

  const skills = {
    frameworks: {
      "React.js": "5",
      Angular: "5",
      "Next.js": "5",
      "Nest.js": "3",
      "Spring Boot": "2",
      Flutter: "5",
    },
    programming_languages: {
      Javascript: "5",
      Typescript: "5",
      Java: "3",
      Kotlin: "4",
      Dart: "5",
      PHP: "3",
    },
    devops_tools: {
      Docker: "3",
      Kubernetes: "3",
      Git: "5",
      Github: "5",
      Gitlab: "5",
      Bitbucket: "5",
      Jira: "3",
      Confluence: "4",
    },
    databases_apis: {
      Mysql: "4",
      Firebase: "4",
      "REST API": "5",
    },
  };

  return (
    <div
      className="pt-28 z-20 w-full min-h-screen p-5 flex flex-col items-center justify-center gap-10 relative"
      id="about"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
        {t('title')}
      </h2>
      {/* Combined About Me and Skill Matrix Card */}
      <Card className="w-full md:w-5/6 lg:w-3/4 shadow-lg rounded-lg z-30">
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 p-6">
            {/* About Me Section */}
            <div className="w-full lg:w-2/5">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {t('whoAmI')}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                {t('description')}
              </p>
              <Separator className="my-4" />
              <p className="text-base md:text-lg text-muted-foreground">
                {t('career')}{' '}
                <a href="#work" className="text-blue-500 hover:underline">
                  {t('careerLink')}
                </a>
                {t('careerProjects')}{' '}
                <a
                  href="https://www.audi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Audi
                </a>
                ,{' '}
                <a
                  href="https://www.porsche.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Porsche
                </a>
                , {t('and')}{' '}
                <a
                  href="https://www.bayer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Bayer
                </a>
                {t('includingProjects')}
              </p>
              <Separator className="my-4" />
              <p className="text-base md:text-lg text-muted-foreground">
                {t('niceToKnow', { age: getAge() })}
              </p>
            </div>

            {/* Skill Matrix Section */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {t('skillMatrix')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {t('frameworksLibraries')}
                  </h3>
                  <ul className="list-none">
                    {Object.entries(skills.frameworks).map(
                      ([name, rating], index) => {
                        return (
                          <li key={index} className="flex justify-between">
                            <span>{name}</span>
                            <span className="text-blue-500">
                              {"★".repeat(Number(rating)) +
                                "☆".repeat(5 - Number(rating))}
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                  <Separator className="my-4" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {t('programmingLanguages')}
                  </h3>
                  <ul className="list-none">
                    {Object.entries(skills.programming_languages).map(
                      ([name, rating], index) => {
                        return (
                          <li key={index} className="flex justify-between">
                            <span>{name}</span>
                            <span className="text-blue-500">
                              {"★".repeat(Number(rating)) +
                                "☆".repeat(5 - Number(rating))}
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {t('devOpsTools')}
                  </h3>
                  <ul className="list-none">
                    {Object.entries(skills.devops_tools).map(
                      ([name, rating], index) => {
                        return (
                          <li key={index} className="flex justify-between">
                            <span>{name}</span>
                            <span className="text-blue-500">
                              {"★".repeat(Number(rating)) +
                                "☆".repeat(5 - Number(rating))}
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                  <Separator className="my-4" />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">
                    {t('databasesApis')}
                  </h3>
                  <ul className="list-none">
                    {Object.entries(skills.databases_apis).map(
                      ([name, rating], index) => {
                        return (
                          <li key={index} className="flex justify-between">
                            <span>{name}</span>
                            <span className="text-blue-500">
                              {"★".repeat(Number(rating)) +
                                "☆".repeat(5 - Number(rating))}
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Button */}
          <div className="w-full flex justify-center">
            <Button
              className="mt-6 w-full md:w-1/2 lg:w-1/4 bg-blue-500 rounded shadow-md z-30
        transition-transform duration-300 transform hover:bg-blue-600 
        hover:scale-105"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t('contactButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
