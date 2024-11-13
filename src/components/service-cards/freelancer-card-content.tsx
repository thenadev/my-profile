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
                <p className="text-gray-600">{t("description")}</p>
            </div>

            {/* Skills & Highlights Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-blue-600 bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-md">
                    {t("skillsTitle")}
                </h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                            <FaLightbulb className="text-yellow-600 text-xl" />
                        </div>
                        <span className="text-gray-800 text-md font-medium leading-relaxed">
                            {t("skills.communication")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <FaHandsHelping className="text-blue-600 text-xl" />
                        </div>
                        <span className="text-gray-800 text-md font-medium leading-relaxed">
                            {t("skills.adaptability")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            <FaLaptopCode className="text-green-600 text-xl" />
                        </div>
                        <span className="text-gray-800 text-md font-medium leading-relaxed">
                            {t("skills.skillset")}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Key Benefits Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-blue-600 bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-md">
                    {t("benefitsTitle")}
                </h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            <FaCheckCircle className="text-green-600 text-xl w-8 h-8" />
                        </div>
                        <span className="text-gray-800 text-md font-medium leading-relaxed">
                            {t("benefits.fastDelivery")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <FaCheckCircle className="text-blue-600 text-xl w-8 h-8" />
                        </div>
                        <span className="text-gray-800 text-md font-medium leading-relaxed">
                            {t("benefits.creativeSolutions")}
                        </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                            <FaCheckCircle className="text-yellow-600 text-xl w-8 h-8" />
                        </div>
                        <span className="text-gray-800 text-md font-medium leading-relaxed">
                            {t("benefits.costEfficiency")}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FreelancerCard;
