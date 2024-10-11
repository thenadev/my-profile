import moment from "moment";
import React from "react";

const getAge = () => {
  return moment().diff("04.06.1997", "years");
};

const AboutMe: React.FC = () => {
  return (
    <div
      className="pt-20 min-h-screen p-5 flex items-center justify-center"
      id="about"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
        <div className="text-left max-w-xl mx-auto">
          <p className="text-lg text-gray-700">
            I'm an analytical and solution-oriented consultant and
            self-motivated software developer with sound knowledge in customer
            support, project management, Angular, TypeScript, Android
            development and Kotlin, eager to create innovative solutions and to
            continuously further development.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            During my&nbsp;
            <a href="#work" className="underline">
              career
            </a>
            , I have worked on various projects, including web applications,
            mobile apps, and backend systems. My skills include React, Node.js,
            TypeScript, and much more.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            I'm dedicated to continuously learning and improving my skills to
            stay up-to-date with the latest technologies in the field of
            software development!
          </p>
          <p className="text-lg text-gray-700 mt-4">Age: {getAge()}</p>
          {/* Add additional relevant information here */}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
