"use client";

import { Card } from "@/components/ui/card";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// FAQ Daten
const faqs = [
  {
    question: "Wie lange dauert die Erstellung einer Website?",
    answer:
      "Eine Basic Website benötigt in der Regel 2-3 Wochen, eine Professional Website 3-5 Wochen und eine E-Commerce Website 6-10 Wochen. Die genaue Dauer hängt von der Komplexität und Ihren Anforderungen ab.",
  },
  {
    question: "Kann ich meine Website später erweitern?",
    answer:
      "Ja, absolut! Alle Websites sind modular aufgebaut und können jederzeit um neue Funktionen, Seiten oder Features erweitert werden. Wir bieten auch langfristigen Support und Wartung an.",
  },
  {
    question: "Ist die Website SEO-optimiert?",
    answer:
      "Ja, alle unsere Websites werden von Grund auf SEO-optimiert erstellt. Dazu gehören technische SEO, On-Page-Optimierung, schnelle Ladezeiten und mobile Optimierung.",
  },
  {
    question: "Kann ich die Website selbst bearbeiten?",
    answer:
      "Bei Professional und E-Commerce Paketen ist ein Content Management System (CMS) enthalten, mit dem Sie Inhalte selbstständig bearbeiten können. Bei Basic Websites können wir dies optional hinzufügen.",
  },
  {
    question: "Was passiert nach der Fertigstellung?",
    answer:
      "Nach der Fertigstellung erhalten Sie Zugriff auf Ihre Website, eine Einweisung in das CMS (falls vorhanden) und Support für die im Paket enthaltene Zeit. Wir helfen Ihnen auch beim Hosting-Setup.",
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer:
      "Nein, alle Preise sind transparent. Die einmaligen Kosten beinhalten Design, Entwicklung und Einrichtung. Monatliche Kosten entstehen nur für Hosting und optionalen Support, die wir vorher besprechen.",
  },
];

export default function UnternehmenswebsiteFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Häufig gestellte Fragen
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Antworten auf die wichtigsten Fragen rund um Ihr Webdesign-Projekt
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() =>
                setOpenFaqIndex(openFaqIndex === index ? null : index)
              }
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
              </div>
              {openFaqIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openFaqIndex === index && (
              <div className="px-6 pb-6 pt-0">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
