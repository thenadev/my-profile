import React from 'react';
import { GithubButton } from "./GithubButton";
import DemoButton from "./DemoButton";

export interface ProjectProps {
    image: string;
    description: string;
    technologies: string;
    githubLink?: string;
    livePreviewLink?: string;
}

const Project: React.FC<ProjectProps> = ({ image, description, technologies, githubLink, livePreviewLink }) => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="relative">
                <img className="z-0 rounded-3xl project-image" src={image} alt="Project" />
                <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {githubLink && (
                        <GithubButton className="px-4" githubLink={githubLink} />
                    )}
                    {livePreviewLink && (
                        <DemoButton livePreviewLink={livePreviewLink}/>
                    )}
                </div>
            </div>
            <p className="mt-2 text-black">{description}</p>
            <div className="mt-2 text-black">
                <p>Technologies Used:</p>
                <p>{technologies}</p>
            </div>
        </div>
    );
};

export default Project;
