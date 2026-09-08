import { siteConfig } from "@/config/site";
import type { OnboardingConfig } from "../types";

const BILLING_ADDRESS = "Falkensteiner Weg 10, 63110 Rodgau";

// Default-Export und Dateiname sind der Vertrag: Die Token-Auflösung lädt die
// Datei allein anhand des Slugs, ohne dass sie irgendwo eingetragen werden muss.
const ermaganConfig: OnboardingConfig = {
  slug: "ermagan",
  clientName: "Spedition Ermagan GmbH / EB Bau GmbH",
  projectTitle: "Umstellung Ihrer E-Mail-Systeme auf Microsoft 365",
  contactName: "Hane Ermagan",
  notifyEmail: siteConfig.contactEmail,
  confirmationTo: "contactEmail",
  confirmationText:
    "Ich prüfe Ihre Angaben und melde mich innerhalb von zwei Werktagen mit einem Terminvorschlag für die Umstellungswoche.",
  intro:
    "Damit die Umstellung ohne Ausfall läuft, brauche ich vorab ein vollständiges Bild Ihrer heutigen E-Mail-Landschaft. Viele Angaben habe ich schon vorbereitet — bitte prüfen und ergänzen Sie sie. Sie können jederzeit unterbrechen und später am selben Gerät weitermachen.",
  steps: [
    {
      id: "firma",
      title: "Firma und Ansprechpartner",
      intro:
        "Wer ist während des Projekts mein fester Ansprechpartner? Über diese Angaben kläre ich alle Rückfragen.",
      fields: [
        {
          id: "companyName",
          type: "text",
          label: "Firmenname",
          defaultValue: "Spedition Ermagan GmbH / EB Bau GmbH",
        },
        {
          id: "contactPerson",
          type: "text",
          label: "Ansprechpartner für das Projekt",
          required: true,
          defaultValue: "Hane Ermagan",
          help: "Diese Person entscheidet im Projekt und wird von mir bei Rückfragen zuerst angerufen.",
        },
        {
          id: "contactPhone",
          type: "tel",
          label: "Telefonnummer für Rückfragen",
          required: true,
          placeholder: "z. B. 06106 1234567",
        },
        {
          id: "contactEmail",
          type: "email",
          label: "E-Mail für Rückfragen",
          required: true,
          help: "An diese Adresse schicke ich die Bestätigung, dass Ihre Angaben angekommen sind.",
        },
      ],
    },
    {
      id: "adressen",
      title: "E-Mail-Adressen",
      intro:
        "Bitte listen Sie alle E-Mail-Adressen Ihrer beiden Firmen auf — auch selten genutzte.",
      fields: [
        {
          id: "mailAddresses",
          type: "repeater",
          label: "E-Mail-Adressen",
          minItems: 1,
          addLabel: "Weitere Adresse hinzufügen",
          help: "Bitte auch selten genutzte Adressen, Aliase und reine Weiterleitungen angeben. Jede Adresse, die hier fehlt, ist nach der Umstellung nicht mehr erreichbar.",
          fields: [
            {
              id: "mailAddress",
              type: "email",
              label: "Adresse",
              required: true,
            },
            {
              id: "mailPurpose",
              type: "select",
              label: "Zweck",
              options: [
                { value: "personal", label: "Persönliches Postfach" },
                { value: "shared", label: "Sammeladresse" },
                { value: "forward", label: "Nur Weiterleitung" },
                { value: "unclear", label: "Unklar" },
              ],
            },
            {
              id: "mailInUse",
              type: "radio",
              label: "Wird noch genutzt",
              options: [
                { value: "yes", label: "Ja" },
                { value: "no", label: "Nein" },
                { value: "unclear", label: "Unklar" },
              ],
            },
          ],
          defaultValue: [
            {
              mailAddress: "finanzen@ermagan-spedition.de",
              mailPurpose: "personal",
              mailInUse: "yes",
            },
            {
              mailAddress: "info@ermagan-spedition.de",
              mailPurpose: "shared",
              mailInUse: "yes",
            },
            {
              mailAddress: "info@eb-bau-deutschland.de",
              mailPurpose: "shared",
              mailInUse: "yes",
            },
            {
              mailAddress: "Hane.Ermagan@gmx.de",
              mailPurpose: "personal",
              mailInUse: "yes",
            },
          ],
        },
        {
          id: "ionosCheckHint",
          type: "info",
          label:
            "Zur Sicherheit gleiche ich diese Liste mit den bei IONOS angelegten Postfächern und Weiterleitungen ab. Fehlt dort etwas oder taucht bei IONOS eine Adresse auf, die hier nicht steht, frage ich vor der Umstellung bei Ihnen nach.",
        },
      ],
    },
    {
      id: "private-adressen",
      title: "Private Adressen im Geschäftsbetrieb",
      intro:
        "Zum Beispiel Disponenten oder Fahrer, die von privaten Adressen aus schreiben. Der Schutz auf den Firmenpostfächern deckt solche Adressen nicht ab — ich kläre mit Ihnen, welche davon abgelöst werden sollten.",
      fields: [
        {
          id: "privateAddressesUsed",
          type: "radio",
          label: "Nutzt jemand eine private Adresse für Geschäftliches?",
          required: true,
          options: [
            { value: "yes", label: "Ja" },
            { value: "no", label: "Nein" },
            { value: "unknown", label: "Weiß nicht" },
          ],
        },
        {
          id: "privateAddresses",
          type: "repeater",
          label: "Welche und von wem?",
          minItems: 1,
          addLabel: "Weitere private Adresse hinzufügen",
          visibleIf: { fieldId: "privateAddressesUsed", equals: "yes" },
          fields: [
            {
              id: "privateAddress",
              type: "text",
              label: "Adresse",
            },
            {
              id: "privateAddressPerson",
              type: "text",
              label: "Person",
            },
            {
              id: "privateAddressUsage",
              type: "text",
              label: "Wofür",
            },
          ],
        },
      ],
    },
    {
      id: "personen",
      title: "Personen und Geräte",
      intro:
        "Jede Person braucht am Einrichtungstag ihr Handy dabei — ohne das lässt sich der zweite Faktor nicht aktivieren.",
      fields: [
        {
          id: "people",
          type: "repeater",
          label: "Personen",
          minItems: 1,
          addLabel: "Weitere Person hinzufügen",
          fields: [
            {
              id: "personName",
              type: "text",
              label: "Name",
              required: true,
            },
            {
              id: "personMailboxes",
              type: "checkboxGroup",
              label: "Welche Postfächer bearbeitet die Person?",
              optionsFrom: {
                fieldId: "mailAddresses",
                itemField: "mailAddress",
              },
              allowOther: true,
              help: "Die Auswahl stammt aus den Adressen, die Sie im vorherigen Schritt angegeben haben.",
            },
            {
              id: "personDevices",
              type: "checkboxGroup",
              label: "Geräte",
              options: [
                { value: "windows", label: "Windows-PC" },
                { value: "mac", label: "Mac" },
                { value: "iphone", label: "iPhone" },
                { value: "android", label: "Android-Handy" },
                { value: "tablet", label: "Tablet" },
              ],
            },
            {
              id: "personMailClient",
              type: "select",
              label: "Aktuelles Mailprogramm",
              options: [
                { value: "outlook", label: "Outlook" },
                { value: "thunderbird", label: "Thunderbird" },
                { value: "apple-mail", label: "Apple Mail" },
                { value: "webmail", label: "Nur Webmail im Browser" },
                { value: "unknown", label: "Weiß nicht" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "systeme",
      title: "Systeme, die selbst E-Mails versenden",
      intro:
        "Das ist der wichtigste Punkt dieses Formulars. Diese Systeme versenden über den bisherigen Weg und stellen den Versand nach der Umstellung ein, bis sie angepasst sind. Im Zweifel lieber nennen — zu viel genannt kostet nichts, zu wenig kostet einen Ausfall.",
      fields: [
        {
          id: "sendingSystems",
          type: "checkboxGroup",
          label: "Welche Systeme versenden E-Mails in Ihrem Namen?",
          allowOther: true,
          options: [
            { value: "timocom", label: "TIMOCOM", hint: "Frachtenbörse" },
            { value: "trans-eu", label: "Trans.eu", hint: "Frachtenbörse" },
            {
              value: "datev",
              label: "DATEV",
              hint: "Buchhaltung / Steuerberater",
            },
            { value: "lexware", label: "Lexware", hint: "Buchhaltung" },
            {
              value: "sevdesk",
              label: "sevDesk",
              hint: "Buchhaltung / Rechnungen",
            },
            {
              value: "telematik",
              label: "Telematiksystem",
              hint: "Fahrzeugortung, Tourenplanung",
            },
            {
              value: "scan-to-mail",
              label: "Drucker mit Scan-to-Mail",
              hint: "scannt Dokumente direkt in eine Mail",
            },
            { value: "website-form", label: "Kontaktformular der Website" },
            { value: "zeiterfassung", label: "Zeiterfassung" },
            {
              value: "warenwirtschaft",
              label: "Warenwirtschaft / Speditionssoftware",
            },
          ],
        },
        {
          id: "systemContacts",
          type: "textarea",
          label: "Ansprechpartner beim jeweiligen Anbieter",
          help: "Falls bekannt. Ich brauche ihn nur, wenn die Umstellung eines Systems nicht ohne den Anbieter geht.",
        },
      ],
    },
    {
      id: "einstellungen",
      title: "Bestehende Einstellungen, die erhalten bleiben sollen",
      intro:
        "Damit ich das im neuen System nachbauen kann und Sie nichts von Hand wiederherstellen müssen.",
      fields: [
        {
          id: "keepSignatures",
          type: "radio",
          label: "Sollen bestehende Signaturen übernommen werden?",
          options: [
            { value: "yes", label: "Ja" },
            { value: "no", label: "Nein" },
          ],
        },
        {
          id: "signatureDetails",
          type: "textarea",
          label: "Welche Signaturen und für wen?",
          visibleIf: { fieldId: "keepSignatures", equals: "yes" },
        },
        {
          id: "autoReplies",
          type: "radio",
          label: "Gibt es Abwesenheitsnotizen?",
          options: [
            { value: "yes", label: "Ja" },
            { value: "no", label: "Nein" },
            { value: "none", label: "Derzeit keine" },
          ],
        },
        {
          id: "sharedCalendars",
          type: "radio",
          label: "Werden Kalender oder Kontakte gemeinsam genutzt?",
          options: [
            { value: "yes", label: "Ja" },
            { value: "no", label: "Nein" },
          ],
        },
        {
          id: "sharedCalendarDetails",
          type: "textarea",
          label: "Welche Kalender oder Kontaktlisten und von wem?",
          visibleIf: { fieldId: "sharedCalendars", equals: "yes" },
        },
      ],
    },
    {
      id: "entscheidungen",
      title: "Entscheidungen",
      fields: [
        {
          id: "executiveAddress",
          type: "radio",
          label: "Neue Geschäftsadresse der Geschäftsführung",
          help: "Sie ersetzt die bisherige GMX-Adresse und steht künftig auf Ihren Rechnungen.",
          options: [
            {
              value: "hane.ermagan",
              label: "hane.ermagan@ermagan-spedition.de",
            },
            { value: "h.ermagan", label: "h.ermagan@ermagan-spedition.de" },
            { value: "gf", label: "gf@ermagan-spedition.de" },
            { value: "other", label: "Andere" },
          ],
        },
        {
          id: "executiveAddressOther",
          type: "text",
          label: "Gewünschte Adresse",
          visibleIf: { fieldId: "executiveAddress", equals: "other" },
        },
        {
          id: "contractCompany",
          type: "radio",
          label: "Auf welche Firma läuft der Microsoft-Vertrag?",
          required: true,
          help: "Ich richte ein gemeinsames Konto für beide Firmen ein. Die Rechnung von Microsoft läuft auf eine der beiden GmbHs — die Aufteilung besprechen Sie am besten kurz mit Ihrer Steuerberatung.",
          options: [
            { value: "ermagan", label: "Spedition Ermagan GmbH" },
            { value: "eb-bau", label: "EB Bau GmbH" },
            { value: "unclear", label: "Noch unklar" },
          ],
        },
        {
          id: "switchWeekContact",
          type: "text",
          label: "Ansprechpartner in der Umstellungswoche",
          required: true,
          help: "Diese Person ist in der Umstellungswoche tagsüber erreichbar und kann kurzfristig entscheiden.",
        },
        {
          id: "callbackRule",
          type: "radio",
          label: "Rückrufregel bei Bankverbindungen verbindlich anordnen?",
          required: true,
          help: "Eine geänderte Bankverbindung wird nie per E-Mail akzeptiert, sondern erst nach Rückruf unter der Nummer aus Ihren Stammdaten. Diese Regel muss von Ihnen angeordnet werden — sie ist der einzige Schutz, der auch dann greift, wenn nicht Sie, sondern Ihr Geschäftspartner betroffen ist.",
          options: [
            { value: "yes", label: "Ja, verbindlich anordnen" },
            { value: "discuss", label: "Möchte ich vorher besprechen" },
          ],
        },
      ],
    },
    {
      id: "microsoft-konto",
      title: "Angaben für das Microsoft-Konto",
      intro:
        "Das Konto lege ich für Sie an. Ich brauche dafür nur die folgenden Angaben.",
      fields: [
        {
          id: "vatId",
          type: "text",
          label: "USt-IdNr. der Vertragsfirma",
          required: true,
          placeholder: "DE123456789",
          help: "Steht auf Ihren Ausgangsrechnungen. Ohne Eintrag stellt Microsoft die Rechnung falsch aus und die Vorsteuer geht verloren.",
        },
        {
          id: "billingAddress",
          type: "textarea",
          label: "Rechnungsanschrift",
          required: true,
          defaultValue: BILLING_ADDRESS,
        },
        {
          id: "microsoftContactEmail",
          type: "email",
          label: "Kontakt-E-Mail für Microsoft",
          required: true,
          help: "An diese Adresse schickt Microsoft Bestätigungen und Rechnungen. Bitte keine der Adressen, die umgestellt werden — sonst sind Sie ausgerechnet während der Umstellung nicht erreichbar.",
        },
        {
          id: "verificationMobile",
          type: "tel",
          label: "Mobilnummer für die Verifizierung",
          required: true,
          help: "Microsoft schickt beim Anlegen einen Bestätigungscode per SMS. Ich melde mich kurz, wenn es so weit ist.",
        },
        {
          id: "paymentInfo",
          type: "info",
          label:
            "Die Zahlungsmethode hinterlegen Sie selbst: Microsoft verlangt beim Anlegen des Kontos eine Kreditkarte. Diesen Schritt gehe ich gemeinsam mit Ihnen am Telefon durch — Ihre Zahlungsdaten sehe ich zu keinem Zeitpunkt.",
        },
      ],
    },
    {
      id: "zugangsdaten",
      title: "Zugangsdaten",
      intro:
        "Ich brauche die Passwörter, um Ihre bestehenden Mails vollständig zu übernehmen und nach der Umstellung gegenzuprüfen, dass nichts fehlt. Ohne sie ließe sich der Bestand nur mit einer Betriebsunterbrechung übertragen.",
      fields: [
        {
          id: "secretsIntro",
          type: "info",
          label:
            "Die folgenden Eingaben werden in Ihrem Browser verschlüsselt, bevor sie diesen Rechner verlassen. Auch ich kann sie erst mit meinem privaten Schlüssel auf meinem eigenen Gerät lesen — auf dem Server und im Postfach liegen sie ausschließlich verschlüsselt.",
        },
        {
          id: "ionosUser",
          type: "secret",
          label: "IONOS-Benutzername",
          required: true,
          help: "Zugang zum Kundenkonto, in dem Ihre Domains liegen.",
        },
        {
          id: "ionosPassword",
          type: "secret",
          label: "IONOS-Passwort",
          required: true,
        },
        {
          id: "mailboxPasswords",
          type: "repeater",
          label: "Passwörter der Postfächer",
          itemsFrom: {
            fieldId: "mailAddresses",
            itemField: "mailAddress",
            into: "mailboxAddress",
          },
          fields: [
            {
              id: "mailboxPassword",
              type: "secret",
              label: "Passwort",
              required: true,
            },
          ],
        },
        {
          id: "imapHint",
          type: "info",
          label:
            "Bitte aktivieren Sie in den GMX-Einstellungen unter „POP3/IMAP-Abruf“ den IMAP-Zugriff. Ohne diese Einstellung kann ich Ihre bisherigen Mails und Kontakte nicht übernehmen.",
        },
        {
          id: "passwordChangeHint",
          type: "info",
          label:
            "Nach Abschluss des Projekts ändern Sie alle hier genannten Passwörter. Ich lösche meine Kopie, sobald die Umstellung abgenommen ist.",
        },
      ],
    },
  ],
  afterSubmit: {
    headline: "Vielen Dank — Ihre Angaben sind angekommen",
    notes: [
      "Kündigen Sie nichts bei IONOS. Ihre Domains bleiben dort, nur der E-Mail-Betrieb zieht um. Eine Kündigung würde Ihre Adressen und Ihre Website abschalten.",
      "Ändern Sie bis zur Umstellung keine Passwörter der genannten Postfächer — sonst bricht die Übernahme Ihrer bestehenden Mails ab.",
      "Löschen Sie keine alten E-Mails, um „aufzuräumen“. Ich übernehme den Bestand vollständig und Sie sortieren danach in Ruhe.",
      "Richten Sie keine Weiterleitungen und keine neuen Postfächer selbst ein. Melden Sie mir den Bedarf, ich baue das im neuen System.",
      "Akzeptieren Sie keine geänderte Bankverbindung per E-Mail — auch nicht von einem bekannten Absender. Erst Rückruf unter der Nummer aus Ihren Stammdaten.",
    ],
  },
};

export default ermaganConfig;
