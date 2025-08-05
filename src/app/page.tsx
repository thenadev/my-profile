"use client";

import About from "@/components/home/About";
import HomeContact from "@/components/home/Contact";
import HomeHero from "@/components/home/HomeHero";
import ProjectsSection from "@/components/home/Projects";
import ServicesSection from "@/components/home/Services";
import WorkExperienceSection from "@/components/home/Experience";
import React, { useEffect, useState } from "react";
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
      <HomeHero />
      {!isMobile && <ServicesSection />}
      <About />
      <WorkExperienceSection />
      <ProjectsSection />
      {/*<DocumentSection />*/}
      <HomeContact />
    </>
  );
};

export default HomePage;
