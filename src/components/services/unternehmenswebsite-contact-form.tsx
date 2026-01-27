"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";

// Kontaktformular Schema
const contactFormSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  topic: z.string().min(1, "Bitte geben Sie ein Thema an"),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Sie müssen der Datenschutzerklärung zustimmen",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface UnternehmenswebsiteContactFormProps {
  defaultTopic?: string;
}

export default function UnternehmenswebsiteContactForm({
  defaultTopic = "Webdesign-Anfrage - Unternehmenswebsite",
}: UnternehmenswebsiteContactFormProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      topic: defaultTopic,
    },
  });

  const privacyPolicyAccepted = watch("privacyPolicy");

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Google Ads Conversion Event
      sendGoogleEvent("contact_form_submit", {
        form_location: "landing_page",
        service: "unternehmenswebsite",
      });

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        sendGoogleEvent("contact_form_success", {
          form_location: "landing_page",
          service: "unternehmenswebsite",
        });
        setDialogContent({
          title: "Anfrage erfolgreich gesendet!",
          message:
            "Vielen Dank für Ihre Anfrage. Ich melde mich innerhalb von 24 Stunden bei Ihnen.",
        });
        setShowDialog(true);
        reset();
      } else {
        throw new Error("Fehler beim Senden");
      }
    } catch (err) {
      setDialogContent({
        title: "Fehler",
        message:
          "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail.",
      });
      setShowDialog(true);
    }
  };

  return (
    <>
      <div
        id="contact-form-section"
        className="w-full max-w-4xl space-y-8 scroll-mt-24"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Kostenlose Beratung anfragen
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihre Online-Präsenz auf das nächste Level
            bringen. Unverbindlich und kostenlos.
          </p>
        </div>
        <Card className="p-6 md:p-8 bg-turquoise-800/90 backdrop-blur-sm border-turquoise-600/30">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                E-Mail *
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="ihre@email.de"
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Thema *
              </label>
              <Input
                {...register("topic")}
                placeholder="Ihr Anliegen"
                className="w-full"
              />
              {errors.topic && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.topic.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Ihre Nachricht *
              </label>
              <Textarea
                {...register("message")}
                placeholder="Erzählen Sie mir von Ihrem Projekt..."
                className="w-full min-h-[120px]"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                {...register("privacyPolicy")}
                checked={privacyPolicyAccepted}
                onCheckedChange={(checked) => {
                  setValue("privacyPolicy", checked as boolean);
                }}
              />
              <label
                htmlFor="privacy"
                className="text-sm text-gray-200 cursor-pointer"
              >
                Ich stimme der{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  className="text-turquoise-500 hover:underline"
                >
                  Datenschutzerklärung
                </a>{" "}
                zu. *
              </label>
            </div>
            {errors.privacyPolicy && (
              <p className="text-red-500 text-sm">
                {errors.privacyPolicy.message}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wird gesendet..." : "Jetzt kostenlos anfragen"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-gray-400">
              * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nicht
              an Dritte weitergegeben.
            </p>
          </form>
        </Card>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-gray-200">{dialogContent.message}</p>
          <AlertDialogFooter>
            <Button onClick={() => setShowDialog(false)}>Schließen</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
