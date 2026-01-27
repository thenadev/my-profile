"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
    FaWordpress,
    FaPlug,
    FaCogs,
    FaRocket,
} from "react-icons/fa";
import {
    SiWoo,
    SiYoast,
    SiHotjar,
    SiMailchimp,
    SiSemrush,
} from "react-icons/si";

const features = [
    {
        icon: <FaPlug className="text-turquoise-500 text-xl" />,
        title: "Plugins Integration",
        description: "Nahtlose Integration leistungsstarker Plugins wie WooCommerce und Yoast SEO für bessere Funktionalität und SEO.",
    },
    {
        icon: <FaCogs className="text-green-600 text-xl" />,
        title: "Benutzerfreundliches CMS",
        description: "Einfache Bedienung, um Inhalte ohne technische Vorkenntnisse zu bearbeiten.",
    },
    {
        icon: <FaRocket className="text-red-600 text-xl" />,
        title: "Optimierte Ladezeiten",
        description: "Schnelle Ladegeschwindigkeit durch Code-Optimierung und Plugin-Anpassungen.",
    },
    {
        icon: <SiWoo className="text-turquoise-600 text-xl" />,
        title: "E-Commerce Lösungen",
        description: "Professionelle Integration von WooCommerce für einen erfolgreichen Online-Shop.",
    },
];

const seoTechnologies = [
    {
        icon: <SiYoast className="text-turquoise-500 text-xl" />,
        title: "Yoast SEO",
        description: "Optimierung für bessere Rankings in Suchmaschinen.",
    },
    {
        icon: <SiHotjar className="text-orange-600 text-xl" />,
        title: "Hotjar",
        description: "Heatmaps und Benutzeraufzeichnung zur Verbesserung der Nutzererfahrung.",
    },
    {
        icon: <SiMailchimp className="text-turquoise-600 text-xl" />,
        title: "Mailchimp",
        description: "E-Mail-Marketing Automatisierung für maximale Kundenbindung.",
    },
    {
        icon: <SiSemrush className="text-cyan-600 text-xl" />,
        title: "SEMrush",
        description: "Erweiterte SEO-Tools zur Optimierung Ihrer Website und Inhalte.",
    },
];

const WordPressSection: React.FC = () => {
    const t = useTranslations("Services");

    return (
        <>
            <div className="min-h-screen w-full flex flex-col items-center justify-start gap-12 pt-8 text-slate-700" id="services">
                {/* Header Card */}
                <Card className="w-3/4 p-6">
                    <CardHeader className="flex items-center gap-4">
                        <div className="w-16 h-16 flex items-center justify-center bg-turquoise-100 rounded-full">
                            <FaWordpress className="text-turquoise-500 text-3xl" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-md">
                            {t("wordpressDevelopment.description")}
                        </CardDescription>

                        {/* Features */}
                        <div className="mt-6">
                            <h4 className="text-md font-semibold mb-4 text-gray-800">Hauptfeatures:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-turquoise-700/50 rounded-full">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h5 className="text-gray-800 font-medium">{feature.title}</h5>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* SEO Technologies */}
                <Card className="w-3/4 p-6">
                    <CardContent>
                        <h4 className="text-md font-semibold mb-4 text-gray-800">Beliebte Technologien und SEO-Tools:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {seoTechnologies.map((tech, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-turquoise-700/50 rounded-full">
                                        {tech.icon}
                                    </div>
                                    <div>
                                        <h5 className="text-gray-800 font-medium">{tech.title}</h5>
                                        <p className="text-gray-600 text-sm">{tech.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Final Call-to-Action */}
                <p className="text-lg md:text-xl w-3/4 text-center leading-relaxed mt-6 font-semibold bg-gradient-to-r from-turquoise-500 to-green-500 text-white px-6 py-4 rounded-lg shadow-md">
                    {t("wordpressDevelopment.description3")}
                </p>
            </div>
        </>
    );
};

export default WordPressSection;
