import { StaticImageData } from "next/image";
import FreelanceLogo from "../assets/logo-owl-simple.png";
import AlcedisLogo from "../assets/work/alcedis_logo.webp";
import AmselLogo from "../assets/work/amsel_logo.png";
import ValtechLogo from "../assets/work/valtech_logo.jpeg";

export interface WorkStation {
  slug: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  link?: string;
  image: StaticImageData;
  introTexts: string[]; // i18n keys: workStations.<key>.details.intro.<i>
  highlights: string[]; // i18n keys: workStations.<key>.details.highlights.<i>
  technologies: string[];
  employmentType: string; // i18n key under Home.WorkExperience.employment
  side: "left" | "right";
}

// Konfiguration für Work Stations mit Anzahl der Bullet Points
interface WorkStationConfig {
  key: string;
  link?: string;
  image: StaticImageData;
  introCount?: number; // Anzahl Intro-Absätze
  highlightsCount?: number; // Anzahl Highlight-Punkte
  technologies: string[];
  employmentType: "fulltime" | "parttime" | "workingStudent";
  side?: "left" | "right"; // optional, falls nicht gesetzt wird alterniert es
}

const workStationConfigs: WorkStationConfig[] = [
  {
    key: "hypofy",
    image: FreelanceLogo,
    introCount: 2,
    highlightsCount: 5,
    employmentType: "fulltime",
    side: "right",
    technologies: [
      "Flutter",
      "Dart",
      "Web-Technologien",
      "MongoDB",
      "Docker",
      "Traefik",
      "Vision-LLMs",
      "OCR",
      "Machine Learning",
      "Chatbot-Integration",
    ],
  },
  {
    key: "freelancer",
    image: FreelanceLogo,
    introCount: 2,
    highlightsCount: 5,
    employmentType: "parttime",
    side: "left",
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
    introCount: 2,
    highlightsCount: 4,
    employmentType: "parttime",
    side: "right",
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
    introCount: 2,
    highlightsCount: 4,
    employmentType: "fulltime",
    side: "left",
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
    introCount: 2,
    highlightsCount: 3,
    employmentType: "fulltime",
    side: "right",
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
    introCount: 2,
    highlightsCount: 3,
    employmentType: "workingStudent",
    side: "right",
    technologies: [],
  },
];

const generateDetailTexts = (
  stationKey: string,
  key: "intro" | "highlights",
  count: number = 0,
): string[] => {
  return Array.from(
    { length: Math.max(0, count) },
    (_, index) => `workStations.${stationKey}.details.${key}.${index}`,
  );
};

export const workStations = (): WorkStation[] => {
  // Fallback: alterniere Seiten für Einträge ohne explizite Side
  let toggle: "left" | "right" = "left";
  return workStationConfigs.map((config) => {
    const side = config.side ?? (toggle = toggle === "left" ? "right" : "left");
    return {
      slug: config.key,
      company: `workStations.${config.key}.company`,
      role: `workStations.${config.key}.role`,
      duration: `workStations.${config.key}.duration`,
      location: `workStations.${config.key}.location`,
      link: config.link,
      image: config.image,
      introTexts: generateDetailTexts(
        config.key,
        "intro",
        config.introCount ?? 0,
      ),
      highlights: generateDetailTexts(
        config.key,
        "highlights",
        config.highlightsCount ?? 0,
      ),
      technologies: config.technologies,
      employmentType: `employment.${config.employmentType}`,
      side,
    };
  });
};
