import { FaGithub, FaJava, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  SiAndroid,
  SiAngular,
  SiDocker,
  SiFlutter,
  SiJavascript,
  SiKotlin,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si"; // New icons

export const initialOrbs = [
  {
    id: 1,
    color: "rgb(51, 119, 182)",
    knowledge: 90,
    icon: <SiKotlin />,
    description: "Kotlin is a modern programming language.",
    link: "https://kotlinlang.org/",
  },
  {
    id: 2,
    color: "rgb(222, 171, 90)",
    knowledge: 70,
    icon: <SiDocker />,
    description: "Docker is an open platform for developing applications.",
    link: "https://www.docker.com/",
  },
  {
    id: 3,
    color: "rgb(80 118 155)",
    knowledge: 90,
    icon: <SiTypescript />,
    description: "TypeScript is a superset of JavaScript.",
    link: "https://www.typescriptlang.org/",
  },
  {
    id: 4,
    color: "rgb(80 118 155)",
    knowledge: 90,
    icon: <SiNextdotjs />,
    description: "Next.js is a React framework for production.",
    link: "https://nextjs.org/",
  },
  {
    id: 5,
    color: "rgb(51, 119, 182)",
    knowledge: 90,
    icon: <SiAngular />,
    description:
      "Angular is a platform for building mobile and desktop web applications.",
    link: "https://angular.io/",
  },
  {
    id: 6,
    color: "rgb(222, 171, 90)",
    knowledge: 90,
    icon: <SiReact />,
    description: "React is a JavaScript library for building user interfaces.",
    link: "https://reactjs.org/",
  },
  {
    id: 7,
    color: "rgb(222, 171, 90)",
    knowledge: 90,
    icon: <SiAndroid />,
    description: "Android is a mobile operating system developed by Google.",
    link: "https://www.android.com/",
  },
  {
    id: 8,
    color: "rgb(51, 119, 182)",
    knowledge: 90,
    icon: <SiFlutter />,
    description: "Flutter is an open-source UI software development toolkit.",
    link: "https://flutter.dev/",
  },
  {
    id: 9, // Java orb
    color: "rgb(160 102 38)", // You can choose any color you prefer
    knowledge: 85,
    icon: <FaJava />, // Java icon
    description: "Java is a high-level, class-based programming language.",
    link: "https://www.oracle.com/java/",
  },
];
