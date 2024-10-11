"use client";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import React from "react";
import ReactGA from "react-ga4";
import { FaGithub, FaLinkedin, FaMapPin } from "react-icons/fa";
import MyAvatar from "../assets/me-laptop.webp";

const LandingSection: React.FC = () => {
  ReactGA.send("pageview");

  return (
    <div className="min-h-screen flex items-center justify-center" id="home">
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-10 px-4 md:px-10">
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left p-6 md:p-10 text-black animate-slideIn">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl xl:text-6xl">
            Hi, I'm Thomas Schwabauer!
          </h1>
          <h2 className="mb-4 text-2xl md:text-4xl">
            Freelance Fullstack Developer
          </h2>
          <p className="mb-4 font-light text-base md:text-lg lg:text-xl">
            Next.js | Angular | React.js | Spring Boot | Java | TypeScript |
            Flutter | Kotlin
          </p>
          <div className="mb-6 flex flex-row items-center justify-center md:justify-start">
            <FaMapPin className="mr-2" /> Wetzlar, Germany
          </div>
          <div className="flex space-x-4 z-40 mb-4 md:mb-0">
            <a
              href={siteConfig.links.linkedIn}
              target="_blank"
              rel="noreferrer"
            >
              <button className="flex items-center px-3 py-2 text-sm md:text-base text-white bg-[#0077b5] rounded shadow-md transition-transform duration-300 transform hover:scale-105">
                <FaLinkedin className="mr-2" />
                LinkedIn
              </button>
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <button className="flex items-center px-3 py-2 text-sm md:text-base text-white bg-[#333333] rounded shadow-md transition-transform duration-300 transform hover:scale-105">
                <FaGithub className="mr-2" />
                GitHub
              </button>
            </a>
          </div>
        </div>
        <div className="flex justify-center p-4 md:p-6">
          <Image
            src={MyAvatar}
            className="max-w-[200px] sm:max-w-[300px] md:max-w-[400px] h-auto rounded-full shadow-lg animate-fadeIn"
            alt="Avatar"
            height={300}
            style={{
              filter: "drop-shadow(5px 5px 5px #222)",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default LandingSection;
