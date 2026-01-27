import ProjectItem from "@/components/project-item";
import { useTranslations } from "next-intl";
import React from "react";
import { projects } from "../../config/projects";

export const HomeProjects: React.FC = () => {
  const t = useTranslations("Projects");

  return (
    <div
      className="min-h-screen w-full flex flex-wrap items-center justify-center z-20 relative"
      id="projects"
    >
      <div className="w-5/6 md:w-3/4 pt-28">
        <h2 className="text-4xl text-center font-bold text-foreground">{t("title")}</h2>
        <div className="flex flex-wrap">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              id={project.id}
              imageSrc={project.image}
              descriptionKey={project.descriptionKey}
              technologiesKey={project.technologiesKey}
              githubLink={project.githubLink}
              livePreviewLink={project.livePreviewLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProjects;
