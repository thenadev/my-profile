"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa6";
import { MdCheckCircle, MdEmail, MdSend } from "react-icons/md";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse ein.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: z.string().optional(),
  message: z
    .string()
    .min(5, "Bitte beschreiben Sie Ihr Anliegen (mindestens 5 Zeichen)."),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const WHATSAPP_NUMBER = siteConfig.contactPhone.replace(/\D/g, "");

interface BlogInquiryDialogProps {
  /** Button-Beschriftung (aus dem Markdown-Linktext). */
  label?: React.ReactNode;
  /** Thema/Kontext der Anfrage – landet in der E-Mail als „Thema". */
  topic?: string;
  /**
   * "inline" (Standard) rendert einen normalen CTA-Button im Textfluss.
   * "floating" rendert einen dauerhaft sichtbaren Button unten rechts.
   */
  variant?: "inline" | "floating";
}

/**
 * Klarer CTA-Button, der einen Dialog mit Anfrageformular öffnet – inkl.
 * WhatsApp-Schnellzugriff und Foto von der Kontaktseite.
 * Inline über den Markdown-Marker `[Text](anfrage:<Thema>)`, oder als
 * dauerhaft präsenter Button via `variant="floating"`.
 */
export default function BlogInquiryDialog({
  label = "Jetzt unverbindlich anfragen",
  topic = "Anfrage über den Blog",
  variant = "inline",
}: BlogInquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    // Ohne Defaults ist privacyPolicy anfangs undefined → Zod-Typfehler
    // statt der deutschen refine-Meldung. Defaults verhindern generische Texte.
    defaultValues: { email: "", phone: "", message: "", privacyPolicy: false },
  });

  const privacyAccepted = watch("privacyPolicy");

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hallo Thomas, ich habe eine Frage zum Thema „${topic}".`,
  )}`;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
          topic,
        }),
      });

      if (response.ok) {
        sendGoogleEvent("SUBMIT_LEAD_FORM", { form_location: "blog_dialog" });
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setStatus("idle");
      }}
    >
      <DialogTrigger asChild>
        {variant === "floating" ? (
          <button
            aria-label="Unverbindlich anfragen"
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2 h-14 pl-5 pr-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-105 transition-all"
          >
            <MdEmail className="h-6 w-6" />
            <span className="hidden sm:inline">Anfragen</span>
          </button>
        ) : (
          <Button
            size="lg"
            className="h-12 px-6 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            <MdEmail className="mr-2 h-5 w-5" />
            {label}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-card rounded-2xl border border-border sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {status === "success" ? (
          <div className="flex flex-col items-center text-center py-4">
            <MdCheckCircle className="h-14 w-14 text-primary mb-4" />
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Danke für Ihre Anfrage!
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground mt-2">
                Ich melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.
                Wenn es eilig ist, erreichen Sie mich direkt unter{" "}
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="text-primary font-medium hover:underline"
                >
                  {siteConfig.contactPhoneDisplay}
                </a>
                .
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-6 h-11 px-6 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Schließen
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="items-center text-center">
              <Image
                src="/me_envelope.webp"
                alt="Thomas Schwabauer"
                width={120}
                height={120}
                className="h-24 w-auto object-contain drop-shadow-xl mb-1"
              />
              <DialogTitle className="text-2xl font-bold text-foreground">
                Ich freue mich auf Ihre Nachricht 💬
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Schildern Sie kurz Ihr Anliegen – ich melde mich zeitnah mit
                einer ehrlichen Einschätzung.
              </DialogDescription>
            </DialogHeader>

            {/* WhatsApp-Schnellzugriff */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                sendGoogleEvent("CLICK_WHATSAPP", { form_location: "blog_dialog" })
              }
              className="flex items-center justify-center gap-3 h-12 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold transition-colors"
            >
              <FaWhatsapp className="h-5 w-5" />
              Direkt per WhatsApp schreiben
            </a>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              oder per Formular
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse *"
                  className={cn(
                    "h-12 bg-muted/50 border-2 border-border rounded-xl",
                    errors.email && "border-destructive",
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Input
                type="tel"
                placeholder="Telefon (optional – für schnellen Rückruf)"
                className="h-12 bg-muted/50 border-2 border-border rounded-xl"
                {...register("phone")}
              />

              <div>
                <Textarea
                  placeholder="Worum geht es? *"
                  className={cn(
                    "h-28 bg-muted/50 border-2 border-border rounded-xl resize-none",
                    errors.message && "border-destructive",
                  )}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="blog-privacy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) =>
                    setValue("privacyPolicy", checked as boolean, {
                      shouldValidate: true,
                    })
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="blog-privacy"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Ich stimme der{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Datenschutzerklärung
                  </a>{" "}
                  zu. *
                </label>
              </div>
              {errors.privacyPolicy && (
                <p className="text-destructive text-sm">
                  {errors.privacyPolicy.message}
                </p>
              )}

              {status === "error" && (
                <p className="text-destructive text-sm">
                  Das hat leider nicht geklappt. Bitte versuchen Sie es erneut
                  oder schreiben Sie an{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                  .
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Wird gesendet …
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <MdSend className="h-5 w-5" />
                    Anfrage senden
                  </span>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}