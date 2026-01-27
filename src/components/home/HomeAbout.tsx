"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import {
  FaBolt,
  FaCode,
  FaPalette,
  FaRocket,
  FaUsers,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

// ClientsSection Komponente
function ClientsSection() {
  const t = useTranslations("Home.About.clients");

  const clients = [
    { name: "Porsche", logo: "/customer/porsche.png" },
    { name: "Audi", logo: "/customer/audi.png" },
    { name: "Valtech Mobility Gmbh", logo: "/customer/valtech-mobility.png" },
    { name: "Tricon GmbH", logo: "/customer/tricon.svg" },
    { name: "Digitalsocial.ID", logo: "/customer/solanaid.webp" },
    { name: "Edona Design Gmbh", logo: "/customer/goldeneringe.svg" },
    { name: "Alcedis GmbH", logo: "/customer/alcedis.png" },
  ];

  // Doppelte das Array für einen nahtlosen Loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-foreground mb-2 font-medium">{t("title")}</h3>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>

          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [0, -50 * clients.length],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${100 * duplicatedClients.length}px`,
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group shadow-sm backdrop-blur-sm"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  width={96}
                  height={40}
                  className="max-w-24 max-h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 drop-shadow-md drop-shadow-black"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>{t("trustIndicators.satisfaction")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>{t("trustIndicators.delivery")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>{t("trustIndicators.partnerships")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const HomeAbout: React.FC = () => {
  const t = useTranslations("Home.About");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Kernkompetenzen
  const skills = [
    t("skills.reactNextjs"),
    t("skills.typescript"),
    t("skills.flutter"),
    t("skills.agileDevelopment"),
    t("skills.uiuxDesign"),
    t("skills.apiDevelopment"),
  ];

  // Services
  const services = [
    {
      icon: FaCode,
      title: t("services.webDevelopment.title"),
      description: t("services.webDevelopment.description"),
    },
    {
      icon: FaPalette,
      title: t("services.uiuxDesign.title"),
      description: t("services.uiuxDesign.description"),
    },
    {
      icon: FaBolt,
      title: t("services.performanceOptimization.title"),
      description: t("services.performanceOptimization.description"),
    },
    {
      icon: FaUsers,
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
    },
  ];

  return (
    <div className="pt-28 w-full min-h-screen p-5 bg-background" id="about" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl mb-4 font-bold text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Profil Bereich */}
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <Image
                  src="/thomas_schwabauer.webp"
                  alt={t("name")}
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-full object-cover border-4 border-border shadow-lg"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-primary rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h3 className="text-xl mb-2 font-bold text-foreground">
                  {t("name")}
                </h3>
                <p className="text-muted-foreground mb-3">{t("role")}</p>
                <p className="text-sm text-muted-foreground">{t("location")}</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed">{t("bio")}</p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="mb-3 font-semibold text-foreground">
                {t("skillsTitle")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={"skill" + index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <Badge variant="outline" className="text-xs border-border">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/about"
                className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg shadow-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl font-semibold text-sm sm:text-base md:text-lg h-10 sm:h-12"
                aria-label={t("buttons.fullProfileAriaLabel")}
              >
                <FaRocket className="text-lg sm:text-xl" aria-hidden="true" />
                {t("buttons.fullProfile")}
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-border text-foreground rounded-lg hover:bg-muted transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg h-10 sm:h-12"
                aria-label={t("buttons.contactAriaLabel")}
              >
                <FaMessage className="text-lg sm:text-xl" aria-hidden="true" />
                {t("buttons.contact")}
              </Link>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={"service" + index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="group hover:shadow-md transition-all duration-300 border border-border bg-card h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <service.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="mb-2 font-semibold text-card-foreground">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-card rounded-xl border border-border shadow-sm mb-12"
        >
          {[
            { value: "20+", label: t("stats.projects") },
            { value: "5+", label: t("stats.yearsExperience") },
            { value: "10+", label: t("stats.satisfiedCustomers") },
            { value: "24/7", label: t("stats.support") },
          ].map((stat, index) => (
            <motion.div
              key={"stat" + index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clients Section */}
        <ClientsSection />
      </motion.div>
    </div>
  );
};

export default HomeAbout;
