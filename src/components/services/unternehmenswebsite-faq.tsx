"use client";

import { Card } from "@/components/ui/card";
import { getUnternehmenswebsiteFaqCategories } from "@/data/service-faqs";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function UnternehmenswebsiteFAQ() {
  const locale = useLocale();
  const t = useTranslations("Unternehmenswebsite.faq");
  const faqCategories = getUnternehmenswebsiteFaqCategories(locale);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          {t("heading")}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("subheading")}
        </p>
      </div>

      {/* Kategorie-Navigation für schnellen Zugriff */}
      <div className="flex flex-wrap justify-center gap-2">
        {faqCategories.map((category) => {
          const Icon = category.icon;
          return (
            <a
              key={category.id}
              href={`#faq-${category.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(`faq-${category.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-3.5 w-3.5" />
              {category.title}
            </a>
          );
        })}
      </div>

      <div className="space-y-10">
        {faqCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              id={`faq-${category.id}`}
              className="scroll-mt-24"
            >
              <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5 md:p-6 border-b border-border bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {category.faqs.map((faq, index) => {
                    const faqId = `${category.id}-${index}`;
                    const isOpen = openFaq === faqId;
                    return (
                      <div key={faqId} className="group">
                        <button
                          className="w-full px-5 md:px-6 py-4 text-left flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
                          onClick={() => toggleFaq(faqId)}
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
        })}
      </div>
    </div>
  );
}
