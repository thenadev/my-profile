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
  SiSpringboot,
  SiTypescript,
} from "react-icons/si"; // New icons

export const initialOrbs = [
  {
    id: 1,
    color: "rgb(51, 119, 182)",
    knowledge: 75,
    icon: <SiKotlin />,
    description:
      "Kotlin is a concise, modern programming language for Android and Java development.",
    link: "https://kotlinlang.org/",
  },
  {
    id: 2,
    color: "rgb(222, 171, 75)",
    knowledge: 60,
    icon: <SiDocker />,
    description:
      "Docker simplifies creating, deploying, and running applications using containers.",
    link: "https://www.docker.com/",
  },
  {
    id: 3,
    color: "rgb(80, 118, 155)",
    knowledge: 75,
    icon: <SiTypescript />,
    description:
      "TypeScript is a strongly-typed superset of JavaScript that adds static types.",
    link: "https://www.typescriptlang.org/",
  },
  {
    id: 4,
    color: "rgb(80, 118, 155)",
    knowledge: 75,
    icon: <SiNextdotjs />,
    description:
      "Next.js is a React framework for building optimized, production-ready applications.",
    link: "https://nextjs.org/",
  },
  {
    id: 5,
    color: "rgb(51, 119, 182)",
    knowledge: 75,
    icon: <SiAngular />,
    description:
      "Angular is a powerful platform for building scalable web applications.",
    link: "https://angular.io/",
  },
  {
    id: 6,
    color: "rgb(222, 171, 75)",
    knowledge: 75,
    icon: <SiReact />,
    description:
      "React is a popular JavaScript library for creating interactive user interfaces.",
    link: "https://reactjs.org/",
  },
  {
    id: 7,
    color: "rgb(222, 171, 75)",
    knowledge: 75,
    icon: <SiAndroid />,
    description:
      "Android is the world's leading mobile operating system, developed by Google.",
    link: "https://www.android.com/",
  },
  {
    id: 8,
    color: "rgb(51, 119, 182)",
    knowledge: 75,
    icon: <SiFlutter />,
    description:
      "Flutter allows building natively compiled applications for mobile, web, and desktop.",
    link: "https://flutter.dev/",
  },
  {
    id: 9,
    color: "rgb(160 102 38)",
    knowledge: 65,
    icon: <FaJava />,
    description:
      "Java is a versatile, high-level programming language widely used for cross-platform development.",
    link: "https://www.oracle.com/java/",
  },
  {
    id: 10,
    color: "rgb(222, 171, 75)",
    knowledge: 55,
    icon: <SiSpringboot />,
    description:
      "Spring Boot simplifies building production-ready Java applications with minimal configuration.",
    link: "https://spring.io/projects/spring-boot",
  },
];
