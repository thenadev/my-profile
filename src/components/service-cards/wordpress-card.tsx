"use client";

import { useTranslations } from "next-intl";
import { FaCheckCircle, FaPlug } from "react-icons/fa";

const WordPressElementorCard = () => {
    const t = useTranslations("Services.wordpressDevelopment");

    // Arrays with dynamic translations for the `text` property
    const popularPlugins = [
        {
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            text: t("popularPlugins.yoast"),
        },
        {
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            text: t("popularPlugins.woocommerce"),
        },
        {
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
            text: t("popularPlugins.sliderRevolution"),
        },
        {
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            text: t("popularPlugins.contactForm"),
        },
    ];

    const keyBenefits = [
        {
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            text: t("keyBenefits.optimizedTemplates"),
        },
        {
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            text: t("keyBenefits.betterSEO"),
        },
        {
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
            text: t("keyBenefits.responsiveDesigns"),
        },
    ];

    return (
        <div className="flex flex-col items-center w-full gap-6 p-6 h-full">
            {/* Why Choose Me Section */}
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-gray-600">{t("description")}</p>
            </div>

            {/* Popular Plugins Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-blue-600 bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-md">
                    {t("popularPluginsTitle")}
                </h4>
                <ul className="space-y-4">
                    {popularPlugins.map((plugin, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full ${plugin.iconBg}`}
                            >
                                <FaPlug className={`${plugin.iconColor} text-xl`} />
                            </div>
                            <span className="text-gray-800 text-md font-medium leading-relaxed">
                {plugin.text}
              </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Key Benefits Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-blue-600 bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-md">
                    {t("keyBenefitsTitle")}
                </h4>
                <ul className="space-y-4">
                    {keyBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full ${benefit.iconBg}`}
                            >
                                <FaCheckCircle className={`${benefit.iconColor} text-xl w-8 h-8`} />
                            </div>
                            <span className="text-gray-800 text-md font-medium leading-relaxed">
                {benefit.text}
              </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WordPressElementorCard;
