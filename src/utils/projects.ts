import AmselLogo from "../assets/amsel_logo.jpg";
import MyDexLogo from "../assets/mydex.png";
import PerionDashboard from "../assets/perion_dashboard.png";
import PlanningPoker from "../assets/planning-poker.png";
import Portfolio from "../assets/portfolio.png";

export const projects = [
  {
    id: 0,
    image: PlanningPoker,
    descriptionKey: "planningPokerDescription",
    technologiesKey: "planningPokerTechnologies",
    livePreviewLink: "https://www.online-planning-poker.de/",
  },
  {
    id: 2,
    image: MyDexLogo,
    descriptionKey: "myDexDescription",
    technologiesKey: "myDexTechnologies",
    githubLink: "https://github.com/tjoooobooo/web3-academy",
    livePreviewLink: "https://my-o2wznex4e-tjoooobooo.vercel.app/",
  },
  {
    id: 3,
    image: PerionDashboard,
    descriptionKey: "perionDashboardDescription",
    technologiesKey: "perionDashboardTechnologies",
    // githubLink: 'https://github.com/tjoooobooo/perion_dashboard',
    livePreviewLink: "https://perion-dashboard.vercel.app/",
  },
  {
    id: 4,
    image: Portfolio,
    descriptionKey: "portfolioDescription",
    technologiesKey: "portfolioTechnologies",
    githubLink: "https://github.com/tjoooobooo/my-profile",
    livePreviewLink: "https://www.thomas-schwabauer.de/",
  },
];

  // {
  //   id: 1,
  //   image: AmselLogo,
  //   description:
  //     "A hybrid Webapp for searching/buying farmer and vending machine products.",
  //   technologies: "Flutter, Firebase, TypeScript, APIs",
  //   livePreviewLink: "https://amsel-ths.web.app/#/",
  // },