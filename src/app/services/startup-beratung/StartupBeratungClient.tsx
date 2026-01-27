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
  Globe,
  Lightbulb,
  Rocket,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function StartupBeratungClient() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full py-24 md:py-28 flex flex-col items-center gap-8 md:gap-12 px-4 md:px-8 bg-turquoise-800">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm font-medium">
            🚀 App & Website Entwicklung
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-turquoise-400 to-turquoise-600 bg-clip-text text-transparent">
            App entwickeln lassen & Ideen umsetzen
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Sie haben eine App-Idee oder Website-Idee? Ich helfe Ihnen dabei,
            Ihre Idee ohne Programmierkenntnisse umzusetzen - von der ersten
            Idee bis zum fertigen MVP.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white px-8 py-3"
            onClick={() => router.push("/contact")}
          >
            Kostenlose Beratung
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-turquoise-600/50 text-white hover:bg-turquoise-700/30"
            onClick={() => router.push("/preisrechner")}
          >
            Preisrechner
          </Button>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card className="text-center p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30 hover:border-turquoise-500/50 transition-colors">
          <div className="w-12 h-12 bg-turquoise-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-6 w-6 text-turquoise-400" />
          </div>
          <CardTitle className="text-lg mb-2 text-white">Ideen umsetzen lassen</CardTitle>
          <CardDescription className="text-gray-200">
            Von der App-Idee zur Umsetzung - professionelle Entwicklung ohne
            technische Vorkenntnisse
          </CardDescription>
        </Card>

        <Card className="text-center p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30 hover:border-turquoise-500/50 transition-colors">
          <div className="w-12 h-12 bg-turquoise-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket className="h-6 w-6 text-turquoise-400" />
          </div>
          <CardTitle className="text-lg mb-2 text-white">MVP entwickeln</CardTitle>
          <CardDescription className="text-gray-200">
            Schnelle Umsetzung Ihres Minimum Viable Product in 4-8 Wochen
          </CardDescription>
        </Card>

        <Card className="text-center p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30 hover:border-turquoise-500/50 transition-colors">
          <div className="w-12 h-12 bg-turquoise-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-turquoise-400" />
          </div>
          <CardTitle className="text-lg mb-2 text-white">
            Website erstellen lassen
          </CardTitle>
          <CardDescription className="text-gray-200">
            Professionelle Websites und Web-Apps mit modernen Technologien
          </CardDescription>
        </Card>
      </div>

      {/* Service Packages */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Unsere Service-Pakete
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Flexible Beratungspakete, die sich an Ihre Bedürfnisse und Ihr
            Budget anpassen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Beratung Package */}
          <Card className="relative overflow-hidden bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30 hover:border-turquoise-500/50 transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Startup-Beratung
              </CardTitle>
              <div className="text-3xl font-bold text-turquoise-400">
                €150<span className="text-lg text-gray-400">/Stunde</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Strategische Beratung und Business Model Canvas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Marktanalyse und Wettbewerbsanalyse
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Technologie-Stack Empfehlungen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    MVP-Planung und Roadmap
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Investoren-Pitch Vorbereitung
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-turquoise-600 hover:bg-turquoise-500"
                onClick={() => router.push("/contact")}
              >
                Beratung buchen
              </Button>
            </CardContent>
          </Card>

          {/* MVP Package */}
          <Card className="relative overflow-hidden bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30 hover:border-turquoise-500/50 transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600"></div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-turquoise-600 text-white">Beliebt</Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                MVP-Entwicklung
              </CardTitle>
              <div className="text-3xl font-bold text-turquoise-400">
                €2.500<span className="text-lg text-gray-400">-5.000</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Komplette MVP-Entwicklung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Moderne Web-Technologien (React/Next.js)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Responsive Design & Mobile-First
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    User Authentication & Database
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Deployment & Hosting Setup
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    3 Monate Support & Wartung
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-turquoise-600 hover:bg-turquoise-500"
                onClick={() => router.push("/contact")}
              >
                MVP starten
              </Button>
            </CardContent>
          </Card>

          {/* Full Service Package */}
          <Card className="relative overflow-hidden bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30 hover:border-turquoise-500/50 transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Full-Service Startup
              </CardTitle>
              <div className="text-3xl font-bold text-turquoise-400">
                €8.000<span className="text-lg text-gray-400">+</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Komplette Startup-Beratung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Professionelle Website/Web-App
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Mobile App (iOS/Android)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    SEO & Marketing Setup
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Analytics & Tracking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    6 Monate Support & Skalierung
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-turquoise-600 hover:bg-turquoise-500"
                onClick={() => router.push("/contact")}
              >
                Full-Service starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Warum Startups uns vertrauen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <div className="w-12 h-12 bg-turquoise-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-turquoise-400" />
            </div>
            <CardTitle className="text-lg mb-2 text-white">Erfahrung</CardTitle>
            <CardDescription className="text-gray-200">
              Über 5 Jahre Erfahrung in der Startup-Beratung und MVP-Entwicklung
            </CardDescription>
          </Card>

          <Card className="text-center p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <div className="w-12 h-12 bg-turquoise-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-turquoise-400" />
            </div>
            <CardTitle className="text-lg mb-2 text-white">Schnell</CardTitle>
            <CardDescription className="text-gray-200">
              MVP in 4-8 Wochen statt Monaten - schnell zur Marktreife
            </CardDescription>
          </Card>

          <Card className="text-center p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <div className="w-12 h-12 bg-turquoise-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-turquoise-400" />
            </div>
            <CardTitle className="text-lg mb-2 text-white">Sicher</CardTitle>
            <CardDescription className="text-gray-200">
              Moderne Sicherheitsstandards und Datenschutz von Anfang an
            </CardDescription>
          </Card>

          <Card className="text-center p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <div className="w-12 h-12 bg-turquoise-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-turquoise-400" />
            </div>
            <CardTitle className="text-lg mb-2 text-white">Skalierbar</CardTitle>
            <CardDescription className="text-gray-200">
              Architektur, die mit Ihrem Startup wächst und skaliert
            </CardDescription>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Antworten auf die wichtigsten Fragen zur App- und
            Website-Entwicklung
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <CardTitle className="text-lg mb-3 text-white">
              Wie kann ich meine App-Idee umsetzen?
            </CardTitle>
            <CardDescription className="text-gray-200">
              Ich helfe Ihnen dabei, Ihre App-Idee Schritt für Schritt
              umzusetzen - von der ersten Idee bis zum fertigen MVP. Ohne
              technische Vorkenntnisse.
            </CardDescription>
          </Card>

          <Card className="p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <CardTitle className="text-lg mb-3 text-white">
              Was kostet es, eine App entwickeln zu lassen?
            </CardTitle>
            <CardDescription className="text-gray-200">
              Die Kosten hängen von der Komplexität ab. Ein MVP kostet zwischen
              €2.500-5.000. Lassen Sie sich kostenlos beraten!
            </CardDescription>
          </Card>

          <Card className="p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <CardTitle className="text-lg mb-3 text-white">
              Wie lange dauert die Entwicklung eines MVP?
            </CardTitle>
            <CardDescription className="text-gray-200">
              Ein MVP kann in 4-8 Wochen entwickelt werden. Schneller als die
              meisten Agenturen - damit Sie schnell zur Marktreife kommen.
            </CardDescription>
          </Card>

          <Card className="p-6 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
            <CardTitle className="text-lg mb-3 text-white">
              Brauche ich Programmierkenntnisse?
            </CardTitle>
            <CardDescription className="text-gray-200">
              Nein! Ich übernehme die komplette technische Umsetzung. Sie
              konzentrieren sich auf Ihr Business, ich auf die Entwicklung.
            </CardDescription>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-4xl text-center space-y-6 bg-turquoise-800/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-turquoise-600/30">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Bereit, Ihre Idee umzusetzen?
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Lassen Sie uns gemeinsam Ihre App-Idee oder Website-Idee zum Leben
          erwecken. Kostenlose Erstberatung inklusive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white px-8 py-3"
            onClick={() => router.push("/contact")}
          >
            Jetzt beraten lassen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-turquoise-600/50 text-white hover:bg-turquoise-700/30"
            onClick={() => router.push("/preisrechner")}
          >
            Preisrechner nutzen
          </Button>
        </div>
      </div>
    </div>
  );
}
