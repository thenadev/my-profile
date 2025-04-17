"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function PriceCalculator() {
  const t = useTranslations("PriceCalculator");

  return (
    <>
      <div className="moving-gradient-overlay" />
      <div className="min-h-screen w-full py-28 flex flex-col items-center gap-8 px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Preisrechner für IT-Dienstleistungen
        </h1>

        <h2 className="text-xl text-gray-600 text-center max-w-2xl">
          Kalkulieren Sie die Kosten für Ihr Projekt - Website, Mobile App,
          IT-Beratung oder Individualsoftware
        </h2>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Website Entwicklung */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Website Entwicklung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Coming soon: Konfigurator für Website-Projekte
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Landing Pages</li>
                <li>Business Websites</li>
                <li>E-Commerce Lösungen</li>
                <li>Web Applications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Mobile App Entwicklung */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Mobile App Entwicklung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Coming soon: Konfigurator für App-Projekte
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Native iOS & Android</li>
                <li>Cross-Platform (Flutter)</li>
                <li>Progressive Web Apps</li>
                <li>App Redesign</li>
              </ul>
            </CardContent>
          </Card>

          {/* IT Beratung */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">IT Beratung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Coming soon: Kalkulator für Beratungsleistungen
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Technische Konzeption</li>
                <li>Architekturberatung</li>
                <li>Code Reviews</li>
                <li>Agile Coaching</li>
              </ul>
            </CardContent>
          </Card>

          {/* Individualsoftware */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Individualsoftware</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Coming soon: Projektkalkulator für Individuallösungen
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Backend Systeme</li>
                <li>APIs & Microservices</li>
                <li>Datenbank Lösungen</li>
                <li>Cloud Integration</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">
            Transparent und Nachvollziehbar
          </h2>
          <p className="text-gray-600">
            Der Preisrechner wird Ihnen dabei helfen, eine erste Einschätzung
            der Projektkosten zu erhalten. Für ein detailliertes Angebot stehe
            ich Ihnen gerne in einem persönlichen Gespräch zur Verfügung.
          </p>
        </div>
      </div>
    </>
  );
}
