import { websiteConfig } from "@/config/prices/website";
import {
  calculateMonthlyPrice,
  calculatePrice,
} from "@/utils/websitePriceUtils";

export const SummaryForm = ({
  design,
  pages,
  features,
  additional,
}: {
  design: string;
  pages: number;
  features: string[];
  additional: string[];
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 m-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm uppercase tracking-wider mb-2">
                Einmalige Kosten
              </p>
              <p className="text-4xl font-bold text-blue-600 flex items-center justify-center md:justify-start">
                <span className="text-2xl mr-1">€</span>
                {calculatePrice(
                  design,
                  pages,
                  features,
                  additional
                ).toLocaleString()}
              </p>
            </div>

            <div className="text-center md:text-left border-t md:border-t-0 md:border-l border-blue-200 pt-6 md:pt-0 md:pl-8">
              <p className="text-gray-600 text-sm uppercase tracking-wider mb-2">
                Monatliche Kosten
              </p>
              <p className="text-3xl font-bold text-blue-600 flex items-center justify-center md:justify-start">
                <span className="text-xl mr-1">€</span>
                {calculateMonthlyPrice(additional).toLocaleString()}
                <span className="text-lg ml-1">/Monat</span>
              </p>
            </div>
          </div>
        </div>
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
          Jetzt unverbindlich Angebot anfordern
        </button> */}
        <p className="text-gray-600 text-sm mt-2">
          Alle Preise verstehen sich zzgl. MwSt.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Ihre Angaben
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Design-Paket</span>
              <span className="font-semibold text-blue-600">
                {
                  websiteConfig.websitePackage[
                    design as keyof typeof websiteConfig.websitePackage
                  ].title
                }
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Anzahl Seiten</span>
              <span className="font-semibold text-blue-600">{pages}</span>
            </div>
          </div>

          {features.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="text-gray-600">Funktionen</div>
                {features.map((f) => (
                  <div key={f} className="pl-4 font-semibold text-blue-600">
                    •{" "}
                    {
                      websiteConfig.features[
                        f as keyof typeof websiteConfig.features
                      ].title
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

          {additional.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="text-gray-600">Zusätzliche Services</div>
                {additional.map((a) => (
                  <div key={a} className="pl-4 font-semibold text-blue-600">
                    •{" "}
                    {
                      websiteConfig.additional[
                        a as keyof typeof websiteConfig.additional
                      ].title
                    }
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
