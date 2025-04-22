// pages/api/sendEmail.ts
import { websiteConfig } from "@/config/prices/website";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface WebsiteRequest {
  // Kontaktdaten
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  additionalInfo?: string;

  // Website Konfiguration
  design: string;
  pages: number;
  features: string[];
  additional: string[];

  // Preisberechnung
  basePrice: number;
  monthlyPrice: number;

  // Skip Config
  skippedConfig: boolean;
}

// API Handler Function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data: WebsiteRequest = req.body;
    // Set up Nodemailer transport using IONOS SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER_ADDR,
        pass: process.env.EMAIL_SENDER_PW,
      },
    });

    try {
      // Erstelle E-Mail-Inhalt
      const emailContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
              h2 { color: #1d4ed8; margin-top: 20px; }
              .section { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
              .price { font-weight: bold; color: #2563eb; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Neue Website-Anfrage</h1>
              
              <div class="section">
                <h2>Kontaktdaten</h2>
                <p><strong>Firma:</strong> ${data.companyName}</p>
                <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>E-Mail:</strong> ${data.email}</p>
                <p><strong>Telefon:</strong> ${data.phone}</p>
                <p><strong>Adresse:</strong> ${data.address}<br>
                ${data.zipCode} ${data.city}</p>
              </div>

              ${
                !data.skippedConfig
                  ? `
              <div class="section">
                <h2>Website Konfiguration</h2>
                <p><strong>Design:</strong> ${data.design}</p>
                <p><strong>Anzahl Seiten:</strong> ${data.pages}</p>
                <p><strong>Features:</strong> ${data.features.join(", ")}</p>
                <p><strong>Zusätzliche Services:</strong> ${data.additional.join(", ")}</p>
              </div>
              <div class="section">
                <h2>Preisberechnung</h2>
                <p><span class="price">Einmalige Kosten: €${data.basePrice.toLocaleString()}</span></p>
                <p><span class="price">Monatliche Kosten: €${data.monthlyPrice.toLocaleString()}</span></p>
              </div>

              <div class="section">
                <h2>Zusätzliche Informationen</h2>
                <p>${data.additionalInfo || "Keine"}</p>
              </div>
              `
                  : "<div class='section'><h2>Konfiguration wurde übersprungen</h2></div>"
              }
            </div>
          </body>
        </html>
      `;

      // Sende E-Mail
      await transporter.sendMail({
        from: `"Website Anfrage" <${process.env.EMAIL_SENDER_ADDR}>`,
        to: process.env.EMAIL_SENDER_ADDR,
        replyTo: data.email,
        subject: `Neue Website-Anfrage von ${data.companyName}`,
        html: emailContent,
      });

      res.status(200).json({ message: "Anfrage erfolgreich gesendet" });
    } catch (error) {
      console.error("Fehler beim Senden der E-Mail", error);
      res.status(500).json({ message: "Fehler beim Senden der Anfrage" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
