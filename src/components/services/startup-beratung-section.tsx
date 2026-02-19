"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

const StartupBeratungSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full py-16 bg-gradient-to-br from-turquoise-50 to-turquoise-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm font-medium">
            🚀 Startup & Gründung
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Startup-Beratung für Gründer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Idee angeben, Termin buchen (80€/h) – 1h Gespräch, danach
            schriftlicher Umsetzungsplan inkl. Kostenschätzung. MVP und
            Feature-Erweiterung im Anschluss.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 border-2 border-turquoise-100 hover:border-turquoise-200 transition-colors bg-turquoise-800/90 backdrop-blur-sm">
            <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-6 w-6 text-turquoise-500" />
            </div>
            <CardTitle className="text-lg mb-2">
              Strategische Beratung
            </CardTitle>
            <CardDescription>
              Von der Ideenvalidierung bis zur Markteinführung - wir entwickeln
              gemeinsam Ihre Strategie
            </CardDescription>
          </Card>

          <Card className="text-center p-6 border-2 border-turquoise-100 hover:border-turquoise-200 transition-colors bg-turquoise-800/90 backdrop-blur-sm">
            <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="h-6 w-6 text-turquoise-600" />
            </div>
            <CardTitle className="text-lg mb-2">MVP-Entwicklung</CardTitle>
            <CardDescription>
              Schnelle Umsetzung Ihres Minimum Viable Product mit modernen
              Technologien
            </CardDescription>
          </Card>

          <Card className="text-center p-6 border-2 border-green-100 hover:border-green-200 transition-colors bg-turquoise-800/90 backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg mb-2">Skalierung</CardTitle>
            <CardDescription>
              Unterstützung beim Wachstum und der Skalierung Ihres Startups
            </CardDescription>
          </Card>
        </div>

        {/* Service Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Beratung Package */}
          <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow bg-turquoise-800/90 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Startup-Beratung
              </CardTitle>
              <div className="text-2xl font-bold text-turquoise-500">
                €80<span className="text-base text-gray-500">/Stunde</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Strategische Beratung
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Marktanalyse</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">MVP-Planung</span>
                </li>
              </ul>
              <Button
                className="w-full bg-turquoise-500 hover:bg-turquoise-600"
                onClick={() => router.push("/services/startup-beratung")}
              >
                Termin buchen
              </Button>
            </CardContent>
          </Card>

          {/* MVP Package */}
          <Card className="relative overflow-hidden border-2 border-turquoise-200 hover:shadow-lg transition-shadow bg-turquoise-800/90 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise-600 to-turquoise-700"></div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-turquoise-600 text-white text-xs">
                Beliebt
              </Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                MVP-Entwicklung
              </CardTitle>
              <div className="text-2xl font-bold text-turquoise-600">
                €2.500<span className="text-base text-gray-500">-5.000</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Komplette MVP-Entwicklung
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Moderne Web-Technologien
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    3 Monate Support
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-turquoise-600 hover:bg-turquoise-700"
                onClick={() => router.push("/services/startup-beratung")}
              >
                MVP anfragen
              </Button>
            </CardContent>
          </Card>

          {/* Feature-Erweiterung */}
          <Card className="relative overflow-hidden border-2 border-green-200 hover:shadow-lg transition-shadow bg-turquoise-800/90 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Feature-Erweiterung
              </CardTitle>
              <div className="text-2xl font-bold text-green-600">
                Individuell
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Erweiterung bestehender Software
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Neue Features & Wartung
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Individuelles Angebot
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/services/startup-beratung")}
              >
                Features anfragen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Bereit, Ihre Idee in einen Plan zu gießen?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Termin buchen (80€/h), Idee angeben – nach dem Gespräch erhalten
            Sie einen schriftlichen Umsetzungsplan inkl. Kostenschätzung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white px-8 py-3"
              onClick={() => router.push("/services/startup-beratung")}
            >
              Termin buchen (80€/h)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupBeratungSection;
