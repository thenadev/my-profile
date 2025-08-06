"use client";

import HomeContact from "@/components/home/Contact";
import About from "@/components/home/HomeAbout";
import HomeHero from "@/components/home/HomeHero";
import HomeWorkExperience from "@/components/home/HomeWorkExperience";
import ProjectsSection from "@/components/home/Projects";
import ServicesSection from "@/components/home/Services";
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
      <About />
      <HomeWorkExperience />
      <ProjectsSection />
      {/*<DocumentSection />*/}
      <HomeContact />
    </>
  );
};

export default HomePage;
