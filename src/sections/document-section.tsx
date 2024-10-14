import { Button } from "@/components/ui/button";
import { documents } from "@/utils/docs";
import { useTranslations } from "next-intl";
import React from "react";
import { AiOutlineGlobal } from "react-icons/ai"; // Optional, for aesthetic purposes
import { FaFilePdf } from "react-icons/fa"; // Import an icon for PDF indication
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
      className="min-h-screen flex flex-col items-center z-20 relative"
      id="documents"
    >
      <h2 className="pt-28 flex flex-row items-center justify-center gap-4 text-3xl sm:text-4xl font-bold mb-8">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {documents.map((doc, index) => (
          <div key={index} className="p-1 sm:p-4">
            <Card className="bg-white shadow-2xl rounded-lg h-64 sm:h-72 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-base md:text-2xl font-semibold">
                  {t(doc.title)}
                </CardTitle>
                {doc.platform && (
                  <p className="text-xs sm:text-sm text-gray-400">
                    {t(doc.platform)}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-lg text-gray-400 md:mb-4">
                  {t(doc.description)}
                </CardDescription>
              </CardContent>
              <CardFooter>
                {doc.links ? (
                  <div className="flex flex-row gap-4 items-center">
                    {doc.links.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Button
                          onClick={() => window.open(link.url, "_blank")}
                          className="bg-blue-500 rounded shadow-md z-30
        transition-transform duration-300 transform hover:bg-blue-600 
        hover:scale-105"
                          title={`View ${t(`language.${link.language}`)} Document`}
                        >
                          <span className="font-semibold">
                            {t("language." + link.language).toUpperCase()}
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
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
