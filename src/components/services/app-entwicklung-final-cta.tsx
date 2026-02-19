"use client";

import { Button } from "@/components/ui/button";
import {
  getYearsOfExperienceDisplay,
  SATISFACTION_PERCENT,
} from "@/config/stats";
import { ArrowRight, Award, Shield, Smartphone, Zap } from "lucide-react";

interface AppEntwicklungFinalCTAProps {
  onTerminClick: () => void;
}

export default function AppEntwicklungFinalCTA({
  onTerminClick,
}: AppEntwicklungFinalCTAProps) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center space-y-6 bg-card backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        Bereit für Ihre App mit Flutter?
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Beratungstermin buchen (80€/h), Anliegen angeben – danach optional MVP
        oder Feature-/Bug-Entwicklung für Android & iOS.
      </p>
      <div className="flex justify-center items-center">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          onClick={onTerminClick}
        >
          Beratungstermin buchen (80€/h)
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <span>Flutter – Android & iOS</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <span>{getYearsOfExperienceDisplay()} Jahre Erfahrung</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span>{SATISFACTION_PERCENT}% Zufriedenheit</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span>Schnelle Terminvergabe</span>
        </div>
      </div>
    </div>
  );
}
