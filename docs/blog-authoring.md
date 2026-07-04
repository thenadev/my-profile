# Blogbeiträge erstellen

Der Blog wird aus **Markdown-Dateien** gespeist – eine Datei pro Beitrag unter
`src/content/blog/<slug>.md`. Kein CMS, keine Datenbank: schreiben, committen,
pushen → der bestehende Deploy (GitHub Actions → Docker → Server) baut den
Beitrag statisch und stellt ihn live.

## Neuen Beitrag per Prompt erstellen

Beispiel-Prompt an Claude:

> „Erstelle einen neuen Blogpost über **\<Thema\>** nach `docs/blog-authoring.md`.
> Zielgruppe: \<z.B. lokale Unternehmen / Gründer\>. Tonfall: deutsch, wie der
> Rest der Seite. Lege die Datei unter `src/content/blog/<slug>.md` an, erzeuge
> ein Cover und setze `draft: false`, wenn er veröffentlicht werden soll.“

Claude erstellt dann die `.md`-Datei (Frontmatter + Body), legt Bilder unter
`public/blog/<slug>/` ab, baut lokal (`npm run build`) und committet/pusht auf
Wunsch.

## Frontmatter-Felder

| Feld          | Pflicht | Beschreibung                                                        |
| ------------- | ------- | ------------------------------------------------------------------- |
| `title`       | ja      | Titel (prägnant, Hauptkeyword vorne). Wird zu `<h1>` + `<title>`.   |
| `date`        | ja      | `"YYYY-MM-DD"`. Bestimmt Sortierung und `datePublished` (JSON-LD).  |
| `author`      | nein    | Default „Thomas Schwabauer“.                                        |
| `description` | ja      | Meta-Description, 120–160 Zeichen. Fällt sonst auf Textanfang zurück.|
| `tldr`        | nein    | Liste von Kernaussagen → TLDR-Box oben im Beitrag.                  |
| `cover`       | nein    | Pfad zum Titelbild, z.B. `/blog/<slug>/cover.png` (16:9 empfohlen). |
| `coverAlt`    | nein    | Alt-Text des Titelbilds (A11y/SEO).                                 |
| `tags`        | nein    | Themen-Tags → Badges auf Liste und Beitrag.                         |
| `draft`       | nein    | `true` = nur in `npm run dev` sichtbar, nicht in Produktion.        |

## Konventionen

- **Slug = Dateiname.** Klein, mit Bindestrichen, ohne Umlaute/Klammern
  (z.B. `webdesign-kosten-2026.md`). Ändert man ihn nach Veröffentlichung,
  ändert sich die URL – dann ggf. Redirect in `next.config.mjs` ergänzen.
- **Sprache Deutsch.** Der Blog ist SEO-seitig auf Deutsch ausgelegt
  (`canonicalLocale: "de"`, kein hreflang); `/en/blog/...` zeigt per Canonical
  auf die deutsche URL.
- **Bilder:**
  - Lokal unter `public/blog/<slug>/…` ablegen und als `/blog/<slug>/…`
    referenzieren (bevorzugt – kein Copyright-/Ladezeit-Risiko).
  - Remote nur von frei lizenzierten Quellen; erlaubte Hosts stehen in
    `next.config.mjs` unter `images.remotePatterns` (aktuell Unsplash, Pexels).
    Bei neuer Quelle dort ergänzen. Keine urheberrechtlich geschützten Bilder.
  - Cover on-brand generieren: HTML-Vorlage nach Muster
    `scripts/blog-cover-flutter.html`, dann per Headless-Chrome rendern
    (Kommando steht im Kopf der Vorlage). 16:9, z.B. 1200×675.
- **Body-Markdown:** `##`/`###` für Struktur, GFM-Tabellen, Codeblöcke mit
  Sprach-Tag (Highlighting via rehype-highlight), Bilder per `![alt](pfad)`.
- **Kopiervorlage:** `src/content/blog/_template.md` (wird nicht gerendert, da
  mit `_` beginnend).

## Lokal prüfen

```bash
npm run dev      # Entwürfe (draft: true) sichtbar
npm run build    # Produktions-Build; nur draft:false-Beiträge
```

Der Beitrag erscheint unter `/blog` (Karte) und `/blog/<slug>` (Detailseite mit
Cover, TLDR-Box, Überschriften, Tabellen, Code) und wird automatisch in
Sitemap und Artikel-JSON-LD aufgenommen.
