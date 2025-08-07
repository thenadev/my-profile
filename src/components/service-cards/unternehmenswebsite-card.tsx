"use client";

import {
  CheckCircle,
  Globe,
  Monitor,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

const UnternehmenswebsiteCard = () => {
  const t = useTranslations("Services");

  const benefits = [
    {
      icon: <Monitor className="h-5 w-5 text-blue-600" />,
      text: "Moderne Webdesigns",
    },
    {
      icon: <Smartphone className="h-5 w-5 text-purple-600" />,
      text: "Responsive Design",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      text: "SEO-Optimiert",
    },
    {
      icon: <Globe className="h-5 w-5 text-orange-600" />,
      text: "Lokale Expertise",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full gap-6 p-6 h-full">
      {/* Why Choose Me Section */}
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-gray-600">
          Professionelle Unternehmenswebsites aus Wetzlar - Moderne, responsive
          und SEO-optimierte Webdesigns für Ihr Unternehmen
        </p>
      </div>

      {/* Benefits Section */}
      <div className="flex flex-col gap-4 w-full px-6">
        <h4 className="text-xl font-extrabold text-center text-blue-600 bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-md">
          Ihre Vorteile
        </h4>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-gray-100">
                {benefit.icon}
              </div>
              <span className="text-gray-800 text-md font-medium leading-relaxed">
                {benefit.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Packages Preview */}
      <div className="flex flex-col gap-4 w-full px-6">
        <h4 className="text-xl font-extrabold text-center text-blue-600 bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-md">
          Unsere Pakete
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">
              Basic Website ab €1.200
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">
              Professional Website ab €3.500
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">
              E-Commerce Website ab €8.000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnternehmenswebsiteCard;
