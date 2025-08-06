"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useRef } from "react";
import {
  FaAward,
  FaBolt,
  FaCheckCircle,
  FaClock,
  FaCode,
  FaGlobe,
  FaHandshake,
  FaMapMarkerAlt,
  FaPalette,
  FaRocket,
  FaUsers,
} from "react-icons/fa";

const getAge = () => {
  return moment().diff("1997-06-04", "years");
};

// ClientsSection Komponente
function ClientsSection() {
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
    <section className="py-12 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-gray-600 mb-2 font-medium">
            Vertrauen von Unternehmen weltweit
          </h3>
          <p className="text-sm text-gray-500">
            Erfolgreiche Projekte mit führenden Unternehmen
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50/50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50/50 to-transparent z-10"></div>

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
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center rounded-lg border border-gray-200/50 hover:border-gray-300 transition-colors group shadow-sm bg-gray-300/60 backdrop-blur-sm"
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>100% Kundenzufriedenheit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Pünktliche Lieferung</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Langfristige Partnerschaften</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const HomeAbout: React.FC = () => {
  const t = useTranslations("About");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Trust-Metriken
  const trustMetrics = [
    {
      icon: <FaCheckCircle className="text-green-500" />,
      value: "100%",
      label: "Kundenzufriedenheit",
      description: "Alle Projekte erfolgreich abgeschlossen",
    },
    {
      icon: <FaClock className="text-blue-500" />,
      value: "Pünktlich",
      label: "Projektabgabe",
      description: "Nie ein Projekt verspätet",
    },
    {
      icon: <FaHandshake className="text-purple-500" />,
      value: "Langfristig",
      label: "Partnerschaften",
      description: "Wiederkehrende Kunden",
    },
  ];

  // Kernkompetenzen
  const skills = [
    "React & Next.js",
    "TypeScript",
    "Flutter",
    "Agile Development",
    "UI/UX Design",
    "API Development",
  ];

  // Services
  const services = [
    {
      icon: FaCode,
      title: "Webentwicklung",
      description: "Moderne, responsive Webanwendungen mit React und Next.js",
    },
    {
      icon: FaPalette,
      title: "UI/UX Design",
      description: "Benutzerfreundliche Interfaces die begeistern",
    },
    {
      icon: FaBolt,
      title: "Performance Optimierung",
      description: "Schnelle, suchmaschinenoptimierte Websites",
    },
    {
      icon: FaUsers,
      title: "Beratung",
      description: "Strategische Digitalberatung für Ihr Unternehmen",
    },
  ];

  return (
    <div className="pt-28 w-full min-h-screen p-5" id="about" ref={sectionRef}>
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
            Über mich
          </Badge>
          <h2 className="text-3xl md:text-4xl mb-4 font-bold text-gray-900">
            Ihr Partner für digitale Lösungen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leidenschaftlicher Freelancer mit Fokus auf moderne Webtechnologien
            und nutzerzentriertes Design.
          </p>
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
                  alt="Thomas Schwabauer"
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-xl mb-2 font-bold text-gray-900">
                  Thomas Schwabauer
                </h3>
                <p className="text-gray-600 mb-3">
                  Fullstack Developer & UI/UX Designer
                </p>
                <p className="text-sm text-gray-500">
                  📍 Deutschland, Wetzlar • 🌐 Remote verfügbar
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed">
                Mit über 5 Jahren Erfahrung in der Webentwicklung helfe ich
                Unternehmen dabei, ihre digitale Präsenz zu stärken. Meine
                Leidenschaft liegt in der Entwicklung performanter,
                benutzerfreundlicher Anwendungen, die echten Mehrwert schaffen.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Kernkompetenzen
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <Badge variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-800 text-white">
                Vollständiges Profil
                <FaRocket className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Kontakt aufnehmen</Button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="group hover:shadow-md transition-all duration-300 border-gray-200">
                  <CardContent className="p-6">
                    <service.icon className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="mb-2 font-semibold text-gray-900">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center space-y-8 mb-12"
        >
          {/* Trust Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {trustMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white rounded-xl border border-gray-200 shadow-sm mb-12"
        >
          {[
            { value: "20+", label: "Projekte" },
            { value: "5+", label: "Jahre Erfahrung" },
            { value: "10+", label: "Zufriedene Kunden" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
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
