"use client";

import { useTranslations } from "next-intl";
import {
    FaCheckCircle,
    FaHandsHelping,
    FaLaptopCode,
    FaLightbulb
} from "react-icons/fa";

const FreelancerCard = () => {
    const t = useTranslations("Services.freelance");

    return (
        <div className="flex flex-col items-center w-full gap-6 p-6 h-full">
            {/* Why Choose Me Section */}
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-gray-200">{t("description")}</p>
            </div>

            {/* Skills & Highlights Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-turquoise-400 bg-turquoise-700/50 border border-turquoise-600/30 p-2 rounded-lg">
                    {t("skillsTitle")}
                </h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaLightbulb className="text-yellow-400 text-xl" />
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
                            {t("skills.communication")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaHandsHelping className="text-turquoise-400 text-xl" />
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
                            {t("skills.adaptability")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaLaptopCode className="text-green-400 text-xl" />
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
                            {t("skills.skillset")}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Key Benefits Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-turquoise-400 bg-turquoise-700/50 border border-turquoise-600/30 p-2 rounded-lg">
                    {t("benefitsTitle")}
                </h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaCheckCircle className="text-green-400 text-xl w-8 h-8" />
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
                            {t("benefits.fastDelivery")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaCheckCircle className="text-turquoise-400 text-xl w-8 h-8" />
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
                            {t("benefits.creativeSolutions")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaCheckCircle className="text-yellow-400 text-xl w-8 h-8" />
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
                            {t("benefits.costEfficiency")}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FreelancerCard;
