"use client";

import AfterImage from "@/assets/services/website/new/landing2.png";
import BeforeImage from "@/assets/services/website/old/landing3.png";
import {useTranslations} from "next-intl";
import Image from "next/image";
import {FaArrowRight, FaQuoteLeft, FaCheckCircle} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {motion} from "framer-motion";

const WebRedesignCard = () => {
    const t = useTranslations("Services.websiteRedesign");

    return (
        <div className="flex flex-col items-center w-full gap-6 p-6">
            {/* Benefits Section */}
            <div className="flex flex-col gap-6 w-full px-6">
                <h4 className="text-xl font-extrabold text-center text-turquoise-400 bg-turquoise-700/50 border border-turquoise-600/30 p-2 rounded-lg">{t("keyBenefits")}</h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaCheckCircle className="text-green-400 text-xl w-8 h-8"/>
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
                            {t("benefits.design")}
            </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaCheckCircle className="text-turquoise-400 text-xl w-8 h-8"/>
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
        {t("benefits.collaboration")}
    </span>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-turquoise-700/50 border border-turquoise-600/30 rounded-full">
                            <FaCheckCircle className="text-yellow-400 text-xl w-8 h-8"/>
                        </div>
                        <span className="text-white text-md font-medium leading-relaxed">
        {t("benefits.cms")}
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <span
                        className="underline decoration-dotted cursor-pointer text-yellow-400 hover:text-yellow-300 transition mx-1">
                        {t("benefits.cmsTooltipLabel")}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="bg-turquoise-800 border border-turquoise-600/30 p-4 rounded-lg shadow-md text-gray-200 text-sm w-1/2">
                    {t("benefits.cmsTooltip1")} <a className="font-bold underline text-turquoise-400" href="https://firecms.co/"
                                   target="_blank">{t("benefits.cmsTooltip2")}</a> {t("benefits.cmsTooltip3")} <a className="font-bold underline text-turquoise-400" href="https://www.storyblok.com/"
                            target="_blank">{t("benefits.cmsTooltip4")}</a> {t("benefits.cmsTooltip5")}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
                            {t("benefits.cmsTooltipLabel2")}
    </span>
                    </li>
                </ul>
            </div>

            {/*/!* Numbers Section *!/*/}
            {/*<div className="flex flex-col gap-6 w-full px-6">*/}
            {/*    <h4 className="text-xl font-extrabold text-center text-turquoise-500 bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-md">{t("benefitsNumbers")}</h4>*/}
            {/*    <ul className="space-y-4">*/}
            {/*        <li className="flex items-start gap-4">*/}
            {/*            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">*/}
            {/*                <FaCheckCircle className="text-green-600 text-xl w-8 h-8"/>*/}
            {/*            </div>*/}
            {/*            <span className="text-gray-800 text-md font-medium leading-relaxed">*/}
            {/*    +40% erhöhte Conversion-Rate nach dem Redesign.*/}
            {/*</span>*/}
            {/*        </li>*/}
            {/*        <li className="flex items-start gap-4">*/}
            {/*            <div className="flex items-center justify-center w-8 h-8 bg-turquoise-100 rounded-full">*/}
            {/*                <FaCheckCircle className="text-turquoise-500 text-xl w-8 h-8"/>*/}
            {/*            </div>*/}
            {/*            <span className="text-gray-800 text-md font-medium leading-relaxed">*/}
            {/*    +30% verbesserte SEO-Rankings für erhöhte Sichtbarkeit.*/}
            {/*</span>*/}
            {/*        </li>*/}
            {/*        <li className="flex items-start gap-4">*/}
            {/*            <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">*/}
            {/*                <FaCheckCircle className="text-yellow-600 text-xl w-8 h-8"/>*/}
            {/*            </div>*/}
            {/*            <span className="text-gray-800 text-md font-medium leading-relaxed">*/}
            {/*    +50% reduzierte Absprungrate durch verbesserte Nutzerführung.*/}
            {/*</span>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}


            {/* Before-After Comparison Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                {/* Before Card Section */}
                <motion.div
                    className="w-full max-w-md"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.2}}
                    whileHover={{scale: 1.05}} // Scale effect on hover
                >
                    <Image
                        src={BeforeImage}
                        alt={t("beforeImageAlt")}
                        className="rounded-xl shadow-lg"
                        priority={true}
                        quality={100}
                        width={500}
                        height={300}
                    />
                </motion.div>

                {/* Arrow Icon with Tooltip */}
                <motion.div
                    className="text-gray-400"
                    initial={{scale: 0.5, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 0.6}}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <FaArrowRight className="text-3xl md:text-4xl cursor-pointer"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>{t("arrowTooltip")}</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </motion.div>

                {/* After Card Section */}
                <motion.div
                    className="w-full max-w-md"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.2}}
                    whileHover={{scale: 1.05}} // Scale effect on hover
                >
                    <Image
                        src={AfterImage}
                        alt={t("afterImageAlt")}
                        className="rounded-xl shadow-lg"
                        priority={true}
                        quality={100}
                        width={500}
                        height={300}
                    />
                </motion.div>
            </div>

            {/* Testimonial Section */}
            <div className="w-full bg-turquoise-700/30 border border-turquoise-600/30 p-4 rounded-lg flex flex-col gap-4">
                <FaQuoteLeft className="text-turquoise-400 text-2xl"/>
                <p className="text-gray-200 italic">
                    {t("testimonial.text")}
                </p>
                <span className="font-bold text-white">{t("testimonial.author")}</span>
            </div>
        </div>
    );
};

export default WebRedesignCard;
