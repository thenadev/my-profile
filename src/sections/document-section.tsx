import { documents } from "@/utils/docs";
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
  return (
    <div
      className="min-h-screen flex flex-col items-center z-20 relative"
      id="documents"
    >
      <h2 className="pt-28 flex flex-row items-center justify-center gap-4 text-3xl sm:text-4xl font-bold mb-8">
        Documents / Certs
        {/* <div className="p-2 bg-gray-900 text-white rounded-full">
          <FaFilePdf className="" />
        </div> */}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {documents.map((doc, index) => (
          <div key={index} className="p-1 sm:p-4">
            <Card className="bg-white shadow-2xl rounded-lg h-64 sm:h-72 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-base md:text-2xl font-semibold">
                  {doc.title}
                </CardTitle>
                {doc.platform && (
                  <p className="text-xs sm:text-sm text-gray-400">
                    {doc.platform}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-lg text-gray-400 md:mb-4">
                  {doc.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                {doc.links ? (
                  <div>
                    {doc.links.map((link, idx) => (
                      <div key={idx}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          View {link.language} Document
                        </a>
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
                    View Document
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
