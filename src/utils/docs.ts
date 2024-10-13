import { platform } from "os";

export const documents = [
  {
    title: "Bachelor of Science (B.Sc.)",
    description: "Bachelor's program: computer science",
    url: "/bachelor-certificate.pdf",
  },
  {
    title: "Curriculum Vitae",
    description: "My latest CV available in both English and German.",
    links: [
      { language: "English", url: "/cv-en.pdf" },
      { language: "German", url: "/cv-de.pdf" },
    ],
  },
  {
    title: "Blockchain Expert - Certificate of completion",
    platform: "AlgoExpert.io",
    description: "Solidity, web3.js, Ethereum, Hardhat, Truffle",
    url: "/BlockchainExpert_Certificate.pdf",
  },
  {
    platform: "Udemy",
    title: "Spring Boot & Hibernate for Beginners",
    description: "Java, Spring Boot, Hibernate, REST-API, CRUD, JPA, AOP",
    url: "/Spring-Boot-Beginners.pdf",
  },
];
