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
import { siteConfig } from "@/config/site";
import { getWebsitePackages } from "@/config/website-packages";
import { cn } from "@/lib/utils";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCopy, FaWhatsapp } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import { z } from "zod";

const WHATSAPP_NUMBER = "4917656120050";

type ContactFormValues = {
  email: string;
  packageId: string;
  topic: string;
  message: string;
  phone: string;
  privacyPolicy: boolean;
};

interface UnternehmenswebsiteContactFormProps {
  selectedPackageId?: string | null;
  onPackageAcknowledged?: () => void;
}

export default function UnternehmenswebsiteContactForm({
  selectedPackageId = null,
  onPackageAcknowledged,
}: UnternehmenswebsiteContactFormProps) {
  const locale = useLocale();
  const t = useTranslations("Unternehmenswebsite.contactForm");

  const PACKAGE_OPTIONS = [
    ...getWebsitePackages(locale).map((p) => ({ value: p.id, label: p.title })),
    { value: "other", label: t("options.other") },
  ];

  const contactFormSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("errors.email")),
        packageId: z.string().min(1, t("errors.package")),
        topic: z.string().min(1, t("errors.topic")),
        message: z.string().min(10, t("errors.message")),
        phone: z.string().min(1, t("errors.phone")),
        privacyPolicy: z.boolean().refine((val) => val === true, {
          message: t("errors.privacy"),
        }),
      }),
    [t],
  );

  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });
  const [copied, setCopied] = useState<{ email: boolean; phone: boolean }>({
    email: false,
    phone: false,
  });

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      topic: "",
      packageId: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (selectedPackageId) {
      setValue("packageId", selectedPackageId);
      onPackageAcknowledged?.();
    }
  }, [selectedPackageId, setValue, onPackageAcknowledged]);

  const privacyPolicyAccepted = watch("privacyPolicy");

  const onSubmit = async (data: ContactFormValues) => {
    try {
      sendGoogleEvent("contact_form_submit", {
        form_location: "landing_page",
        service: "unternehmenswebsite",
        ...(data.packageId ? { package: data.packageId } : {}),
      });

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          topic: data.topic,
          message: data.message,
          packageId: data.packageId,
          phone: data.phone || undefined,
        }),
      });

      if (response.ok) {
        sendGoogleEvent("SUBMIT_LEAD_FORM", {
          form_location: "landing_page",
          service: "unternehmenswebsite",
          ...(data.packageId ? { package: data.packageId } : {}),
        });
        sendGoogleEvent("contact_form_success", {
          form_location: "landing_page",
          service: "unternehmenswebsite",
          ...(data.packageId ? { package: data.packageId } : {}),
        });
        setDialogContent({
          title: t("dialog.successTitle"),
          message: t("dialog.successMessage"),
        });
        setShowDialog(true);
        reset({
          email: "",
          packageId: "",
          topic: "",
          message: "",
          phone: "",
          privacyPolicy: false,
        });
      } else {
        throw new Error("Fehler beim Senden");
      }
    } catch (err) {
      setDialogContent({
        title: t("dialog.errorTitle"),
        message: t("dialog.errorMessage"),
      });
      setShowDialog(true);
    }
  };

  const inputBase =
    "peer h-16 px-4 pt-8 pb-2 text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 bg-muted/50 text-foreground placeholder:text-muted-foreground backdrop-blur-sm shadow-sm hover:shadow-md";
  const inputError =
    "border-destructive focus:border-destructive focus:ring-destructive/20";
  const labelFloat =
    "absolute left-4 top-3 text-sm font-medium text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-3 peer-focus:text-sm peer-focus:text-primary transition-all duration-300";

  return (
    <>
      <div
        id="contact-form-section"
        className="w-full max-w-6xl space-y-8 scroll-mt-24"
      >
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] via-[var(--hero-portrait-bg-mid)] to-[var(--hero-portrait-bg-bright)] bg-clip-text text-transparent">
            {t("heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subheading")}
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t("note")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form – links */}
          <div className="relative group order-1 lg:order-1">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />
            <Card className="w-full shadow-xl bg-card backdrop-blur-sm rounded-3xl border border-border p-8 overflow-hidden relative hover:border-primary/40 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                  {t("cardTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Paket-Auswahl */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("fields.package")}
                    </label>
                    <Controller
                      name="packageId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={cn(
                              "h-16 px-4 border-2 border-border rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary bg-muted/50 text-foreground shadow-sm hover:shadow-md transition-all duration-300 [&>span]:line-clamp-1",
                              errors.packageId && inputError,
                            )}
                          >
                            <SelectValue placeholder={t("fields.packagePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {PACKAGE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.packageId && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.packageId.message}
                      </p>
                    )}
                  </div>

                  {/* E-Mail */}
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      className={cn(inputBase, errors.email && inputError)}
                      placeholder=" "
                      {...register("email")}
                    />
                    <label htmlFor="email" className={labelFloat}>
                      {t("fields.email")}
                    </label>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Telefon */}
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      className={cn(inputBase, errors.phone && inputError)}
                      placeholder=" "
                      {...register("phone")}
                    />
                    <label htmlFor="phone" className={labelFloat}>
                      {t("fields.phone")}
                    </label>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Thema */}
                  <div className="relative">
                    <Input
                      id="topic"
                      type="text"
                      className={cn(inputBase, errors.topic && inputError)}
                      placeholder=" "
                      {...register("topic")}
                    />
                    <label htmlFor="topic" className={labelFloat}>
                      {t("fields.topic")}
                    </label>
                    {errors.topic && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.topic.message}
                      </p>
                    )}
                  </div>

                  {/* Nachricht */}
                  <div className="relative">
                    <Textarea
                      id="message"
                      className={cn(
                        "peer h-40 px-4 pt-8 pb-2 text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 bg-muted/50 text-foreground placeholder:text-muted-foreground backdrop-blur-sm shadow-sm hover:shadow-md resize-none",
                        errors.message && inputError,
                      )}
                      placeholder=" "
                      {...register("message")}
                    />
                    <label htmlFor="message" className={labelFloat}>
                      {t("fields.message")}
                    </label>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <span className="text-red-500">⚠</span>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Datenschutz */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={privacyPolicyAccepted}
                      onCheckedChange={(checked) => {
                        setValue("privacyPolicy", checked as boolean);
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="privacy"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {t("privacy.before")}{" "}
                        <a
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {t("privacy.link")}
                        </a>{" "}
                        {t("privacy.after")}
                      </label>
                      {errors.privacyPolicy && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {errors.privacyPolicy.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        {t("submitting")}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <MdEmail className="w-6 h-6" />
                        {t("submit")}
                      </div>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    {t("requiredNote")}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Bild + Direktkontakt – rechts */}
          <div className="space-y-6 order-2 lg:order-2">
            {/* Bild-Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />
              <Card className="w-full shadow-xl bg-card backdrop-blur-sm rounded-3xl border border-border p-8 relative hover:border-primary/40 hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-card backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border border-border relative">
                      <p className="text-sm font-medium text-foreground whitespace-nowrap">
                        {t("bubble")}
                      </p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-card" />
                    </div>
                  </div>
                  <div className="relative z-10 flex justify-center pt-4">
                    <Image
                      src="/me_envelope.webp"
                      alt={t("imageAlt")}
                      width={320}
                      height={320}
                      className="h-64 w-auto object-contain drop-shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-1"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* E-Mail + WhatsApp */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />
              <Card className="w-full shadow-xl bg-card backdrop-blur-sm rounded-3xl border border-border p-6 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {t("direct.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200">
                    <MdEmail className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">
                        {t("direct.email")}
                      </div>
                      <a
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-primary hover:underline text-sm break-all"
                      >
                        {siteConfig.contactEmail}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(siteConfig.contactEmail, "email")
                      }
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors shrink-0"
                      title={t("direct.copyEmail")}
                    >
                      <FaCopy className="w-4 h-4" />
                    </button>
                    {copied.email && (
                      <span className="text-xs text-primary font-medium shrink-0">
                        {t("direct.copied")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200">
                    <MdPhone className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">
                        {t("direct.phone")}
                      </div>
                      <a
                        href={`tel:${siteConfig.contactPhone}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {siteConfig.contactPhoneDisplay}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(siteConfig.contactPhone, "phone")
                      }
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors shrink-0"
                      title={t("direct.copyPhone")}
                    >
                      <FaCopy className="w-4 h-4" />
                    </button>
                    {copied.phone && (
                      <span className="text-xs text-primary font-medium shrink-0">
                        {t("direct.copied")}
                      </span>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 group/wa"
                  >
                    <FaWhatsapp className="w-6 h-6 text-[#25D366] shrink-0 group-hover/wa:scale-110 transition-transform" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">
                        {t("direct.whatsapp")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("direct.whatsappNote")}
                      </div>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-card backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-border max-w-md mx-4">
          <AlertDialogHeader className="text-center mb-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-foreground">
              {dialogContent.title}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-center mb-8 text-muted-foreground leading-relaxed text-lg">
            {dialogContent.message}
          </p>
          <AlertDialogFooter className="flex gap-4">
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold h-12"
              onClick={() => setShowDialog(false)}
            >
              {t("dialog.close")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
