# Redaktionsplan — KI-Cluster (Q3/2026)

Stand: 06.07.2026. Vier Artikel als thematischer Silo rund um KI, gestaffelt
veröffentlicht. Hub-Artikel (1) zuerst, danach drei Vertiefungen. Interne
Verlinkung: Hub → alle Spokes, Spokes → Hub + bestehende Cluster
(Handwerker, DSGVO, Flutter, Kosten).

Veröffentlichung: **Weg B** (Auto-Datums-Gating). Beiträge mit `draft:false` +
Zukunftsdatum werden in Produktion ausgeblendet und per täglichem Cron
(04:00 UTC, `.github/workflows/deploy.yml`) am Stichtag automatisch live
gestellt. Mechanik: Datums-Filter in `src/lib/blog.ts` + `BUILD_DATE`-Cache-Buster.

| # | Slug | Termin | Rolle |
|---|------|--------|-------|
| 1 | `ki-fuer-kleine-unternehmen-mittelhessen` | 13.07.2026 | Hub (informational + lokal) |
| 2 | `ki-chatbot-website-kleine-unternehmen`   | 20.07.2026 | Spoke (commercial) |
| 3 | `website-mit-ki-erstellen-lassen`         | 27.07.2026 | Spoke (trust/USP) |
| 4 | `app-mit-ki-entwickeln-2026`              | 03.08.2026 | Spoke (info + commercial) |

---

## Artikel 1 — KI für kleine Unternehmen (Hub)

- **Primär-Keyword:** „KI für kleine Unternehmen" + lokal (Mittelhessen/Wetzlar/Hessen).
  Kopf-Term hoch umkämpft (HubSpot, Salesforce, IHK), lokale Nische praktisch leer.
- **SERP-Titel:** „KI für kleine Unternehmen in Mittelhessen – 7 Ideen" (51)
- **Meta:** KI für kleine Unternehmen: 7 praktische Anwendungen für KMU in
  Mittelhessen – vom Chatbot bis zur Buchhaltung. Kosten, Einstieg & Hessen-Förderung erklärt.
- **Sekundär:** KI Anwendungen KMU · KI im Mittelstand Beispiele · was bringt KI ·
  KI Kosten/lohnt sich · KI im Handwerk · KI Förderung Hessen (DIGI-Zuschuss) · KI einführen.
- **H2-Gliederung:** 1) Warum KI jetzt auch für KMU in Mittelhessen relevant ist ·
  2) 7 praktische Anwendungen (H3 je: Chatbot, Angebots-/Texterstellung, Marketing,
  Buchhaltung/Belege, Terminplanung, Wissensdatenbank/FAQ, Bild-/Datenanalyse) ·
  3) Was bringt KL – Nutzen & Zeitersparnis · 4) Was kostet KI / lohnt sich (ROI) ·
  5) KI im Handwerk & lokalen Gewerbe · 6) In 3 Schritten starten (+DSGVO) ·
  7) Förderung in Hessen: DIGI-Zuschuss (lokaler USP!) · 8) FAQ · 9) Fazit + CTA.
- **USP-Hebel:** DIGI-Zuschuss Hessen (bis 10.000 €, bis 50 %, Betriebsstätte
  Hessen). WICHTIG (verifiziert): 2026-Phase lief als Express-Förderung und
  endete im Juni 2026 — im Artikel korrekt als „ausgelaufen, Stand prüfen"
  formuliert, NICHT als offenes Antragsfenster. Siehe „nicht raten"-Regel im Skill.
- **Reserviert (nicht in Spokes):** breite KI-KMU-Terms, lokale Keywords.

## Artikel 2 — KI-Chatbot für die Website (commercial)

- **Primär-Keyword:** „KI-Chatbot Website kleine Unternehmen" / „…lohnt sich".
  Lücke: ehrliche Kosten/Nutzen-Sicht aus Berater-Perspektive statt Tool-Verkauf.
- **SERP-Titel:** „KI-Chatbot für kleine Unternehmen: Lohnt sich das?" (49)
- **Meta:** KI-Chatbot für die Website: Was er kleine Unternehmen kostet, wann er
  sich lohnt und was DSGVO & EU AI Act verlangen — ehrlich erklärt.
- **Sekundär:** Chatbot Kosten KMU · Chatbot einbinden · Vor-/Nachteile · DSGVO ·
  wann lohnt sich ein Chatbot · Chatbot für Handwerker/lokale Betriebe.
- **H2-Gliederung:** 1) Was ein KI-Chatbot heute kann · 2) Wann er sich lohnt –
  und wann nicht · 3) Was er kostet (Preistabelle) · 4) ROI ehrlich · 5) Vor-/
  Nachteile · 6) DSGVO & EU AI Act (Kennzeichnungspflicht ab Aug. 2026) ·
  7) Selbst einbinden oder machen lassen · 8) Praxisbeispiel Mittelhessen + CTA.
- **Frische-Aspekt:** EU-AI-Act-Kennzeichnungspflicht ab August 2026.
- **Verlinkung:** ← Artikel 1 (Hub); → Artikel 3 (bei „machen lassen"), → 4 (dezent).

## Artikel 3 — Website mit KI erstellen lassen (trust/USP)

- **Primär-Keyword:** „Website mit KI erstellen lassen" (Beauftragungs-Intention),
  semantisch flankiert von „KI-gestützte Softwareentwicklung".
- **SERP-Titel:** „Website mit KI erstellen lassen: schneller & günstiger" (54)
- **Meta:** Website oder Software mit KI erstellen lassen? Ich zeige, wie ein
  KI-gestützter Entwicklungsprozess Projekte schneller und fairer im Preis macht.
- **Sekundär:** Software entwickeln lassen mit KI · schneller entwickeln · KI
  Website Freelancer · Vorteile · günstiger entwickeln · KI Website Nachteile/Qualität.
- **H2-Gliederung:** 1) Was heißt KI-gestützte Softwareentwicklung · 2) KI-Prozess
  vs. KI-Baukasten · 3) Warum schneller (30–50 %) · 4) Warum günstiger ohne
  Qualitätsverlust · 5) Wo KI hilft, wo Handwerk entscheidet · 6) Qualität &
  Sicherheit: kein „Vibe Coding" (Einwandbehandlung) · 7) Was das konkret bedeutet ·
  8) FAQ · 9) Fazit + CTA.
- **Abgrenzung zu 4:** KI als Werkzeug des Entwicklers (Prozess), NICHT KI-Feature im Produkt.
- **Verlinkung:** ← Artikel 1; → Was kostet eine Website, Services-Seite.

## Artikel 4 — Apps mit KI entwickeln 2026 (info + commercial)

- **Primär-Keyword:** „App mit KI entwickeln" + „KI in App integrieren".
  Bewusst „entwickeln" statt „erstellen/bauen" (Letzteres = No-Code-Builder-Intention).
- **SERP-Titel:** „App mit KI entwickeln 2026: Was geht – was ist Hype" (52)
- **Meta:** App mit KI entwickeln 2026: Welche KI-Features wirklich lohnen, was
  LLM-Integration & API-Kosten bedeuten – und was reiner Hype ist. Ehrlich erklärt.
- **Sekundär:** KI-App entwickeln lassen · KI in App integrieren · Kosten · LLM
  API Kosten · ChatGPT in App integrieren · lokale KI vs Cloud DSGVO.
- **H2-Gliederung:** 1) KI-App vs. KI-Feature · 2) Welche KI-Features realistisch
  möglich · 3) LLM-Integration per API · 4) Kosten (Entwicklung + laufende API) ·
  5) Cloud vs. On-Device & DSGVO · 6) Was 2026 nur Hype ist · 7) Empfehlung je
  Projekt (Format wie Flutter vs. RN) · 8) Fazit + CTA.
- **Abgrenzung zu 3:** KI als Funktion im Endprodukt, NICHT im Entwicklungsprozess.
- **Verlinkung:** ← Artikel 1; → Flutter-App entwickeln lassen, MVP, Artikel 3.

---

## Pipeline pro Artikel
Keyword-Recherche (erledigt) → optimiert schreiben (nach blog-artikel-Skill) →
Humanisieren (Anti-KI-Ton) → als `draft: true` ablegen + lokale Vorschau →
Review durch Thomas → „Go" → `draft: false` + Push am Termin.

---

# Lokale Zwischen-Artikel (nicht-KI, Local Traffic)

Zwischen die KI-Montage gestreut (Donnerstage), um den KI-Fokus auszubalancieren
und lokalen Besucher-Traffic zu gewinnen. Gewählt nach Research: A, B, D.
Kein Beitrag optimiert auf „Wetzlar" (gehört `webdesign-wetzlar`); Kosten nur
ortsgebunden + Verweis auf `was-kostet-eine-website-2026`. Alle untereinander +
mit `webdesign-wetzlar` als Hub verlinken.

| Slug | Termin | Primär-Keyword | Rolle |
|---|---|---|---|
| `firma-bei-google-nicht-gefunden` | 2026-07-16 | unternehmen bei google nicht gefunden | Local-SEO Troubleshooting |
| `website-erstellen-lassen-giessen` | 2026-07-23 | Website erstellen lassen Gießen | Orts-Keyword (größter Nachbarmarkt) |
| `google-unternehmensprofil-optimieren-mittelhessen` | 2026-07-30 | google unternehmensprofil optimieren | Local-SEO How-to |

Gesamtkalender: 13.07 KI-Hub · 16.07 A · 20.07 KI-Chatbot · 23.07 B ·
27.07 KI-Website · 30.07 D · 03.08 KI-Apps.
