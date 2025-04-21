import { CheckboxGroupContent } from "@/components/price-forms/checkbox-group-content";
import { InfoSection } from "@/components/price-forms/info-section";
import { RadioGroupContent } from "@/components/price-forms/radio-group-content";
import { SliderContent } from "@/components/price-forms/slider-content";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

type ContentFunction = (
  value: string | number | boolean | string[] | (() => number),
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
    title: "Gesamtkosten",
    description: "Ihre geschätzten Kosten",
    content: ((calculatePrice, calculateMonthlyPrice) => (
      <div className="text-center space-y-6">
        <div>
          <p className="text-4xl font-bold text-blue-600">
            €{(calculatePrice as () => number)().toLocaleString()}
          </p>
          <p className="text-gray-600 mt-2">
            Alle Preise verstehen sich zzgl. MwSt.
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold text-blue-600">
            €{(calculateMonthlyPrice as () => number)().toLocaleString()}/Monat
          </p>
          <p className="text-gray-600 mt-2">
            Monatliche Kosten bei Hosting & Wartung
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
          Jetzt kostenloses Angebot anfordern
        </button>
      </div>
    )) as ContentFunction,
    info: {
      title: "Was ist im Preis enthalten?",
      content: (
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
      ),
    },
  },
];
