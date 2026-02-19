// pages/api/sendEmail.ts
// E-Mail-Aufbau angelehnt an Physio-Andre, Farben an thomas-schwabauer.de (Türkis)
import { siteConfig } from "@/config/site";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const EMAIL_COLORS = {
  primary: "#0B878E",
  primaryLight: "#00B0B0",
  sectionBg: "#f8f9fa",
  sectionBorder: "#00B0B0",
  sectionBgAlt: "#e6f7f8",
  messageBg: "#f5f5f5",
  hintBg: "#e9ecef",
  hintText: "#6c757d",
  buttonBg: "#00B0B0",
  text: "#333333",
} as const;

function buildUserConfirmationHtml(): string {
  const homepage = siteConfig.links.homepage;
  const phone = siteConfig.contactPhoneDisplay;
  const contactEmail = siteConfig.contactEmail;
  const whatsapp = `https://wa.me/${siteConfig.contactPhone.replace(/\D/g, "")}`;

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anfrage erhalten</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f5f5f5; color: ${EMAIL_COLORS.text};">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: ${EMAIL_COLORS.primary}; border-bottom: 2px solid ${EMAIL_COLORS.primary}; padding-bottom: 10px;">
      Ihre Anfrage ist bei uns eingegangen
    </h1>

    <div style="background-color: ${EMAIL_COLORS.sectionBg}; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${EMAIL_COLORS.sectionBorder};">
      <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.6;">
        Hallo,
      </p>
      <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.6;">
        vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns in der Regel <strong>innerhalb von 24 Stunden</strong> bei Ihnen.
      </p>
      <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.6;">
        Sie möchten es etwas eiliger? So erreichen Sie uns direkt:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 15px; border-collapse: collapse;">
        <tr><td style="padding: 8px 0;"><strong style="color: ${EMAIL_COLORS.primary};">E-Mail:</strong><br><a href="mailto:${contactEmail}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">${contactEmail}</a></td></tr>
        <tr><td style="padding: 8px 0;"><strong style="color: ${EMAIL_COLORS.primary};">Telefon:</strong><br><a href="tel:${phone.replace(/\s/g, "")}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">${phone}</a></td></tr>
        <tr><td style="padding: 8px 0;"><strong style="color: ${EMAIL_COLORS.primary};">WhatsApp:</strong><br><a href="${whatsapp}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">Nachricht schreiben</a></td></tr>
      </table>
    </div>

    <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6;">
      Mit freundlichen Grüßen<br>
      <strong>${siteConfig.authorName}</strong><br>
      <a href="${homepage}" style="color: ${EMAIL_COLORS.primary}; text-decoration: none;">${homepage}</a>
    </p>

    <div style="background-color: ${EMAIL_COLORS.hintBg}; padding: 15px; border-radius: 8px; margin: 30px 0 0; font-size: 12px; color: ${EMAIL_COLORS.hintText};">
      <strong>Hinweis:</strong> Diese E-Mail wurde automatisch gesendet, weil Sie das Kontaktformular auf ${siteConfig.links.homepage} genutzt haben.
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="mailto:${contactEmail}" style="background-color: ${EMAIL_COLORS.buttonBg}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Direkt antworten
      </a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function buildOwnerEmailHtml(
  email: string,
  topic: string,
  message: string,
  packageLabel: string,
  phone?: string,
): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: ${EMAIL_COLORS.primary}; border-bottom: 2px solid ${EMAIL_COLORS.primary}; padding-bottom: 10px;">
    Neue Kontaktanfrage über die Website
  </h1>

  <div style="background-color: ${EMAIL_COLORS.sectionBg}; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${EMAIL_COLORS.sectionBorder};">
    <h2 style="color: ${EMAIL_COLORS.primary}; margin-top: 0;">Kontaktdaten</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 6px 15px 6px 0;"><strong style="color: ${EMAIL_COLORS.primary};">E-Mail:</strong></td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: ${EMAIL_COLORS.primary};">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding: 6px 15px 6px 0;"><strong style="color: ${EMAIL_COLORS.primary};">Telefon:</strong></td><td style="padding: 6px 0;"><a href="tel:${phone.replace(/\s/g, "")}" style="color: ${EMAIL_COLORS.primary};">${phone}</a></td></tr>` : ""}
      <tr><td style="padding: 6px 15px 6px 0;"><strong style="color: ${EMAIL_COLORS.primary};">Thema:</strong></td><td style="padding: 6px 0;">${topic}</td></tr>
      ${packageLabel !== "-" ? `<tr><td style="padding: 6px 15px 6px 0;"><strong style="color: ${EMAIL_COLORS.primary};">Paket:</strong></td><td style="padding: 6px 0;">${packageLabel}</td></tr>` : ""}
    </table>
  </div>

  <div style="background-color: ${EMAIL_COLORS.messageBg}; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: ${EMAIL_COLORS.primary}; margin-top: 0;">Nachricht des Kunden:</h3>
    <p style="background-color: white; padding: 15px; border-radius: 4px; margin: 10px 0; line-height: 1.6;">
      ${(message || "").replace(/\n/g, "<br>")}
    </p>
  </div>

  <div style="background-color: ${EMAIL_COLORS.hintBg}; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 12px; color: ${EMAIL_COLORS.hintText};">
    <strong>Hinweis:</strong> Diese Kontaktanfrage wurde über das Online-Formular der Website eingereicht.<br>
    <strong>Zeitstempel:</strong> ${new Date().toLocaleString("de-DE")}<br>
    <strong>Antworten:</strong> Sie können direkt auf diese E-Mail antworten, um den Kunden zu kontaktieren.
  </div>

  <div style="text-align: center; margin-top: 30px;">
    <a href="mailto:${email}" style="background-color: ${EMAIL_COLORS.buttonBg}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
      Kunde antworten
    </a>
  </div>
</div>
  `.trim();
}

// API Handler Function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, topic, message, packageId, phone } = req.body;

    // Set up Nodemailer transport using STRATO SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.strato.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER_ADDR,
        pass: process.env.EMAIL_SENDER_PW,
      },
    });

    const packageLabel =
      packageId === "starter"
        ? "Erste Website"
        : packageId === "relaunch"
          ? "Website Relaunch"
          : packageId === "shop"
            ? "Online-Shop"
            : packageId === "other"
              ? "Noch unklar / Beratung"
              : packageId === "beratung"
                ? "Startup-Beratung (80€/h)"
                : packageId === "mvp"
                  ? "MVP-Entwicklung"
                  : packageId === "feature"
                    ? "Feature-Erweiterung"
                    : packageId === "app_beratung"
                      ? "App-Entwicklung: Beratungsgespräch"
                      : packageId === "app_mvp"
                        ? "App-Entwicklung: MVP"
                        : packageId === "app_feature_bug"
                          ? "App-Entwicklung: Feature-/Bug-Entwicklung"
                          : packageId || "-";
    const phoneLine = phone ? `Telefon: ${phone}\n` : "";
    const bodyText =
      "Thema: " +
      topic +
      "\nVon: " +
      email +
      "\n" +
      phoneLine +
      (packageId ? "Paket: " + packageLabel + "\n" : "") +
      "\n" +
      message;

    try {
      // 1. E-Mail an dich (Inhaber) – gleicher Aufbau wie Physio-Andre, Farben der Website
      const ownerHtml = buildOwnerEmailHtml(
        email,
        topic,
        message,
        packageLabel,
        phone || undefined,
      );
      await transporter.sendMail({
        from: `"${siteConfig.companyName} – Kontaktformular" <${process.env.EMAIL_SENDER_ADDR}>`,
        to: process.env.EMAIL_SENDER_ADDR,
        replyTo: email,
        subject: `Neue Kontaktanfrage: ${topic}`,
        text: bodyText,
        html: ownerHtml,
      });

      // 2. Bestätigungs-Mail an den Absender (nutzerfreundlich, modern)
      const userConfirmationHtml = buildUserConfirmationHtml();
      await transporter.sendMail({
        from: `"${siteConfig.authorName}" <${process.env.EMAIL_SENDER_ADDR}>`,
        to: email,
        replyTo: process.env.EMAIL_SENDER_ADDR,
        subject: "Ihre Anfrage ist bei uns eingegangen",
        html: userConfirmationHtml,
        text: [
          "Hallo,",
          "",
          "vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.",
          "",
          `E-Mail: ${siteConfig.contactEmail}`,
          `Telefon: ${siteConfig.contactPhoneDisplay}`,
          `WhatsApp: https://wa.me/${siteConfig.contactPhone.replace(/\D/g, "")}`,
          "",
          "Mit freundlichen Grüßen",
          siteConfig.authorName,
          siteConfig.links.homepage,
        ].join("\n"),
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Failed to send email", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
