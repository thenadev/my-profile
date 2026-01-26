"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Award, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";

interface UnternehmenswebsiteFinalCTAProps {
  onContactClick: () => void;
}

export default function UnternehmenswebsiteFinalCTA({
  onContactClick,
}: UnternehmenswebsiteFinalCTAProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-4xl text-center space-y-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-orange-500" />
        <span className="text-sm font-semibold text-orange-600">
          Begrenzte Kapazität - Jetzt Termin sichern
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Bereit für Ihre neue Website?
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Lassen Sie uns gemeinsam Ihre Online-Präsenz in Wetzlar auf das nächste
        Level bringen. Kostenlose Erstberatung inklusive.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
          onClick={onContactClick}
        >
          Jetzt beraten lassen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            sendGoogleEvent("price_calculator_click", {
              location: "landing_page_footer",
            });
            router.push("/preisrechner");
          }}
        >
          Preisrechner nutzen
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-blue-500" />
          <span>5+ Jahre Erfahrung</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span>100% Zufriedenheitsgarantie</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-purple-500" />
          <span>Schnelle Umsetzung</span>
        </div>
      </div>
    </div>
  );
}
