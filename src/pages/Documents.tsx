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

const Documents: React.FC = () => {
  return (
    <div
      className="pt-20 min-h-screen flex flex-col items-center justify-center bg-gray-900"
      id="documents"
    >
      <h2 className="flex flex-row gap-4 text-4xl font-bold text-white mb-8">
        <FaFilePdf />
        Documents / Certs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {documents.map((doc, index) => (
          <div key={index} className="p-4">
            <Card className="bg-gray-800 text-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {doc.title}
                </CardTitle>
                {doc.platform && ( // Check if platform exists
                  <p className="text-sm text-gray-400">{doc.platform}</p> // Display platform
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-300 mb-4">
                  {doc.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
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

export default Documents;
