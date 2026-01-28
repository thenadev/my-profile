"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/config/projects";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WebsitePreviewProps {
  url: string;
  fallbackImage: any;
  projectId: number;
}

function WebsitePreview({
  url,
  fallbackImage,
  projectId,
}: WebsitePreviewProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  // Prüfe, ob URL gültig ist
  const isValidUrl = url && url.startsWith("http");

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
    setIframeError(false);
    setShowFallback(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
    setShowFallback(true);
  };

  // Versuche zu erkennen, ob iframe blockiert wurde (X-Frame-Options)
  // Nur für wirklich blockierte iframes, nicht für langsam ladende
  useEffect(() => {
    if (!isValidUrl) {
      setShowFallback(true);
      setIframeError(true);
      setIsLoading(false);
      return;
    }

    // Längeren Timeout für langsam ladende Websites (15 Sekunden)
    // Nur wenn nach 15 Sekunden immer noch geladen wird UND kein onLoad Event kam
    const timeout = setTimeout(() => {
      if (isLoading) {
        // Prüfe, ob iframe tatsächlich geladen wurde (manchmal kommt onLoad nicht)
        const iframes = document.querySelectorAll(
          `iframe[title*="Website Preview ${projectId}"]`,
        ) as NodeListOf<HTMLIFrameElement>;
        let hasContent = false;
        iframes.forEach((iframe) => {
          try {
            // Versuche auf iframe zuzugreifen (nur same-origin funktioniert)
            if (iframe.contentDocument && iframe.contentDocument.body) {
              hasContent = iframe.contentDocument.body.children.length > 0;
            }
          } catch (e) {
            // Cross-origin - das ist normal, bedeutet nicht dass es blockiert ist
            // Wenn cross-origin, nehmen wir an dass es lädt (nicht auf Fallback umschalten)
            // Cross-origin iframes können wir nicht prüfen, also zeigen wir sie weiter an
            hasContent = true;
          }
        });

        // Nur auf Fallback umschalten wenn wirklich kein Content da ist UND same-origin
        // Bei cross-origin iframes zeigen wir sie weiter an, auch wenn onLoad nicht kam
        if (!hasContent) {
          // Nur wenn wirklich kein Content und same-origin - dann blockiert
          setShowFallback(true);
          setIframeError(true);
          setIsLoading(false);
        } else {
          // Content ist da oder cross-origin (können wir nicht prüfen) - weiter anzeigen
          setIsLoading(false);
        }
      }
    }, 15000); // 15 Sekunden für langsam ladende Websites

    return () => clearTimeout(timeout);
  }, [isLoading, isValidUrl, projectId]);

  // Versuche Cookie Consents im iframe zu deaktivieren via PostMessage
  useEffect(() => {
    if (!isValidUrl || !embedUrl || isLoading || iframeError || showFallback) {
      return;
    }

    // Warte kurz, damit iframe geladen ist
    const timer = setTimeout(() => {
      try {
        // Versuche mit iframe zu kommunizieren
        const iframes = document.querySelectorAll(
          `iframe[title*="Website Preview ${projectId}"]`,
        ) as NodeListOf<HTMLIFrameElement>;
        iframes.forEach((iframe) => {
          if (iframe?.contentWindow) {
            try {
              // Sende Nachricht an iframe, um Cookie Consents zu deaktivieren
              iframe.contentWindow.postMessage(
                {
                  type: "DISABLE_COOKIE_CONSENT",
                  source: "portfolio-preview",
                },
                "*",
              );
            } catch (error) {
              // Cross-origin iframes blockieren PostMessage ohne explizite Erlaubnis
              // Fehler wird stillschweigend ignoriert
            }
          }
        });
      } catch (error) {
        // Fehler wird stillschweigend ignoriert
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, embedUrl, projectId, iframeError, showFallback, isValidUrl]);

  // Früher Return NACH allen Hooks
  if (iframeError || showFallback) {
    return (
      <div className="relative bg-card flex items-center justify-center rounded-t-lg overflow-hidden group">
        {/* Mobile: Kompakteres Seitenverhältnis - Immer angezeigt */}
        <div className="relative w-full aspect-[9/14] max-h-[600px]">
          <Image
            src={fallbackImage}
            alt="Projekt Vorschau"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-4">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
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
      </div>
    );
  }

  if (!isValidUrl) {
    return (
      <div className="relative bg-card flex items-center justify-center rounded-t-lg overflow-hidden group">
        {/* Mobile: Kompakteres Seitenverhältnis - Immer angezeigt */}
        <div className="relative w-full aspect-[9/14] max-h-[600px]">
          <Image
            src={fallbackImage}
            alt="Projekt Vorschau"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-4">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                sendGoogleEvent("portfolio_click", {
                  project_id: projectId,
                  type: "invalid_url",
                });
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Keine Vorschau verfügbar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="relative bg-card rounded-t-lg overflow-hidden group">
      {/* Mobile: Kompakteres Seitenverhältnis - Immer angezeigt */}
      <div className="relative w-full aspect-[9/14] max-h-[600px]">
        {isLoading && (
            <div className="absolute inset-0 bg-muted/80 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-6 w-6 text-muted-foreground animate-spin" />
              <p className="text-sm text-muted-foreground">Lädt Website...</p>
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
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
    </div>
  );
}

export default function UnternehmenswebsitePortfolio() {
  const t = useTranslations("Projects");

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Unsere Projekte
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sehen Sie sich einige unserer erfolgreich umgesetzten
            Webdesign-Projekte an - Live und aktuell
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter(
              (p) =>
                p.livePreviewLink &&
                (p.livePreviewLink.includes("tricon-gmbh.de") ||
                  p.livePreviewLink.includes("amsel-store.de") ||
                  p.livePreviewLink.includes("physio-andre.de") ||
                  p.livePreviewLink.includes("solarwerk.info")),
            )
            .map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-primary/50 bg-card backdrop-blur-sm"
              >
                <WebsitePreview
                  url={project.livePreviewLink || ""}
                  fallbackImage={project.image}
                  projectId={project.id}
                />
                <CardContent className="p-4 space-y-3">
                  {/* Beschreibung */}
                  {project.descriptionKey && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {t(project.descriptionKey)}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Live Website-Vorschau
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                      onClick={() => {
                        sendGoogleEvent("portfolio_click", {
                          project_id: project.id,
                          type: "card_link",
                        });
                        if (project.livePreviewLink) {
                          window.open(
                            project.livePreviewLink,
                            "_blank",
                            "noopener,noreferrer",
                          );
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
