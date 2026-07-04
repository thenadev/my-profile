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
  /** Key im Navbar-Namespace (messages/*.json) — via useTranslations("Navbar") aufgelöst. */
  titleKey: string;
  href: string;
  icon: React.ReactNode;
  subItems: SubMenuItem[];
}

export interface SubMenuItem {
  /** Key im Navbar-Namespace. */
  titleKey: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  {
    titleKey: "home",
    href: "/",
    icon: <FaHome />,
    subItems: [],
  },
  {
    titleKey: "about",
    href: "/about",
    icon: <FaUser />,
    subItems: [],
  },
  {
    titleKey: "services",
    href: "/services",
    icon: <FaTools />,
    subItems: [
      {
        titleKey: "startupBeratung",
        href: "/services/startup-beratung",
      },
      {
        titleKey: "appEntwicklung",
        href: "/services/app-entwicklung",
      },
      {
        titleKey: "unternehmenswebsite",
        href: "/services/unternehmenswebsite",
      },
    ],
  },
  {
    titleKey: "documents",
    href: "/documents",
    icon: <FaFileAlt />,
    subItems: [],
  },
];
