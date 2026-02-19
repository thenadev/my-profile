"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { StartupProductId } from "@/config/startup-packages";
import { STARTUP_PACKAGES } from "@/config/startup-packages";
import { cn } from "@/lib/utils";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const PRODUCT_OPTIONS: { value: StartupProductId; label: string }[] = [
  { value: "beratung", label: "Startup-Beratung (80€/h) – Termin buchen" },
  { value: "mvp", label: "MVP-Entwicklung anfragen" },
  { value: "feature", label: "Feature-Erweiterung anfragen" },
];

const terminFormSchema = z.object({
  name: z.string().min(2, "Bitte Name angeben"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(1, "Bitte Telefonnummer angeben"),
  productId: z.enum(["beratung", "mvp", "feature"], {
    required_error: "Bitte wählen Sie eine Option",
  }),
  idea: z.string().min(10, "Bitte beschreiben Sie Ihre Idee (mind. 10 Zeichen)"),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Sie müssen der Datenschutzerklärung zustimmen",
  }),
});

type TerminFormValues = z.infer<typeof terminFormSchema>;

interface StartupBeratungTerminFormProps {
  selectedProductId?: StartupProductId | null;
  onProductAcknowledged?: () => void;
}

function productLabel(id: StartupProductId): string {
  const p = STARTUP_PACKAGES.find((x) => x.id === id);
  return p ? p.title : id;
}

export default function StartupBeratungTerminForm({
  selectedProductId = null,
  onProductAcknowledged,
}: StartupBeratungTerminFormProps) {
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
    control,
  } = useForm<TerminFormValues>({
    resolver: zodResolver(terminFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productId: undefined,
      idea: "",
      privacyPolicy: false,
    },
  });

  useEffect(() => {
    if (selectedProductId) {
      setValue("productId", selectedProductId);
      onProductAcknowledged?.();
    }
  }, [selectedProductId, setValue, onProductAcknowledged]);

  const privacyPolicyAccepted = watch("privacyPolicy");

  const onSubmit = async (data: TerminFormValues) => {
    try {
      sendGoogleEvent("contact_form_submit", {
        form_location: "landing_page",
        service: "startup_beratung",
        product: data.productId,
      });

      const topic = `${data.name} – Startup-Beratung: ${productLabel(data.productId)}`;
      const message = `Ihre Idee / Vorhaben:\n\n${data.idea}`;

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          phone: data.phone,
          topic,
          message,
          packageId: data.productId,
        }),
      });

      if (response.ok) {
        sendGoogleEvent("contact_form_success", {
          form_location: "landing_page",
          service: "startup_beratung",
          product: data.productId,
        });
        setDialogContent({
          title: "Anfrage gesendet",
          message:
            "Vielen Dank! Ich habe Ihre Idee und Kontaktdaten erhalten und melde mich zeitnah bei Ihnen zur Terminabsprache.",
        });
        setShowDialog(true);
        reset({
          name: "",
          email: "",
          phone: "",
          productId: undefined,
          idea: "",
          privacyPolicy: false,
        });
      } else {
        throw new Error("Fehler beim Senden");
      }
    } catch {
      setDialogContent({
        title: "Fehler",
        message:
          "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie mich per E-Mail.",
      });
      setShowDialog(true);
    }
  };

  const inputBase =
    "peer h-16 px-4 pt-8 pb-2 text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 bg-muted/50 text-foreground placeholder:text-muted-foreground";
  const inputError =
    "border-destructive focus:border-destructive focus:ring-destructive/20";
  const labelFloat =
    "absolute left-4 top-3 text-sm font-medium text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-3 peer-focus:text-sm peer-focus:text-primary transition-all duration-300";

  return (
    <>
      <div
        id="termin-formular"
        className="w-full max-w-6xl space-y-8 scroll-mt-24"
      >
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            Termin buchen
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] via-[var(--hero-portrait-bg-mid)] to-[var(--hero-portrait-bg-bright)] bg-clip-text text-transparent">
            Idee angeben & Termin vereinbaren
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beschreiben Sie Ihre Idee – ich bereite mich vor. Beratungstermin
            80€/h (1 Stunde). Danach erhalten Sie einen schriftlichen
            Umsetzungsplan inkl. Kostenschätzung.
          </p>
        </div>

        <Card className="w-full shadow-xl bg-card backdrop-blur-sm rounded-3xl border border-border p-6 md:p-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
              Termin anfragen
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Alle Felder mit * sind Pflicht. Ihre Idee wird vertraulich
              behandelt.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <Input
                    id="name"
                    className={cn(inputBase, errors.name && inputError)}
                    placeholder=" "
                    {...register("name")}
                  />
                  <label htmlFor="name" className={labelFloat}>
                    Name *
                  </label>
                  {errors.name && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    className={cn(inputBase, errors.email && inputError)}
                    placeholder=" "
                    {...register("email")}
                  />
                  <label htmlFor="email" className={labelFloat}>
                    E-Mail *
                  </label>
                  {errors.email && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  className={cn(inputBase, errors.phone && inputError)}
                  placeholder=" "
                  {...register("phone")}
                />
                <label htmlFor="phone" className={labelFloat}>
                  Telefon *
                </label>
                {errors.phone && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Wofür möchten Sie anfragen? *
                </label>
                <Controller
                  name="productId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(v) =>
                        field.onChange(v as StartupProductId)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "h-14 border-2 border-border rounded-xl",
                          errors.productId && inputError,
                        )}
                      >
                        <SelectValue placeholder="Bitte wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.productId && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.productId.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="idea"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Ihre Idee / Ihr Vorhaben *
                </label>
                <Textarea
                  id="idea"
                  className={cn(
                    "min-h-[180px] px-4 py-4 text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all bg-muted/50 text-foreground placeholder:text-muted-foreground resize-y",
                    errors.idea && inputError,
                  )}
                  placeholder="Beschreiben Sie kurz Ihre Idee, Ihr Produkt oder was Sie umsetzen möchten. So kann ich mich auf das Gespräch vorbereiten."
                  {...register("idea")}
                />
                {errors.idea && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.idea.message}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy-startup"
                  checked={privacyPolicyAccepted}
                  onCheckedChange={(checked) =>
                    setValue("privacyPolicy", checked as boolean)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="privacy-startup"
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Wird gesendet...
                  </span>
                ) : (
                  "Anfrage senden"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-card rounded-2xl p-8 max-w-md mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-muted-foreground">{dialogContent.message}</p>
          <AlertDialogFooter>
            <Button onClick={() => setShowDialog(false)}>Schließen</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
