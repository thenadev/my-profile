import React from "react";
import Navbar from "../components/navbar";
import About from "./About";
import Contact from "./Contact";
import DocumentSection from "./document-section";
import Projects from "./projects-section";
import WorkExperienceSection from "./work-experience-section";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-10">
        <div className="text-center min-h-screen min-w-full flex flex-col items-center">
          <WorkExperienceSection />
          <About />
          <WorkExperienceSection />
          <Projects />
          <DocumentSection />
          <Contact />
        </div>
      </div>
    </div>
  );
}
