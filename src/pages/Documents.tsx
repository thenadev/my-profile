import React from "react";

const documents = [
  {
    title: "Curriculum Vitae",
    description: "My latest CV",
    url: "/cv.pdf",
  },
  {
    title: "Bachelor certificate",
    description: "B. Sc. of Informatics certificate",
    url: "/bachelor-certificate.pdf",
  },
  {
    title: "Certificate of completion",
    description: "Blockchain assessments on AlgoExpert.io ",
    url: "/BlockchainExpert_Certificate.pdf",
  },
  {
    title: "Spring Boot 3, Spring 6 & Hibernate for Beginners",
    description: "Skills: Java, Spring Boot, Hibernate, REST-API, CRUD, JPA, AOP",
    url: "/Spring-Boot-Beginners.pdf",
  },
];

const Documents: React.FC = () => {
  return (
    <div
      className="pt-20 min-h-screen flex flex-col items-center justify-center container mx-auto mt-8"
      id="documents"
    >
      <h2 className="text-4xl font-bold text-black dark:text-white mb-8">
        Documents
      </h2>
      <div className="flex flex-wrap justify-center">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 m-4 w-80 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2">{doc.title}</h3>
              <p className="text-lg text-gray-700 mb-4">{doc.description}</p>
            </div>
            <div className="mt-auto">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Document
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
