"use client";

import { CheckoutForm } from "@/components/price-forms/checkout-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { websiteConfig, websiteSteps } from "@/config/prices/website";
import {
  calculateMonthlyPrice,
  calculatePrice,
} from "@/utils/websitePriceUtils";
import { motion } from "framer-motion";
import { useState } from "react";

const WebsiteCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [design, setDesign] = useState<string>("basic");
  const [pages, setPages] = useState<number>(5);
  const [features, setFeatures] = useState<string[]>([]);
  const [additional, setAdditional] = useState<string[]>(["maintenance"]);

  return (
    <div className="min-h-screen py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Website Preisrechner
          </h1>
          <p className="text-xl text-gray-600 font-bold">
            Berechnen Sie die Kosten für Ihre neue Website
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {websiteSteps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > index + 1
                    ? "bg-blue-600 text-white"
                    : currentStep === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (websiteSteps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`grid gap-6 ${
            currentStep === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {/* Form Card */}
          <Card className="border-2 border-gray-200 shadow-lg flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {websiteSteps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-lg">
                {websiteSteps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {(() => {
                const step = websiteSteps[currentStep - 1];
                switch (currentStep) {
                  case 1:
                    return step.content();
                  case 2:
                    return step.content(design, setDesign);
                  case 3:
                    return step.content(pages, setPages, design);
                  case 4:
                    return step.content(features, setFeatures);
                  case 5:
                    return step.content(additional, setAdditional);
                  case 6:
                    return (
                      <CheckoutForm
                        design={design}
                        pages={pages}
                        features={features}
                        additional={additional}
                      />
                    );
                  default:
                    return null;
                }
              })()}
            </CardContent>

            {/* Price and Navigation */}
            <div className="mt-auto border-t border-gray-200">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {currentStep !== 1 && currentStep !== websiteSteps.length && (
                    <div className="flex gap-4 w-full sm:w-auto">
                      <div>
                        <p className="text-sm text-gray-600">Aktueller Preis</p>
                        <p className="text-2xl font-bold text-blue-600">
                          €
                          {calculatePrice(
                            design,
                            pages,
                            features,
                            additional
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Monatlicher Preis
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          €{calculateMonthlyPrice(additional).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 w-full sm:w-auto ml-auto">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentStep((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentStep === 0}
                      className="w-full sm:w-auto"
                    >
                      Zurück
                    </Button>
                    {currentStep < websiteSteps.length ? (
                      <Button
                        onClick={() =>
                          setCurrentStep((prev) =>
                            Math.min(websiteSteps.length, prev + 1)
                          )
                        }
                        className="w-full sm:w-auto"
                      >
                        Weiter
                      </Button>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {websiteSteps[currentStep - 1].info?.content}
        </motion.div>
      </div>
    </div>
  );
};

export default WebsiteCalculator;
