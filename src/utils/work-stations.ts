import { useTranslations } from "next-intl";
import Freelance from "../assets/logo-owl-big.png";
import Alcedis from "../assets/work-alcedis.png";
import Amsel from "../assets/work-amsel.png";
import VM from "../assets/work-vm.png";

export const workStations = [
  {
    company: "freelancerCompany",
    role: "freelancerRole",
    duration: "freelancerDuration",
    location: "freelancerLocation",
    link: "https://www.thomas-schwabauer.de/",
    image: Freelance,
    bulletpoints: ["freelancerBullet1"],
  },
  {
    company: "amselCompany",
    role: "amselRole",
    duration: "amselDuration",
    location: "amselLocation",
    link: "https://www.amsel-store.de/",
    image: Amsel,
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
    link: "https://valtech-mobility.de/",
    image: VM,
    bulletpoints: ["vmBullet1", "vmBullet2", "vmBullet3", "vmBullet4"],
  },
  {
    company: "alcedisCompany",
    role: "alcedisRole",
    duration: "alcedisDuration",
    link: "https://www.alcedis.de/en",
    image: Alcedis,
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
    duration: "alcedisTesterDuration",
    link: "https://www.alcedis.de/en",
    image: Alcedis,
    bulletpoints: [
      "alcedisTesterBullet1",
      "alcedisTesterBullet2",
      "alcedisTesterBullet3",
      "alcedisTesterBullet4",
    ],
  },
];
