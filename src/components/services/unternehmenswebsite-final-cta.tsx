"use client";

import { Button } from "@/components/ui/button";
import {
  getYearsOfExperienceDisplay,
  SATISFACTION_PERCENT,
} from "@/config/stats";
import { ArrowRight, Award, Clock, Shield, Zap } from "lucide-react";

interface UnternehmenswebsiteFinalCTAProps {
  onContactClick: () => void;
}

export default function UnternehmenswebsiteFinalCTA({
  onContactClick,
}: UnternehmenswebsiteFinalCTAProps) {
  return (
    <div className="w-full max-w-4xl text-center space-y-6 bg-card backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold text-primary">
          Begrenzte Kapazität - Jetzt Termin sichern
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        Bereit für Ihre neue Website?
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Lassen Sie uns gemeinsam Ihre Online-Präsenz in Wetzlar auf das nächste
        Level bringen. Kostenlose Erstberatung inklusive.
      </p>
      <div className="flex justify-center items-center">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          onClick={onContactClick}
        >
          Jetzt beraten lassen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <span>{getYearsOfExperienceDisplay()} Jahre Erfahrung</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span>{SATISFACTION_PERCENT}% Zufriedenheitsgarantie</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span>Schnelle Umsetzung</span>
        </div>
      </div>
    </div>
  );
}
