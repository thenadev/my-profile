// pages/api/sendEmail.ts
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// API Handler Function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, topic, message } = req.body;

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
      // Sending the email
      await transporter.sendMail({
        from: `"My Website" <${process.env.EMAIL_SENDER_ADDR}>`,
        to: process.env.EMAIL_SENDER_ADDR,
        replyTo: email,
        subject: `Contact Form Submission: ${topic}`,
        text: "Thema: " + topic + "\nVon: " + email + "\n\n" + message,
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
