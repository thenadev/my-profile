"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import moment from "moment";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import { FaCode, FaDatabase, FaDocker, FaReact } from "react-icons/fa";

const getAge = () => {
  return moment().diff("1997-06-04", "years");
};

const AboutSection: React.FC = () => {
  const t = useTranslations("About");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

  const SkillBar = ({ name, level }: { name: string; level: string }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mb-4 w-full"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-sm text-blue-600">{level}/5</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full w-full">
        <motion.div
          initial={{ width: 0 }}
          animate={
            isInView ? { width: `${(Number(level) / 5) * 100}%` } : { width: 0 }
          }
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
        />
      </div>
    </motion.div>
  );

  const SkillCategory = ({
    title,
    icon,
    skills,
  }: {
    title: string;
    icon: React.ReactNode;
    skills: Record<string, string>;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-3 bg-blue-100 rounded-lg"
            >
              {icon}
            </motion.div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <div className="space-y-4 w-full">
            {Object.entries(skills).map(([name, level], index) => (
              <motion.div
                key={`${name}-${level}`}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SkillBar name={name} level={level} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="pt-28 w-full min-h-screen p-5" id="about" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 relative"
        >
          {t("title")}
        </motion.h2>

        {/* About Me Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="w-full">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-blue-600">
                    {t("whoAmI")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t("description")}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <p className="text-gray-600">
                      {t("niceToKnow", { age: getAge() })}
                    </p>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">
                    Karriere Highlights
                  </h3>
                  <p className="text-gray-600">
                    {t("career")}{" "}
                    <a href="#work" className="text-blue-500 hover:underline">
                      {t("careerLink")}
                    </a>
                    {t("careerProjects")}{" "}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Audi", "Porsche", "Bayer"].map((company, index) => (
                      <motion.a
                        key={company}
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        href={`https://www.${company.toLowerCase()}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        {company}
                      </motion.a>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white mt-4"
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      {t("contactButton")}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SkillCategory
            title={t("frameworksLibraries")}
            icon={<FaReact className="text-blue-600 text-2xl" />}
            skills={skills.frameworks}
          />
          <SkillCategory
            title={t("programmingLanguages")}
            icon={<FaCode className="text-blue-600 text-2xl" />}
            skills={skills.programming_languages}
          />
          <SkillCategory
            title={t("devOpsTools")}
            icon={<FaDocker className="text-blue-600 text-2xl" />}
            skills={skills.devops_tools}
          />
          <SkillCategory
            title={t("databasesApis")}
            icon={<FaDatabase className="text-blue-600 text-2xl" />}
            skills={skills.databases_apis}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
