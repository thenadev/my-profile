"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaChartLine, FaLightbulb, FaRocket } from "react-icons/fa";

const StartupBeratungCard = () => {
  const t = useTranslations("Services");

  return (
    <div className="flex flex-col items-center w-full gap-6 p-6">
      {/* Icon Section */}
      <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
        <FaRocket className="text-white text-2xl" />
      </div>

      {/* Content Section */}
      <div className="text-center space-y-4">
        <h4 className="text-xl font-bold text-gray-800">
          Startup-Beratung für Gründer
        </h4>

        <p className="text-gray-600 text-sm leading-relaxed">
          Von der Idee zum erfolgreichen MVP - Professionelle Beratung und
          Umsetzung für Startups und Gründer
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaLightbulb className="text-blue-600 text-sm" />
            </div>
            <span className="text-sm text-gray-700">Strategische Beratung</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <FaRocket className="text-purple-600 text-sm" />
            </div>
            <span className="text-sm text-gray-700">MVP-Entwicklung</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FaChartLine className="text-green-600 text-sm" />
            </div>
            <span className="text-sm text-gray-700">Skalierung & Wachstum</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">Ab</p>
            <p className="text-2xl font-bold text-gray-800">€150/Stunde</p>
            <p className="text-xs text-gray-500">oder MVP ab €2.500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupBeratungCard;
