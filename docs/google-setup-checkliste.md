# Google Analytics, Search Console & Ads – Setup-Checkliste

## Bereits implementiert (Code)

- [x] GA4 mit Measurement ID `G-63C2KDFQHT`
- [x] Google Consent Mode v2 (ad_storage, analytics_storage, ad_user_data, ad_personalization)
- [x] PageViewTracker für SPA-Navigation
- [x] SUBMIT_LEAD_FORM Event bei Kontaktformular-Absendung
- [x] robots.txt (ohne Crawl-delay – wird von Google ignoriert)
- [x] Dynamische Sitemap inkl. Blog-Posts
- [x] metadataBase für OpenGraph/Twitter-Bilder
- [x] JSON-LD Schema (Person, WebSite, ContactPage, Blog)
- [x] GA-ID zentral in `src/config/analytics.ts`

---

## Google Search Console

### 1. Property hinzufügen
- [ ] [search.google.com/search-console](https://search.google.com/search-console) öffnen
- [ ] Property-Typ: **Domain** (empfohlen) oder **URL-Präfix**
- [ ] Domain: `thomas-schwabauer.de` oder `www.thomas-schwabauer.de`

### 2. Verifizierung
- [ ] **Meta-Tag:** In Search Console den Verifizierungscode kopieren
- [ ] In `.env` oder `.env.local` setzen:
  ```
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=dein-verifizierungscode
  ```
- [ ] Alternativ: DNS-TXT-Eintrag (bei Domain-Property)

### 3. Sitemap einreichen
- [ ] In Search Console: **Sitemaps** → Sitemap hinzufügen
- [ ] URL: `https://www.thomas-schwabauer.de/sitemap.xml`
- [ ] Senden

### 4. URL-Prüfung
- [ ] Für wichtige Seiten (/, /contact, /blog, /services/unternehmenswebsite) **URL-Prüfung** ausführen
- [ ] Bei Bedarf **Indexierung beantragen**

---

## Google Analytics 4

### 1. Datenströme prüfen
- [ ] [analytics.google.com](https://analytics.google.com) → Admin → Datenströme
- [ ] Web-Datenstrom für `www.thomas-schwabauer.de` vorhanden
- [ ] Measurement ID stimmt mit `G-63C2KDFQHT` überein

### 2. Conversion-Events
- [ ] **Ereignisse** → SUBMIT_LEAD_FORM als Conversion markieren (falls noch nicht)
- [ ] Weitere Conversions nach Bedarf (z.B. scroll, outbound_click)

### 3. Datenschutz
- [ ] **Admin** → Datenschutzeinstellungen → Einwilligungsmodus prüfen
- [ ] Datenverarbeitung für EWR/UK konfigurieren (falls relevant)

---

## Google Ads

### 1. Verknüpfung mit GA4
- [ ] [ads.google.com](https://ads.google.com) → Tools → Verknüpfte Konten
- [ ] **Google Analytics 4** verknüpfen
- [ ] Richtige GA4-Property auswählen

### 2. Conversion importieren
- [ ] **Tools** → Conversionen → Neue Conversion
- [ ] **Import** → Aus Google Analytics 4
- [ ] Event `SUBMIT_LEAD_FORM` auswählen und als Conversion anlegen

### 3. Conversion-Tracking prüfen
- [ ] Tag Assistant oder GA4 DebugView nutzen
- [ ] Kontaktformular absenden und Event in Echtzeit prüfen

---

## Performance-Optierungen (bereits umgesetzt)

- `metadataBase` für korrekte OG-Image-URLs
- `console.log` aus `sendGoogleEvent` entfernt
- robots.txt bereinigt (Crawl-delay entfernt – von Google ignoriert)
- Sitemap mit dynamischen Blog-Posts
- GA-ID zentralisiert (eine Quelle)

---

## Optionale Verbesserungen

1. **Blog-Posts:** Metadata pro Blog-Post (generateMetadata in `blog/[slug]/page.tsx`)
2. **Core Web Vitals:** Regelmäßig in Search Console prüfen
3. **Google Ads:** Suchbegriffe aus `docs/google-ads-suchbegriffe-lokal.md` nutzen
