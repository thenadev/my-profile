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
  Monitor,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import UnternehmenswebsiteSocialProof from "@/components/services/unternehmenswebsite-social-proof";
import UnternehmenswebsiteFAQ from "@/components/services/unternehmenswebsite-faq";
import UnternehmenswebsitePortfolio from "@/components/services/unternehmenswebsite-portfolio";
import UnternehmenswebsiteContactForm from "@/components/services/unternehmenswebsite-contact-form";
import UnternehmenswebsiteFinalCTA from "@/components/services/unternehmenswebsite-final-cta";

export default function UnternehmenswebsiteClient() {
  const router = useRouter();

  const handleCTAClick = (ctaType: string) => {
    sendGoogleEvent("cta_click", {
      cta_type: ctaType,
      location: "landing_page",
      service: "unternehmenswebsite",
    });
    if (ctaType === "contact_form") {
      // Scroll to form
      setTimeout(() => {
        document
          .getElementById("contact-form-section")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      router.push("/contact");
    }
  };

  return (
    <div className="min-h-screen w-full py-24 md:py-28 flex flex-col items-center gap-8 md:gap-12 px-4 md:px-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm font-medium">
            🎨 Webdesign & Entwicklung
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Webdesign Wetzlar
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professionelle Unternehmenswebsites aus Wetzlar - Moderne,
            responsive und SEO-optimierte Webdesigns für Ihr Unternehmen
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            onClick={() => handleCTAClick("contact_form")}
          >
            Kostenlose Beratung
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              sendGoogleEvent("price_calculator_click", {
                location: "landing_page_hero",
              });
              router.push("/preisrechner");
            }}
          >
            Preisrechner
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Kostenlose Erstberatung</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Unverbindliches Angebot</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>5+ Jahre Erfahrung</span>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card className="text-center p-6 border-2 border-blue-100 hover:border-blue-200 transition-colors">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-lg mb-2">Moderne Webdesigns</CardTitle>
          <CardDescription>
            Zeitgemäße, benutzerfreundliche Websites mit modernen Technologien
            und ansprechendem Design
          </CardDescription>
        </Card>

        <Card className="text-center p-6 border-2 border-purple-100 hover:border-purple-200 transition-colors">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="h-6 w-6 text-purple-600" />
          </div>
          <CardTitle className="text-lg mb-2">Responsive Design</CardTitle>
          <CardDescription>
            Perfekt optimiert für alle Geräte - Desktop, Tablet und Smartphone
          </CardDescription>
        </Card>

        <Card className="text-center p-6 border-2 border-green-100 hover:border-green-200 transition-colors">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-lg mb-2">SEO-Optimiert</CardTitle>
          <CardDescription>
            Suchmaschinenoptimierung für bessere Sichtbarkeit und höhere
            Rankings
          </CardDescription>
        </Card>
      </div>

      {/* Service Packages */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Unsere Webdesign-Pakete
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Flexible Webdesign-Lösungen, die sich an Ihre Bedürfnisse und Ihr
            Budget anpassen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Package */}
          <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Basic Website
              </CardTitle>
              <div className="text-3xl font-bold text-blue-600">
                €1.200<span className="text-lg text-gray-500">-2.500</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Professionelle 5-8 Seiten Website
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Responsive Design für alle Geräte
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    SEO-Grundoptimierung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Kontaktformular</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Google Analytics Integration
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  sendGoogleEvent("package_click", {
                    package: "basic",
                    location: "landing_page",
                  });
                  handleCTAClick("contact_form");
                }}
              >
                Basic Website buchen
              </Button>
            </CardContent>
          </Card>

          {/* Professional Package */}
          <Card className="relative overflow-hidden border-2 border-purple-200 hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-600 text-white">Beliebt</Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Professional Website
              </CardTitle>
              <div className="text-3xl font-bold text-purple-600">
                €3.500<span className="text-lg text-gray-500">-7.000</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Umfangreiche 10-15 Seiten Website
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Custom Design & Branding
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Erweiterte SEO-Optimierung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Blog-System & CMS
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Newsletter-Integration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    6 Monate Support & Wartung
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  sendGoogleEvent("package_click", {
                    package: "professional",
                    location: "landing_page",
                  });
                  handleCTAClick("contact_form");
                }}
              >
                Professional Website buchen
              </Button>
            </CardContent>
          </Card>

          {/* E-Commerce Package */}
          <Card className="relative overflow-hidden border-2 border-green-200 hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                E-Commerce Website
              </CardTitle>
              <div className="text-3xl font-bold text-green-600">
                €8.000<span className="text-lg text-gray-500">+</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Vollständiger Online-Shop
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Zahlungssystem-Integration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Produktkatalog & Warenkorb
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Bestellmanagement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Kundenkonto & Bewertungen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    12 Monate Support & Wartung
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  sendGoogleEvent("package_click", {
                    package: "ecommerce",
                    location: "landing_page",
                  });
                  handleCTAClick("contact_form");
                }}
              >
                E-Commerce Website buchen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Warum Webdesign aus Wetzlar?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg mb-2">Lokale Expertise</CardTitle>
            <CardDescription>
              Webdesign-Experte aus Wetzlar mit über 5 Jahren Erfahrung in der
              Region
            </CardDescription>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg mb-2">Schnelle Umsetzung</CardTitle>
            <CardDescription>
              Professionelle Websites in 2-4 Wochen - schnell zur Online-Präsenz
            </CardDescription>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg mb-2">Sicher & Zuverlässig</CardTitle>
            <CardDescription>
              Moderne Sicherheitsstandards und zuverlässige Hosting-Lösungen
            </CardDescription>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg mb-2">SEO-Optimiert</CardTitle>
            <CardDescription>
              Suchmaschinenoptimierung für bessere Sichtbarkeit in Wetzlar und
              Umgebung
            </CardDescription>
          </Card>
        </div>
      </div>

      {/* SEO Section */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Webdesign Wetzlar - Ihre Vorteile
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl mb-2">Lokale Präsenz</CardTitle>
                <CardDescription className="text-base">
                  Als Webdesigner aus Wetzlar verstehe ich die lokale Wirtschaft
                  und kann Ihre Website optimal auf die Region Mittelhessen
                  ausrichten. Von Wetzlar über Gießen bis nach Frankfurt - ich
                  kenne die lokalen Märkte und Zielgruppen.
                </CardDescription>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl mb-2">
                  Persönlicher Service
                </CardTitle>
                <CardDescription className="text-base">
                  Direkter Kontakt ohne Zwischenhändler. Persönliche Beratung,
                  regelmäßige Updates und ein direkter Ansprechpartner für alle
                  Fragen rund um Ihr Webdesign-Projekt in Wetzlar.
                </CardDescription>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Social Proof Section */}
      <UnternehmenswebsiteSocialProof />

      {/* Portfolio Section */}
      <UnternehmenswebsitePortfolio />

      {/* FAQ Section */}
      <UnternehmenswebsiteFAQ />

      {/* Kontaktformular Section */}
      <UnternehmenswebsiteContactForm />

      {/* Final CTA Section */}
      <UnternehmenswebsiteFinalCTA onContactClick={() => handleCTAClick("contact_form")} />
    </div>
  );
}
