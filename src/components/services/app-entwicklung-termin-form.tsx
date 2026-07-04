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
import type { AppProductId } from "@/config/app-packages";
import { getAppPackages } from "@/config/app-packages";
import { cn } from "@/lib/utils";
import { sendGoogleEvent } from "@/utils/sendGoogleEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const PRODUCT_IDS = ["app_beratung", "app_mvp", "app_feature_bug"] as const;

type TerminFormValues = {
  name: string;
  email: string;
  phone: string;
  productId: AppProductId;
  idea: string;
  privacyPolicy: boolean;
};

interface AppEntwicklungTerminFormProps {
  selectedProductId?: AppProductId | null;
  onProductAcknowledged?: () => void;
}

export default function AppEntwicklungTerminForm({
  selectedProductId = null,
  onProductAcknowledged,
}: AppEntwicklungTerminFormProps) {
  const locale = useLocale();
  const t = useTranslations("AppEntwicklung.form");

  const productLabel = (id: AppProductId): string => {
    const p = getAppPackages(locale).find((x) => x.id === id);
    return p ? p.title : id;
  };

  const PRODUCT_OPTIONS = PRODUCT_IDS.map((value) => ({
    value,
    label: t(`options.${value}`),
  }));

  const terminFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errors.name")),
        email: z.string().email(t("errors.email")),
        phone: z.string().min(1, t("errors.phone")),
        productId: z.enum(PRODUCT_IDS, {
          required_error: t("errors.product"),
        }),
        idea: z.string().min(10, t("errors.idea")),
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
        service: "app_entwicklung",
        product: data.productId,
      });

      const topic = `${data.name} – App-Entwicklung: ${productLabel(data.productId)}`;
      const message = `${t("idea.label")}:\n\n${data.idea}`;

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
          service: "app_entwicklung",
          product: data.productId,
        });
        setDialogContent({
          title: t("dialog.successTitle"),
          message: t("dialog.successMessage"),
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
        title: t("dialog.errorTitle"),
        message: t("dialog.errorMessage"),
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
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--hero-portrait-bg-bright)] via-[var(--hero-portrait-bg-mid)] to-[var(--hero-portrait-bg-bright)] bg-clip-text text-transparent">
            {t("heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subheading")}
          </p>
        </div>

        <Card className="w-full shadow-xl bg-card backdrop-blur-sm rounded-3xl border border-border p-6 md:p-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
              {t("cardTitle")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("cardNote")}
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
                    {t("fields.name")}
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
                    {t("fields.email")}
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
                  {t("fields.phone")}
                </label>
                {errors.phone && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("fields.product")}
                </label>
                <Controller
                  name="productId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(v) =>
                        field.onChange(v as AppProductId)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "h-14 border-2 border-border rounded-xl",
                          errors.productId && inputError,
                        )}
                      >
                        <SelectValue placeholder={t("fields.productPlaceholder")} />
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
                  {t("idea.label")} *
                </label>
                <Textarea
                  id="idea"
                  className={cn(
                    "min-h-[180px] px-4 py-4 text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all bg-muted/50 text-foreground placeholder:text-muted-foreground resize-y",
                    errors.idea && inputError,
                  )}
                  placeholder={t("idea.placeholder")}
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
                  id="privacy-app"
                  checked={privacyPolicyAccepted}
                  onCheckedChange={(checked) =>
                    setValue("privacyPolicy", checked as boolean)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="privacy-app"
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
                    {t("submitting")}
                  </span>
                ) : (
                  t("submit")
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
            <Button onClick={() => setShowDialog(false)}>{t("dialog.close")}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
