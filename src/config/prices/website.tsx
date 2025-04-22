import { CheckboxGroupContent } from "@/components/price-forms/checkbox-group-content";
import { InfoSection } from "@/components/price-forms/info-section";
import { RadioGroupContent } from "@/components/price-forms/radio-group-content";
import { SliderContent } from "@/components/price-forms/slider-content";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

type ContentFunction = (
  value?: string | number | boolean | string[] | (() => number),
  setValue?: (value: any) => void,
  additionalValue?: any,
  setAdditionalValue?: (value: any) => void
) => JSX.Element;

export const websiteConfig = {
  websitePackage: {
    basic: {
      id: "basic",
      title: "Basic Template Design",
      description:
        "Ein vorgefertigtes, modernes Design bei dem nur die Inhalte angepasst werden können. Das Design selbst bleibt weitgehend unverändert. Perfekt für kleine Unternehmen, die schnell und kostengünstig online gehen möchten.",
      price: 2000,
      pagePrice: 50,
    },
    premium: {
      id: "premium",
      title: "Premium Template Design",
      description:
        "Ein flexibles Design-System mit verschiedenen Komponenten zur Auswahl. Ermöglicht individuelle Anpassungen durch Kombination der Elemente. Ideal für Unternehmen, die sich von der Masse abheben möchten.",
      price: 3000,
      pagePrice: 100,
    },
    individual: {
      id: "individual",
      title: "Individuelles Design",
      description:
        "Ein komplett maßgeschneidertes Design, das speziell auf Ihre Marke und Ihre Anforderungen zugeschnitten ist. Für Unternehmen mit besonderen Anforderungen.",
      price: 5000,
      pagePrice: 150,
    },
  },
  features: {
    contact: {
      id: "contact",
      title: "Kontaktformular",
      description:
        "Ein sicheres Kontaktformular mit Spam-Schutz und automatischer E-Mail-Benachrichtigung.",
      price: 300,
    },
    blog: {
      id: "blog",
      title: "Blog",
      description:
        "Ein vollständiges CMS für Blog-Artikel mit Kategorien, Tags und Suchfunktion.",
      price: 500,
    },
  },
  additional: {
    maintenance: {
      id: "maintenance",
      price: 80,
      monthly: true,
      title: "Hosting & Wartung",
      description:
        "Ich übernehme das Hosting und die Wartung für Ihre Website, damit Sie sich auf Ihr Kern-Business konzentrieren können, falls nötig registriere ich auch die Domain für Sie. Wenn die Option nicht gewählt wird, übermittele ich Ihnen nach Projektabschluss jediglich den Code für die Website.",
    },
    media: {
      id: "media",
      price: 200,
      title: "Mediengenerierung",
      description:
        "Ich erstelle professionelle Fotos und Videos für Ihre Website. Dies umfasst Produkt- und Teamfotos, Imagevideos oder andere visuelle Inhalte, die Ihre Website ansprechend und authentisch gestalten. Die genauen Inhalte werden individuell nach Ihren Bedürfnissen abgestimmt.",
      monthly: false,
    },
    brochure: {
      id: "brochure",
      price: 1000,
      title: "Unternehmensbroschüre",
      description:
        "Eine Broschüre mit allen Informationen zu Ihrem Unternehmen.",
      monthly: false,
    },
  },
};

export const websiteSteps = [
  {
    id: 1,
    title: "Wie funktioniert der Preisrechner?",
    content: () => (
      <div className="space-y-8 mx-auto">
        <div className="">
          <p className="text-gray-600 leading-relaxed mb-6">
            Der Preisrechner hilft Ihnen, die Kosten für Ihre neue Website zu
            schätzen. Sie können verschiedene Optionen auswählen und sehen
            sofort, wie sich diese auf den Gesamtpreis auswirken.
          </p>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Schritte zur Konfiguration:
            </h3>
            <div className="space-y-3">
              {[
                "Wählen Sie das passende Design-Paket",
                "Bestimmen Sie die Anzahl der benötigten Seiten",
                "Fügen Sie gewünschte Funktionen hinzu",
                "Wählen Sie zusätzliche Services",
                "Sehen Sie Ihre geschätzten Kosten",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    {i + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-600 mt-6 text-center">
            Sie können die Konfiguration selbst vornehmen oder mich direkt
            kontaktieren, um ein individuelles Angebot zu erhalten.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-medium shadow-lg transform transition hover:scale-105"
            onClick={() =>
              (window.location.href = "mailto:email@thomas-schwabauer.de")
            }
          >
            Direkt Kontakt aufnehmen
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Basis Paket",
    description: "Wählen Sie das Design für Ihre Website",
    content: ((design, setDesign) => (
      <RadioGroupContent
        value={design as string}
        onValueChange={setDesign!}
        options={Object.values(websiteConfig.websitePackage).map((pkg) => ({
          id: pkg.id,
          title: pkg.title,
          price: pkg.price,
        }))}
      />
    )) as ContentFunction,
    info: {
      title: "Wie unterscheiden sich die Pakete?",
      content: (
        <InfoSection
          title="Wie unterscheiden sich die Pakete?"
          content={Object.values(websiteConfig.websitePackage).map((pkg) => ({
            title: pkg.title,
            description: pkg.description,
          }))}
        />
      ),
    },
  },
  {
    id: 3,
    title: "Anzahl der Seiten",
    description: "Wie viele Seiten soll Ihre Website haben?",
    content: ((pages, setPages, design) => (
      <SliderContent
        value={pages as number}
        onValueChange={setPages!}
        min={1}
        max={20}
        step={1}
        pricePerUnit={
          design === "basic"
            ? websiteConfig.websitePackage.basic.pagePrice
            : design === "premium"
              ? websiteConfig.websitePackage.premium.pagePrice
              : websiteConfig.websitePackage.individual.pagePrice
        }
        unitLabel="Seite"
      />
    )) as ContentFunction,
    info: {
      title: "Wie viele Seiten brauche ich?",
      content: (
        <InfoSection
          title="Wie viele Seiten brauche ich?"
          content={[
            {
              title: "1-5 Seiten",
              description:
                "Ideal für einfache Präsentationswebsites mit Homepage, Über uns, Dienstleistungen, Kontakt und Impressum.",
            },
            {
              title: "6-10 Seiten",
              description:
                "Perfekt für Unternehmen mit mehreren Dienstleistungen oder Produktkategorien, die detailliertere Informationen benötigen.",
            },
            {
              title: "11-20 Seiten",
              description:
                "Empfohlen für umfangreiche Websites mit vielen Produkten, Dienstleistungen oder speziellen Bereichen wie Blog, FAQ oder Karriere.",
            },
          ]}
        />
      ),
    },
  },
  {
    id: 4,
    title: "Funktionen",
    description: "Welche Funktionen benötigen Sie für Ihre Website?",
    content: ((features, setFeatures) => (
      <CheckboxGroupContent
        value={features as string[]}
        onValueChange={setFeatures!}
        options={Object.values(websiteConfig.features).map((feature) => ({
          id: feature.id,
          title: feature.title,
          price: feature.price,
        }))}
      />
    )) as ContentFunction,
    info: {
      title: "Funktionen im Detail",
      content: (
        <InfoSection
          title="Funktionen im Detail"
          content={[
            ...Object.values(websiteConfig.features).map((feature) => ({
              title: feature.title,
              description: feature.description,
            })),
          ]}
        />
      ),
    },
  },
  {
    id: 5,
    title: "Zusätzliche Services",
    description: "Wählen Sie weitere Optionen",
    content: ((additional, setAdditional) => (
      <CheckboxGroupContent
        value={additional as string[]}
        onValueChange={setAdditional!}
        options={Object.values(websiteConfig.additional).map((additional) => ({
          id: additional.id,
          title: additional.title,
          price: additional.price,
          monthly: additional.monthly,
        }))}
      />
    )) as ContentFunction,
    info: {
      title: "Zusätzliche Services",
      content: (
        <InfoSection
          title="Zusätzliche Services"
          content={Object.values(websiteConfig.additional).map(
            (additional) => ({
              title: additional.title,
              description: additional.description,
            })
          )}
        />
      ),
    },
  },
  {
    id: 6,
    title: "Gesamtkosten",
    description: "Ihre geschätzten Kosten",
    content: (() => <></>) as ContentFunction,
    info: {
      title: "Was ist im Preis enthalten?",
      content: (
        <div className="space-y-4">
          <InfoSection
            title="Was ist im Preis enthalten?"
            content={[
              {
                title: "Komplettes Paket",
                description:
                  "Der Preis beinhaltet Design, Entwicklung, Hosting-Einrichtung und grundlegende Schulung.",
              },
              {
                title: "Zeitplan",
                description:
                  "Die Entwicklung Ihrer Website dauert in der Regel 4-8 Wochen, abhängig von Umfang und Komplexität.",
              },
              {
                title: "Support",
                description:
                  "Nach der Fertigstellung erhalten Sie 30 Tage kostenlosen Support für Fragen und kleinere Anpassungen.",
              },
            ]}
          />
          <InfoSection
            title="Wie geht es weiter?"
            content={[
              {
                title: "Erstgespräch",
                description:
                  "In einem kostenlosen Beratungsgespräch besprechen wir Ihre Anforderungen und Wünsche für die Website und ich erstelle Ihnen ein individuelles Angebot, basierend auf Ihren Angaben.",
              },
              {
                title: "Vertragsabschluss",
                description:
                  "Wir schließen einen Vertrag ab, der die vereinbarten Leistungen und Zahlungsmodalitäten festlegt.",
              },
              {
                title: "Website Erstellung",
                description:
                  "Ich erstelle Ihre Website nach Ihren Wünschen und Sie haben die Möglichkeit, bis zu fünf Mal Anpassungen und Änderungen vorzunehmen.",
              },
            ]}
          />
        </div>
      ),
    },
  },
  {
    id: "🎉",
    title: "Checkout",
    description: "Checkout",
    content: (() => <></>) as ContentFunction,
  },
];
