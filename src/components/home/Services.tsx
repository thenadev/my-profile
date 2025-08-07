"use client";

import AppDevelopmentCard from "@/components/service-cards/app-development-card";
import FreelancerCardContent from "@/components/service-cards/freelancer-card-content";
import StartupBeratungCard from "@/components/service-cards/startup-beratung-card";
import UnternehmenswebsiteCard from "@/components/service-cards/unternehmenswebsite-card";
import WebRedesignCard from "@/components/service-cards/web-redesign-card";
import WordpressCard from "@/components/service-cards/wordpress-card";
import AppDevelopmentSection from "@/components/services/app-development-section";
import StartupBeratungSection from "@/components/services/startup-beratung-section";
import WebRedesignSection from "@/components/services/web-redesign-section";
import WordpressSection from "@/components/services/wordpress-section";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  cardContent: React.ReactNode | null;
  detailedContent: React.ReactNode;
}

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const t = useTranslations("Services");

  const scrollToAbout = () => {
    const section = document.getElementById("about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services: Service[] = [
    {
      id: 0,
      title: "Startup-Beratung",
      description:
        "Von der Idee zum erfolgreichen MVP - Professionelle Beratung und Umsetzung für Startups und Gründer",
      cardContent: <StartupBeratungCard />,
      detailedContent: <StartupBeratungSection />,
    },
    {
      id: 1,
      title: "Unternehmenswebsite",
      description:
        "Professionelle Unternehmenswebsites aus Wetzlar - Moderne, responsive und SEO-optimierte Webdesigns",
      cardContent: <UnternehmenswebsiteCard />,
      detailedContent: <WebRedesignSection />,
    },
    {
      id: 2,
      title: t("freelance.title"),
      description: "",
      cardContent: <FreelancerCardContent />,
      detailedContent: <WebRedesignSection />,
    },
    {
      id: 3,
      title: t("websiteRedesign.title"),
      description: t("websiteDescription"),
      cardContent: <WebRedesignCard />,
      detailedContent: <WebRedesignSection />,
    },
    {
      id: 4,
      title: t("appDevelopment.title"),
      description: t("appDescription"),
      cardContent: <AppDevelopmentCard />,
      detailedContent: <AppDevelopmentSection />,
    },
    {
      id: 5,
      title: t("wordpressDevelopment.title"),
      description: t("wordPressDescription"),
      cardContent: <WordpressCard />,
      detailedContent: <WordpressSection />,
    },
  ];

  return (
    <section className="w-full p-8" id="services">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        {t("title")}
      </h2>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-8 lg:px-28">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="overflow-hidden cursor-pointer bg-white shadow-lg rounded-2xl hover:scale-105 transition-transform flex flex-col h-full"
            whileHover={{ scale: 1.01 }}
          >
            {/* Header */}
            <div className="bg-blue-500 opacity-90 text-white p-4">
              <h3 className="text-xl md:text-2xl font-bold text-center">
                {service.title}
              </h3>
            </div>

            {/* Content */}
            <div className="px-6 flex-grow flex items-center">
              {service.cardContent}
            </div>

            {/* Footer */}
            <div className="bg-gray-100 p-4">
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primaryLight"
                  onClick={() => {
                    if (index !== 1) {
                      setSelectedService(service);
                    } else {
                      scrollToAbout();
                    }
                  }}
                >
                  {t("learnMore")}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed View */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl p-6 overflow-y-auto"
          >
            <button
              className="text-primaryDark font-bold mb-4 hover:underline"
              onClick={() => setSelectedService(null)}
            >
              {t("close")}
            </button>
            <div className="w-full text-center">
              <h2 className="text-4xl font-extrabold text-blue-800 mb-2">
                {selectedService.title}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {selectedService.description}
              </p>
            </div>
            <div className="mt-8">{selectedService.detailedContent}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
