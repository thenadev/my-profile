import React from "react";
import Project from "../components/project";
import { projects } from "../utils/projects"; // Import the Project component

export const ProjectsSection: React.FC = () => {
  return (
    <div
      className="md:p-20 pt-20 min-h-screen w-full flex flex-wrap items-center justify-center bg-primary text-white"
      id="projects"
    >
      <h2 className="text-4xl font-bold">My Projects</h2>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <Project
            imageSrc={project.image}
            description={project.description}
            technologies={project.technologies}
            githubLink={project.githubLink}
            livePreviewLink={project.livePreviewLink}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
