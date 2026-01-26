"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/config/projects";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";

interface WebsitePreviewProps {
  url: string;
  fallbackImage: any;
  projectId: number;
}

function WebsitePreview({ url, fallbackImage, projectId }: WebsitePreviewProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  // URL-Parameter hinzufügen, um Cookie Consents zu deaktivieren
  const getEmbedUrl = (originalUrl: string): string => {
    if (!originalUrl) return "";
    
    try {
      const urlObj = new URL(originalUrl);
      
      // Gängige Cookie Consent Libraries deaktivieren
      // Cookiebot
      urlObj.searchParams.set("cookiebot", "disable");
      // OneTrust
      urlObj.searchParams.set("onetrust", "disable");
      // Osano
      urlObj.searchParams.set("osano", "disable");
      // Generic Parameter für Custom Implementierungen
      urlObj.searchParams.set("nocookie", "true");
      urlObj.searchParams.set("embed", "true");
      urlObj.searchParams.set("preview", "true");
      // Cookie Consent Library
      urlObj.searchParams.set("cookieconsent", "disable");
      
      return urlObj.toString();
    } catch (error) {
      // Falls URL-Parsing fehlschlägt, füge Parameter manuell hinzu
      const separator = originalUrl.includes("?") ? "&" : "?";
      return `${originalUrl}${separator}nocookie=true&embed=true&preview=true`;
    }
  };

  const embedUrl = getEmbedUrl(url);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
    setShowFallback(true);
  };

  // Versuche zu erkennen, ob iframe blockiert wurde (X-Frame-Options)
  useEffect(() => {
    // Wenn iframe nach 5 Sekunden noch lädt, könnte es blockiert sein
    const timeout = setTimeout(() => {
      if (isLoading) {
        setShowFallback(true);
        setIframeError(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (iframeError || showFallback) {
    return (
      <div className="relative h-80 md:h-96 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden group">
        <Image
          src={fallbackImage}
          alt="Projekt Vorschau"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-4">
          <Button
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-900 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              sendGoogleEvent("portfolio_click", {
                project_id: projectId,
                type: "fallback_link",
              });
              window.open(url, "_blank", "noopener,noreferrer");
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Website öffnen
          </Button>
        </div>
      </div>
    );
  }

  // Versuche Cookie Consents im iframe zu deaktivieren via PostMessage
  useEffect(() => {
    if (!isLoading && embedUrl) {
      // Warte kurz, damit iframe geladen ist
      const timer = setTimeout(() => {
        // Versuche mit iframe zu kommunizieren (funktioniert nur bei same-origin)
        const iframe = document.querySelector(`iframe[title="Website Preview ${projectId}"]`) as HTMLIFrameElement;
        if (iframe?.contentWindow) {
          try {
            // Sende Nachricht an iframe, um Cookie Consents zu deaktivieren
            iframe.contentWindow.postMessage(
              {
                type: "DISABLE_COOKIE_CONSENT",
                source: "portfolio-preview",
              },
              "*"
            );
          } catch (error) {
            // Cross-origin iframes blockieren PostMessage ohne explizite Erlaubnis
            console.log("PostMessage nicht möglich (Cross-Origin)");
          }
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, embedUrl, projectId]);

  return (
    <div className="relative h-80 md:h-96 bg-gray-100 rounded-t-lg overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="h-6 w-6 text-gray-400 animate-spin" />
            <p className="text-sm text-gray-500">Lädt Website...</p>
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        title={`Website Preview ${projectId}`}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
        allow="fullscreen"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      {/* Overlay mit Link zur vollständigen Website */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto">
          <Button
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-900 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              sendGoogleEvent("portfolio_click", {
                project_id: projectId,
                type: "full_site",
              });
              window.open(url, "_blank", "noopener,noreferrer");
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Website öffnen
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function UnternehmenswebsitePortfolio() {
  return (
    <>
      {/* CSS um Cookie Consent Modals zu verbergen, die über iframes erscheinen könnten */}
      <style jsx global>{`
        /* Verstecke gängige Cookie Consent Overlays, die außerhalb des iframes erscheinen */
        body > div[id*="cookie"],
        body > div[class*="cookie"],
        body > div[id*="Cookie"],
        body > div[class*="Cookie"],
        body > div[id*="consent"],
        body > div[class*="consent"],
        body > div[id*="Consent"],
        body > div[class*="Consent"],
        body > div[id*="cookiebot"],
        body > div[class*="cookiebot"],
        body > div[id*="onetrust"],
        body > div[class*="onetrust"],
        body > div[id*="osano"],
        body > div[class*="osano"] {
          /* Diese werden normalerweise nicht außerhalb des iframes erscheinen,
             aber falls doch, werden sie hier versteckt */
        }
        
        /* Stelle sicher, dass iframes nicht von externen Overlays überlagert werden */
        iframe[title*="Website Preview"] {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Unsere Projekte
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sehen Sie sich einige unserer erfolgreich umgesetzten
            Webdesign-Projekte an - Live und aktuell
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300"
            >
              <WebsitePreview
                url={project.livePreviewLink || ""}
                fallbackImage={project.image}
                projectId={project.id}
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Live Website-Vorschau
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => {
                      sendGoogleEvent("portfolio_click", {
                        project_id: project.id,
                        type: "card_link",
                      });
                      if (project.livePreviewLink) {
                        window.open(project.livePreviewLink, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Öffnen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
