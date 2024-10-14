import { Button } from "@/components/ui/button";
import { documents } from "@/utils/docs";
import { useTranslations } from "next-intl";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"; // Adjust import based on your file structure

const DocumentSection: React.FC = () => {
  const t = useTranslations("Documents");

  return (
    <div
      className="min-h-screen flex flex-col items-center z-20 relative px-0 md:px-2"
      id="documents"
    >
      <h2 className="pt-20 flex flex-row items-center justify-center gap-2 text-2xl sm:text-3xl font-bold mb-6 text-center">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 gap-2 md:gap-4 w-full max-w-5xl md:px-2">
        {documents.map((doc, index) => (
          <div key={index} className="p-2">
            <Card className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-3 h-full">
              <CardHeader>
                <CardTitle className="text-sm sm:text-lg font-semibold">
                  {t(doc.title)}
                </CardTitle>
                {doc.platform && (
                  <p className="text-xs text-gray-400">{doc.platform}</p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs sm:text-sm text-gray-400 mb-2">
                  {t(doc.description)}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-0 md:p-4">
                {doc.links ? (
                  <div className="flex flex-row gap-1 items-center justify-center">
                    {doc.links.map((link, idx) => (
                      <Button
                        key={idx}
                        onClick={() => window.open(link.url, "_blank")}
                        className="bg-blue-500 rounded-md shadow-md text-xs px-2 py-1
            transition-transform duration-300 transform hover:bg-blue-600 
            hover:scale-105"
                        title={`View ${t(`language.${link.language}`)} Document`}
                      >
                        <span className="font-semibold">
                          {t("language." + link.language).toUpperCase()}
                        </span>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-blue-400 hover:underline"
                  >
                    {t("viewDocument")}
                  </a>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentSection;
