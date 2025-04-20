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
      title: "Template Design",
      description: "",
      price: 2000,
    },
    individual: {
      id: "individual",
      title: "Individuelles Design",
      description:
        "Ein komplett maßgeschneidertes Design, das speziell auf Ihre Marke und Ihre Anforderungen zugeschnitten ist. Für Unternehmen mit besonderen Anforderungen.",
      price: 5000,
    },
  },
  pages: {
    basic: 200,
    premium: 300,
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
  maintenance: {
    price: 80,
    description: "Hosting & monatliche Wartung",
  },
  seo: {
    price: 500,
    description: "SEO-Optimierung",
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
          content={[
            {
              title: "Template Design",
              description:
                "Ein modernes, vorgefertigtes Design mit grundlegenden Anpassungsmöglichkeiten. Perfekt für kleine Unternehmen und Startups.",
            },
            {
              title: "Individuelles Design",
              description:
                "Ein komplett maßgeschneidertes Design, das speziell auf Ihre Marke und Ihre Anforderungen zugeschnitten ist. Für Unternehmen mit besonderen Anforderungen.",
            },
          ]}
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
            ? websiteConfig.pages.basic
            : websiteConfig.pages.premium
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
    description: "Welche Funktionen benötigen Sie?",
    content: ((features, setFeatures, _, __) => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(websiteConfig.features).map((feature) => (
            <div
              key={feature.id}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                const newChecked = !(features as string[]).includes(feature.id);
                if (newChecked) {
                  setFeatures?.([
                    ...(features as string[]),
                    feature.id,
                  ] as string[]);
                } else {
                  setFeatures?.(
                    (features as string[]).filter((f) => f !== feature.id)
                  );
                }
              }}
            >
              <Checkbox
                id={feature.id}
                checked={(features as string[]).includes(feature.id)}
              />
              <div className="flex flex-col">
                <Label className="font-medium" htmlFor={feature.id}>
                  {feature.title}
                </Label>
                <span className="text-sm text-gray-500">€{feature.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    title: "Zusätzliche Optionen",
    description: "Wählen Sie weitere Optionen",
    content: ((seo, setSeo, maintenance, setMaintenance) => (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="seo"
            checked={seo as boolean}
            onCheckedChange={(checked) => setSeo?.(checked as boolean)}
          />
          <Label htmlFor="seo">
            SEO-Optimierung (€{websiteConfig.seo.price})
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="maintenance"
            checked={maintenance as boolean}
            onCheckedChange={(checked) => setMaintenance?.(checked as boolean)}
          />
          <Label htmlFor="maintenance">
            {websiteConfig.maintenance.description} (€
            {websiteConfig.maintenance.price} monatlich)
          </Label>
        </div>
      </div>
    )) as ContentFunction,
    info: {
      title: "Zusätzliche Services",
      content: (
        <InfoSection
          title="Zusätzliche Services"
          content={[
            {
              title: "SEO-Optimierung",
              description:
                "Professionelle Suchmaschinenoptimierung für bessere Sichtbarkeit in Google und anderen Suchmaschinen.",
            },
            {
              title: "SEO-Optimierung",
              description:
                "Professionelle Suchmaschinenoptimierung für bessere Sichtbarkeit in Google und anderen Suchmaschinen.",
            },
            {
              title: "Hosting & Wartung",
              description:
                "Ich übernehme das Hosting und die Wartung für Ihre Website, damit Sie sich auf Ihr Kern-Business konzentrieren können, falls nötig registriere ich auch die Domain für Sie. Wenn die Option nicht gewählt wird, übermittele ich Ihnen nach Projektabschluss jediglich den Code für die Website.",
            },
          ]}
        />
      ),
    },
  },
  {
    id: 5,
    title: "Gesamtkosten",
    description: "Ihre geschätzten Kosten",
    content: ((calculatePrice, _, __, ___) => (
      <div className="text-center">
        <p className="text-4xl font-bold text-blue-600">
          €{(calculatePrice as () => number)().toLocaleString()}
        </p>
        <p className="text-gray-600 mt-2">
          Alle Preise verstehen sich zzgl. MwSt.
        </p>
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
