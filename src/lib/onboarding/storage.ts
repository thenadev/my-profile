import type { Answers } from "@/config/onboarding/types";

export const STORAGE_VERSION = 1;

export interface StoredProgress {
  v: number;
  stepIndex: number;
  answers: Answers;
  savedAt: string;
}

export function storageKey(token: string): string {
  return `onboarding:${token}`;
}

function store(): Storage | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

/** Nimmt bewusst nur `answers` entgegen — Zugangsdaten dürfen den Speicher nie erreichen. */
export function saveProgress(
  token: string,
  stepIndex: number,
  answers: Answers,
): void {
  const target = store();
  if (!target) return;

  const progress: StoredProgress = {
    v: STORAGE_VERSION,
    stepIndex,
    answers,
    savedAt: new Date().toISOString(),
  };

  try {
    target.setItem(storageKey(token), JSON.stringify(progress));
  } catch {
    // Voller oder gesperrter Speicher darf das Ausfüllen nicht abbrechen.
  }
}

export function loadProgress(token: string): StoredProgress | null {
  const target = store();
  if (!target) return null;

  try {
    const raw = target.getItem(storageKey(token));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredProgress;
    if (parsed.v !== STORAGE_VERSION) return null;
    if (typeof parsed.stepIndex !== "number") return null;
    if (!parsed.answers || typeof parsed.answers !== "object") return null;

    return parsed;
  } catch {
    return null;
  }
}

export function clearProgress(token: string): void {
  const target = store();
  if (!target) return;

  try {
    target.removeItem(storageKey(token));
  } catch {
    // Nichts zu tun: Der Eintrag ist dann ohnehin nicht erreichbar.
  }
}
