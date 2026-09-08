import type { Answers } from "@/config/onboarding/types";
import type { EncryptedSecrets } from "@/lib/onboarding/crypto";

export interface SubmitPayload {
  token: string;
  answers: Answers;
  encryptedSecrets: EncryptedSecrets;
}

export function buildSubmitPayload(
  token: string,
  answers: Answers,
  encryptedSecrets: EncryptedSecrets,
): SubmitPayload {
  return { token, answers, encryptedSecrets };
}
