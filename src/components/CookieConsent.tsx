"use client";

import { useEffect } from "react";
import ReactGA from "react-ga4";
import "vanilla-cookieconsent/dist/cookieconsent.css";

// Erweitere Window Interface für globale Variablen
declare global {
  interface Window {
    GA_INITIALIZED?: boolean;
    META_PIXEL_INITIALIZED?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ReactPixel: any;

    async function runConsent() {
      try {
        // Dynamisch importieren um Typen-Konflikte zu vermeiden
        const pixelModule = await import("react-facebook-pixel");
        ReactPixel = pixelModule.default;
      } catch (error) {
        console.log("React Facebook Pixel nicht verfügbar");
      }

      // Dynamisch importieren um Typen-Konflikte zu vermeiden
      const CookieConsent = await import("vanilla-cookieconsent");

      // hideFromBots: false – Banner sonst im Tag-Manager-Debugger und bei einigen Browsern nicht sichtbar.
      // Bot-Erkennung von vanilla-cookieconsent kann dort fälschlich greifen.
      CookieConsent.run({
        mode: "opt-in",
        hideFromBots: false,
        guiOptions: {
          consentModal: {
            layout: "box",
            position: "middle center",
            equalWeightButtons: true,
            flipButtons: true,
          },
          preferencesModal: {
            layout: "box",
            equalWeightButtons: true,
            flipButtons: false,
          },
        },
        categories: {
          notwendig: {
            enabled: true,
            readOnly: true,
          },
          statistik: {
            enabled: false,
            readOnly: false,
          },
          marketing: {
            enabled: false,
            readOnly: false,
          },
        },
        language: {
          default: "de",
          translations: {
            de: {
              consentModal: {
                title: "Wir verwenden Cookies",
                description:
                  "Wir nutzen Cookies, um grundlegende Funktionen der Website zu gewährleisten und Ihr Online-Erlebnis zu verbessern. Sie können selbst entscheiden, welche Kategorien Sie zulassen möchten. Weitere Informationen finden Sie in unserer <a href='/privacy' target='_blank'>Datenschutzerklärung</a>.",
                acceptAllBtn: "Alle akzeptieren",
                acceptNecessaryBtn: "Nur notwendige Cookies",
                showPreferencesBtn: "Einstellungen verwalten",
                footer: `
                <a href='/imprint' target='_blank'>Impressum</a>
                <a href='/privacy' target='_blank'>Datenschutz</a>
              `,
              },
              preferencesModal: {
                title: "Cookie-Einstellungen",
                acceptAllBtn: "Alle akzeptieren",
                acceptNecessaryBtn: "Nur notwendige Cookies",
                savePreferencesBtn: "Auswahl speichern",
                closeIconLabel: "Schließen",
                sections: [
                  {
                    title: "Verwendung von Cookies",
                    description:
                      "Wir verwenden Cookies, um die grundlegenden Funktionen der Website zu gewährleisten und Ihr Online-Erlebnis zu verbessern.",
                  },
                  {
                    title: "Notwendige Cookies",
                    description:
                      "Diese Cookies sind für den Betrieb der Website essenziell und können nicht abgewählt werden.",
                    linkedCategory: "notwendig",
                  },
                  {
                    title: "Statistik & Analyse",
                    description:
                      "Diese Cookies helfen uns, das Nutzerverhalten zu analysieren, um unser Angebot zu verbessern.",
                    linkedCategory: "statistik",
                    cookieTable: {
                      headers: {
                        name: "Name",
                        domain: "Service",
                        description: "Beschreibung",
                        expiration: "Ablauf",
                      },
                      body: [
                        {
                          name: "_ga",
                          domain: "Google Analytics",
                          description:
                            "Wird zur Unterscheidung von Nutzern verwendet.",
                          expiration: "2 Jahre",
                        },
                        {
                          name: "_gid",
                          domain: "Google Analytics",
                          description:
                            "Wird zur Unterscheidung von Nutzern verwendet.",
                          expiration: "24 Stunden",
                        },
                      ],
                    },
                  },
                  {
                    title: "Marketing & Meta Pixel",
                    description:
                      "Marketing-Cookies werden verwendet, um Besuchern auf Webseiten zu folgen. Ziel ist es, Anzeigen zu zeigen, die relevant und ansprechend für den einzelnen Benutzer sind. Das Meta Pixel ermöglicht uns, die Wirksamkeit unserer Facebook-/Instagram-Werbeanzeigen zu messen und gezielt auszuspielen.",
                    linkedCategory: "marketing",
                    cookieTable: {
                      headers: {
                        name: "Name",
                        domain: "Service",
                        description: "Beschreibung",
                        expiration: "Ablauf",
                      },
                      body: [
                        {
                          name: "_fbp",
                          domain: "Meta Pixel",
                          description:
                            "Wird von Meta verwendet, um eine Reihe von Werbeprodukten bereitzustellen, z.B. Echtzeitgebote von Drittanbietern.",
                          expiration: "3 Monate",
                        },
                      ],
                    },
                  },
                  {
                    title: "Mehr Informationen",
                    description:
                      "Weitere Informationen finden Sie in unserer <a href='/privacy' target='_blank'>Datenschutzerklärung</a> oder im <a href='/imprint' target='_blank'>Impressum</a>.",
                  },
                ],
              },
            },
            en: {
              consentModal: {
                title: "We use cookies",
                description:
                  "We use cookies to ensure basic website functionality and improve your online experience. You can decide for yourself which categories you want to allow. For more information, please see our <a href='/privacy' target='_blank'>Privacy Policy</a>.",
                acceptAllBtn: "Accept all",
                acceptNecessaryBtn: "Necessary cookies only",
                showPreferencesBtn: "Manage preferences",
                footer: `
                <a href='/imprint' target='_blank'>Imprint</a>
                <a href='/privacy' target='_blank'>Privacy Policy</a>
              `,
              },
              preferencesModal: {
                title: "Cookie Preferences",
                acceptAllBtn: "Accept all",
                acceptNecessaryBtn: "Necessary cookies only",
                savePreferencesBtn: "Save preferences",
                closeIconLabel: "Close",
                sections: [
                  {
                    title: "Use of Cookies",
                    description:
                      "We use cookies to ensure the basic functionality of the website and improve your online experience.",
                  },
                  {
                    title: "Necessary Cookies",
                    description:
                      "These cookies are essential for the operation of the website and cannot be deselected.",
                    linkedCategory: "notwendig",
                  },
                  {
                    title: "Statistics & Analytics",
                    description:
                      "These cookies help us analyze user behavior to improve our offering.",
                    linkedCategory: "statistik",
                    cookieTable: {
                      headers: {
                        name: "Name",
                        domain: "Service",
                        description: "Description",
                        expiration: "Expiration",
                      },
                      body: [
                        {
                          name: "_ga",
                          domain: "Google Analytics",
                          description: "Used to distinguish users.",
                          expiration: "2 years",
                        },
                        {
                          name: "_gid",
                          domain: "Google Analytics",
                          description: "Used to distinguish users.",
                          expiration: "24 hours",
                        },
                      ],
                    },
                  },
                  {
                    title: "Marketing & Meta Pixel",
                    description:
                      "Marketing cookies are used to track visitors on websites. The goal is to display ads that are relevant and engaging for individual users. The Meta Pixel enables us to measure the effectiveness of our Facebook/Instagram ads and target them specifically.",
                    linkedCategory: "marketing",
                    cookieTable: {
                      headers: {
                        name: "Name",
                        domain: "Service",
                        description: "Description",
                        expiration: "Expiration",
                      },
                      body: [
                        {
                          name: "_fbp",
                          domain: "Meta Pixel",
                          description:
                            "Used by Meta to provide a range of advertising products, e.g. real-time bidding from third parties.",
                          expiration: "3 months",
                        },
                      ],
                    },
                  },
                  {
                    title: "More Information",
                    description:
                      "For more information, please see our <a href='/privacy' target='_blank'>Privacy Policy</a> or <a href='/imprint' target='_blank'>Imprint</a>.",
                  },
                ],
              },
            },
          },
        },
        onModalShow: () => {
          console.log("Modal angezeigt");
        },
        onFirstConsent: () => {
          logConsent();
        },
        onConsent: () => {
          logConsent();
        },
        onChange: () => {
          logConsent();
        },
      });

      // Consent-Status synchronisieren (z. B. bei Rückkehr mit gespeicherter Einwilligung)
      logConsent();
    }

    function logConsent() {
      // Dynamisch importieren um Typen-Konflikte zu vermeiden
      import("vanilla-cookieconsent").then((CookieConsent) => {
        const cookie = CookieConsent.getCookie();
        const preferences = CookieConsent.getUserPreferences();
        console.log(cookie, preferences);

        const TRACKING_ID = "G-63C2KDFQHT";
        const META_PIXEL_ID = "557324587373445";

        // Google Consent Mode v2: Einwilligung an gtag übermitteln
        const statistikAccepted =
          CookieConsent.acceptedCategory &&
          CookieConsent.acceptedCategory("statistik");
        const marketingAccepted =
          CookieConsent.acceptedCategory &&
          CookieConsent.acceptedCategory("marketing");

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            ad_storage: marketingAccepted ? "granted" : "denied",
            ad_user_data: marketingAccepted ? "granted" : "denied",
            ad_personalization: marketingAccepted ? "granted" : "denied",
            analytics_storage: statistikAccepted ? "granted" : "denied",
          });
        }

        // ReactGA für Event-Tracking (gtag/GA4 läuft bereits mit Consent Mode)
        if (
          typeof window !== "undefined" &&
          process.env.NODE_ENV === "production" &&
          !window.GA_INITIALIZED
        ) {
          ReactGA.initialize(TRACKING_ID);
          window.GA_INITIALIZED = true;
        }
        if (!statistikAccepted) {
          window.GA_INITIALIZED = false;
          ReactGA.reset();
        }

        // Initialisiere Meta Pixel nur, wenn Marketing-Cookies akzeptiert wurden
        if (
          typeof window !== "undefined" &&
          CookieConsent.acceptedCategory &&
          CookieConsent.acceptedCategory("marketing")
        ) {
          if (!window.META_PIXEL_INITIALIZED) {
            console.log("Initialisiere Meta Pixel");
            if (ReactPixel) {
              ReactPixel.init(META_PIXEL_ID);
              ReactPixel.pageView();
              window.META_PIXEL_INITIALIZED = true;
            }
          }
        } else {
          console.log("Deaktiviere Meta Pixel");
          window.META_PIXEL_INITIALIZED = false;
          if (ReactPixel && typeof ReactPixel.revokeConsent === "function") {
            ReactPixel.revokeConsent();
          }
        }
      });
    }

    runConsent();
  }, []);

  return null;
}
