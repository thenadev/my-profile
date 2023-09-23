import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import React from "react";
import Landing from "../components/Landing";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar/>
            <Landing/>
            <Projects />
            <About/>
            <Contact />
        </div>
    );
}
