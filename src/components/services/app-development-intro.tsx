"use client";

import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FaBezierCurve, FaCogs, FaCube, FaRoute} from "react-icons/fa";
import {TbVectorTriangle} from "react-icons/tb";
import {SiAndroidauto, SiFlutter, SiGradle, SiJetpackcompose} from "react-icons/si";
import {useTranslations} from "next-intl"; // Beispiel-Icon für Dependency Injection (Koin)

const AppDevelopmentIntro: React.FC = () => {
    const t = useTranslations("Services.appDevelopment.intro");

    return (
        <div className="w-3/4 mx-auto flex flex-col items-center gap-8 text-gray-600">
            {/* Karten: Android Automotive und Flutter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* Android Automotive Card */}
                <Card>
                    <CardHeader className="flex items-center gap-4">
                        <div
                            className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                            <SiAndroidauto className="text-green-600 text-3xl"/>
                        </div>
                            <CardTitle className="text-green-600 text-xl">{t("androidTitle")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-md">
                            {t("androidDescription1")}
                            <a
                                href="https://www.android.com/auto/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-green-600 hover:underline"
                            >
                                {t("androidDescription2")}
                            </a>
                            {t("androidDescription3")}
                            <a
                                href="https://www.porsche.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-blue-600 hover:underline"
                            >
                                {t("androidDescription4")}
                            </a>
                            {t("androidDescription5")}
                            <a
                                href="https://www.audi.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-blue-600 hover:underline"
                            >
                                {t("androidDescription6")}
                            </a>, {t("androidDescription7")}
                            {t("androidDescription8")}
                        </CardDescription>
                        <div className="mt-4">
                            <h4 className="text-md font-semibold mb-2 text-gray-800">{t("androidTechnologiesTitle")}</h4>
                            <div className="mt-4">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                                            <SiGradle className="text-green-600 text-xl" title="Gradle"/>
                                        </div>
                                        <span className="text-gray-700 text-md">{t("androidTechnologies.gradle")}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-full">
                                            <FaCogs className="text-yellow-600 text-xl" title="Dependency Injection"/>
                                        </div>
                                        <span
                                            className="text-gray-700 text-md">{t("androidTechnologies.daggerHilt")}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full">
                                            <TbVectorTriangle className="text-purple-600 text-xl" title="Koin"/>
                                        </div>
                                        <span className="text-gray-700 text-md">{t("androidTechnologies.koin")}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                                            <FaBezierCurve className="text-blue-600 text-xl" title="Animations"/>
                                        </div>
                                        <span className="text-gray-700 text-md">{t("androidTechnologies.animations")}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-full">
                                            <SiJetpackcompose className="text-red-600 text-xl" title="Jetpack Compose"/>
                                        </div>
                                        <span
                                            className="text-gray-700 text-md">{t("androidTechnologies.ui")}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Flutter Card */}
                <Card>
                    <CardHeader className="flex items-center gap-4">
                        <div
                            className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full">
                            <SiFlutter className="text-purple-600 text-3xl"/>
                        </div>
                            <CardTitle className="text-purple-600 text-xl">{t("flutterTitle")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-md">
                            {t("flutterDescription1")}
                            <a
                                href="https://flutter.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-purple-600 hover:underline"
                            >
                                {t("flutterDescription2")}
                            </a>
                            {t("flutterDescription3")}
                            <a
                                href="https://amsel-store.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-indigo-600 hover:underline"
                            >
                                {t("flutterDescription4")}
                            </a>
                            {t("flutterDescription5")}
                        </CardDescription>
                        <div className="mt-4">
                            <h4 className="text-md font-semibold mb-2 text-gray-800">{t("flutterTechnologiesTitle")}</h4>
                            <div className="mt-4">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-full">
                                            <FaRoute className="text-pink-600 text-xl" title="Routing"/>
                                        </div>
                                        <span className="text-gray-700 text-md">{t("flutterTechnologies.routing")}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-full">
                                            <FaCube className="text-yellow-600 text-xl" title="BLoC Pattern"/>
                                        </div>
                                        <span className="text-gray-700 text-md">{t("flutterTechnologies.state")}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                                            <FaBezierCurve className="text-blue-600 text-xl" title="Custom Animations"/>
                                        </div>
                                        <span className="text-gray-700 text-md">{t("flutterTechnologies.animations")}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full">
                                            <FaCogs className="text-purple-600 text-xl" title="Dependency Injection"/>
                                        </div>
                                        <span className="text-gray-700 text-md">{t("flutterTechnologies.dj")}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Abschließender Satz */}
            <p className="text-lg md:text-xl text-center leading-relaxed mt-6 font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-4 rounded-lg shadow-md">
                {t("conclusion")}
            </p>
        </div>
    );
};

export default AppDevelopmentIntro;
