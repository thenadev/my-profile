import React from "react";
import {
  FaBriefcase,
  FaEnvelope,
  FaFileAlt,
  FaHome,
  FaRocket,
  FaTools,
  FaUser,
} from "react-icons/fa";

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  subItems: SubMenuItem[];
}

export interface SubMenuItem {
  title: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <FaHome />,
    subItems: [],
  },
  {
    title: "Über mich",
    href: "/about",
    icon: <FaUser />,
    subItems: [],
  },
  {
    title: "Services",
    href: "/services",
    icon: <FaTools />,
    subItems: [
      {
        title: "Startup-Beratung",
        href: "/services/startup-beratung",
      },
    ],
  },
  {
    title: "Dokumente",
    href: "/documents",
    icon: <FaFileAlt />,
    subItems: [],
  },
];
