"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const STARTUP_FAQS = [
  {
    id: "ablauf-beratung",
    question: "Was passiert beim Beratungstermin?",
    answer:
      "Sie haben im Formular Ihre Idee beschrieben – ich lese mich ein und bereite mich vor. Im Termin (1 Stunde, Videocall oder Telefon) besprechen wir die technische Umsetzung: Was ist sinnvoll, was ist machbar, welche Schritte kommen zuerst. Danach erhalten Sie von mir einen schriftlichen Umsetzungsplan inkl. Kostenschätzung.",
  },
  {
    id: "kosten",
    question: "Was kostet die Beratung?",
    answer:
      "Die Startup-Beratung kostet 80€ pro Stunde. Sie buchen eine Stunde: Sie geben Ihre Idee vorab an, wir führen das Gespräch, und Sie bekommen anschließend einen schriftlichen Umsetzungsplan inkl. Kostenschätzung. Es gibt keine versteckten Kosten.",
  },
  {
    id: "umsetzungsplan",
    question: "Was ist im Umsetzungsplan enthalten?",
    answer:
      "Der schriftliche Umsetzungsplan fasst zusammen, was wir besprochen haben: technische Schritte, sinnvolle Reihenfolge, Aufwand und eine Kostenschätzung für die Umsetzung (z. B. MVP-Entwicklung). So haben Sie eine klare Entscheidungsgrundlage für den nächsten Schritt.",
  },
  {
    id: "nach-beratung",
    question: "Wie geht es nach der Beratung weiter (MVP)?",
    answer:
      "Nach dem Beratungstermin können Sie entscheiden, ob Sie die Umsetzung in Auftrag geben möchten. Der nächste logische Schritt ist oft die MVP-Entwicklung: Ich setze Ihr Minimum Viable Product in 4–8 Wochen um. Das Angebot dazu erhalten Sie auf Basis des Umsetzungsplans.",
  },
  {
    id: "programmierkenntnisse",
    question: "Brauche ich Programmierkenntnisse?",
    answer:
      "Nein. Sie beschreiben Ihre Idee, wir besprechen die Umsetzung – ich übernehme die technische Seite. Sie müssen nichts programmieren. Der Umsetzungsplan ist so formuliert, dass Sie verstehen, was geplant ist und was es kostet.",
  },
  {
    id: "dauer-termin",
    question: "Wie schnell bekomme ich einen Termin?",
    answer:
      "Nach Ihrer Anfrage melde ich mich in der Regel innerhalb von 24 Stunden und schlage Ihnen Termine vor. Die Beratung kann per Videocall oder Telefon stattfinden – auch kurzfristig, je nach Verfügbarkeit.",
  },
];

export default function StartupBeratungFAQ() {
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
          Antworten zu Ablauf, Kosten, Umsetzungsplan und nächsten Schritten.
        </p>
      </div>

      <Card className="overflow-hidden bg-card border-border shadow-sm">
        <div className="divide-y divide-border">
          {STARTUP_FAQS.map((faq) => {
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
