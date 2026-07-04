import { notFound } from "next/navigation";

// Catch-all: unbekannte Pfade rendern die lokalisierte not-found-Seite
// innerhalb des [locale]-Layouts.
export default function CatchAllPage() {
  notFound();
}
