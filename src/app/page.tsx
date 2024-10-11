"use client";

import About from "@/sections/about-section";
import DocumentSection from "@/sections/document-section";

import ContactSection from "@/sections/contact-section";
import LandingSection from "@/sections/landing-section";
import ProjectsSection from "@/sections/projects-section";
import WorkExperienceSection from "@/sections/work-experience-section";
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
      <ContactSection />
    </>
  );
};

export default HomePage;
