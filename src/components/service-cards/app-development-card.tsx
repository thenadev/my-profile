"use client";

import {useTranslations} from "next-intl";
import {IPhoneMockCarousel} from "@/components/image-carousel";
import {
    FaMobileAlt,
    FaSyncAlt,
    FaRocket,
    FaCodeBranch,
    FaCogs,
    FaUsers
} from "react-icons/fa";

import AmselAppCheckout from "@/assets/services/app/amsel_app_checkout.png";
import AmselAppLogin from "@/assets/services/app/amsel_app_login.png";
import AmselAppSettings from "@/assets/services/app/amsel_app_settings.png";
import BodyForgeDashboard from "@/assets/services/app/bodyforge_dashboard.png";
import BodyForgeWorkout from "@/assets/services/app/bodyforge_workout.png";
import BodyForgeNutrition from "@/assets/services/app/bodyforge_nutrition.png";

const benefitIcons: Record<string, JSX.Element> = {
    mobile: <FaMobileAlt className="text-turquoise-500 text-xl" />,
    sync: <FaSyncAlt className="text-green-600 text-xl" />,
    rocket: <FaRocket className="text-red-600 text-xl" />,
    branch: <FaCodeBranch className="text-yellow-600 text-xl" />,
    cogs: <FaCogs className="text-turquoise-600 text-xl" />,
    users: <FaUsers className="text-indigo-600 text-xl" />
};

const benefits = [
    {
        iconKey: "mobile",
        iconBg: "bg-turquoise-100",
        textKey: "benefit.hybridDevelopment"
    },
    {
        iconKey: "sync",
        iconBg: "bg-green-100",
        textKey: "benefit.nativeDevelopment"
    },
    {
        iconKey: "rocket",
        iconBg: "bg-red-100",
        textKey: "benefit.fastPerformance"
    },
    {
        iconKey: "branch",
        iconBg: "bg-yellow-100",
        textKey: "benefit.scalableArchitecture"
    },
    {
        iconKey: "cogs",
        iconBg: "bg-turquoise-100",
        textKey: "benefit.modernIntegration"
    },
    {
        iconKey: "users",
        iconBg: "bg-indigo-100",
        textKey: "benefit.userFocus"
    }
];

const AppDevelopmentCard = () => {
    const t = useTranslations("Services.appDevelopment");

    return (
        <div className="flex flex-col items-center w-full gap-6 p-6 h-full">
            {/* Why Choose Me Section */}
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-gray-200">{t("whyChooseMe")}</p>
            </div>

            {/* Skills & Highlights Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-turquoise-400 bg-turquoise-700/50 border border-turquoise-600/30 p-2 rounded-lg">
                    {t("benefitsTitle")}
                </h4>
                <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <div
                                className="flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-turquoise-700/50 border border-turquoise-600/30"
                            >
                                {benefitIcons[benefit.iconKey]}
                            </div>
                            <span className="text-white text-md font-medium leading-relaxed">
                                {t(benefit.textKey)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* App Showcase Section */}
            <div className="flex flex-col gap-4 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-turquoise-400 bg-turquoise-700/50 border border-turquoise-600/30 p-2 rounded-lg">
                    {t("exampleDesigns")}
                </h4>
                <IPhoneMockCarousel
                    images={[
                        {src: AmselAppLogin, alt: "Amsel Login Page"},
                        {src: AmselAppCheckout, alt: "Amsel Checkout Page"},
                        {src: AmselAppSettings, alt: "Amsel Settings Page"},
                        {src: BodyForgeDashboard, alt: "BodyForge Dashboard"},
                        {src: BodyForgeWorkout, alt: "BodyForge Workout"},
                        {src: BodyForgeNutrition, alt: "BodyForge Nutrition"}
                    ]}
                />
            </div>
        </div>
    );
};

export default AppDevelopmentCard;
