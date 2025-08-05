import React from "react";
import {
  FaBriefcase,
  FaEnvelope,
  FaFileAlt,
  FaHome,
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
    title: "Projekte",
    href: "/portfolio",
    icon: <FaBriefcase />,
    subItems: [],
  },
  {
    title: "Services",
    href: "/services",
    icon: <FaTools />,
    subItems: [
      {
        title: "Webentwicklung",
        href: "/services/web-development",
      },
      {
        title: "App-Entwicklung",
        href: "/services/app-development",
      },
      {
        title: "WordPress",
        href: "/services/wordpress",
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
