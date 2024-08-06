import React from "react";
import Navbar from "../components/Navbar";
import About from "./About";
import Contact from "./Contact";
import Documents from "./Documents";
import Landing from "./Landing";
import Projects from "./Projects";
import Work from "./Work";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Landing />
      <About />
      <Work />
      <Projects />
      <Documents />
      <Contact />
    </div>
  );
}
