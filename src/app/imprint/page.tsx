"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

const ImprintPage: React.FC = () => {
  const t = useTranslations("Imprint");

  return (
    <div className="min-h-screen w-screen py-20 flex flex-col items-center gap-8 px-4 md:px-8 bg-gray-50 text-slate-700">
      {/* Imprint Card Section */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-start gap-8 px-4 md:px-8 mt-10">
        <Card className="w-full md:w-3/4 lg:w-3/4 shadow-lg bg-white rounded-lg border border-gray-200 p-6">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold text-center md:text-left">
              {t("title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm md:text-base text-left mt-4">
              {/* Information Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {t("informationSectionTitle")}
              </h2>
              <p className="mb-4">
                {siteConfig.authorName} <br />
                {/* {siteConfig.companyName} <br /> */}
                {siteConfig.streetAddress} <br />
                {siteConfig.city}, {siteConfig.zipCode} <br />
                {t("country")}
              </p>

              {/* Contact Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {t("contactTitle")}
              </h2>
              <p className="mb-4">
                {t("contactPhone")}: {siteConfig.contactPhone} <br />
                {t("contactEmail")}:{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>

              {/* VAT ID Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {t("vatIdTitle")}
              </h2>
              <p className="mb-4">
                {t("vatIdText")}: {siteConfig.vatId}
              </p>

              {/* Disclaimer Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {t("disclaimerTitle")}
              </h2>
              <p className="mb-4">
                <strong>{t("accountabilityForContentTitle")}</strong>{" "}
                {t("accountabilityForContentText")}
              </p>
              <p className="mb-4">
                <strong>{t("accountabilityForLinksTitle")}</strong>{" "}
                {t("accountabilityForLinksText")}
              </p>

              {/* Privacy Policy Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {t("privacyPolicyTitle")}
              </h2>
              <p className="mb-4">{t("privacyPolicyText1")}</p>
              <p className="mb-4">
                {t("privacyPolicyText2")}{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {t("googlePrivacyPolicyLinkText")}
                </a>
                .
              </p>

              {/* Credits Section */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {t("creditsTitle")}
              </h2>
              <p className="mb-4">
                {t("creditsText")}{" "}
                <a
                  href={siteConfig.links.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
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
