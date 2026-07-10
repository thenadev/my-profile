/**
 * Inhalte der lokalen Landingpage /webdesign-wetzlar.
 *
 * WICHTIG: Die FAQ-Texte werden sowohl im sichtbaren FAQ-Block als auch
 * im FAQPage-JSON-LD verwendet — beide MÜSSEN identisch bleiben (Google
 * verlangt Übereinstimmung zwischen Rich-Result und sichtbarem Inhalt).
 */

export interface WebdesignFaq {
  question: string;
  answer: string;
}

export const WEBDESIGN_WETZLAR_FAQS: WebdesignFaq[] = [
  {
    question: "Was kostet Webdesign in Wetzlar?",
    answer:
      "Eine professionelle Unternehmenswebsite aus Wetzlar startet je nach Umfang bei etwa 1.500 € für eine kompakte One-Page und liegt bei mehrseitigen Firmenwebsites meist zwischen 2.500 € und 6.000 €. Du bekommst vorab einen transparenten Festpreis ohne versteckte Kosten — kein Stundensatz-Risiko.",
  },
  {
    question: "Arbeitest du nur für Kunden aus Wetzlar?",
    answer:
      "Mein Schwerpunkt liegt auf Wetzlar, Gießen und ganz Mittelhessen, weil persönliche Treffen hier unkompliziert möglich sind. Ich betreue aber auch Kunden bundesweit vollständig remote — die Zusammenarbeit funktioniert per Video-Call, E-Mail und Telefon genauso reibungslos.",
  },
  {
    question: "Können wir uns in Wetzlar persönlich treffen?",
    answer:
      "Ja. Als lokaler Webdesigner aus Wetzlar treffe ich Kunden aus der Region gerne persönlich — für das Erstgespräch, die Konzeption oder Zwischenabstimmungen. Kurze Wege und ein fester Ansprechpartner statt anonymer Agentur-Hotline sind einer der größten Vorteile.",
  },
  {
    question: "Wie lange dauert es, eine Website erstellen zu lassen?",
    answer:
      "Eine einfache Website ist oft in 1–2 Wochen online, eine umfangreichere Unternehmenswebsite dauert in der Regel 3–6 Wochen. Der Zeitrahmen hängt vor allem davon ab, wie schnell Texte und Bilder bereitstehen — hier unterstütze ich dich aktiv.",
  },
  {
    question: "Übernimmst du auch die Suchmaschinenoptimierung (SEO)?",
    answer:
      "Ja. Jede Website wird technisch SEO-optimiert ausgeliefert (sauberer Code, schnelle Ladezeiten, strukturierte Daten, mobile Optimierung). Auf Wunsch richte ich zusätzlich dein Google-Unternehmensprofil ein und optimiere gezielt auf lokale Suchbegriffe wie „Webdesign Wetzlar“, damit dich Kunden aus der Region finden.",
  },
  {
    question: "Was unterscheidet dich von einer klassischen Webdesign-Agentur?",
    answer:
      "Du arbeitest direkt mit dem Entwickler zusammen — ohne Zwischenschichten, Projektmanager-Overhead oder Baukasten-Vorlagen. Als Fullstack-Entwickler setze ich Design und Technik aus einer Hand um: individuell programmiert, schnell und wartbar. Das spart Kosten und Reibungsverluste.",
  },
];

/** Region/Orte für lokale Relevanz-Signale (interner Content, kein Fake). */
export const WEBDESIGN_WETZLAR_ORTE = [
  "Wetzlar",
  "Gießen",
  "Braunfels",
  "Solms",
  "Aßlar",
  "Lahnau",
  "Wetzlar-Wöllbach",
  "Dutenhofen",
  "Mittelhessen",
];
