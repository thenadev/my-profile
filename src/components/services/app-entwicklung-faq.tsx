"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const APP_FAQS = [
  {
    id: "was-ist-flutter",
    question: "Was ist Flutter?",
    answer:
      "Flutter ist ein Framework von Google zur Entwicklung von Apps für mehrere Plattformen aus einer Codebasis. Sie schreiben den Code einmal, und die App läuft auf Android und iOS – oft mit nahezu nativem Look und guter Performance. Ideal für MVPs und mittelgroße Apps.",
  },
  {
    id: "warum-android-ios",
    question: "Warum Android und iOS aus einer Codebasis?",
    answer:
      "Mit Flutter entwickeln Sie nur einmal – die gleiche App erscheint auf Android und iOS. Das spart Zeit und Kosten im Vergleich zu zwei getrennten Projekten (z. B. Kotlin/Swift). Für viele Produkte reicht eine einheitliche Codebasis völlig aus.",
  },
  {
    id: "ablauf-beratung",
    question: "Wie läuft das Beratungsgespräch ab?",
    answer:
      "Sie geben im Formular Ihr Anliegen oder Ihre App-Idee an – ich bereite mich vor. Im Termin (1 Stunde, Videocall oder Telefon) besprechen wir die technische Umsetzung: Flutter, Machbarkeit, Aufwand. Optional erhalten Sie danach einen kurzen schriftlichen Plan oder eine Kostenschätzung.",
  },
  {
    id: "kosten-beratung-mvp",
    question: "Was kostet die Beratung bzw. ein MVP?",
    answer:
      "Die Beratung kostet 80€ pro Stunde. Ein App-MVP mit Flutter für Android und iOS liegt typischerweise im Bereich von etwa 3.500 € bis 8.000 € – abhängig von Umfang und Anforderungen. Nach dem Beratungsgespräch können wir das konkret durchgehen.",
  },
  {
    id: "dauer-mvp",
    question: "Wie lange dauert die Entwicklung eines App-MVPs?",
    answer:
      "Ein typisches App-MVP mit Flutter benötigt etwa 6–12 Wochen – abhängig von Funktionsumfang, Design und Backend. Im Beratungsgespräch können wir einen groben Zeitplan abstimmen.",
  },
  {
    id: "feature-bug",
    question: "Feature- und Bug-Entwicklung für bestehende Apps?",
    answer:
      "Wenn Sie bereits eine App haben (Flutter oder auch native), können wir gezielt neue Features umsetzen oder Bugs beheben. Ich analysiere Ihr Projekt und mache ein individuelles Angebot. Auch Wartung und kleine Erweiterungen sind möglich.",
  },
];

export default function AppEntwicklungFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Häufig gestellte Fragen
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Antworten zu Flutter, Ablauf, Kosten und MVP.
        </p>
      </div>

      <Card className="overflow-hidden bg-card border-border shadow-sm">
        <div className="divide-y divide-border">
          {APP_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="group">
                <button
                  type="button"
                  className="w-full px-5 md:px-6 py-4 text-left flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <HelpCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span
                      className={cn(
                        "font-medium text-foreground text-sm md:text-base",
                        isOpen && "text-primary",
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <span className="flex-shrink-0 text-muted-foreground">
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </span>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200 ease-out",
                    isOpen ? "max-h-96" : "max-h-0",
                  )}
                >
                  <div className="px-5 md:px-6 pb-4 pt-0 pl-12 md:pl-14">
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
