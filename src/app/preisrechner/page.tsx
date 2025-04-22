"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function PriceCalculator() {
  const t = useTranslations("PriceCalculator");
  const router = useRouter();

  return (
    <>
      <div className="moving-gradient-overlay" />
      <div className="min-h-screen w-full py-24 md:py-28 flex flex-col items-center gap-6 md:gap-8 px-4 md:px-8">
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-blue-600 p-2 md:p-4">
            Preisrechner für IT-Dienstleistungen
          </h1>

          <h2 className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Kalkulieren Sie die Kosten für Ihr Projekt - Website, Mobile App,
            IT-Beratung oder Individualsoftware
          </h2>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
          {/* Website Entwicklung */}
          <Card
            className="shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-blue-100 hover:border-blue-200"
            onClick={() => router.push("/preisrechner/website")}
          >
            <CardHeader className="space-y-3 md:space-y-4 p-4 md:p-6">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl md:text-2xl">
                  Unternehmenswebsite
                </CardTitle>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-sm">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Verfügbar
                </Badge>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                Konfigurator für Ihre persönliche Unternehmenswebsite
              </p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                  Landing Pages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                  Business Websites
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                  E-Commerce Lösungen
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                  Web Applications
                </li>
              </ul>
              <div className="mt-4 md:mt-6 flex justify-end">
                <Button
                  variant="ghost"
                  className="group-hover:bg-blue-50 group-hover:text-blue-600 text-sm md:text-base"
                >
                  Jetzt konfigurieren
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mobile App Entwicklung */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
            <CardHeader className="space-y-3 md:space-y-4 p-4 md:p-6">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl md:text-2xl w-1/2">
                  Mobile App Entwicklung
                </CardTitle>
                <Badge variant="outline" className="text-gray-500 text-sm">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Bald verfügbar
                </Badge>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                Konfigurator für App-Projekte
              </p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Native iOS & Android
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Cross-Platform (Flutter)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Progressive Web Apps
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  App Redesign
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* IT Beratung */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
            <CardHeader className="space-y-3 md:space-y-4 p-4 md:p-6">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl md:text-2xl">
                  IT Beratung
                </CardTitle>
                <Badge variant="outline" className="text-gray-500 text-sm">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Bald verfügbar
                </Badge>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                Kalkulator für Beratungsleistungen
              </p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Technische Konzeption
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Architekturberatung
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Code Reviews
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Agile Coaching
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Individualsoftware */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
            <CardHeader className="space-y-3 md:space-y-4 p-4 md:p-6">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl md:text-2xl">
                  Individualsoftware
                </CardTitle>
                <Badge variant="outline" className="text-gray-500 text-sm">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Bald verfügbar
                </Badge>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                Projektkalkulator für Individuallösungen
              </p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Backend Systeme
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  APIs & Microservices
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Datenbank Lösungen
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                  Cloud Integration
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 md:mt-12 text-center max-w-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 rounded-xl">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
            Transparent und Nachvollziehbar
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Der Preisrechner wird Ihnen dabei helfen, eine erste Einschätzung
            der Projektkosten zu erhalten. Für ein detailliertes Angebot stehe
            ich Ihnen gerne in einem persönlichen Gespräch zur Verfügung.
          </p>
        </div>
      </div>
    </>
  );
}
