"use client";

import About from "@/pages/About";
import DocumentSection from "@/pages/document-section";

import LandingSection from "@/pages/landing-section";
import ProjectsSection from "@/pages/projects-section";
import WorkExperienceSection from "@/pages/work-experience-section";
import React from "react";
import ReactGA from "react-ga4";
import "./globals.css";

const HomePage: React.FC = () => {
  ReactGA.send("pageview");

  return (
    <>
      <LandingSection />
      <About />
      <WorkExperienceSection />
      <ProjectsSection />
      <DocumentSection />
    </>
  );
};

export default HomePage;
