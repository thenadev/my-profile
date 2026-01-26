Bitte analysiere die folgenden Daten und gib die Ergebnisse in Tabellenform aus:

| Metriken | Letzte 7 Tage | Vormonat | Prozentuale Änderung |
|-------------------------------|---------------|---------|
| Gesamte Seitenaufrufe | {{ $('Summarize Data').item.json.sum_Aufrufe }} | {{ $('Summarize Data1').item.json.sum_Aufrufe }} | Prozentuale Änderung |
| Gesamte Nutzer | {{ $('Summarize Data').item.json.sum_Nutzer }} | {{ $('Summarize Data1').item.json.sum_Nutzer }} | Prozentuale Änderung |
| Gesamte Sitzungen | {{ $('Summarize Data').item.json.sum_Sitzungen }} | {{ $('Summarize Data1').item.json.sum_Sitzungen }} | Prozentuale Änderung |
| Durchschnittliche Sitzungen/Nutzer | {{ $('Summarize Data').item.json.average_Sitzungen_pro_Nutzer }} | {{ $('Summarize Data1').item.json.average_Sitzungen_pro_Nutzer }} | Prozentuale Änderung |
| Durchschnittliche Sitzungsdauer | {{ $('Summarize Data').item.json.average_Sitzungsdauer }} | {{ $('Summarize Data1').item.json.average_Sitzungsdauer }} | Prozentuale Änderung |
| Gesamte Käufe | {{ $('Summarize Data').item.json['sum_Käufe'] }} | {{ $('Summarize Data1').item.json['sum_Käufe'] }} | Prozentuale Änderung |
| Durchschnittlicher Umsatz/Kauf | {{ $('Summarize Data').item.json.average_Revenue_pro_Kauf }} | {{ $('Summarize Data1').item.json.average_Revenue_pro_Kauf }} | Prozentuale Änderung |
| Gesamter Umsatz | {{ $('Summarize Data').item.json.sum_Revenue }} | {{ $('Summarize Data1').item.json.sum_Revenue }} | Prozentuale Änderung |

Format für Zahlen:
- Punkt (.) für Zahlen in Tausender-Schreibweise (z.B. 4.000)
- Komma (,) für Dezimalzahlen (z.B. 3,4)
- Umwandlung der durchschnittlichen Sitzungsdauer in Minuten statt Sekunden
- Durchschnittlicher Umsatz/Kauf und Gesamtumsatz in €

Bitte schreibe eine kurze Zusammenfassung der analysierten Daten über der Tabelle (maximal 3 Sätze!)

Bitte formatiere in einem modernen HTML-Format, damit das Ergebnis als HTML-E-Mail versendet werden kann!

Struktur der E-Mail:

"Hallo! Hier ist der Wöchentliche Report: Google Analytics der letzten 7 Tage!
[Zusammenfassung]
[Tabelle]"