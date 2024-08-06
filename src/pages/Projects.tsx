import React from "react";
import Project from "../components/Project";
import { projects } from "../utils/projects"; // Import the Project component

const Portfolio: React.FC = () => {
  return (
    <div
      className="md:p-20 pt-20 min-h-screen w-full flex flex-wrap items-center justify-center bg-gray-100 mt-8"
      id="projects"
    >
      <h2 className="text-4xl font-bold text-black">My Projects</h2>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <Project
            key={index}
            image={project.image}
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

export default Portfolio;
