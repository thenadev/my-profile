import { GOOGLE_ADS_UNDERNEHMENSWEBSITE_ID } from "@/config/analytics";
import Script from "next/script";

export default function UnternehmenswebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Ads (gtag.js) – Seitenaufruf Unternehmenswebsite */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_UNDERNEHMENSWEBSITE_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-unternehmenswebsite" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_UNDERNEHMENSWEBSITE_ID}');
        `}
      </Script>
      {children}
    </>
  );
}
