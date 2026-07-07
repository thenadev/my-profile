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
   - **Zwei Wege nach dem „Go":** *sofort* (Datum ≤ heute + `draft:false` → beim
     nächsten Deploy live) oder *geplant* (Datum in der Zukunft + `draft:false`).
     Zukünftig datierte Beiträge blendet `getAllPosts()` in Produktion aus und
     ein **täglicher Cron** (04:00 UTC, `.github/workflows/deploy.yml`)
     baut neu, sodass sie am Stichtag automatisch erscheinen (Details unten in
     „Geplante Veröffentlichung"). Für gestaffelte Serien: 7-Tage-Abstand, je
     Beitrag ein Montags-Datum.
2. **Deutsch.** Der Blog ist SEO-seitig DE-only (`canonicalLocale: "de"`, kein
   hreflang); `/en/blog/...` zeigt per Canonical auf die DE-URL. Alle Inhalte
   auf Deutsch, Ton wie der Rest der Seite (Sie/Du je nach Kontext konsistent).
3. **Fakten & Preise konsistent halten.** Zahlen (Website-Preise, Lieferzeiten,
   Stundensatz) müssen zu den Leistungsseiten passen. Quellen im Repo:
   `src/config/website-packages.ts`, `app-packages.ts`, `startup-packages.ts`,
   `src/data/service-faqs.ts`. Keine widersprüchlichen Zahlen erfinden.
4. **Nicht raten – externe Fakten verifizieren.** Aussagen über die Welt
   (Förderprogramme, Gesetze/Fristen, Statistiken, „ab August 2026 gilt …",
   „Zuschuss bis 10.000 €") NICHT aus dem Bauch schreiben. Entweder per
   WebSearch/WebFetch an einer maßgeblichen Quelle belegen – oder weglassen.
   Wo eine Zahl/Frist sich ändern kann, klar als „Stand <Datum>" kennzeichnen
   und zur Prüfung bei der Originalquelle raten; niemals ein konkretes Datum,
   eine Fördersumme oder ein „Antragsfenster" erfinden. Beispiel-Lehre aus der
   Praxis: Der hessische **DIGI-Zuschuss** wurde zunächst mit erfundenem
   „Antragsfenster ab Mai 2026" beschrieben – tatsächlich lief die 2026-Phase
   als Express-Förderung (Zufallsauswahl ab 11.05.2026) und **endete im Juni
   2026**. Solche Angaben immer aktuell prüfen (WIBank / Technologieland Hessen
   / Hessen Digitales). Preise, die noch nicht in den Config-Dateien stehen
   (z. B. ein neuer Chatbot-Integrationspreis), sind Sache des Users – vor dem
   Live-Gang bestätigen lassen, nicht selbst festlegen.
5. **Keine urheberrechtlich geschützten Bilder.** Nur selbst generierte oder
   frei lizenzierte (Unsplash/Pexels). Bild-Vorschläge dem User zeigen, bevor
   eines eingebaut wird.
6. **Slug = Dateiname:** klein, Bindestriche, ohne Umlaute/Klammern.

## Ablauf

### 1. Thema & Substanz
- Falls kein Thema vorgegeben: an Leistungen + Regionalfokus (Wetzlar/Gießen/
  Mittelhessen) und der SEO-Ausrichtung orientieren; die FAQ-Kategorien in
  `service-faqs.ts` sind reichhaltiges Rohmaterial.
- **Keyword-Recherche zuerst** (bei mehreren Beiträgen lohnt je ein Subagent):
  Primär-Keyword + Long-Tails, „People also ask"-Fragen (→ FAQ-Block), SERP-Titel
  (≤ 60 Z.) und Meta. Bei einem Themen-**Cluster** die Keywords gegeneinander
  abgrenzen (Kannibalisierung vermeiden): ein Hub-Artikel für den breiten Begriff,
  Spokes für die spitzen Long-Tails, untereinander verlinkt (Hub ↔ Spokes) und in
  bestehende Cluster (z. B. `webdesign-wetzlar`, `dsgvo-konforme-website`,
  `flutter-vs-react-native-2025`).
- Struktur: aussagekräftige H1/Title, TL;DR (3–4 Punkte), H2/H3-Abschnitte,
  wo sinnvoll eine GFM-Tabelle und Codeblöcke, Fazit mit CTA (`/contact` oder
  passende Leistungsseite). Intern verlinken.
- **Ton humanisieren (eigener Durchgang).** Nach dem Schreiben den Text bewusst
  „ent-KI-en": formelhafte Einleitungen, „nicht X, sondern Y"-Ketten,
  Gedankenstrich-Inflation und Floskeln („Die gute Nachricht:", „Genau das",
  „Seien wir ehrlich") entfernen, Satzlängen variieren, echte Praktiker-Einschübe.
  Frontmatter, Zahlen, Keywords, Links und Codeblöcke dabei zeichengenau lassen.
  Ton wie im restlichen Blog: Sie-Form zum Leser, „ich" für Thomas, ehrlich
  (auch mal „wann es sich NICHT lohnt").

### 2. Markdown-Datei anlegen
`src/content/blog/<slug>.md` mit Frontmatter (Schema siehe
`docs/blog-authoring.md`): `title, date (YYYY-MM-DD), author, description
(120–160 Z.), tldr[], cover, coverAlt, tags[], draft: true`. Body als
Markdown; Bilder per `![alt](/blog/<slug>/bild.png)`.

### 3. Bilder
Bilder liegen unter `public/blog/<slug>/`.

**Titelbild (Cover) – Standard für ALLE Beiträge: echtes Foto + Marken-Overlay.**
Nie ein reines Foto und nie ein reines Grafik-Overlay – immer die Kombination
aus einem passenden Foto als Hintergrund und dem abdunkelnden Marken-Overlay
mit Text darüber. Ablauf:

1. **Passendes, frei lizenziertes Foto** finden (Unsplash/Pexels; erlaubte
   Hosts stehen in `next.config.mjs`). Mehrere Kandidaten in den Scratchpad
   laden (`https://images.unsplash.com/photo-<id>?w=1600&h=900&fit=crop&q=80`),
   dem User per Read-Tool zeigen und **vorschlagen**, ihn wählen lassen.
2. Gewähltes Foto lokal als **`public/blog/<slug>/photo.jpg`** speichern
   (nicht hotlinken) und verkleinern: `sips -Z 1600 --setProperty formatOptions 70 …`.
3. Cover mit der **generischen Vorlage `scripts/blog-cover.html`** rendern
   (Parameter siehe Datei-Kopf: `photo, eyebrow, title (| Umbruch, *x* Akzent),
   pills (a::b oder Label, pipe-getrennt), hl`). Foto liegt lokal → Flag
   `--allow-file-access-from-files`:
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --headless=new --allow-file-access-from-files \
     --screenshot="$(pwd)/public/blog/<slug>/cover.png" \
     --window-size=1200,675 --hide-scrollbars \
     "file://$(pwd)/scripts/blog-cover.html?photo=file://$(pwd)/public/blog/<slug>/photo.jpg&eyebrow=…&title=…&pills=…&hl=1"
   ```
   Query-String URL-encodieren (am einfachsten per Python `urllib.parse`).
4. Nach **JPG** konvertieren (kleiner) und PNG entfernen:
   `sips -s format jpeg -s formatOptions 78 cover.png --out cover.jpg && rm cover.png`.
   Frontmatter `cover: "/blog/<slug>/cover.jpg"`, Ziel < ~200 KB.

Mit dem Read-Tool prüfen: Foto sichtbar, Text lesbar (Overlay dunkelt links ab).

**Inline-Grafiken (Diagramme).** Eigene HTML-Vorlage nach Muster
`scripts/blog-diagram-*.html` (Marken-Gradient `#0b878e → #0f2528`, Akzent
`#2fd6de/#1ab5bd`, Text `#eafaff`, Systemfonts, keine externen Ressourcen),
per Headless-Chrome → PNG rendern (z. B. 1200×520), als `![alt](/blog/<slug>/…)`
einbinden.

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

### 5b. Geplante Veröffentlichung (Datums-Gating + täglicher Cron)
Für gestaffelte Serien muss NICHT jeder Beitrag manuell scharfgeschaltet werden:
- **Mechanik:** `getAllPosts()` in `src/lib/blog.ts` blendet in Produktion
  Beiträge mit `draft:true` **und** solche mit `date` in der Zukunft aus. Ein
  Beitrag mit `draft:false` + Zukunftsdatum ist also committet, aber unsichtbar,
  bis sein Stichtag erreicht ist (gilt auch für Sitemap & Detailseite).
- **Auto-Live:** Die Blog-Detailseiten sind statisch (`generateStaticParams`,
  `dynamicParams=false`) → ein fälliger Beitrag erscheint erst bei einem
  **Rebuild**. Dafür sorgt der `schedule`-Cron in `.github/workflows/deploy.yml`
  (täglich 04:00 UTC). Das `BUILD_DATE`-Build-Arg (Dockerfile) bricht den Docker-Cache,
  sonst würde der Rebuild den fälligen Beitrag verschlucken.
- **Ablauf:** Beiträge mit `draft:false` + Montags-Datum (7-Tage-Raster)
  committen/pushen. Der jeweils fällige geht am Montag von allein live — kein
  weiteres Zutun nötig. Cover/Fotos müssen VOR dem Commit existieren.

## Hinweise
- Push auf `main` benötigt das HTTPS-Remote + gh-Token mit `workflow`-Scope
  (bereits eingerichtet); Deploy-Lauf mit `gh run watch` verfolgen.
- Ein Beitrag pro `.md`-Datei; mit `_` beginnende Dateien (Template) werden
  nicht gerendert.
- Verwandte Notizen: der Blog ist bewusst DE-only; das Theme ist dark-only
  über CSS-Variablen (deshalb rendert der Post via `prose-invert`).
