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

type Locale = "de" | "en";
const pick = (locale: string): Locale => (locale === "en" ? "en" : "de");

// Geteilte Datenquelle: wird sowohl von den FAQ-Client-Komponenten
// gerendert als auch serverseitig für das FAQPage-JSON-LD verwendet.
// IDs und Icons sind sprachunabhängig, damit UI und JSON-LD synchron bleiben.

const appEntwicklungFaqsByLocale: Record<Locale, FaqEntry[]> = {
  de: [
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
  ],
  en: [
    {
      id: "was-ist-flutter",
      question: "What is Flutter?",
      answer:
        "Flutter is a Google framework for building apps for multiple platforms from a single codebase. You write the code once and the app runs on Android and iOS – often with a near-native look and good performance. Ideal for MVPs and mid-sized apps.",
    },
    {
      id: "warum-android-ios",
      question: "Why Android and iOS from one codebase?",
      answer:
        "With Flutter you build only once – the same app appears on Android and iOS. That saves time and cost compared to two separate projects (e.g. Kotlin/Swift). For many products, a single shared codebase is perfectly sufficient.",
    },
    {
      id: "ablauf-beratung",
      question: "How does the consulting call work?",
      answer:
        "You describe your request or app idea in the form – I prepare accordingly. In the session (1 hour, video call or phone) we discuss the technical implementation: Flutter, feasibility, effort. Optionally you then receive a short written plan or a cost estimate.",
    },
    {
      id: "kosten-beratung-mvp",
      question: "What does app development or an MVP cost?",
      answer:
        "Consulting costs €80 per hour. An app MVP with Flutter for Android and iOS typically ranges from around €3,500 to €8,000 – depending on scope and requirements. After the consulting call we can go through it concretely.",
    },
    {
      id: "dauer-mvp",
      question: "How long does it take to develop an app?",
      answer:
        "A typical app MVP with Flutter takes about 6–12 weeks – depending on feature scope, design and backend. During the consulting call we can agree on a rough timeline.",
    },
    {
      id: "feature-bug",
      question: "Do you offer feature and bug development for existing apps?",
      answer:
        "If you already have an app (Flutter or native), we can implement new features or fix bugs in a targeted way. I analyse your project and make an individual offer. Maintenance and small extensions are possible too.",
    },
  ],
};

const startupBeratungFaqsByLocale: Record<Locale, FaqEntry[]> = {
  de: [
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
  ],
  en: [
    {
      id: "ablauf-beratung",
      question: "What happens during the consulting session?",
      answer:
        "You described your idea in the form – I read up and prepare. In the session (1 hour, video call or phone) we discuss the technical implementation: what makes sense, what is feasible, which steps come first. Afterwards you receive a written implementation plan including a cost estimate.",
    },
    {
      id: "kosten",
      question: "What does the consulting cost?",
      answer:
        "Startup consulting costs €80 per hour. You book one hour: you describe your idea in advance, we have the call, and afterwards you receive a written implementation plan including a cost estimate. There are no hidden costs.",
    },
    {
      id: "umsetzungsplan",
      question: "What is included in the implementation plan?",
      answer:
        "The written implementation plan summarises what we discussed: technical steps, a sensible sequence, effort and a cost estimate for the implementation (e.g. MVP development). This gives you a clear basis for deciding on the next step.",
    },
    {
      id: "nach-beratung",
      question: "What happens after the consulting (MVP)?",
      answer:
        "After the consulting session you can decide whether to commission the implementation. The next logical step is often MVP development: I build your Minimum Viable Product in 4–8 weeks. You receive the offer for this based on the implementation plan.",
    },
    {
      id: "programmierkenntnisse",
      question: "Do I need programming skills?",
      answer:
        "No. You describe your idea, we discuss the implementation – I handle the technical side. You don't have to program anything. The implementation plan is written so that you understand what is planned and what it costs.",
    },
    {
      id: "dauer-termin",
      question: "How quickly do I get an appointment?",
      answer:
        "After your request I usually get back to you within 24 hours and suggest appointments. The consulting can take place via video call or phone – at short notice too, depending on availability.",
    },
  ],
};

const unternehmenswebsiteFaqCategoriesByLocale: Record<Locale, FaqCategory[]> = {
  de: [
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
  ],
  en: [
    {
      id: "website-erstellung",
      title: "Creating a website",
      icon: Code2,
      description: "The basics of creating your business website",
      faqs: [
        {
          question: "How can I create my own business website?",
          answer:
            "You have two options: either hire a web designer (like me) or use a website builder. A professional creates a tailor-made, professional website with individual consulting. Website builders are suitable for simple sites with a limited budget.",
        },
        {
          question:
            "Can I build my website myself or should I hire a professional?",
          answer:
            "Simple sites you can build yourself with website builders. For professional presences, complex requirements, SEO optimisation and unique design, a professional is worth it. I'm happy to advise you free of charge on which route makes more sense for your business.",
        },
        {
          question: "Do I need programming skills to build a website?",
          answer:
            "No. With a CMS (e.g. in our Professional packages) you can edit texts, images and pages yourself – without programming skills. Website builders also require no technical knowledge. Only for custom development do I handle the technical implementation.",
        },
        {
          question: "How long does it take until my website is ready?",
          answer:
            "A basic website takes about 2–3 weeks, a professional website 3–5 weeks and an online shop 6–10 weeks. The duration depends on scope, your content and the chosen complexity.",
        },
        {
          question: "What does it cost to have a website built?",
          answer:
            "Costs vary with scope: simple business websites start from around €1,500, professional websites with a CMS from around €3,000. All prices are transparent – there are no hidden costs. I'm happy to prepare an individual offer for you.",
        },
        {
          question: "Which pages and content should my business website have?",
          answer:
            "Typical ones are: home, about, services, references, contact and legal notice. Depending on your industry you might add a blog, FAQ or gallery. I'm happy to advise on a sensible structure for your business.",
        },
        {
          question:
            "Which type of website is right for my business (business website, online shop, blog)?",
          answer:
            "A business website is enough for most SMEs. An online shop makes sense if you want to sell products online. A blog supports SEO and positions you as an expert. A business website is often combined with a blog – I'll help you decide.",
        },
        {
          question:
            "What is a content management system (CMS) and do I need one for my website?",
          answer:
            "A CMS lets you edit content (texts, images, pages) yourself – without programming skills. For regular updates and more flexibility a CMS is very useful. It is included in our Professional packages.",
        },
      ],
    },
    {
      id: "domain-hosting",
      title: "Domain & Hosting",
      icon: Globe,
      description: "Domain, hosting and technical basics",
      faqs: [
        {
          question: "How do I choose a suitable domain for my business website?",
          answer:
            "Ideally a domain with your company name, e.g. company.de. Short, memorable and .de for the German market. Avoid hyphens and long combinations. I'm happy to advise on the choice.",
        },
        {
          question: "How do I register a domain for my website?",
          answer:
            "You register domains with a provider such as IONOS, Strato or Hetzner. Registration takes a few minutes. I can support you or set the domain up as part of the project.",
        },
        {
          question: "What do a domain and web hosting cost per year?",
          answer:
            "A .de domain costs about €5–15 per year, hosting for a small website about €3–10 per month (approx. €36–120/year). For SME websites, affordable packages are usually sufficient.",
        },
        {
          question:
            "What is web hosting and why does my website need a hosting provider?",
          answer:
            "Hosting is the storage space on the internet where your website lives. Without hosting your website is not reachable. The provider supplies servers, security and availability.",
        },
        {
          question: "Do I need my own server for my website?",
          answer:
            "No. For most business websites a shared hosting package is enough. Your own server is only needed for very high traffic or special requirements.",
        },
        {
          question: "What is the difference between a domain and web hosting?",
          answer:
            "The domain is your address (e.g. company.de), hosting is the storage space for your website. You need both: the domain points to the hosting server where your files live.",
        },
      ],
    },
    {
      id: "technische-einrichtung",
      title: "Technical setup & support",
      icon: Settings,
      description: "Email, maintenance and technical support",
      faqs: [
        {
          question: "How can I set up email addresses with my own domain?",
          answer:
            "Email addresses like info@company.de are set up with your hosting provider or via Google Workspace/Microsoft 365. I support you with the setup and configuration – also as part of the web design project.",
        },
        {
          question:
            "Can I maintain and update my website myself after it's built?",
          answer:
            "Yes. With a CMS (included in Professional packages) you edit texts, images and pages yourself. You receive an introduction and can optionally take out a maintenance contract for technical updates.",
        },
        {
          question: "Who helps me if there are technical problems with my website?",
          answer:
            "I offer support and maintenance. For technical problems you can contact me. Maintenance contracts with a defined support scope are optionally available.",
        },
        {
          question:
            "Does a web designer also help with setting up email addresses and technical details?",
          answer:
            "Yes. I help with setting up email addresses, domain configuration, SSL certificate and hosting setup. That gives you one point of contact for all technical matters.",
        },
      ],
    },
    {
      id: "wartung-pflege",
      title: "Maintenance & care",
      icon: Wrench,
      description: "Updates, backups and maintenance contracts",
      faqs: [
        {
          question:
            "Do I have to update my website regularly (e.g. content, software)?",
          answer:
            "Yes. Content should stay current, and software updates are important for security and performance. I recommend regular updates and offer maintenance contracts for them.",
        },
        {
          question: "What tasks does regular website maintenance include?",
          answer:
            "Typical tasks: software updates, security checks, backups, functionality checks and, if needed, small adjustments. The scope depends on your website and requirements.",
        },
        {
          question: "How can I back up my website data (create backups)?",
          answer:
            "Backups are usually offered by the hosting provider. In addition, automatic backups can be set up. With a maintenance contract I handle the backup strategy for you.",
        },
        {
          question: "Is it worth taking out a maintenance contract for my website?",
          answer:
            "Yes, especially if you have no technical knowledge. A maintenance contract secures updates, backups and support – your website stays safe and up to date.",
        },
      ],
    },
    {
      id: "dsgvo-rechtliches",
      title: "GDPR & legal",
      icon: Shield,
      description: "Legal notice, privacy and cookie banner",
      faqs: [
        {
          question: "Does every website need a legal notice (Impressum)?",
          answer:
            "Yes. In Germany a legal notice is mandatory for commercial websites. Without one you risk warnings (Abmahnungen). I integrate a legally compliant Impressum into every website.",
        },
        {
          question: "What information must my website's legal notice contain?",
          answer:
            "Typically: name/company, address, contact details, and where applicable commercial register, VAT ID and responsible person. The exact requirements depend on your legal form. I implement the legal notice in a compliant way.",
        },
        {
          question: "Do I need a privacy policy on my website?",
          answer:
            "Yes. A privacy policy is mandatory when processing personal data (e.g. contact form, analytics). I create a GDPR-compliant privacy policy for your website.",
        },
        {
          question: "How do I make sure my website is GDPR-compliant?",
          answer:
            "Through a legal notice, privacy policy, cookie banner (if cookies are used), consent on forms and secure data transfer (SSL). I take these points into account for every website.",
        },
        {
          question: "Is a cookie banner required on my website?",
          answer:
            "Yes, as soon as you use cookies (e.g. analytics, marketing). The banner must inform users before setting non-essential cookies and obtain consent. I integrate GDPR-compliant cookie solutions.",
        },
        {
          question:
            "What do I need to consider for contact forms regarding data protection?",
          answer:
            "You need consent for data processing, a reference to the privacy policy and secure transfer (HTTPS). I implement contact forms in a GDPR-compliant way.",
        },
      ],
    },
    {
      id: "seo-auffindbarkeit",
      title: "SEO & visibility",
      icon: Search,
      description: "Search engine optimisation and visibility",
      faqs: [
        {
          question:
            "What is SEO and why is search engine optimisation important for my website?",
          answer:
            "SEO (search engine optimisation) makes your website visible to search engines like Google. Without SEO potential customers can barely find you. An optimised website appears for relevant searches and brings organic traffic.",
        },
        {
          question:
            "How can I optimise my website for search engines (e.g. Google)?",
          answer:
            "Through technical SEO (fast loading, mobile optimisation), good content, suitable keywords, meta titles and descriptions. I build all websites SEO-optimised from the ground up.",
        },
        {
          question: "How do I increase the number of visitors to my website?",
          answer:
            "With SEO, regular content (blog), social media, local search optimisation and good user guidance. I advise you on a suitable strategy for your business.",
        },
        {
          question:
            "Can I do SEO for my website myself or do I need an expert?",
          answer:
            "You can implement the basics yourself. For technical SEO, keyword strategy and sustainable optimisation an expert is worth it. I integrate SEO into every website and can support you with further development.",
        },
        {
          question:
            "What are keywords and how do I find the right ones for my website?",
          answer:
            "Keywords are search terms users type into Google. You find the right keywords using tools like Google Keyword Planner or by analysing your target audience. I help with the keyword strategy for your website.",
        },
        {
          question: "How long does it take for SEO measures to show results?",
          answer:
            "SEO takes time: first effects often after 3–6 months, clear improvements after 6–12 months. Continuous optimisation and good content are decisive.",
        },
        {
          question:
            "What is the difference between SEO and SEA (paid search ads)?",
          answer:
            "SEO is organic search optimisation (free, long-term). SEA are paid ads (e.g. Google Ads) – visible immediately, but with ongoing costs. The two can be combined effectively.",
        },
      ],
    },
    {
      id: "ladegeschwindigkeit",
      title: "Loading speed & performance",
      icon: Zap,
      description: "Fast loading times and performance",
      faqs: [
        {
          question: "Why is my website's loading speed important?",
          answer:
            "Fast websites rank better on Google, have lower bounce rates and better conversion. Users expect loading times under 2–3 seconds. Slow pages cost visitors and revenue.",
        },
        {
          question: "How can I improve my website's loading time?",
          answer:
            "Through optimised images, lean code, caching, fast hosting and modern technologies. I develop all websites with a focus on performance and fast loading times.",
        },
      ],
    },
    {
      id: "sicherheit",
      title: "Security",
      icon: Lock,
      description: "Protection against attacks and SSL",
      faqs: [
        {
          question: "How do I protect my website from hacker attacks and malware?",
          answer:
            "Through regular updates, strong passwords, SSL encryption, security plugins and backups. With a maintenance contract I take over the security monitoring.",
        },
        {
          question: "Do I need an SSL certificate for my website?",
          answer:
            "Yes. SSL (HTTPS) encrypts data transfer and is important for trust, SEO and GDPR. Most hosting providers offer free SSL certificates. I set up SSL for every website.",
        },
        {
          question: "How do I keep my website secure and up to date?",
          answer:
            "Through regular software updates, security checks and backups. A maintenance contract ensures that your website is continuously maintained and secured.",
        },
      ],
    },
    {
      id: "mobile-optimierung",
      title: "Mobile optimisation",
      icon: Smartphone,
      description: "Responsive design and mobile usage",
      faqs: [
        {
          question: "Why is mobile optimisation of my website important?",
          answer:
            "Over half of users browse on mobile. Google factors mobile optimisation into rankings. Without mobile optimisation you lose visitors and appear unprofessional.",
        },
        {
          question: "What does responsive web design mean?",
          answer:
            "Responsive design automatically adapts the website to screen size and device – from smartphone through tablet to desktop. One website for all devices, without a separate mobile version.",
        },
        {
          question:
            "Do I need a separate mobile website or is responsive design enough?",
          answer:
            "A responsive design is enough. It is easier to maintain, more SEO-friendly and more cost-effective than a separate mobile website. All my websites are responsive.",
        },
      ],
    },
    {
      id: "allgemein",
      title: "General questions & best practices",
      icon: Monitor,
      description: "Website strategy and measuring success",
      faqs: [
        {
          question: "Why is a professional website important for my business?",
          answer:
            "A website is often the first point of contact. It conveys credibility, informs around the clock and supports sales and marketing. Without a website, companies often appear less trustworthy.",
        },
        {
          question:
            "Do I even need my own website or are social media profiles enough?",
          answer:
            "Social media complements but doesn't replace a website. Your own website belongs to you, is independent of algorithms and offers more control. For a professional presence I recommend both.",
        },
        {
          question: "Which common mistakes should I avoid with my website?",
          answer:
            "Avoid: outdated content, poor mobile display, a missing legal notice, slow loading times, unclear navigation. I advise you on best practices and implement them.",
        },
        {
          question:
            "How can I measure my website's success (e.g. visitor statistics)?",
          answer:
            "With tools like Google Analytics or Matomo. You see visitor numbers, origin, popular pages and behaviour. I can set up analytics in a GDPR-compliant way and support you with the evaluation.",
        },
        {
          question: "How can I link my website with social media channels?",
          answer:
            "Through social media buttons, embedded feeds and links in your content. I integrate social connections cleanly and in a GDPR-compliant way into your website.",
        },
        {
          question: "Is a blog on my business website worthwhile?",
          answer:
            "Yes, if you create content regularly. A blog supports SEO, positions you as an expert and brings organic traffic. I can integrate a blog into your website.",
        },
        {
          question:
            "Can I later extend my website with more features (e.g. an online shop)?",
          answer:
            "Yes. All websites are built modularly and can be extended with a shop, booking system, member area or other features. I plan from the start with later extensions in mind.",
        },
      ],
    },
  ],
};

export function getAppEntwicklungFaqs(locale: string): FaqEntry[] {
  return appEntwicklungFaqsByLocale[pick(locale)];
}

export function getStartupBeratungFaqs(locale: string): FaqEntry[] {
  return startupBeratungFaqsByLocale[pick(locale)];
}

export function getUnternehmenswebsiteFaqCategories(
  locale: string,
): FaqCategory[] {
  return unternehmenswebsiteFaqCategoriesByLocale[pick(locale)];
}

/** Alle Unternehmenswebsite-FAQs flach als Frage/Antwort-Liste (für JSON-LD). */
export function getUnternehmenswebsiteFaqs(locale: string): FaqItem[] {
  return unternehmenswebsiteFaqCategoriesByLocale[pick(locale)].flatMap(
    (category) => category.faqs,
  );
}
