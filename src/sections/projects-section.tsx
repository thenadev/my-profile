import React from "react";
import Project from "../components/project";
import { projects } from "../utils/projects"; // Import the Project component

export const ProjectsSection: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-wrap items-center justify-center z-20 relative"
      id="projects"
    >
      <div className="w-5/6 md:w-3/4 pt-28">
        <h2 className="text-4xl text-center font-bold">My Projects</h2>
        <div className="flex flex-wrap">
          {projects.map((project) => (
            <Project
              key={project.id} // Key is used here for React's internal usage
              id={project.id} // Pass the id explicitly if you need to use it inside the component
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
