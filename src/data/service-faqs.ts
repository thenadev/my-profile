import {
  Code2,
  Globe,
  Lock,
  Monitor,
  Search,
  Settings,
  Shield,
  Smartphone,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqEntry extends FaqItem {
  id: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  faqs: FaqItem[];
}

// Geteilte Datenquelle: wird sowohl von den FAQ-Client-Komponenten
// gerendert als auch serverseitig für das FAQPage-JSON-LD verwendet.
// (Inhalt liegt nur auf Deutsch vor.)

export const appEntwicklungFaqs: FaqEntry[] = [
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
    question: "Was kostet eine App-Entwicklung bzw. ein MVP?",
    answer:
      "Die Beratung kostet 80€ pro Stunde. Ein App-MVP mit Flutter für Android und iOS liegt typischerweise im Bereich von etwa 3.500 € bis 8.000 € – abhängig von Umfang und Anforderungen. Nach dem Beratungsgespräch können wir das konkret durchgehen.",
  },
  {
    id: "dauer-mvp",
    question: "Wie lange dauert die Entwicklung einer App?",
    answer:
      "Ein typisches App-MVP mit Flutter benötigt etwa 6–12 Wochen – abhängig von Funktionsumfang, Design und Backend. Im Beratungsgespräch können wir einen groben Zeitplan abstimmen.",
  },
  {
    id: "feature-bug",
    question: "Bieten Sie Feature- und Bug-Entwicklung für bestehende Apps an?",
    answer:
      "Wenn Sie bereits eine App haben (Flutter oder auch native), können wir gezielt neue Features umsetzen oder Bugs beheben. Ich analysiere Ihr Projekt und mache ein individuelles Angebot. Auch Wartung und kleine Erweiterungen sind möglich.",
  },
];

export const startupBeratungFaqs: FaqEntry[] = [
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

export const unternehmenswebsiteFaqCategories: FaqCategory[] = [
  {
    id: "website-erstellung",
    title: "Website-Erstellung",
    icon: Code2,
    description: "Grundlagen zur Erstellung Ihrer Firmenwebsite",
    faqs: [
      {
        question: "Wie kann ich eine eigene Firmenwebsite erstellen?",
        answer:
          "Sie haben zwei Wege: Entweder beauftragen Sie einen Webdesigner (wie mich) oder nutzen einen Website-Baukasten. Ein Profi erstellt Ihnen eine maßgeschneiderte, professionelle Website mit individueller Beratung. Baukästen eignen sich für einfache Seiten mit begrenztem Budget.",
      },
      {
        question:
          "Kann ich meine Website selbst erstellen oder sollte ich einen Profi beauftragen?",
        answer:
          "Einfache Seiten können Sie mit Baukästen selbst erstellen. Für professionelle Auftritte, komplexe Anforderungen, SEO-Optimierung und einzigartiges Design lohnt sich ein Profi. Gerne berate ich Sie unverbindlich, welcher Weg für Ihr Unternehmen sinnvoller ist.",
      },
      {
        question:
          "Brauche ich Programmierkenntnisse, um eine Website zu erstellen?",
        answer:
          "Nein. Mit einem CMS (z. B. bei unseren Professional-Paketen) können Sie Texte, Bilder und Seiten selbst bearbeiten – ohne Programmierkenntnisse. Bei Baukästen ist ebenfalls keine Technik nötig. Nur bei individueller Entwicklung übernehme ich die technische Umsetzung.",
      },
      {
        question: "Wie lange dauert es, bis meine Website erstellt ist?",
        answer:
          "Eine Basic-Website benötigt etwa 2–3 Wochen, eine Professional-Website 3–5 Wochen und ein Online-Shop 6–10 Wochen. Die Dauer hängt von Umfang, Ihren Inhalten und der gewählten Komplexität ab.",
      },
      {
        question: "Was kostet es, eine Website erstellen zu lassen?",
        answer:
          "Die Kosten variieren je nach Umfang: Einfache Firmenwebsites starten ab ca. 1.500 €, professionelle Websites mit CMS ab ca. 3.000 €. Alle Preise sind transparent – es gibt keine versteckten Kosten. Gerne erstelle ich Ihnen ein individuelles Angebot.",
      },
      {
        question: "Welche Seiten und Inhalte sollte meine Firmenwebsite haben?",
        answer:
          "Typisch sind: Startseite, Über uns, Leistungen/Services, Referenzen, Kontakt und Impressum. Je nach Branche ergänzen Sie z. B. einen Blog, FAQ oder Galerie. Ich berate Sie gerne zu einer sinnvollen Struktur für Ihr Unternehmen.",
      },
      {
        question:
          "Welche Art von Website ist für mein Unternehmen die richtige (Firmenwebsite, Online-Shop, Blog)?",
        answer:
          "Eine Firmenwebsite reicht für die meisten KMU. Ein Online-Shop ist sinnvoll, wenn Sie Produkte online verkaufen wollen. Ein Blog unterstützt SEO und Positionierung als Experte. Oft kombiniert man eine Firmenwebsite mit einem Blog – ich helfe Ihnen bei der Entscheidung.",
      },
      {
        question:
          "Was ist ein Content-Management-System (CMS) und brauche ich das für meine Website?",
        answer:
          "Ein CMS ermöglicht es Ihnen, Inhalte (Texte, Bilder, Seiten) selbst zu bearbeiten – ohne Programmierkenntnisse. Für regelmäßige Updates und mehr Flexibilität ist ein CMS sehr sinnvoll. Bei unseren Professional-Paketen ist es enthalten.",
      },
    ],
  },
  {
    id: "domain-hosting",
    title: "Domain & Hosting",
    icon: Globe,
    description: "Domain, Hosting und technische Grundlagen",
    faqs: [
      {
        question: "Wie wähle ich eine passende Domain für meine Firmenwebsite?",
        answer:
          "Ideal ist eine Domain mit Ihrem Firmennamen, z. B. firma.de. Kurz, einprägsam und .de für den deutschen Markt. Vermeiden Sie Bindestriche und lange Kombinationen. Ich berate Sie gerne bei der Auswahl.",
      },
      {
        question: "Wie registriere ich eine Domain für meine Website?",
        answer:
          "Domains registrieren Sie bei einem Anbieter wie IONOS, Strato oder Hetzner. Die Registrierung dauert wenige Minuten. Ich kann Sie dabei unterstützen oder die Domain im Rahmen des Projekts mit einrichten.",
      },
      {
        question: "Was kostet eine Domain und Webhosting pro Jahr?",
        answer:
          "Eine .de-Domain kostet etwa 5–15 € pro Jahr, Hosting für eine kleine Website etwa 3–10 € monatlich (ca. 36–120 €/Jahr). Für KMU-Websites reichen meist günstige Pakete aus.",
      },
      {
        question:
          "Was ist Webhosting und warum braucht meine Website einen Hosting-Anbieter?",
        answer:
          "Hosting ist der Speicherplatz im Internet, auf dem Ihre Website liegt. Ohne Hosting ist Ihre Website nicht erreichbar. Der Anbieter stellt Server, Sicherheit und Verfügbarkeit bereit.",
      },
      {
        question: "Benötige ich einen eigenen Server für meine Website?",
        answer:
          "Nein. Für die meisten Firmenwebsites reicht ein Shared-Hosting-Paket. Ein eigener Server ist nur bei sehr hohem Traffic oder speziellen Anforderungen nötig.",
      },
      {
        question:
          "Was ist der Unterschied zwischen einer Domain und Webhosting?",
        answer:
          "Die Domain ist Ihre Adresse (z. B. firma.de), Hosting der Speicherplatz für Ihre Website. Beides brauchen Sie: Die Domain zeigt auf den Hosting-Server, wo Ihre Dateien liegen.",
      },
    ],
  },
  {
    id: "technische-einrichtung",
    title: "Technische Einrichtung & Betreuung",
    icon: Settings,
    description: "E-Mail, Pflege und technischer Support",
    faqs: [
      {
        question:
          "Wie kann ich E-Mail-Adressen mit meiner eigenen Domain einrichten?",
        answer:
          "E-Mail-Adressen wie info@firma.de richten Sie beim Hosting-Anbieter oder über Google Workspace/Microsoft 365 ein. Ich unterstütze Sie bei der Einrichtung und Konfiguration – auch als Teil des Webdesign-Projekts.",
      },
      {
        question:
          "Kann ich meine Website nach der Erstellung selbst pflegen und aktualisieren?",
        answer:
          "Ja. Mit einem CMS (bei Professional-Paketen enthalten) bearbeiten Sie Texte, Bilder und Seiten selbst. Sie erhalten eine Einweisung und können optional einen Wartungsvertrag für technische Updates abschließen.",
      },
      {
        question:
          "Wer hilft mir, wenn es technische Probleme mit meiner Website gibt?",
        answer:
          "Ich biete Support und Wartung an. Bei technischen Problemen können Sie sich an mich wenden. Optional gibt es Wartungsverträge mit definiertem Support-Umfang.",
      },
      {
        question:
          "Unterstützt ein Webdesigner auch bei der Einrichtung von E-Mail-Adressen und technischen Details?",
        answer:
          "Ja. Ich helfe bei der Einrichtung von E-Mail-Adressen, Domain-Konfiguration, SSL-Zertifikat und Hosting-Setup. So haben Sie einen Ansprechpartner für alle technischen Belange.",
      },
    ],
  },
  {
    id: "wartung-pflege",
    title: "Wartung & Pflege",
    icon: Wrench,
    description: "Updates, Backups und Wartungsverträge",
    faqs: [
      {
        question:
          "Muss ich meine Website regelmäßig aktualisieren (z. B. Inhalte, Software)?",
        answer:
          "Ja. Inhalte sollten aktuell bleiben, und Software-Updates sind wichtig für Sicherheit und Performance. Ich empfehle regelmäßige Updates und biete Wartungsverträge dafür an.",
      },
      {
        question: "Welche Aufgaben umfasst die regelmäßige Website-Wartung?",
        answer:
          "Typische Aufgaben: Software-Updates, Sicherheits-Checks, Backups, Überprüfung der Funktionalität, ggf. kleine Anpassungen. Der Umfang hängt von Ihrer Website und Ihren Anforderungen ab.",
      },
      {
        question:
          "Wie kann ich meine Website-Daten sichern (Backups erstellen)?",
        answer:
          "Backups werden meist vom Hosting-Anbieter angeboten. Zusätzlich können automatische Backups eingerichtet werden. Bei einem Wartungsvertrag übernehme ich die Backup-Strategie für Sie.",
      },
      {
        question:
          "Ist es sinnvoll, einen Wartungsvertrag für meine Website abzuschließen?",
        answer:
          "Ja, besonders wenn Sie keine technischen Kenntnisse haben. Ein Wartungsvertrag sichert Updates, Backups und Support – Ihre Website bleibt sicher und aktuell.",
      },
    ],
  },
  {
    id: "dsgvo-rechtliches",
    title: "DSGVO & Rechtliches",
    icon: Shield,
    description: "Impressum, Datenschutz und Cookie-Banner",
    faqs: [
      {
        question: "Benötigt jede Website ein Impressum?",
        answer:
          "Ja. In Deutschland ist ein Impressum für gewerbliche Websites Pflicht. Ohne Impressum drohen Abmahnungen. Ich integriere ein rechtssicheres Impressum in jede Website.",
      },
      {
        question: "Welche Angaben muss das Impressum meiner Website enthalten?",
        answer:
          "Typisch: Name/Unternehmen, Anschrift, Kontaktdaten, ggf. Handelsregister, USt-IdNr., Verantwortlicher. Die genauen Anforderungen hängen von Ihrer Rechtsform ab. Ich setze das Impressum rechtssicher um.",
      },
      {
        question: "Benötige ich eine Datenschutzerklärung auf meiner Website?",
        answer:
          "Ja. Eine Datenschutzerklärung ist bei personenbezogenen Daten (z. B. Kontaktformular, Analytics) Pflicht. Ich erstelle eine DSGVO-konforme Datenschutzerklärung für Ihre Website.",
      },
      {
        question:
          "Wie stelle ich sicher, dass meine Website DSGVO-konform ist?",
        answer:
          "Durch Impressum, Datenschutzerklärung, Cookie-Banner (bei Cookies), Einwilligungen bei Formularen und sichere Datenübertragung (SSL). Ich berücksichtige diese Punkte bei jeder Website.",
      },
      {
        question: "Ist ein Cookie-Banner auf meiner Website erforderlich?",
        answer:
          "Ja, sobald Sie Cookies nutzen (z. B. Analytics, Marketing). Der Banner muss vor dem Setzen nicht unbedingt erforderlicher Cookies informieren und Einwilligung einholen. Ich integriere DSGVO-konforme Cookie-Lösungen.",
      },
      {
        question:
          "Was muss ich bei Kontaktformularen auf meiner Website bezüglich Datenschutz beachten?",
        answer:
          "Sie brauchen eine Einwilligung zur Datenverarbeitung, einen Verweis auf die Datenschutzerklärung und eine sichere Übertragung (HTTPS). Ich setze Kontaktformulare DSGVO-konform um.",
      },
    ],
  },
  {
    id: "seo-auffindbarkeit",
    title: "SEO & Auffindbarkeit",
    icon: Search,
    description: "Suchmaschinenoptimierung und Sichtbarkeit",
    faqs: [
      {
        question:
          "Was ist SEO und warum ist Suchmaschinenoptimierung für meine Website wichtig?",
        answer:
          "SEO (Search Engine Optimization) macht Ihre Website für Suchmaschinen wie Google sichtbar. Ohne SEO finden potenzielle Kunden Sie kaum. Eine optimierte Website erscheint bei relevanten Suchanfragen und bringt organischen Traffic.",
      },
      {
        question:
          "Wie kann ich meine Website für Suchmaschinen (z. B. Google) optimieren?",
        answer:
          "Durch technische SEO (schnelle Ladezeit, mobile Optimierung), gute Inhalte, passende Keywords, Meta-Titel und -Beschreibungen. Ich baue alle Websites von Grund auf SEO-optimiert.",
      },
      {
        question: "Wie erhöhe ich die Besucherzahlen auf meiner Website?",
        answer:
          "Mit SEO, regelmäßigen Inhalten (Blog), Social Media, lokaler Suchoptimierung und guter Nutzerführung. Ich berate Sie zu einer passenden Strategie für Ihr Unternehmen.",
      },
      {
        question:
          "Kann ich SEO für meine Website selbst machen oder brauche ich einen Experten?",
        answer:
          "Grundlagen können Sie selbst umsetzen. Für technische SEO, Keyword-Strategie und nachhaltige Optimierung lohnt sich ein Experte. Ich integriere SEO in jede Website und kann Sie bei der Weiterentwicklung unterstützen.",
      },
      {
        question:
          "Was sind Keywords und wie finde ich die richtigen Schlüsselwörter für meine Website?",
        answer:
          "Keywords sind Suchbegriffe, die Nutzer in Google eingeben. Die richtigen Keywords finden Sie über Tools wie Google Keyword Planner oder durch Analyse Ihrer Zielgruppe. Ich helfe bei der Keyword-Strategie für Ihre Website.",
      },
      {
        question: "Wie lange dauert es, bis SEO-Maßnahmen Wirkung zeigen?",
        answer:
          "SEO braucht Zeit: erste Effekte oft nach 3–6 Monaten, deutliche Verbesserungen nach 6–12 Monaten. Kontinuierliche Optimierung und gute Inhalte sind entscheidend.",
      },
      {
        question:
          "Was ist der Unterschied zwischen SEO und SEA (bezahlte Suchanzeigen)?",
        answer:
          "SEO ist organische Suchoptimierung (kostenlos, langfristig). SEA sind bezahlte Anzeigen (z. B. Google Ads) – sofort sichtbar, aber laufende Kosten. Beides kann sinnvoll kombiniert werden.",
      },
    ],
  },
  {
    id: "ladegeschwindigkeit",
    title: "Ladegeschwindigkeit & Performance",
    icon: Zap,
    description: "Schnelle Ladezeiten und Performance",
    faqs: [
      {
        question: "Warum ist die Ladegeschwindigkeit meiner Website wichtig?",
        answer:
          "Schnelle Websites ranken besser bei Google, haben niedrigere Absprungraten und bessere Conversion. Nutzer erwarten Ladezeiten unter 2–3 Sekunden. Langsame Seiten kosten Besucher und Umsatz.",
      },
      {
        question: "Wie kann ich die Ladezeit meiner Website verbessern?",
        answer:
          "Durch optimierte Bilder, schlanken Code, Caching, schnelles Hosting und moderne Technologien. Ich entwickle alle Websites mit Fokus auf Performance und schnelle Ladezeiten.",
      },
    ],
  },
  {
    id: "sicherheit",
    title: "Sicherheit",
    icon: Lock,
    description: "Schutz vor Angriffen und SSL",
    faqs: [
      {
        question:
          "Wie schütze ich meine Website vor Hackerangriffen und Malware?",
        answer:
          "Durch regelmäßige Updates, starke Passwörter, SSL-Verschlüsselung, Sicherheits-Plugins und Backups. Bei einem Wartungsvertrag übernehme ich die Sicherheitsüberwachung.",
      },
      {
        question: "Brauche ich ein SSL-Zertifikat für meine Website?",
        answer:
          "Ja. SSL (HTTPS) verschlüsselt die Datenübertragung und ist für Vertrauen, SEO und DSGVO wichtig. Die meisten Hosting-Anbieter bieten kostenlose SSL-Zertifikate. Ich richte SSL bei jeder Website ein.",
      },
      {
        question:
          "Wie halte ich meine Website sicher und auf dem neuesten Stand?",
        answer:
          "Durch regelmäßige Software-Updates, Sicherheits-Checks und Backups. Ein Wartungsvertrag stellt sicher, dass Ihre Website dauerhaft gepflegt und abgesichert wird.",
      },
    ],
  },
  {
    id: "mobile-optimierung",
    title: "Mobile Optimierung",
    icon: Smartphone,
    description: "Responsives Design und mobile Nutzung",
    faqs: [
      {
        question: "Warum ist eine mobile Optimierung meiner Website wichtig?",
        answer:
          "Über die Hälfte der Nutzer surft mobil. Google bewertet mobile Optimierung für das Ranking. Ohne mobile Optimierung verlieren Sie Besucher und wirken unprofessionell.",
      },
      {
        question: "Was bedeutet responsives Webdesign?",
        answer:
          "Responsives Design passt die Website automatisch an Bildschirmgröße und Gerät an – von Smartphone über Tablet bis Desktop. Eine Website für alle Geräte, ohne separate mobile Version.",
      },
      {
        question:
          "Brauche ich eine separate mobile Website oder reicht ein responsives Design?",
        answer:
          "Ein responsives Design reicht aus. Es ist wartungsfreundlicher, SEO-freundlicher und kostengünstiger als eine separate mobile Website. Alle meine Websites sind responsiv.",
      },
    ],
  },
  {
    id: "allgemein",
    title: "Allgemeine Fragen & Best Practices",
    icon: Monitor,
    description: "Website-Strategie und Erfolgsmessung",
    faqs: [
      {
        question:
          "Warum ist eine professionelle Website für mein Unternehmen wichtig?",
        answer:
          "Eine Website ist oft der erste Kontaktpunkt. Sie vermittelt Seriosität, informiert rund um die Uhr und unterstützt Vertrieb und Marketing. Ohne Website wirken Unternehmen oft weniger vertrauenswürdig.",
      },
      {
        question:
          "Brauche ich überhaupt eine eigene Website oder reichen Social-Media-Profile?",
        answer:
          "Social Media ergänzt, ersetzt aber keine Website. Eine eigene Website gehört Ihnen, ist unabhängig von Algorithmen und bietet mehr Kontrolle. Für professionelle Präsenz empfehle ich beides.",
      },
      {
        question:
          "Welche häufigen Fehler sollte ich bei meiner Website vermeiden?",
        answer:
          "Vermeiden Sie: veraltete Inhalte, schlechte mobile Darstellung, fehlendes Impressum, langsame Ladezeiten, unklare Navigation. Ich berate Sie zu Best Practices und setze sie um.",
      },
      {
        question:
          "Wie kann ich den Erfolg meiner Website messen (z. B. Besucherstatistiken)?",
        answer:
          "Mit Tools wie Google Analytics oder Matomo. Sie sehen Besucherzahlen, Herkunft, beliebte Seiten und Verhalten. Ich kann Analytics DSGVO-konform einrichten und Sie bei der Auswertung unterstützen.",
      },
      {
        question:
          "Wie kann ich meine Website mit Social-Media-Kanälen verknüpfen?",
        answer:
          "Durch Social-Media-Buttons, eingebettete Feeds und Links in Ihren Inhalten. Ich integriere Social-Verknüpfungen sauber und DSGVO-konform in Ihre Website.",
      },
      {
        question: "Ist ein Blog auf meiner Firmenwebsite sinnvoll?",
        answer:
          "Ja, wenn Sie regelmäßig Inhalte erstellen. Ein Blog unterstützt SEO, positioniert Sie als Experten und bringt organischen Traffic. Ich kann einen Blog in Ihre Website integrieren.",
      },
      {
        question:
          "Kann ich meine Website später um weitere Funktionen (z. B. einen Online-Shop) erweitern?",
        answer:
          "Ja. Alle Websites sind modular aufgebaut und können um einen Shop, Buchungssystem, Mitgliederbereich oder weitere Funktionen erweitert werden. Ich plane von Anfang an mit Blick auf spätere Erweiterungen.",
      },
    ],
  },
];

/** Alle Unternehmenswebsite-FAQs flach als Frage/Antwort-Liste (für JSON-LD). */
export const unternehmenswebsiteFaqs: FaqItem[] =
  unternehmenswebsiteFaqCategories.flatMap((category) => category.faqs);
