---
name: blog-artikel
description: >-
  Erstellt einen neuen Blogartikel für thomas-schwabauer.de (Markdown in
  src/content/blog). Nutze diesen Skill, wenn der User einen Blogbeitrag/Blog-
  Artikel schreiben, entwerfen, mit Bildern versehen oder veröffentlichen will
  ("schreib einen Blogpost über X", "neuer Blogartikel", "Beitrag zu …").
  Deckt Recherche-Konsistenz, Frontmatter, Bilder (generiert oder Unsplash),
  lokale Vorschau und den Freigabe-/Deploy-Workflow ab.
---

# Blogartikel erstellen

Blogbeiträge sind Markdown-Dateien unter `src/content/blog/<slug>.md`. Sie
werden statisch gebaut und über die bestehende Pipeline (Push auf `main` →
GitHub Actions → Docker → Server) live gestellt. Vollständige Feld-Referenz:
`docs/blog-authoring.md`. Kopiervorlage: `src/content/blog/_template.md`.

## Eiserne Regeln (aus der Projektpraxis)

1. **Draft zuerst, Live nur nach Go.** Neue Beiträge IMMER mit `draft: true`
   anlegen und NICHT deployen. Erst wenn der User ausdrücklich sein „Go" gibt:
   `draft: false` setzen, committen, pushen. (Entwürfe sind nur in `npm run dev`
   sichtbar, nicht im Produktions-Build.)
2. **Deutsch.** Der Blog ist SEO-seitig DE-only (`canonicalLocale: "de"`, kein
   hreflang); `/en/blog/...` zeigt per Canonical auf die DE-URL. Alle Inhalte
   auf Deutsch, Ton wie der Rest der Seite (Sie/Du je nach Kontext konsistent).
3. **Fakten & Preise konsistent halten.** Zahlen (Website-Preise, Lieferzeiten,
   Stundensatz) müssen zu den Leistungsseiten passen. Quellen im Repo:
   `src/config/website-packages.ts`, `app-packages.ts`, `startup-packages.ts`,
   `src/data/service-faqs.ts`. Keine widersprüchlichen Zahlen erfinden.
4. **Keine urheberrechtlich geschützten Bilder.** Nur selbst generierte oder
   frei lizenzierte (Unsplash/Pexels). Bild-Vorschläge dem User zeigen, bevor
   eines eingebaut wird.
5. **Slug = Dateiname:** klein, Bindestriche, ohne Umlaute/Klammern.

## Ablauf

### 1. Thema & Substanz
- Falls kein Thema vorgegeben: an Leistungen + Regionalfokus (Wetzlar/Gießen/
  Mittelhessen) und der SEO-Ausrichtung orientieren; die FAQ-Kategorien in
  `service-faqs.ts` sind reichhaltiges Rohmaterial.
- Struktur: aussagekräftige H1/Title, TL;DR (3–4 Punkte), H2/H3-Abschnitte,
  wo sinnvoll eine GFM-Tabelle und Codeblöcke, Fazit mit CTA (`/contact` oder
  passende Leistungsseite). Intern verlinken.

### 2. Markdown-Datei anlegen
`src/content/blog/<slug>.md` mit Frontmatter (Schema siehe
`docs/blog-authoring.md`): `title, date (YYYY-MM-DD), author, description
(120–160 Z.), tldr[], cover, coverAlt, tags[], draft: true`. Body als
Markdown; Bilder per `![alt](/blog/<slug>/bild.png)`.

### 3. Bilder
Bilder liegen unter `public/blog/<slug>/`. Zwei bewährte Wege:

**A) On-brand generieren (Cover + erklärende Grafiken).** HTML-Vorlage nach
Muster `scripts/blog-cover-*.html` bzw. `scripts/blog-diagram-*.html`
schreiben (Marken-Gradient `#0b878e → #0f2528`, Akzent `#2fd6de/#1ab5bd`,
Text `#eafaff`, Systemfonts, keine externen Ressourcen). Rendern:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --screenshot="$(pwd)/public/blog/<slug>/cover.png" \
  --window-size=1200,675 --hide-scrollbars \
  "file://$(pwd)/scripts/blog-cover-<name>.html"
```
Danach mit dem Read-Tool ansehen und Maße mit `sips` prüfen. Cover 16:9
(1200×675), Inline-Grafiken z. B. 1200×520.

**B) Frei lizenziertes Foto (Unsplash/Pexels).** Erlaubte Hosts stehen in
`next.config.mjs` unter `images.remotePatterns`. Vorgehen: passende Fotos
per WebSearch/WebFetch finden, mehrere Kandidaten in den Scratchpad laden
(`https://images.unsplash.com/photo-<id>?w=1200&h=675&fit=crop&q=80`), dem
User per Read-Tool zeigen und **vorschlagen**. Nach seiner Wahl das Bild
**lokal** speichern (nicht hotlinken) und auf sinnvolle Größe bringen:
```bash
curl -sL -o public/blog/<slug>/cover.jpg \
  "https://images.unsplash.com/photo-<id>?w=1280&h=720&fit=crop&fm=jpg&q=60"
sips -Z 1280 --setProperty formatOptions 60 public/blog/<slug>/cover.jpg
```
Ziel < ~300 KB. Unsplash-Lizenz: frei, kommerziell, ohne Attributionspflicht.

Rendering, Kontrast (dunkles Theme), TL;DR-Box, Tabellen und Tags werden
zentral in `blog/[slug]/page.tsx` erledigt — pro Beitrag NICHTS an Styling
nötig. `cover` speist auch das og:image (Article-JSON-LD).

### 4. Lokal prüfen (Entwurf)
```bash
npm run build   # Sanity-Check; Entwürfe (draft:true) werden korrekt AUSGESCHLOSSEN
npm run dev -- -p 3058   # Entwürfe sind hier sichtbar
```
Die Draft-Seite per Headless-Chrome screenshotten und mit dem Read-Tool
prüfen (Cover, TL;DR, Überschriften, Tabelle, Bilder). Dann **stoppen und auf
Freigabe warten** — nicht deployen.

### 5. Veröffentlichen (erst nach „Go")
`draft: false` setzen, dann:
```bash
npm run build   # muss grün sein; Beitrag ist jetzt im Output enthalten
git add -A && git commit -m "feat(blog): <Titel> veröffentlichen"
git push origin main   # löst Auto-Deploy aus
```
Nach dem Deploy live prüfen: `https://www.thomas-schwabauer.de/blog/<slug>`
(200, Cover erreichbar, im `/blog`-Listing und in `/sitemap.xml`).

## Hinweise
- Push auf `main` benötigt das HTTPS-Remote + gh-Token mit `workflow`-Scope
  (bereits eingerichtet); Deploy-Lauf mit `gh run watch` verfolgen.
- Ein Beitrag pro `.md`-Datei; mit `_` beginnende Dateien (Template) werden
  nicht gerendert.
- Verwandte Notizen: der Blog ist bewusst DE-only; das Theme ist dark-only
  über CSS-Variablen (deshalb rendert der Post via `prose-invert`).
