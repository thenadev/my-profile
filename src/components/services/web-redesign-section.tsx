"use client";

import {useTranslations} from "next-intl";
import Image from "next/image";
import React from "react";
import {motion} from "framer-motion";
import AfterAppShowcase from "@/assets/services/website/new/app-showcase-new.gif";
import AfterContact from "@/assets/services/website/new/contact.png";
import AfterLanding from "@/assets/services/website/new/landing.png";
import AfterLanding2 from "@/assets/services/website/new/landing2.png";
import BeforeAppShowcase from "@/assets/services/website/old/app-showcase.png";
import BeforeContact from "@/assets/services/website/old/contact.png";
import BeforeLanding from "@/assets/services/website/old/landing.png";
import BeforeLanding2 from "@/assets/services/website/old/landing2.png";
import {FaCode, FaSitemap} from "react-icons/fa";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {
    SiAngular,
    SiGoogleanalytics,
    SiHotjar,
    SiMailchimp,
    SiNestjs,
    SiNextdotjs,
    SiReact,
    SiSemrush
} from "react-icons/si";

const comparisons = [
    {
        beforeImage: BeforeLanding,
        afterImage: AfterLanding,
        alt: "Landing Page Redesign",
    },
    {
        beforeImage: BeforeLanding2,
        afterImage: AfterLanding2,
        alt: "Landing Page Redesign",
    },
    {
        beforeImage: BeforeAppShowcase,
        afterImage: AfterAppShowcase,
        alt: "App Showcase Redesign",
    },
    {
        beforeImage: BeforeContact,
        afterImage: AfterContact,
        alt: "Contact Page Redesign",
    },
];

const WebRedesignSection: React.FC = () => {
    const t = useTranslations("Services");

    return (
        <>
            <div className="moving-gradient-overlay"/>

            <div
                className="min-h-screen w-full flex flex-col items-center justify-start gap-12 pt-8 text-slate-700"
                id="services"
            >
                <Card className="w-3/4 p-6">
                    <CardHeader className="flex items-center gap-4">
                        <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
                            <FaSitemap className="text-blue-600 text-3xl"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-md">
                            {t("websiteRedesign.description")}
                        </CardDescription>
                        <div className="mt-4">
                            <h4 className="text-md font-semibold mb-2 text-gray-800">{t("websiteRedesign.technologiesTitle")}</h4>
                            <div className="flex flex-col md:flex-row justify-between gap-8 mt-4">
                                {/* Left Column: Current Technologies */}
                                <div className="w-full md:w-1/2">
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                                                <SiAngular className="text-green-600 text-xl" title="Angular"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.angular")}</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                                                <SiReact className="text-blue-600 text-xl" title="React.js"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.react")}</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full">
                                                <SiNextdotjs className="text-purple-600 text-xl" title="Next.js"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.next")}</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-full">
                                                <SiNestjs className="text-yellow-600 text-xl" title="Nest.js"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.nest")}</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-full">
                                                <FaCode className="text-red-600 text-xl" title="TypeScript"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.typescript")}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Separator */}
                                <div className="hidden md:block w-px bg-gray-300"></div>

                                {/* Right Column: Additional Technologies */}
                                <div className="w-full md:w-1/2">
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full">
                                                <SiGoogleanalytics className="text-indigo-600 text-xl"
                                                                   title="Google Analytics"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.google")}</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full">
                                                <SiHotjar className="text-orange-600 text-xl" title="Hotjar"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.hotjar")}</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-cyan-100 rounded-full">
                                                <SiSemrush className="text-cyan-600 text-xl" title="SEMrush"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.semrush")}</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div
                                                className="w-8 h-8 flex items-center justify-center bg-pink-100 rounded-full">
                                                <SiMailchimp className="text-pink-600 text-xl" title="Mailchimp"/>
                                            </div>
                                            <span className="text-gray-700 text-md">{t("websiteRedesign.technologies.mailchimp")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Abschließender Satz */}
                <p className="text-lg md:text-xl w-3/4 text-center leading-relaxed mt-6 font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-4 rounded-lg shadow-md">
                    {t("websiteRedesign.description3")}
                </p>

                {/* Überschrift */}
                <div className="w-full max-w-4xl text-center">
                    <h4 className="text-xl font-bold text-blue-500 bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg shadow">
                        {t("websiteRedesign.conclusion")}
                    </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl">
                    {comparisons.map(({beforeImage, afterImage, alt}, index) => (
                        <motion.div
                            key={index}
                            className="relative w-full aspect-[2/1] rounded-xl shadow-lg overflow-hidden" // Aspect Ratio 60x30 = 2:1
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.8, delay: index * 0.2}}
                        >
                            {/* Nachher-Bild */}
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                initial={{opacity: 1}}
                                whileHover={{opacity: 0}}
                                transition={{duration: 0.5}}
                            >
                                <Image
                                    src={afterImage}
                                    alt={`${alt} After`}
                                    className="object-cover w-full h-full shadow-xl rounded-xl border-primary border-2"
                                    quality={100}
                                    layout="fill"
                                />
                            </motion.div>

                            {/* Vorher-Bild */}
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                initial={{opacity: 0}}
                                whileHover={{opacity: 1}}
                                transition={{duration: 0.5}}
                            >
                                <Image
                                    src={beforeImage}
                                    alt={`${alt} Before`}
                                    className="object-cover w-full h-full shadow-xl rounded-xl border-primary border-2"
                                    quality={100}
                                    layout="fill"
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default WebRedesignSection;
