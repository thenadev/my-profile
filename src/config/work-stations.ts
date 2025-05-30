import { StaticImageData } from "next/image";
import AlcedisLogo from "../assets/work/alcedis_logo.webp";
import AmselLogo from "../assets/work/amsel_logo.png";
import FreelanceLogo from "../assets/work/logo-owl-big.png";
import ValtechLogo from "../assets/work/valtech_logo.jpeg";

export interface WorkStation {
  company: string;
  role: string;
  duration: string;
  location: string;
  link: string;
  image: StaticImageData;
  bulletpoints: string[];
}

export const workStations = (): WorkStation[] => {
  return [
    {
      company: "freelancerCompany",
      role: "freelancerRole",
      duration: "freelancerDuration",
      location: "freelancerLocation",
      link: "https://www.thomas-schwabauer.de/",
      image: FreelanceLogo,
      bulletpoints: [
        "freelancerBullet1",
        "freelancerBullet2",
        "freelancerBullet3",
      ],
    },
    {
      company: "amselCompany",
      role: "amselRole",
      duration: "amselDuration",
      location: "amselLocation",
      link: "https://www.amsel-store.de/",
      image: AmselLogo,
      bulletpoints: [
        "amselBullet1",
        "amselBullet2",
        "amselBullet3",
        "amselBullet4",
      ],
    },
    {
      company: "vmCompany",
      role: "vmRole",
      duration: "vmDuration",
      location: "amselLocation",
      link: "https://valtech-mobility.de/",
      image: ValtechLogo,
      bulletpoints: ["vmBullet1", "vmBullet2", "vmBullet3", "vmBullet4"],
    },
    {
      company: "alcedisCompany",
      role: "alcedisRole",
      location: "amselLocation",
      duration: "alcedisDuration",
      link: "https://www.alcedis.de/en",
      image: AlcedisLogo,
      bulletpoints: [
        "alcedisBullet1",
        "alcedisBullet2",
        "alcedisBullet3",
        "alcedisBullet4",
      ],
    },
    {
      company: "alcedisTesterCompany",
      role: "alcedisTesterRole",
      location: "amselLocation",
      duration: "alcedisTesterDuration",
      link: "https://www.alcedis.de/en",
      image: AlcedisLogo,
      bulletpoints: [
        "alcedisTesterBullet1",
        "alcedisTesterBullet2",
        "alcedisTesterBullet3",
        "alcedisTesterBullet4",
      ],
    },
  ];
};
