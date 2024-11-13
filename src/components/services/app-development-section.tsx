"use client";

import React from "react";
import {motion, useInView} from "framer-motion";
import Image, {StaticImageData} from "next/image";
import {IPhoneMockup} from "react-device-mockup";

// Beispielbilder
import AmselAppLogin from "@/assets/services/app/amsel_app_login.png";
import AmselAppCheckout from "@/assets/services/app/amsel_app_checkout.png";
import AmselAppSettings from "@/assets/services/app/amsel_app_settings.png";
import BodyForgeDashboard from "@/assets/services/app/bodyforge_dashboard.png";
import BodyForgeWorkout from "@/assets/services/app/bodyforge_workout.png";
import BodyForgeNutrition from "@/assets/services/app/bodyforge_nutrition.png";
import AppDevelopmentIntro from "@/components/services/app-development-intro";
import {useTranslations} from "next-intl";

const screenshots = [
    {
        src: AmselAppLogin,
        alt: "Amsel App Login Screen",
        description: "screenshot.amselAppLogin",
    },
    {
        src: AmselAppCheckout,
        alt: "Amsel App Payment Screen",
        description: "screenshot.amselAppCheckout",
    },
    {
        src: AmselAppSettings,
        alt: "Amsel App Settings Screen",
        description: "screenshot.amselAppSettings",
    },
    {
        src: BodyForgeDashboard,
        alt: "BodyForge Dashboard",
        description: "screenshot.bodyForgeDashboard",
    },
    {
        src: BodyForgeWorkout,
        alt: "BodyForge Workout Screen",
        description: "screenshot.bodyForgeWorkout",
    },
    {
        src: BodyForgeNutrition,
        alt: "BodyForge Nutrition Screen",
        description: "screenshot.bodyForgeNutrition",
    },
];

const AppDevelopmentSection: React.FC = () => {
    const t = useTranslations("Services.appDevelopment");

    return (
        <>
            <div className="moving-gradient-overlay"/>
            <div className="min-h-screen w-full flex flex-col items-center justify-start gap-12 py-8 text-slate-700">

                <AppDevelopmentIntro/>

                <div className="flex flex-col gap-6 w-full px-6 items-center">
                    {/* Überschrift */}
                    <div className="w-full max-w-4xl text-center">
                        <h4 className="text-xl font-bold text-blue-500 bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg shadow">
                            {t("examples")}
                        </h4>
                    </div>

                    {/* Screenshots in IPhoneMock */}
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {screenshots.map((screenshot, index) => (
                            <ScreenshotCard
                                key={index}
                                src={screenshot.src}
                                alt={screenshot.alt}
                                description={t(screenshot.description)}
                                delay={index * 0.2}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

type ScreenshotCardProps = {
    src: StaticImageData,
    alt: string,
    description: string,
    delay: number,
    key?: number
};

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({src, alt, description, delay, key}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {once: true});

    return (
        <motion.div
            key={key}
            ref={ref}
            className="relative w-full flex justify-center"
            initial={{opacity: 0, y: 20}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay}}
        >
            <IPhoneMockup
                screenWidth={300}
                hideStatusBar
                hideNavBar
                frameColor="#000000"
                className="px-2"
            >
                <Image
                    src={src}
                    alt={alt}
                    className="object-cover rounded-lg"
                    quality={100}
                    layout="fill"
                />
            </IPhoneMockup>
            <p className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {description}
            </p>
        </motion.div>
    );
};

export default AppDevelopmentSection;
