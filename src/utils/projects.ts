import AmselLogo from "../assets/amsel_logo.jpg";
import MyDexLogo from "../assets/mydex.png";
import PerionDashboard from "../assets/perion_dashboard.png";
import PlanningPoker from "../assets/planning-poker.png";
import Portfolio from "../assets/portfolio.png";

export const projects = [
  {
    id: 0,
    image: PlanningPoker,
    description: "A free Online Planning Poker Website",
    technologies:
      "Next.js, React.js, TypeScript, Firebase Realtime Database, Tailwind, Shadcn/ui",
    livePreviewLink: "https://www.online-planning-poker.de/",
  },
  {
    id: 2,
    image: MyDexLogo,
    description:
      "A full decentralized Exchange deployed on the Sepolia Testnet, including the solidity smart contracts.",
    technologies: "React, Solidity, Hardhat, Foundry",
    githubLink: "https://github.com/tjoooobooo/web3-academy",
    livePreviewLink: "https://my-o2wznex4e-tjoooobooo.vercel.app/",
  },
  {
    id: 3,
    image: PerionDashboard,
    description:
      "A dashboard portfolio which grabs daily data for crypto prices and other relevant web3 meta data",
    technologies: "React.js, TypeScript, API's, Cron",
    // githubLink: 'https://github.com/tjoooobooo/perion_dashboard',
    livePreviewLink: "https://perion-dashboard.vercel.app/",
  },
  {
    id: 1,
    image: AmselLogo,
    description:
      "A hybrid Webapp for searching/buying farmer and vending machine products.",
    technologies: "Flutter, Firebase, TypeScript, APIs",
    livePreviewLink: "https://amsel-ths.web.app/#/",
  },
  {
    id: 4,
    image: Portfolio,
    description: "My portfolio website",
    technologies: "React, TypeScript, Tailwind",
    githubLink: "https://github.com/tjoooobooo/my-profile",
    livePreviewLink: "https://www.thomas-schwabauer.de/",
  },
];
