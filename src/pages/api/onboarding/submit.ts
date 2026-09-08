import { resolveToken } from "@/config/onboarding";
import type { Answers, OnboardingConfig } from "@/config/onboarding/types";
import { siteConfig } from "@/config/site";
import {
  SECRETS_ALGORITHM,
  SECRETS_PAYLOAD_VERSION,
  type EncryptedSecrets,
} from "@/lib/onboarding/crypto";
import {
  buildConfirmationHtml,
  buildOwnerHtml,
  buildOwnerText,
  secretsAttachmentName,
} from "@/lib/onboarding/email";
import { buildAnswersSchema } from "@/lib/onboarding/schema";
import { EMAIL_COLORS } from "@/pages/api/sendEmail";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: { sizeLimit: "256kb" },
  },
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const ENCRYPTED_KEY_MIN_LENGTH = 300;
const ENCRYPTED_KEY_MAX_LENGTH = 1500;
const IV_LENGTH = 16;
const CIPHERTEXT_MIN_LENGTH = 24;
const CIPHERTEXT_MAX_LENGTH = 200_000;

const DEFAULT_CONFIRMATION_TEXT =
  "Wir prüfen Ihre Angaben und melden uns in Kürze bei Ihnen.";

const ERROR_TEXTS = {
  method: "Diese Adresse nimmt nur Formular-Absendungen entgegen.",
  invalid:
    "Ihre Angaben konnten nicht gelesen werden. Bitte laden Sie das Formular neu und versuchen Sie es erneut.",
  unknownToken:
    "Dieser Link ist uns nicht bekannt. Bitte melden Sie sich kurz bei uns.",
  expired:
    "Dieser Link ist abgelaufen. Bitte melden Sie sich kurz bei uns, dann schicken wir Ihnen einen neuen.",
  rateLimit:
    "Ihre Angaben wurden bereits mehrfach gesendet. Bitte warten Sie einige Minuten.",
  mail: "Ihre Angaben konnten nicht zugestellt werden. Bitte versuchen Sie es in einigen Minuten erneut.",
} as const;

const submissionsByToken = new Map<string, number[]>();

function isRateLimited(token: string, now: number): boolean {
  const recent = (submissionsByToken.get(token) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  submissionsByToken.set(token, [...recent, now]);

  return recent.length >= RATE_LIMIT_MAX_SUBMISSIONS;
}

function isBase64(value: unknown, min: number, max: number): boolean {
  return (
    typeof value === "string" &&
    value.length >= min &&
    value.length <= max &&
    BASE64_PATTERN.test(value)
  );
}

function isEncryptedSecrets(value: unknown): value is EncryptedSecrets {
  const payload = value as EncryptedSecrets | undefined;

  return (
    !!payload &&
    typeof payload === "object" &&
    payload.v === SECRETS_PAYLOAD_VERSION &&
    payload.alg === SECRETS_ALGORITHM &&
    isBase64(
      payload.encryptedKey,
      ENCRYPTED_KEY_MIN_LENGTH,
      ENCRYPTED_KEY_MAX_LENGTH,
    ) &&
    isBase64(payload.iv, IV_LENGTH, IV_LENGTH) &&
    isBase64(
      payload.ciphertext,
      CIPHERTEXT_MIN_LENGTH,
      CIPHERTEXT_MAX_LENGTH,
    ) &&
    typeof payload.createdAt === "string" &&
    !Number.isNaN(Date.parse(payload.createdAt))
  );
}

/** Empfängeradresse ausschließlich aus dem konfigurierten Feld, nie aus einem freien Parameter. */
function confirmationRecipient(
  onboardingConfig: OnboardingConfig,
  answers: Answers,
): string | null {
  if (!onboardingConfig.confirmationTo) return null;

  const value = answers[onboardingConfig.confirmationTo];
  if (typeof value !== "string") return null;

  const address = value.trim();
  return EMAIL_PATTERN.test(address) ? address : null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: ERROR_TEXTS.method });
  }

  const { token, answers, encryptedSecrets } = req.body ?? {};

  if (
    typeof token !== "string" ||
    !answers ||
    typeof answers !== "object" ||
    Array.isArray(answers) ||
    !isEncryptedSecrets(encryptedSecrets)
  ) {
    return res.status(400).json({ ok: false, error: ERROR_TEXTS.invalid });
  }

  const resolution = await resolveToken(token);
  if (resolution.status === "unknown") {
    return res.status(404).json({ ok: false, error: ERROR_TEXTS.unknownToken });
  }
  if (resolution.status === "expired") {
    return res.status(410).json({ ok: false, error: ERROR_TEXTS.expired });
  }

  const onboardingConfig = resolution.config;

  if (isRateLimited(token, Date.now())) {
    return res.status(429).json({ ok: false, error: ERROR_TEXTS.rateLimit });
  }

  const typedAnswers = answers as Answers;
  const validation = buildAnswersSchema(
    onboardingConfig,
    typedAnswers,
  ).safeParse(typedAnswers);

  if (!validation.success) {
    return res.status(400).json({ ok: false, error: ERROR_TEXTS.invalid });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.strato.de",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER_ADDR,
      pass: process.env.EMAIL_SENDER_PW,
    },
  });

  const attachmentName = secretsAttachmentName(
    onboardingConfig.slug,
    new Date(),
  );

  try {
    await transporter.sendMail({
      from: `"${siteConfig.companyName} – Onboarding" <${process.env.EMAIL_SENDER_ADDR}>`,
      to: onboardingConfig.notifyEmail,
      subject: `Onboarding-Angaben: ${onboardingConfig.clientName}`,
      text: buildOwnerText(onboardingConfig, typedAnswers),
      html: buildOwnerHtml(
        onboardingConfig,
        typedAnswers,
        EMAIL_COLORS,
        attachmentName,
      ),
      attachments: [
        {
          filename: attachmentName,
          contentType: "application/json",
          content: JSON.stringify(encryptedSecrets, null, 2),
        },
      ],
    });
  } catch (error) {
    console.error("[onboarding] Benachrichtigung fehlgeschlagen", {
      name: (error as Error)?.name,
    });
    return res.status(500).json({ ok: false, error: ERROR_TEXTS.mail });
  }

  const recipient = confirmationRecipient(onboardingConfig, typedAnswers);
  if (recipient) {
    try {
      await transporter.sendMail({
        from: `"${siteConfig.authorName}" <${process.env.EMAIL_SENDER_ADDR}>`,
        to: recipient,
        replyTo: process.env.EMAIL_SENDER_ADDR,
        subject: "Ihre Angaben sind angekommen",
        text: [
          "Guten Tag,",
          "",
          `vielen Dank — Ihre Angaben zum Projekt „${onboardingConfig.projectTitle}“ sind bei uns eingegangen.`,
          "",
          onboardingConfig.confirmationText ?? DEFAULT_CONFIRMATION_TEXT,
          "",
          "Mit freundlichen Grüßen",
          siteConfig.authorName,
          siteConfig.links.homepage,
        ].join("\n"),
        html: buildConfirmationHtml(
          onboardingConfig,
          EMAIL_COLORS,
          onboardingConfig.confirmationText ?? DEFAULT_CONFIRMATION_TEXT,
          {
            name: siteConfig.authorName,
            homepage: siteConfig.links.homepage,
            email: siteConfig.contactEmail,
          },
        ),
      });
    } catch (error) {
      // Die Auswertung ist bereits zugestellt — eine fehlende Bestätigung
      // darf die Absendung für den Kunden nicht scheitern lassen.
      console.error("[onboarding] Bestätigung fehlgeschlagen", {
        name: (error as Error)?.name,
      });
    }
  }

  return res.status(200).json({ ok: true });
}
