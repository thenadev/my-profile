"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

const ImprintPage: React.FC = () => {
  const t = useTranslations("Imprint");

  return (
    <div className="min-h-screen w-screen py-20 flex flex-col items-center gap-8 px-4 md:px-8 bg-turquoise-800 text-gray-200">
      {/* Imprint Card Section */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-start gap-8 px-4 md:px-8 mt-10">
        <Card className="w-full md:w-3/4 lg:w-3/4 shadow-lg bg-turquoise-800/90 backdrop-blur-sm rounded-lg border border-turquoise-600/30 p-6">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold text-center md:text-left text-white">
              {t("title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm md:text-base text-left mt-4 text-gray-200">
              {/* Information Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("informationSectionTitle")}
              </h2>
              <p className="mb-4 text-gray-200">
                {siteConfig.authorName} <br />
                {/* {siteConfig.companyName} <br /> */}
                {siteConfig.streetAddress} <br />
                {siteConfig.city}, {siteConfig.zipCode} <br />
                {t("country")}
              </p>

              {/* Contact Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("contactTitle")}
              </h2>
              <p className="mb-4 text-gray-200">
                {t("contactPhone")}: {siteConfig.contactPhone} <br />
                {t("contactEmail")}:{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-turquoise-400 underline hover:text-turquoise-300"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>

              {/* VAT ID Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("vatIdTitle")}
              </h2>
              <p className="mb-4 text-gray-200">
                {t("vatIdText")}: {siteConfig.vatId}
              </p>

              {/* Disclaimer Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("disclaimerTitle")}
              </h2>
              <p className="mb-4 text-gray-200">
                <strong>{t("accountabilityForContentTitle")}</strong>{" "}
                {t("accountabilityForContentText")}
              </p>
              <p className="mb-4 text-gray-200">
                <strong>{t("accountabilityForLinksTitle")}</strong>{" "}
                {t("accountabilityForLinksText")}
              </p>

              {/* Privacy Policy Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("privacyPolicyTitle")}
              </h2>
              <p className="mb-4 text-gray-200">{t("privacyPolicyText1")}</p>
              <p className="mb-4 text-gray-200">
                {t("privacyPolicyText2")}{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-turquoise-400 underline hover:text-turquoise-300"
                >
                  {t("googlePrivacyPolicyLinkText")}
                </a>
                .
              </p>

              {/* Credits Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("creditsTitle")}
              </h2>
              <p className="mb-4 text-gray-200">
                {t("creditsText")}{" "}
                <a
                  href={siteConfig.links.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-turquoise-400 underline hover:text-turquoise-300"
                >
                  Thomas Schwabauer
                </a>{" "}
                {t("creditsYear")}.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImprintPage;
