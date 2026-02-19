"use client";

import Link from "next/link";
import { FaChartLine, FaLightbulb, FaRocket } from "react-icons/fa";

const StartupBeratungCard = () => {
  return (
    <div className="flex flex-col items-center w-full gap-6 p-6">
      <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-turquoise-500 to-turquoise-600 rounded-full shadow-lg">
        <FaRocket className="text-white text-2xl" />
      </div>

      <div className="text-center space-y-4">
        <h4 className="text-xl font-bold text-white">
          Startup-Beratung für Gründer
        </h4>

        <p className="text-gray-200 text-sm leading-relaxed">
          Idee angeben, Termin buchen (80€/h) – 1h Gespräch, danach
          schriftlicher Umsetzungsplan inkl. Kostenschätzung. MVP und
          Feature-Erweiterung im Anschluss.
        </p>

        <div className="grid grid-cols-1 gap-3 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full flex items-center justify-center">
              <FaLightbulb className="text-turquoise-400 text-sm" />
            </div>
            <span className="text-sm text-gray-200">
              Beratung 80€/h + Umsetzungsplan
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full flex items-center justify-center">
              <FaRocket className="text-turquoise-400 text-sm" />
            </div>
            <span className="text-sm text-gray-200">MVP-Entwicklung</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full flex items-center justify-center">
              <FaChartLine className="text-green-400 text-sm" />
            </div>
            <span className="text-sm text-gray-200">Feature-Erweiterung</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-turquoise-700/30 border border-turquoise-600/30 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-300">Beratung</p>
            <p className="text-2xl font-bold text-white">80€/Stunde</p>
            <p className="text-xs text-gray-400">MVP ab €2.500</p>
          </div>
        </div>

        <Link
          href="/services/startup-beratung"
          className="inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-turquoise-500 hover:bg-turquoise-600 text-white font-medium text-sm transition-colors"
        >
          Termin buchen
        </Link>
      </div>
    </div>
  );
};

export default StartupBeratungCard;
