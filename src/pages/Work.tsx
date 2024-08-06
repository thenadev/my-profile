import React from "react";

const workStations = [
  {
    company: "Amsel UG",
    role: "CTO",
    duration: "Jul 2023 - Today",
    location: "Langgöns",
    link: "https://www.amsel-store.de/",
    bulletpoints: [
      "Expertise in the planning and implementation of complex software projects",
      "Extensive knowledge in the evaluation and implementation of new technologies",
      "Good understanding of Flutter framework and Dart programming",
    ],
  },
  {
    company: "Valtech-Mobility GmbH",
    role: "Consultant",
    duration: "Mar 2032 - Today",
    link: "https://valtech-mobility.de/",
    bulletpoints: [
      "Responsible for direct cooperation and customer care as well as the maintenance of business relationships",
      "Project management of consulting projects, including time planning and resource management",
      "Development of in-car apps with Android Automotive and Java/Kotlin",
      "Development of web applications with Angular and Typescript",
    ],
  },
  {
    company: "Alcedis GmbH",
    role: "Software developer",
    duration: "Jul 2020 - Feb 2023",
    link: "https://www.alcedis.de/en",
    bulletpoints: [
      "Development of automation tests for web applications in an agile environment",
      "Integration of test automation into the development process",
      "3 years of experience in the development of web applications with HTML, CSS, Laravel, PHP, React, TypeScript, Docker",
      "Experience working with Node.js and Express.js to create backend services and APIs",
    ],
  },
  {
    company: "Alcedis GmbH",
    role: "Software tester",
    duration: "Jun 2018 - Jul 2020",
    link: "https://www.alcedis.de/en",
    bulletpoints: [
      "Creation and maintenance of test documentation",
      "Execution of manual functional and regression tests",
      "Development and maintenance of automated test scripts for web applications",
      "Collaborating with developers and other stakeholders to analyze errors",
    ],
  },
];

const Work: React.FC = () => {
  return (
    <div className="pt-20" id="work">
      <div className="min-h-screen flex flex-col mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">Work</h2>
        <div className="w-full flex flex-col items-center justify-center">
          {workStations.map((work, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-lg rounded-lg p-6 m-4 w-4/6 flex flex-col items-center"
            >
              <a href={work.link} target="_blank" rel="noreferrer">
                <h3 className="text-2xl text-black font-semibold">
                  {work.company}
                </h3>
              </a>
              <p className="text-lg text-gray-700 font-medium">{work.role}</p>
              <div className="flex flex-row items-center justify-center mb-2">
                <p className="text-sm text-gray-600">{work.duration}</p>
              </div>
              <ul className="list-disc list-inside text-gray-600 text-left mb-4">
                {work.bulletpoints.map((bulletpoint, idx) => (
                  <li key={idx}>{bulletpoint}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
