"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { cn } from "../lib/utils";

export default function CookieConsent({
  variant = "default",
  demo = false,
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback();
  };

  const decline = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    onDeclineCallback();
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      if (document.cookie.includes("cookieConsent=true")) {
        if (!demo) {
          setIsOpen(false);
          setTimeout(() => {
            setHide(true);
          }, 700);
        }
      }
    } catch (_) {
      // Error handling can go here
    }
  }, []);

  return variant == "default" ? (
    <div
      className={cn(
        "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden"
      )}
    >
      <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">I use cookies on this site</h1>
            <FaCookieBite className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-sm font-normal text-start">
              I use cookies to ensure you have the best possible experience on
              my website. For more details on how these cookies are used, please
              check out my cookie policy.
              <br />
              <br />
              <span className="text-xs">
                By clicking &quot;
                <span className="font-medium opacity-80">Accept</span>&quot;,
                you agree to the use of cookies.
              </span>
              <br />
              <a href="/privacy" className="text-xs underline">
                Learn more.
              </a>
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
            <Button onClick={accept} className="w-full">
              Accept
            </Button>
            <Button onClick={decline} className="w-full" variant="secondary">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    variant == "small" && (
      <div
        className={cn(
          "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
          !isOpen
            ? "transition-[opacity,transform] translate-y-8 opacity-0"
            : "transition-[opacity,transform] translate-y-0 opacity-100",
          hide && "hidden"
        )}
      >
        <div className="m-3 dark:bg-card bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg font-medium">I use cookies</h1>
            <FaCookieBite className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-3 -mt-2">
            <p className="text-sm text-left text-muted-foreground">
              I use cookies to make sure you have the best possible experience
              on my website. For more information, you can check out my cookie
              policy.
            </p>
          </div>
          <div className="p-3 flex items-center gap-2 mt-2 border-t">
            <Button onClick={accept} className="w-full h-9 rounded-full">
              Accept
            </Button>
            <Button
              onClick={decline}
              className="w-full h-9 rounded-full"
              variant="outline"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
