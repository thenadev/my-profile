import { Card } from "../ui/card";

import { websiteSteps } from "@/config/prices/website";
import { CardContent, CardHeader, CardTitle } from "../ui/card";

interface InfoSectionItem {
  title: string;
  description: string;
}

interface InfoSectionProps {
  title: string;
  content: InfoSectionItem[];
  className?: string;
}

export const InfoSection = ({
  title,
  content,
  className = "",
}: InfoSectionProps) => {
  return (
    <Card
      className={`border-2 border-turquoise-600/30 bg-turquoise-800/90 backdrop-blur-sm h-fit sticky top-24 ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-turquoise-400 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-turquoise-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {content.map((item) => (
            <div key={item.title}>
              <h4 className="font-semibold text-turquoise-400">{item.title}</h4>
              <p className="text-gray-200">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
