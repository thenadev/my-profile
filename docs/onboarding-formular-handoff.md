# Handoff: Generisches Kunden-Onboarding-Formular

**Ziel:** Ein mehrstufiges, geführtes Formular, über das Kunden vor Projektbeginn alle
benötigten Angaben und Zugangsdaten selbst übermitteln. Zugangsdaten werden **im Browser
verschlüsselt**, bevor sie den Rechner des Kunden verlassen — der Server sieht sie nie im
Klartext.

**Anlass:** Auftrag „Umstellung E-Mail auf Microsoft 365" für Spedition Ermagan GmbH /
EB Bau GmbH. Die Datenerhebung soll nicht telefonisch laufen, weil Rückfragen-Schleifen
entstehen. Das Formular ist so zu bauen, dass es **pro Kunde über eine Konfigurationsdatei**
definiert wird und für Folgeprojekte ohne Codeänderung wiederverwendbar ist.

---

## 1. Bestehender Stack (Ist-Zustand, nicht ändern)

| Thema | Stand |
|---|---|
| Framework | Next.js 14.2.15, App Router unter `src/app/[locale]/` |
| API-Endpunkte | **Pages Router** unter `src/pages/api/` — bestehendes Muster, siehe `sendEmail.ts` |
| i18n | `next-intl`, Locales `de` (ohne Präfix) / `en`, `localePrefix: "as-needed"` |
| Middleware | `src/middleware.ts` nimmt `/api`, `_next` und alles mit Punkt vom Locale-Routing aus |
| UI | Tailwind + shadcn/ui in `src/components/ui/` (input, checkbox, radio-group, select, form, label, textarea, button, card, dialog vorhanden) |
| Formulare | `react-hook-form` + `zod` + `@hookform/resolvers` — siehe `src/components/services/*-form.tsx` |
| Mailversand | `nodemailer` über STRATO (`smtp.strato.de:465`, `EMAIL_SENDER_ADDR` / `EMAIL_SENDER_PW`) |
| Konfiguration | `src/config/site.ts` (`siteConfig`) |
| Deployment | Docker (`Dockerfile`, `deploy/docker-compose.yml`), GitHub Actions |
| Alias | `@/` → `src/` |

**Konventionen:** Bestehenden Stil übernehmen. Keine neuen Abhängigkeiten außer den unten
genannten. Kommentare nur, wo ein nicht offensichtlicher Grund dahintersteht — kein
Nacherzählen des Codes.

---

## 2. Architekturüberblick

```
Kunde öffnet /onboarding/<token>
   │
   ├─ Token → Kundenkonfiguration (serverseitig aufgelöst, kein Login)
   │
   ├─ Wizard rendert Schritte aus der Konfiguration
   │     ├─ normale Felder  → Klartext im React-State
   │     └─ secret-Felder   → bleiben im State, werden erst beim Absenden verschlüsselt
   │
   ├─ Autosave in localStorage (Key = Token), damit Unterbrechen möglich ist
   │
   ├─ Zusammenfassungsschritt: alles nochmal prüfen (secrets maskiert)
   │
   └─ Absenden
         ├─ Browser: secrets → AES-256-GCM, AES-Key → RSA-OAEP mit Public Key
         ├─ POST /api/onboarding/submit  { token, answers, encryptedSecrets }
         ├─ Server: KEINE Persistenz. Baut zwei Mails:
         │     ├─ an Thomas: Angaben als HTML + `secrets.json` als Anhang (Chiffrat)
         │     └─ an den Kunden: Empfangsbestätigung OHNE Angaben und OHNE Secrets
         └─ Danke-Seite
```

**Kernprinzip:** Der Server ist ein Briefkasten, kein Tresor. Er speichert nichts und kann
die Zugangsdaten nicht entschlüsseln. Der private Schlüssel liegt ausschließlich lokal auf
Thomas' Rechner.

---

## 3. Kundenkonfiguration (der generische Kern)

Jeder Kunde ist eine Datei unter `src/config/onboarding/clients/<slug>.ts`. Das Formular
selbst enthält **keine kundenspezifische Logik**.

### 3.1 Typen — `src/config/onboarding/types.ts`

```ts
export type FieldType =
  | "text" | "email" | "tel" | "textarea"
  | "select" | "radio"
  | "checkboxGroup"   // Mehrfachauswahl mit optionalem Freitext-Feld
  | "repeater"        // dynamische Liste gleichartiger Untergruppen
  | "secret"          // wird clientseitig verschlüsselt
  | "info";           // reiner Hinweistext, keine Eingabe

export interface FieldOption {
  value: string;
  label: string;
  hint?: string;
}

export interface Field {
  id: string;                    // eindeutig innerhalb der Konfiguration
  type: FieldType;
  label: string;
  help?: string;                 // „Warum wir das brauchen" — steht unter dem Feld
  placeholder?: string;
  required?: boolean;
  defaultValue?: unknown;        // Vorbefüllung, siehe 3.3
  options?: FieldOption[];       // select | radio | checkboxGroup
  allowOther?: boolean;          // checkboxGroup: zusätzliches Freitextfeld
  fields?: Field[];              // repeater: Felder je Eintrag
  minItems?: number;             // repeater
  addLabel?: string;             // repeater: Beschriftung des Hinzufügen-Buttons
  visibleIf?: { fieldId: string; equals: unknown };
  validation?: { pattern?: string; minLength?: number; maxLength?: number };
}

export interface Step {
  id: string;
  title: string;
  intro?: string;
  fields: Field[];
}

export interface OnboardingConfig {
  slug: string;
  clientName: string;            // erscheint in Anrede und Mailbetreff
  projectTitle: string;
  contactName?: string;
  intro: string;                 // Text auf der Startseite des Wizards
  steps: Step[];
  expiresAt?: string;            // ISO-Datum; danach 410 statt Formular
  notifyEmail: string;           // Empfänger der Auswertung (i.d.R. siteConfig.contactEmail)
  confirmationTo?: string;       // Feld-ID, aus der die Kunden-Mailadresse gelesen wird
}
```

### 3.2 Token-Auflösung — `src/config/onboarding/index.ts`

- Export `getConfigByToken(token: string): OnboardingConfig | null`
- Zuordnung Token → Slug über eine ENV-Variable, damit Tokens nicht im Git landen:
  `ONBOARDING_TOKENS='{"7f3a…":"ermagan"}'` (JSON-String, serverseitig geparst)
- Token: 32 Zeichen aus `crypto.randomBytes(16).toString("hex")`
- Unbekannter Token → `notFound()`; abgelaufener Token → eigene Seite mit Hinweis

### 3.3 Vorbefüllung

Alles, was bereits bekannt ist, wird über `defaultValue` gesetzt — der Kunde korrigiert und
ergänzt nur. Das ist der wichtigste Hebel gegen falsche und unvollständige Antworten.

---

## 4. Verschlüsselung der Zugangsdaten

### 4.1 Verfahren

Hybrid, ausschließlich mit der Web Crypto API — **kein eigener Algorithmus, keine
Krypto-Bibliothek als Abhängigkeit**:

1. Zufälliger AES-256-GCM-Schlüssel je Absendung (`crypto.subtle.generateKey`)
2. Alle `secret`-Felder als ein JSON-Objekt serialisieren und mit AES-GCM verschlüsseln
   (96-Bit-IV, zufällig je Absendung)
3. Den AES-Schlüssel mit `RSA-OAEP` (SHA-256, 4096 Bit) gegen den öffentlichen Schlüssel
   verschlüsseln
4. Ergebnis als Base64 an den Server schicken

RSA-OAEP direkt auf die Nutzdaten anzuwenden reicht nicht — bei 4096 Bit passen nur rund
446 Byte hinein. Deshalb der Session-Key.

### 4.2 Schlüssel

| Schlüssel | Ort | Regel |
|---|---|---|
| Public Key | `NEXT_PUBLIC_ONBOARDING_PUBLIC_KEY` (SPKI, Base64) | darf im Client-Bundle landen |
| Private Key | ausschließlich lokal bei Thomas, z. B. `~/.config/onboarding/private.pem` | **niemals** im Repo, niemals in `.env` der Website, niemals auf dem Server |

`scripts/onboarding-keygen.mjs` erzeugt das Paar und gibt den Public Key im richtigen Format
für die ENV-Variable aus.

### 4.3 Nutzlast-Format

```json
{
  "v": 1,
  "alg": "RSA-OAEP-256+AES-256-GCM",
  "encryptedKey": "<base64>",
  "iv": "<base64>",
  "ciphertext": "<base64>",
  "createdAt": "2026-09-08T14:22:31.004Z"
}
```

Dieses Objekt geht als Datei `secrets-<slug>-<datum>.json` an die Benachrichtigungsmail.

### 4.4 Entschlüsselung

`scripts/onboarding-decrypt.mjs <datei.json>` — liest den privaten Schlüssel aus einem Pfad
(Argument oder `ONBOARDING_PRIVATE_KEY_PATH`), gibt den Klartext auf stdout aus. Reines
Node-`crypto`, keine Abhängigkeit.

### 4.5 Grenzen offen benennen

Der Public Key kommt aus dem ausgelieferten Bundle. Wer die Website selbst kompromittiert,
kann einen eigenen Schlüssel unterschieben. Das Verfahren schützt gegen Mitlesen auf dem
Transportweg, gegen ein kompromittiertes Postfach und gegen einen kompromittierten Server —
nicht gegen eine manipulierte Auslieferung. Für den Anwendungsfall ist das angemessen und
deutlich besser als Zugangsdaten per Mail. Nicht mehr versprechen, als es leistet.

---

## 5. Anzulegende Dateien

```
src/config/onboarding/types.ts                     Typen aus Abschnitt 3.1
src/config/onboarding/index.ts                     getConfigByToken, Token-Map aus ENV
src/config/onboarding/clients/ermagan.ts           erste Kundenkonfiguration (Abschnitt 7)

src/lib/onboarding/crypto.ts                       encryptSecrets(), Web Crypto, "use client"
src/lib/onboarding/schema.ts                       Zod-Schema je Step aus der Konfiguration
src/lib/onboarding/storage.ts                      localStorage laden/speichern/löschen

src/components/onboarding/OnboardingWizard.tsx     Client-Komponente, Schrittsteuerung
src/components/onboarding/StepRenderer.tsx         rendert Felder eines Schritts
src/components/onboarding/fields/*.tsx             je Feldtyp eine Komponente
src/components/onboarding/SummaryStep.tsx          Zusammenfassung, secrets maskiert
src/components/onboarding/ProgressBar.tsx

src/app/[locale]/onboarding/[token]/page.tsx       Server-Komponente, lädt Config
src/app/[locale]/onboarding/[token]/danke/page.tsx Abschlussseite

src/pages/api/onboarding/submit.ts                 Mailversand, keine Persistenz

scripts/onboarding-keygen.mjs
scripts/onboarding-decrypt.mjs
```

---

## 6. Anforderungen im Detail

### 6.1 Route und Sichtbarkeit

- Liegt unter `[locale]`, damit die bestehende Middleware greift. Deutsche URL bleibt
  `/onboarding/<token>`.
- `export const metadata = { robots: { index: false, follow: false } }`
- Kein Eintrag in Sitemap oder Navigation.
- Die Seite ist eine Server-Komponente, die die Konfiguration lädt und an den Wizard gibt.
  Der Wizard ist `"use client"`.

### 6.2 Wizard-Verhalten

- Fortschrittsanzeige mit Schrittnamen, nicht nur Prozentzahl
- Vor- und Zurück-Navigation; Validierung des aktuellen Schritts beim Weitergehen
- Autosave nach jeder Änderung in `localStorage`, Key `onboarding:<token>`
- Beim Laden: gespeicherten Stand anbieten („Sie waren zuletzt bei Schritt 3"), nicht
  stillschweigend wiederherstellen
- **`secret`-Felder werden nie in localStorage geschrieben** — sie leben nur im
  Komponenten-State der aktuellen Sitzung
- Nach erfolgreichem Absenden: localStorage-Eintrag löschen
- Tastaturbedienbar, sichtbarer Fokus, `aria-describedby` für die Hilfetexte
- Mobil bedienbar — der Kunde füllt das mit hoher Wahrscheinlichkeit am Handy aus

### 6.3 Validierung

- Zod-Schema wird pro Schritt aus der Konfiguration erzeugt
- `required`, `pattern`, `minLength`, `maxLength` werden übernommen
- E-Mail und Telefon mit passenden Basisprüfungen
- Fehlermeldungen sagen, was zu tun ist — keine technischen Meldungen
- `visibleIf`-Felder werden aus dem Schema entfernt, wenn sie nicht sichtbar sind

### 6.4 API `/api/onboarding/submit`

- Nur `POST`, sonst 405
- Body: `{ token, answers, encryptedSecrets }`
- Token serverseitig prüfen; unbekannt oder abgelaufen → 404 bzw. 410
- Payload-Größe begrenzen (z. B. 256 KB), einfache Rate-Begrenzung pro Token
- Zwei Mails über den bestehenden STRATO-Transport aus `sendEmail.ts`:
  - **An `notifyEmail`:** HTML mit allen Angaben, gruppiert nach Schritten, Beschriftungen
    aus der Konfiguration. Anhang `secrets-<slug>-<datum>.json`. Farbschema und Aufbau an
    `sendEmail.ts` anlehnen.
  - **An den Kunden** (Adresse aus `confirmationTo`): reine Empfangsbestätigung mit
    nächstem Schritt. **Keine Angaben, keine Secrets** — die Bestätigung geht über einen
    Kanal, dessen Sicherheit gerade Gegenstand des Projekts ist.
- Kein Schreiben in Datei oder Datenbank. Keine Antwortdaten ins Logging.
- Antwort: `{ ok: true }` oder `{ ok: false, error }` mit sprechendem, nicht technischem Text

### 6.5 Datenschutz

- Am Formularanfang ein kurzer Hinweis: welche Daten, wozu, wie lange, Verweis auf
  `/privacy`
- Kein Tracking auf dieser Route (kein GA4, kein Pixel) — prüfen, ob die bestehende
  Einbindung global lädt, und diese Route ausnehmen
- Keine Persistenz auf dem Server heißt: kein Löschkonzept nötig. Das ist Absicht und soll
  so bleiben.

---

## 7. Erste Kundenkonfiguration: `ermagan.ts`

Inhaltlich abgeleitet aus `Checkliste_Projektstart_Ermagan`. Alle hier genannten Werte sind
belastbar recherchiert und als `defaultValue` zu setzen — der Kunde soll korrigieren und
ergänzen, nicht von Null anfangen.

### 7.0 Stammdaten für die Konfiguration

```
slug:         "ermagan"
clientName:   "Spedition Ermagan GmbH / EB Bau GmbH"
projectTitle: "Umstellung Ihrer E-Mail-Systeme auf Microsoft 365"
contactName:  "Hane Ermagan"
notifyEmail:  siteConfig.contactEmail
```

Anschrift beider Firmen: Falkensteiner Weg 10, 63110 Rodgau.
Handelsregister: Spedition Ermagan GmbH HRB 52276, EB Bau GmbH HRB 56507, beide AG Offenbach
am Main. Zwischenkontakt ist Michael Khoushaba — er ist in keinem Registerauszug als
vertretungsberechtigt geführt, deshalb ist der Ansprechpartner in Schritt 1 ein Pflichtfeld.

Bekannter technischer Ausgangszustand, nur als Kontext für Hilfetexte: Beide Domains liegen
bei IONOS (`mx00/mx01.ionos.de`), DMARC steht auf `p=none` ohne Auswertung, SPF auf Softfail.

### 7.1 Schritt 1 — Firma und Ansprechpartner

| Feld | Typ | Vorbefüllung / Optionen |
|---|---|---|
| Firmenname | text | „Spedition Ermagan GmbH / EB Bau GmbH" |
| Ansprechpartner für das Projekt | text, required | „Hane Ermagan" |
| Telefonnummer für Rückfragen | tel, required | — |
| E-Mail für Rückfragen | email, required | wird für die Empfangsbestätigung genutzt (`confirmationTo`) |

### 7.2 Schritt 2 — E-Mail-Adressen (`repeater`, `minItems: 1`)

Vorbefüllt mit diesen vier Einträgen:

```
finanzen@ermagan-spedition.de   → Zweck: persönlich/Abteilung, genutzt: ja
info@ermagan-spedition.de       → Zweck: Sammeladresse,        genutzt: ja
info@eb-bau-deutschland.de      → Zweck: Sammeladresse,        genutzt: ja
Hane.Ermagan@gmx.de             → Zweck: persönlich,           genutzt: ja
```

Felder je Eintrag: Adresse (email), Zweck (select: persönliches Postfach / Sammeladresse /
nur Weiterleitung / unklar), wird noch genutzt (radio: ja / nein / unklar).

`addLabel`: „Weitere Adresse hinzufügen"
`help`: „Bitte auch selten genutzte Adressen, Aliase und reine Weiterleitungen angeben. Jede
Adresse, die hier fehlt, ist nach der Umstellung nicht mehr erreichbar."

### 7.3 Schritt 3 — Private Adressen im Geschäftsbetrieb

Ein eigener Schritt, nicht mit Schritt 2 vermischt — die Frage zielt auf etwas anderes und
wird sonst überlesen.

| Feld | Typ | Details |
|---|---|---|
| Nutzt jemand eine private Adresse für Geschäftliches? | radio, required | ja / nein / weiß nicht |
| Welche und von wem? | repeater, `visibleIf: ja` | Adresse (text), Person (text), wofür (text) |

`help`: „Zum Beispiel Disponenten oder Fahrer, die von privaten Adressen aus schreiben. Der
Schutz auf den Firmenpostfächern deckt solche Adressen nicht ab — wir klären gemeinsam,
welche davon abgelöst werden sollten."

Die GMX-Adresse der Geschäftsführung ist hier **nicht** erneut zu erfassen; sie ist über
Schritt 2 und Schritt 6 bereits abgedeckt.

### 7.4 Schritt 4 — Personen und Geräte (`repeater`, `minItems: 1`)

Felder je Person: Name (text, required), welche Postfächer bearbeitet die Person
(checkboxGroup mit den Adressen aus 7.2 als Optionen plus `allowOther`), Geräte
(checkboxGroup: Windows-PC, Mac, iPhone, Android-Handy, Tablet), aktuelles Mailprogramm
(select: Outlook / Thunderbird / Apple Mail / nur Webmail im Browser / weiß nicht).

`help`: „Jede Person braucht am Einrichtungstag ihr Handy dabei — ohne das lässt sich der
zweite Faktor nicht aktivieren."

### 7.5 Schritt 5 — Systeme, die selbst E-Mails versenden

`checkboxGroup` mit `allowOther: true`. Optionen jeweils mit `hint`:

| Option | Hinweis |
|---|---|
| TIMOCOM | Frachtenbörse |
| Trans.eu | Frachtenbörse |
| DATEV | Buchhaltung / Steuerberater |
| Lexware | Buchhaltung |
| sevDesk | Buchhaltung / Rechnungen |
| Telematiksystem | Fahrzeugortung, Tourenplanung |
| Drucker mit Scan-to-Mail | scannt Dokumente direkt in eine Mail |
| Kontaktformular der Website | — |
| Zeiterfassung | — |
| Warenwirtschaft / Speditionssoftware | — |

Zusatzfelder in diesem Schritt:
- Ansprechpartner beim jeweiligen Anbieter (textarea) — `help`: „Falls bekannt. Wir brauchen
  ihn nur, wenn die Umstellung eines Systems nicht ohne den Anbieter geht."
- Frei zu ergänzende weitere Systeme (über `allowOther`)

`help` am Schritt: „Das ist der wichtigste Punkt dieses Formulars. Diese Systeme versenden
über den bisherigen Weg und stellen den Versand nach der Umstellung ein, bis sie angepasst
sind. Im Zweifel lieber nennen — zu viel genannt kostet nichts, zu wenig kostet einen
Ausfall."

### 7.6 Schritt 6 — Bestehende Einstellungen, die erhalten bleiben sollen

| Feld | Typ | Details |
|---|---|---|
| Signaturen | radio + textarea `visibleIf: ja` | „Sollen bestehende Signaturen übernommen werden?" |
| Abwesenheitsnotizen | radio | ja / nein / derzeit keine |
| Gemeinsame Kalender oder Kontaktlisten | radio + textarea `visibleIf: ja` | „Werden Kalender oder Kontakte gemeinsam genutzt?" |

`help`: „Damit wir das im neuen System nachbauen können und Sie nichts von Hand
wiederherstellen müssen."

### 7.7 Schritt 7 — Entscheidungen

| Feld | Typ | Optionen |
|---|---|---|
| Neue Geschäftsadresse der Geschäftsführung | radio + Freitext bei „andere" | `hane.ermagan@ermagan-spedition.de`, `h.ermagan@ermagan-spedition.de`, `gf@ermagan-spedition.de`, andere |
| Auf welche Firma läuft der Microsoft-Vertrag? | radio, required | Spedition Ermagan GmbH / EB Bau GmbH / noch unklar |
| Ansprechpartner in der Umstellungswoche | text, required | — |
| Rückrufregel bei Bankverbindungen verbindlich anordnen? | radio, required | ja / möchte ich vorher besprechen |

Hilfetext zur Geschäftsadresse: „Sie ersetzt die bisherige GMX-Adresse und steht künftig auf
Ihren Rechnungen."
Hilfetext zur Vertragsfirma: „Wir richten ein gemeinsames Konto für beide Firmen ein. Die
Rechnung von Microsoft läuft auf eine der beiden GmbHs — die Aufteilung besprechen Sie am
besten kurz mit Ihrer Steuerberatung."
Hilfetext zur Rückrufregel: „Eine geänderte Bankverbindung wird nie per E-Mail akzeptiert,
sondern erst nach Rückruf unter der Nummer aus Ihren Stammdaten. Diese Regel muss von Ihnen
angeordnet werden — sie ist der einzige Schutz, der auch dann greift, wenn nicht Sie, sondern
Ihr Geschäftspartner betroffen ist."

### 7.8 Schritt 8 — Angaben für das Microsoft-Konto

Das Konto wird **von uns angelegt**, nicht vom Kunden. Der Schritt sammelt nur die Angaben,
die dafür gebraucht werden. Keine Verzweigung, kein `visibleIf`.

| Feld | Typ | Details |
|---|---|---|
| USt-IdNr. der Vertragsfirma | text, required | `help`: „Steht auf Ihren Ausgangsrechnungen. Ohne Eintrag stellt Microsoft die Rechnung falsch aus und die Vorsteuer geht verloren." |
| Rechnungsanschrift | textarea, required | vorbefüllt: „Falkensteiner Weg 10, 63110 Rodgau" |
| Kontakt-E-Mail für Microsoft | email, required | `help`: „An diese Adresse schickt Microsoft Bestätigungen und Rechnungen. Bitte **keine** der Adressen, die wir umstellen — sonst sind Sie ausgerechnet während der Umstellung nicht erreichbar." |
| Mobilnummer für die Verifizierung | tel, required | `help`: „Microsoft schickt beim Anlegen einen Bestätigungscode per SMS. Wir melden uns kurz, wenn es so weit ist." |

Die Vertragsfirma selbst wird bereits in Schritt 7 entschieden und ist hier nicht erneut zu
erfragen.

**Zahlungsdaten werden nicht über dieses Formular erhoben.** Kreditkarten- oder
Bankdaten entgegenzunehmen fällt unter PCI-DSS und ist für diesen Anwendungsfall weder nötig
noch verhältnismäßig. Stattdessen ein abschließender `info`-Block: „Die Zahlungsmethode
hinterlegen Sie nach dem Anlegen selbst — wir schicken Ihnen dafür den direkten Link. Wir
sehen Ihre Zahlungsdaten zu keinem Zeitpunkt."

### 7.9 Schritt 9 — Zugangsdaten (`secret`)

Vorangestellter `info`-Block: „Die folgenden Eingaben werden in Ihrem Browser verschlüsselt,
bevor sie diesen Rechner verlassen. Auch wir können sie erst mit unserem privaten Schlüssel
auf unserem eigenen Gerät lesen — auf dem Server und im Postfach liegen sie ausschließlich
verschlüsselt."

| Feld | Typ | Hinweis |
|---|---|---|
| IONOS-Benutzername | secret, required | Zugang zum Kundenkonto |
| IONOS-Passwort | secret, required | — |
| Passwort `finanzen@ermagan-spedition.de` | secret, required | — |
| Passwort `info@ermagan-spedition.de` | secret, required | — |
| Passwort `info@eb-bau-deutschland.de` | secret, required | — |
| GMX-Adresse | secret, required | — |
| GMX-Passwort | secret, required | — |

Die Postfach-Passwörter sind über einen `repeater` mit `secret`-Feldern zu lösen, dessen
Einträge aus den in Schritt 2 genannten Adressen entstehen — sonst ist die Liste für einen
anderen Kunden nicht generisch. Fällt das zu komplex aus, ist eine feste Liste im Config
akzeptabel; dann muss der `repeater`-Typ `secret`-Kinder aber trotzdem unterstützen.

`help` am Schritt: „Wir brauchen die Passwörter, um Ihre bestehenden Mails vollständig zu
übernehmen und nach der Umstellung gegenzuprüfen, dass nichts fehlt. Ohne sie ließe sich der
Bestand nur mit einer Betriebsunterbrechung übertragen."

Nach den GMX-Feldern ein `info`-Block: „Bitte aktivieren Sie in den GMX-Einstellungen unter
‚POP3/IMAP-Abruf' den IMAP-Zugriff. Ohne diese Einstellung können wir Ihre bisherigen Mails
und Kontakte nicht übernehmen."

Abschließender `info`-Block: „Nach Abschluss des Projekts ändern Sie alle hier genannten
Passwörter. Wir löschen unsere Kopie, sobald die Umstellung abgenommen ist."

### 7.10 Was bewusst nicht abgefragt wird

Die Punkte aus Teil E der Checkliste („Was Sie ausdrücklich nicht tun sollten") sind keine
Formularfelder. Sie gehören auf die Abschlussseite nach dem Absenden — insbesondere der
Hinweis, nichts bei IONOS zu kündigen, weil die Domains dort bleiben.

## 8. Abnahmekriterien

- [ ] `/onboarding/<gültiger-token>` rendert den Wizard; unbekannter Token → 404
- [ ] Ein zweiter Kunde lässt sich allein durch eine neue Datei unter `clients/` und einen
      neuen Token-Eintrag anlegen — **ohne Änderung an Komponenten oder API**
- [ ] Alle Feldtypen aus 3.1 sind implementiert und im Ermagan-Config verwendet
- [ ] `visibleIf` blendet Felder korrekt ein und aus, ausgeblendete werden nicht validiert
- [ ] Unterbrechen und später fortsetzen funktioniert; secrets werden dabei **nicht**
      gespeichert
- [ ] Netzwerk-Tab beim Absenden zeigt für die Secret-Felder ausschließlich Base64-Chiffrat,
      keinen Klartext
- [ ] `onboarding-decrypt.mjs` liefert mit dem privaten Schlüssel den Klartext zurück
- [ ] Benachrichtigungsmail enthält alle Angaben lesbar gruppiert plus den JSON-Anhang
- [ ] Kundenbestätigung enthält weder Angaben noch Secrets
- [ ] Serverseitig wird nichts gespeichert und nichts geloggt
- [ ] Seite ist auf `noindex`, kein Tracking aktiv
- [ ] Bedienbar am Handy, Tastaturnavigation und Fokus geprüft
- [ ] `npm run build` läuft ohne neue Warnungen

**Tests** (`@testing-library` ist vorhanden): mindestens Unit-Tests für die Erzeugung des
Zod-Schemas aus der Konfiguration, für `visibleIf` und ein Round-Trip-Test
verschlüsseln → entschlüsseln.

---

## 9. Reihenfolge der Umsetzung

1. Typen, Token-Auflösung, Ermagan-Konfiguration (ohne UI lauffähig prüfbar)
2. Krypto-Utils plus Keygen- und Decrypt-Skript, Round-Trip-Test zuerst
3. Schema-Generator und Feldkomponenten
4. Wizard mit Navigation, Autosave, Zusammenfassung
5. API-Route und Mailaufbau
6. Route, `noindex`, Danke-Seite, Feinschliff mobil

Jeder Schritt ist für sich lauffähig und committbar.
