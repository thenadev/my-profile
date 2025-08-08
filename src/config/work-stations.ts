import { StaticImageData } from "next/image";
import AlcedisLogo from "../assets/work/alcedis_logo.webp";
import AmselLogo from "../assets/work/amsel_logo.png";
import FreelanceLogo from "../assets/work/logo-owl-big.png";
import ValtechLogo from "../assets/work/valtech_logo.jpeg";

export interface WorkStation {
  slug: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  link?: string;
  image: StaticImageData;
  bulletpoints: string[];
  technologies: string[];
  employmentType: string; // i18n key under Home.WorkExperience.employment
}

// Konfiguration für Work Stations mit Anzahl der Bullet Points
interface WorkStationConfig {
  key: string;
  link?: string;
  image: StaticImageData;
  bulletPointCount: number;
  technologies: string[];
  employmentType: "fulltime" | "parttime" | "workingStudent";
}

const workStationConfigs: WorkStationConfig[] = [
  {
    key: "freelancer",
    image: FreelanceLogo,
    bulletPointCount: 3,
    employmentType: "fulltime",
    technologies: [
      "Next.js",
      "React.js",
      "Angular",
      "Vue.js",
      "TypeScript",
      "PHP",
      "Tailwind",
      "Shadcn/ui",
      "Flutter",
      "Dart",
      "Jest",
      "Eslint",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    key: "amsel",
    link: "https://www.amsel-store.de/",
    image: AmselLogo,
    bulletPointCount: 4,
    employmentType: "parttime",
    technologies: [
      "Flutter",
      "Dart",
      "Java",
      "SpringBoot",
      "Typescript",
      "Jest",
      "Eslint",
      "Next.js",
      "React.js",
      "Tailwind",
      "Shadcn/ui",
      "Firebase",
    ],
  },
  {
    key: "vm",
    link: "https://valtech-mobility.de/",
    image: ValtechLogo,
    bulletPointCount: 4,
    employmentType: "fulltime",
    technologies: [
      "Angular",
      "Typescript",
      "Node.js",
      "Kotlin",
      "Android Automotive",
      "Jest",
      "Eslint",
      "Docker",
      "SonarQube",
      "Jira",
      "Confluence",
    ],
  },
  {
    key: "alcedis",
    link: "https://www.alcedis.de/en",
    image: AlcedisLogo,
    bulletPointCount: 4,
    employmentType: "fulltime",
    technologies: [
      "PHP",
      "Laravel",
      "TypeScript",
      "React.js",
      "Docker",
      "Kubernetes",
      "Gitlab",
      "Selenium",
      "Gauge",
    ],
  },
  {
    key: "alcedisTester",
    link: "https://www.alcedis.de/en",
    image: AlcedisLogo,
    bulletPointCount: 4,
    employmentType: "workingStudent",
    technologies: [],
  },
];

// Hilfsfunktion um dynamisch Bullet Points zu generieren
const generateBulletPoints = (stationKey: string, count: number): string[] => {
  return Array.from(
    { length: count },
    (_, index) => `workStations.${stationKey}.bulletPoints.${index}`
  );
};

export const workStations = (): WorkStation[] => {
  return workStationConfigs.map((config) => ({
    slug: config.key,
    company: `workStations.${config.key}.company`,
    role: `workStations.${config.key}.role`,
    duration: `workStations.${config.key}.duration`,
    location: `workStations.${config.key}.location`,
    link: config.link,
    image: config.image,
    bulletpoints: generateBulletPoints(config.key, config.bulletPointCount),
    technologies: config.technologies,
    employmentType: `employment.${config.employmentType}`,
  }));
};
