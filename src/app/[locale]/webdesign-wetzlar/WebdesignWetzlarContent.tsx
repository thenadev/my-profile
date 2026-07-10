import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Code2,
  Gauge,
  MapPin,
  MessageCircle,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";
import {
  WEBDESIGN_WETZLAR_FAQS,
  WEBDESIGN_WETZLAR_ORTE,
} from "@/data/webdesign-wetzlar";

/**
 * Sichtbarer Inhalt der lokalen Landingpage /webdesign-wetzlar.
 * Bewusst als reine Server-Komponente (kein Client-JS): maximal
 * crawlbar für Google und AI-Bots (GPTBot/ClaudeBot) und schnell.
 */

const LEISTUNGEN = [
  {
    icon: Code2,
    title: "Individuelles Webdesign & Entwicklung",
    desc: "Handprogrammierte Websites mit modernem Tech-Stack (Next.js, React) statt Baukasten — schnell, sicher und exakt auf dein Unternehmen zugeschnitten.",
  },
  {
    icon: Search,
    title: "Local SEO für Wetzlar & Mittelhessen",
    desc: "Sauberer, suchmaschinenoptimierter Code, strukturierte Daten und ein optimiertes Google-Unternehmensprofil, damit Kunden aus der Region dich finden.",
  },
  {
    icon: Smartphone,
    title: "Responsive & mobiloptimiert",
    desc: "Deine Website sieht auf Smartphone, Tablet und Desktop perfekt aus — über 60 % der lokalen Suchen kommen vom Handy.",
  },
  {
    icon: Gauge,
    title: "Performance & Ladezeit",
    desc: "Top-Ladezeiten und beste Core-Web-Vitals-Werte — ein direkter Rankingfaktor bei Google und entscheidend für die Absprungrate.",
  },
  {
    icon: RefreshCw,
    title: "Relaunch & Wartung",
    desc: "Bestehende Website veraltet oder langsam? Ich modernisiere sie technisch und optisch und übernehme auf Wunsch die laufende Pflege.",
  },
  {
    icon: MessageCircle,
    title: "Direkter Ansprechpartner",
    desc: "Du sprichst immer direkt mit dem Entwickler — kein Agentur-Overhead, keine Projektmanager-Schleifen, kurze Wege.",
  },
];

const ABLAUF = [
  {
    title: "1 · Kostenloses Erstgespräch",
    desc: "Wir klären Ziele, Umfang und Budget — persönlich in Wetzlar oder per Video-Call. Du bekommst eine ehrliche Einschätzung und ein transparentes Festpreis-Angebot.",
  },
  {
    title: "2 · Design & Entwicklung",
    desc: "Ich setze Design und Technik aus einer Hand um und halte dich mit Zwischenständen auf dem Laufenden. Änderungswünsche fließen laufend ein.",
  },
  {
    title: "3 · Livegang & Betreuung",
    desc: "Deine Website geht online — inklusive SEO-Grundlagen, Analytics und Einrichtung. Auf Wunsch übernehme ich Hosting, Wartung und Weiterentwicklung.",
  },
];

export default function WebdesignWetzlarContent() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center gap-16 md:gap-24 py-12 md:py-20">
        {/* Hero */}
        <section className="w-full max-w-3xl text-center space-y-6">
          <Badge variant="secondary" className="text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            Webdesigner aus Wetzlar
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Webdesign Wetzlar
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Professionelle Websites, die in Wetzlar und Mittelhessen neue Kunden
            bringen — individuell programmiert, SEO-optimiert und direkt vom
            Fullstack-Entwickler. Kein Baukasten, keine Agentur-Warteschleife.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className={buttonVariants({ size: "lg" }) + " gap-2"}
            >
              Kostenloses Erstgespräch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services/unternehmenswebsite"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Pakete & Preise ansehen
            </Link>
          </div>
        </section>

        {/* Intro / Warum lokal */}
        <section className="w-full max-w-3xl space-y-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Warum Webdesign vom lokalen Entwickler aus Wetzlar?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Eine Website ist heute der wichtigste Verkäufer deines Unternehmens —
            sie ist rund um die Uhr für dich im Einsatz. Als in Wetzlar ansässiger
            Fullstack-Entwickler kenne ich die Region und ihre Betriebe: vom
            Handwerksbetrieb über die Arztpraxis bis zum Mittelständler. Du
            bekommst keine Vorlage von der Stange, sondern eine individuell
            programmierte Website, die technisch sauber, schnell und bei Google
            auffindbar ist — und einen festen Ansprechpartner, der direkt bei dir
            um die Ecke sitzt.
          </p>
        </section>

        {/* Leistungen */}
        <section className="w-full space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Leistungen im Überblick
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Design, Technik und SEO aus einer Hand — für Unternehmen aus
              Wetzlar, Gießen und ganz Mittelhessen.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEISTUNGEN.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="p-6 bg-card border-border h-full flex flex-col"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Ablauf */}
        <section className="w-full space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              So läuft dein Website-Projekt ab
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transparent, planbar und ohne böse Überraschungen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABLAUF.map((step) => (
              <Card key={step.title} className="p-6 bg-card border-border h-full">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-xl text-foreground">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Region / Orte */}
        <section className="w-full max-w-3xl text-center space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Webdesign für Wetzlar und die gesamte Region
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ich betreue Unternehmen aus Wetzlar und dem Umland. Neben der
            Kernstadt gehören dazu unter anderem:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2.5 list-none p-0">
            {WEBDESIGN_WETZLAR_ORTE.map((ort) => (
              <li key={ort}>
                <Badge variant="outline" className="text-sm py-1 px-3">
                  {ort}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed pt-2">
            Du kommst aus Gießen? Dann ist mein Beitrag{" "}
            <Link
              href="/blog/website-erstellen-lassen-giessen"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              Website erstellen lassen in Gießen
            </Link>{" "}
            interessant. Wie viel eine Website kostet, erklärt{" "}
            <Link
              href="/blog/was-kostet-eine-website-2026"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              Was kostet eine Website 2026?
            </Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Häufige Fragen zu Webdesign in Wetzlar
            </h2>
          </div>
          <div className="space-y-4">
            {WEBDESIGN_WETZLAR_FAQS.map((faq) => (
              <Card key={faq.question} className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full max-w-3xl text-center space-y-6 rounded-2xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Bereit für eine Website, die Kunden bringt?
          </h2>
          <p className="text-muted-foreground text-lg">
            Lass uns unverbindlich über dein Projekt sprechen — persönlich in
            Wetzlar oder per Video-Call. Du bekommst eine ehrliche Einschätzung
            und ein transparentes Festpreis-Angebot.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className={buttonVariants({ size: "lg" }) + " gap-2"}
            >
              Jetzt Erstgespräch anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
