# Überarbeitungsplan: Documents Page Design

## Ausgangslage

Die Documents Page nutzt aktuell ein **veraltetes Farbschema** mit hardcodierten Turquoise-Varianten (`turquoise-800`, `turquoise-600`, `turquoise-500`), während die restliche Website (HomeHero, Unternehmenswebsite) auf das **neue Design-System** mit CSS-Variablen und semantischen Tokens umgestellt wurde.

### Aktuelle Probleme

| Bereich               | Aktuell                                          | Problem                                                                |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| **Seitenhintergrund** | `bg-turquoise-800`                               | Flache Einheitsfarbe, kein Bezug zu `bg-background`                    |
| **Hero-Bereich**      | `text-white`, `text-gray-200`                    | Keine semantischen Tokens (`text-foreground`, `text-muted-foreground`) |
| **CTA-Button**        | `from-turquoise-500 to-turquoise-600`            | Abweichend von anderen Seiten                                          |
| **Cards**             | `bg-turquoise-800/90`, `border-turquoise-600/30` | Kein `bg-card`, `border-border`                                        |
| **Badges**            | `bg-turquoise-700/50`, `text-turquoise-300`      | Inkonsistent mit Unternehmenswebsite                                   |
| **Input/Select**      | Default shadcn                                   | Können auf turquoise Hintergrund optisch abweichen                     |
| **Portrait-Rahmen**   | `border-turquoise-500/30`                        | Kein `hero-portrait-bg` oder `bg-muted`                                |
| **Empty State**       | `bg-turquoise-800/50`, `border-turquoise-600/30` | Kein `bg-muted`, `border-border`                                       |

---

## Überarbeitungsplan

### Phase 1: Seitenstruktur & Hintergrund

**Ziel:** Anschluss an das globale Layout und die moving-gradient-overlay.

1. **Seitenhintergrund**

   - `bg-turquoise-800` → `bg-background` (transparent, damit moving-gradient-overlay sichtbar bleibt)
   - Optional: dezenter eigener Gradient wie bei UnternehmenswebsiteHero (`from-[var(--hero-portrait-bg-mid)]/30 via-[var(--hero-portrait-bg-dark)]/20`)

2. **Container**
   - `pt-16 pb-20` beibehalten (Navbar-Abstand)
   - `z-20 relative` beibehalten für korrekte Schichtung

---

### Phase 2: Hero-Section

**Ziel:** Optische Nähe zu HomeHero und UnternehmenswebsiteHero.

1. **Textfarben**

   - `text-white` → `text-foreground`
   - `text-gray-200` → `text-muted-foreground`

2. **CTA-Button**

   - Aktuell: `bg-gradient-to-r from-turquoise-500 to-turquoise-600`
   - Neu: `bg-primary text-primary-foreground` (wie HomeHero) ODER
   - Neu: `bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] to-[var(--hero-portrait-bg-mid)]` (wie Unternehmenswebsite)
   - Hover: `hover:opacity-90` statt `hover:scale-[1.02]` für Konsistenz

3. **Portrait-Bereich**
   - Rahmen: `border-turquoise-500/30` → `border-border` oder `hero-portrait-bg` als Hintergrund (wie HomeHero)
   - Glow: `from-turquoise-500/20` → `from-[var(--hero-portrait-bg-bright)]/25` oder `bg-turquoise-400/25` (Tailwind nutzt weiterhin turquoise, aber konsistent mit HomeHero)
   - Optional: `hero-portrait-bg` Klasse hinter dem Bild für einheitlichen Look

---

### Phase 3: Filter & Controls

1. **Input (Suche)**

   - Sicherstellen, dass `Input` mit `bg-background`/`bg-muted` und `border-border` gerendert wird
   - Falls nötig: explizit `className="bg-muted border-border"` ergänzen

2. **Select**
   - Gleiche Anpassung wie Input für konsistentes Erscheinungsbild

---

### Phase 4: Document Cards

**Ziel:** Gleicher Stil wie Unternehmenswebsite-Zielgruppen-Cards.

1. **Card-Container**

   - `bg-turquoise-800/90 border-turquoise-600/30` → `bg-card border-border hover:border-primary/40`
   - `backdrop-blur-sm` optional beibehalten oder entfernen (Cards sind meist solide)
   - `shadow-sm hover:shadow-md` → `hover:shadow-xl hover:shadow-primary/10` (wie Unternehmenswebsite)

2. **Icon-Bereich**

   - `bg-turquoise-700/50 border-turquoise-600/30 text-turquoise-300` → `bg-primary/15 text-primary` oder `bg-muted border-border`

3. **CardTitle**

   - `text-white` → `text-foreground`

4. **Platform-Badge**

   - `bg-turquoise-700/50 border-turquoise-600/30 text-gray-200` → `bg-muted border-border text-foreground` oder `variant="secondary"`

5. **CardDescription**

   - `text-gray-300` → `text-muted-foreground`

6. **Tag-Badges**

   - `border-turquoise-600/30 bg-turquoise-700/50 text-gray-200` → `border-border bg-muted text-foreground`

7. **Action-Buttons (PDF-Links)**
   - `border-turquoise-500 text-turquoise-400 hover:bg-turquoise-700/50` → `border-primary text-primary hover:bg-primary/20` oder `variant="outline"` mit primary-Farben

---

### Phase 5: Empty State

- `bg-turquoise-800/50 border-turquoise-600/30 text-gray-300` → `bg-muted border-border text-muted-foreground`

---

### Phase 6: Feinschliff (optional)

1. **Badge für Dokumenttyp** (cv, degree, certificate)

   - Einheitliches Styling mit `bg-primary/15 text-primary` für bessere Lesbarkeit

2. **Responsive**

   - Prüfen, ob alle neuen Klassen auf Mobile gut aussehen

3. **Accessibility**
   - Kontrast prüfen (foreground auf background, muted-foreground)

---

## Zusammenfassung der Token-Migration

| Alt                                               | Neu                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `bg-turquoise-800`                                | `bg-background`                                                                            |
| `text-white`                                      | `text-foreground`                                                                          |
| `text-gray-200`, `text-gray-300`                  | `text-muted-foreground`                                                                    |
| `bg-turquoise-800/90`, `bg-turquoise-700/50`      | `bg-card`, `bg-muted`                                                                      |
| `border-turquoise-600/30`, `border-turquoise-500` | `border-border`, `border-primary`                                                          |
| `text-turquoise-300`, `text-turquoise-400`        | `text-primary`                                                                             |
| `from-turquoise-500 to-turquoise-600`             | `bg-primary` oder `from-[var(--hero-portrait-bg-bright)] to-[var(--hero-portrait-bg-mid)]` |

---

## Reihenfolge der Umsetzung

1. Phase 1 (Hintergrund) – Basis für alles Weitere
2. Phase 2 (Hero) – Erster visueller Eindruck
3. Phase 4 (Cards) – Hauptinhalt
4. Phase 3 (Controls) – Kleiner Aufwand
5. Phase 5 (Empty State)
6. Phase 6 (Feinschliff)

---

## Referenz-Komponenten

- **Hero:** `src/components/home/HomeHero.tsx`, `src/components/services/unternehmenswebsite-hero.tsx`
- **Cards:** `UnternehmenswebsiteClient.tsx` (Zielgruppen-Grid, Pakete)
- **Farben:** `src/app/globals.css` (`:root` Variablen), `tailwind.config.ts`
