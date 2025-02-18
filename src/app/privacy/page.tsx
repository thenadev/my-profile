"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

const PrivacyPage: React.FC = () => {
  const t = useTranslations("Privacy");

  return (
    <div className="min-h-screen w-screen py-20 flex flex-col items-center gap-8 px-4 md:px-8 bg-gray-50 text-slate-700">
      {/* Privacy Policy Card Section */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-start gap-8 px-4 md:px-8 mt-10">
        <Card className="w-full md:w-3/4 lg:w-3/4 shadow-lg bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <CardHeader>
            <CardTitle className="text-2xl md:text-4xl font-bold text-center md:text-left">
              {t("title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm md:text-base text-left mt-2 md:mt-4">
              {/* Introduction Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("introductionTitle")}
              </h2>
              <p className="mb-4">
                {t("introductionText", { companyName: siteConfig.companyName })}
              </p>

              {/* Information We Collect Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("informationWeCollectTitle")}
              </h2>
              <p className="mb-4">{t("informationWeCollectText")}</p>
              <ul className="list-disc list-inside mb-4">
                <li>{t("informationWeCollectItems.personalInfo")}</li>
                <li>{t("informationWeCollectItems.usageData")}</li>
              </ul>

              {/* How We Use Your Data Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("howWeUseYourDataTitle")}
              </h2>
              <p className="mb-4">{t("howWeUseYourDataText")}</p>
              <ul className="list-disc list-inside mb-4">
                <li>{t("howWeUseYourDataItems.personalize")}</li>
                <li>{t("howWeUseYourDataItems.provideServices")}</li>
                <li>{t("howWeUseYourDataItems.improveFunctionality")}</li>
                <li>{t("howWeUseYourDataItems.analyzeInteraction")}</li>
                <li>{t("howWeUseYourDataItems.communicate")}</li>
              </ul>

              {/* Google Analytics Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("googleAnalyticsTitle")}
              </h2>
              <p className="mb-4">{t("googleAnalyticsText")}</p>
              <p className="mb-4">
                {t("googleAnalyticsOptOutText")}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {t("googleAnalyticsOptOutLinkText")}
                </a>
                .
              </p>
              <p className="mb-4">
                {t("googlePrivacyPolicyLinkText")}
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

              {/* Cookies Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("cookiesTitle")}
              </h2>
              <p className="mb-4">{t("cookiesText")}</p>

              {/* Third-Party Sharing Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("thirdPartySharingTitle")}
              </h2>
              <p className="mb-4">{t("thirdPartySharingText")}</p>

              {/* Security of Your Information Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("securityOfInformationTitle")}
              </h2>
              <p className="mb-4">{t("securityOfInformationText")}</p>

              {/* Your Rights Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("yourRightsTitle")}
              </h2>
              <p className="mb-4">
                {t("yourRightsText", {
                  email: siteConfig.contactEmail,
                })}
              </p>

              {/* Changes to This Privacy Policy Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("changesToPolicyTitle")}
              </h2>
              <p className="mb-4">{t("changesToPolicyText")}</p>

              {/* Contact Us Section */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {t("contactUsTitle")}
              </h2>
              <p className="mb-4">
                {t("contactUsText")}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage;
