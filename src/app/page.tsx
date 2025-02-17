"use client";

import About from "@/sections/about-section";
import ContactSection from "@/sections/contact-section";
import LandingSection from "@/sections/landing-section";
import ProjectsSection from "@/sections/projects-section";
import ServicesSection from "@/sections/services-section";
import WorkExperienceSection from "@/sections/work-experience-section";
import React, {useEffect, useState} from "react";
import "./globals.css";

const HomePage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
    }, []);

  return (
    <>
      <LandingSection />
        {!isMobile && (
            <ServicesSection />
        )}
      <About />
      <WorkExperienceSection />
      <ProjectsSection />
      {/*<DocumentSection />*/}
      <ContactSection />
    </>
  );
};

export default HomePage;
