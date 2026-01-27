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
import UnternehmenswebsiteHero from "@/components/services/unternehmenswebsite-hero";
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
    <div className="min-h-screen w-full flex flex-col items-center gap-8 md:gap-12 bg-turquoise-800">
      {/* Hero Section */}
      <UnternehmenswebsiteHero />

      {/* Spacing für weitere Sections */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center gap-8 md:gap-12">

      {/* Service Packages */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Unsere Webdesign-Pakete
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Flexible Webdesign-Lösungen, die sich an Ihre Bedürfnisse und Ihr
            Budget anpassen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Package */}
          <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600"></div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Basic Website
              </CardTitle>
              <div className="text-3xl font-bold text-turquoise-500">
                €1.200<span className="text-lg text-gray-500">-2.500</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Professionelle 5-8 Seiten Website
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Responsive Design für alle Geräte
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    SEO-Grundoptimierung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">Kontaktformular</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Google Analytics Integration
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-turquoise-500 hover:bg-turquoise-600"
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
          <Card className="relative overflow-hidden border-2 border-turquoise-200 hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turquoise-600 to-turquoise-700"></div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-turquoise-600 text-white">Beliebt</Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Professional Website
              </CardTitle>
              <div className="text-3xl font-bold text-turquoise-600">
                €3.500<span className="text-lg text-gray-500">-7.000</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Umfangreiche 10-15 Seiten Website
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Custom Design & Branding
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Erweiterte SEO-Optimierung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Blog-System & CMS
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Newsletter-Integration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    6 Monate Support & Wartung
                  </span>
                </li>
              </ul>
              <Button
                className="w-full bg-turquoise-600 hover:bg-turquoise-700"
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
              <CardTitle className="text-2xl font-bold text-white">
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
                  <span className="text-sm text-gray-200">
                    Vollständiger Online-Shop
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Zahlungssystem-Integration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Produktkatalog & Warenkorb
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Bestellmanagement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
                    Kundenkonto & Bewertungen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-200">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Warum Webdesign aus Wetzlar?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-turquoise-500" />
            </div>
            <CardTitle className="text-lg mb-2">Lokale Expertise</CardTitle>
            <CardDescription>
              Webdesign-Experte aus Wetzlar mit über 5 Jahren Erfahrung in der
              Region
            </CardDescription>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-turquoise-600" />
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
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Webdesign Wetzlar - Ihre Vorteile
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-turquoise-500" />
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
              <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-turquoise-600" />
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
    </div>
  );
}
