/**
 * Google Consent Mode v2 – Einwilligungsmodus gemäß
 * https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced&hl=de
 *
 * Reihenfolge ist kritisch: consent default VOR config/event.
 */
const GA_MEASUREMENT_ID = "G-63C2KDFQHT";

export default function GoogleConsentScript() {
  return (
    <>
      {/* 1. dataLayer + gtag + Consent Default (VOR allen anderen Google-Tags) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
          `,
        }}
      />
      {/* 2. gtag.js laden */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      {/* 3. GA4 Config + URL-Passthrough + Ads-Data-Redaction */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('set', 'url_passthrough', true);
            gtag('set', 'ads_data_redaction', true);
          `,
        }}
      />
    </>
  );
}
