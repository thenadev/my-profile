import { documents } from "@/utils/docs";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
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
      className="min-h-screen flex flex-col items-center "
      id="documents"
    >
      <h2 className="pt-28 flex flex-row items-center justify-center gap-4 text-4xl font-bold mb-8">
        Documents / Certs
        <div className="p-2 bg-gray-900 text-white rounded-full">
          <FaFilePdf className="" />
        </div>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {documents.map((doc, index) => (
          <div key={index} className="p-4">
            <Card className="bg-white shadow-2xl rounded-lg h-72 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {doc.title}
                </CardTitle>
                {doc.platform && (
                  <p className="text-sm text-gray-400">{doc.platform}</p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-400 mb-4">
                  {doc.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline z-40"
                >
                  View Document
                </a>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentSection;
