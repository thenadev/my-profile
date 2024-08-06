import React from "react";
import { projects } from "../utils/projects"; // Import the Project component
import Project from "./Project";

const Portfolio: React.FC = () => {
  return (
    <div
      className="pt-20 h-fit flex flex-wrap items-center justify-center container mx-auto mt-8"
      id="projects"
    >
      <h2 className="text-4xl font-bold text-white-900">My Projects</h2>
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
