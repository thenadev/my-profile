# Onboarding-Formular: Betrieb

Das Formular unter `/onboarding/<token>` sammelt vor Projektbeginn Angaben und
Zugangsdaten. Zugangsdaten werden im Browser des Kunden verschlüsselt; der Server
speichert nichts und kann sie nicht lesen.

## 1. Schlüsselpaar erzeugen (einmalig)

```bash
node scripts/onboarding-keygen.mjs
```

- Schreibt den privaten Schlüssel nach `~/.config/onboarding/private.pem` (Modus 600).
  Ein anderer Pfad geht als Argument, `--force` überschreibt einen vorhandenen Schlüssel.
- Gibt auf stdout die Zeile `ONBOARDING_PUBLIC_KEY=…` aus — genau so in die
  Server-ENV übernehmen.
- **Der private Schlüssel bleibt lokal.** Nicht ins Repo, nicht auf den Server,
  nicht in ein Backup, das jemand anderes lesen kann. Ohne ihn sind alle bereits
  übermittelten Zugangsdaten unwiederbringlich verloren; mit ihm kann jeder sie lesen.

## 2. Token erzeugen

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

32 Hex-Zeichen, andere Formate weist die Auflösung ab.

## 3. Kunden anlegen

Zwei Schritte, kein Code an Komponenten, Token-Auflösung oder API:

1. Datei `src/config/onboarding/clients/<slug>.ts` anlegen, die eine
   `OnboardingConfig` als **Default-Export** liefert (Vorlage: `ermagan.ts`).
   Dateiname und `slug` in der Konfiguration müssen übereinstimmen; erlaubt sind
   Kleinbuchstaben, Ziffern und Bindestriche.
2. Token → Slug in der Server-ENV ergänzen (siehe unten).

`npm test` prüft danach automatisch, dass Feld-IDs eindeutig sind und alle
`visibleIf`-, `optionsFrom`-, `itemsFrom`- und `confirmationTo`-Verweise
existieren.

## 4. ENV auf dem Server

In `/opt/docker/my-profile/.env`:

```
ONBOARDING_TOKENS={"<token>":"<slug>"}
ONBOARDING_PUBLIC_KEY=<Base64 aus Schritt 1>
```

- `ONBOARDING_TOKENS` ist ein JSON-Objekt als String; mehrere Kunden stehen als
  weitere Einträge darin.
- Beide Variablen werden zur Laufzeit gelesen — nach einer Änderung reicht ein
  Neustart des Containers, kein neuer Build.
- Fehlt `ONBOARDING_PUBLIC_KEY`, zeigt die Seite einen Hinweis und nimmt keine
  Eingaben entgegen. Ein unbekanntes Token liefert 404.

## 5. Zugangsdaten entschlüsseln

Die Benachrichtigungsmail enthält den Anhang `secrets-<slug>-<datum>.json`.

```bash
node scripts/onboarding-decrypt.mjs secrets-ermagan-2026-09-08.json
```

Ein abweichender Schlüsselpfad geht als zweites Argument oder über
`ONBOARDING_PRIVATE_KEY_PATH`. Ausgabe ist der Klartext als JSON auf stdout —
also nicht in eine Datei umleiten, die liegen bleibt.

## 6. Grenzen des Verfahrens

- **Manipulierte Auslieferung.** Der öffentliche Schlüssel kommt vom Server.
  Wer die Website selbst kompromittiert, kann einen eigenen Schlüssel
  unterschieben. Das Verfahren schützt gegen Mitlesen auf dem Transportweg,
  gegen ein kompromittiertes Postfach und gegen einen kompromittierten Server —
  nicht gegen eine manipulierte Auslieferung.
- **Das Token steht in der URL.** Es landet damit in Zugriffslogs, im
  Browserverlauf und potenziell im Referrer. Wer es kennt, kann das Formular
  öffnen und absenden. Es ist ein Zugangsschlüssel auf Zeit, kein Login: Link
  nicht öffentlich teilen, nach Projektabschluss aus `ONBOARDING_TOKENS`
  entfernen und bei Bedarf `expiresAt` in der Konfiguration setzen.
- **Die Tracking-Ausnahme greift sicher nur beim direkten Aufruf.** Wer den Link
  öffnet, lädt die Seite vollständig — Analytics und Tag Manager werden dabei gar
  nicht erst eingebunden. Navigiert dagegen jemand innerhalb der Website per Link
  ins Formular, bleibt ein bereits geladener Tag Manager im Speicher und dessen
  eigene Trigger könnten die Formular-URL sehen. Kunden bekommen den Link direkt,
  deshalb ist das hinnehmbar — die Route aber nicht aus der Navigation heraus
  verlinken.
- **Kein Löschkonzept auf dem Server**, weil dort nichts gespeichert wird. Der
  Zwischenstand liegt ausschließlich im localStorage des Kunden (ohne
  Zugangsdaten) und wird nach dem Absenden gelöscht.
- **Die Kopie im Postfach.** Nach dem Entschlüsseln liegen die Zugangsdaten im
  Klartext auf dem eigenen Rechner. Nach Projektabschluss löschen und den Kunden
  daran erinnern, alle genannten Passwörter zu ändern.
- **Die Rate-Begrenzung ist prozesslokal** (5 Absendungen je Token und 10
  Minuten). Bei mehreren Instanzen zählt jede für sich.
