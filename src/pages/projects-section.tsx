import React from "react";
import Project from "../components/project";
import { projects } from "../utils/projects"; // Import the Project component

export const ProjectsSection: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-wrap items-center justify-center z-50"
      id="projects"
    >
      <div className="w-3/4 pt-28">
        <h2 className="text-4xl text-center font-bold">My Projects</h2>
        <div className="flex flex-wrap">
          {projects.map((project, index) => (
            <Project
              id={project.id}
              imageSrc={project.image}
              description={project.description}
              technologies={project.technologies}
              githubLink={project.githubLink}
              livePreviewLink={project.livePreviewLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
