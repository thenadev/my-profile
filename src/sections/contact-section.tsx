"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl"; // Import useTranslations hook
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCopy } from "react-icons/fa6";
import { z } from "zod";
import ContactImg from "../assets/me-contact.png";

const ContactSection: React.FC = () => {
  const t = useTranslations("Contact"); // Use translations from "Contact" namespace

  const formSchema = z.object({
    email: z.string().email("errors.invalidEmail"),
    topic: z.string().min(1, "errors.topicRequired"),
    message: z.string().min(5, "errors.messageMin"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    message: string;
  }>({
    title: "",
    message: "",
  });

  const [copied, setCopied] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setDialogContent({
          title: t("successTitle"),
          message: t("successMessage"),
        });
        setShowDialog(true);
        reset();
      } else {
        setDialogContent({
          title: t("errorTitle"),
          message: t("errorMessage", { email: siteConfig.contactEmail }),
        });
        setShowDialog(true);
      }
    } catch (err) {
      setDialogContent({
        title: t("errorTitle"),
        message: t("errorMessage", { email: siteConfig.contactEmail }),
      });
      setShowDialog(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contactEmail);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      id="contact"
      className="min-h-screen w-full py-20 flex flex-col items-center justify-center gap-8 px-4 md:px-8 text-slate-700 z-40 relative"
    >
      <div className="w-full max-w-5xl flex flex-col items-center justify-start gap-8 px-4 md:px-8 mt-10">
        <Card className="w-full shadow-lg bg-white rounded-lg border border-gray-200 p-4 sm:p-6 flex flex-col md:flex-row overflow-hidden">
          <div className="flex flex-col w-full md:w-8/12 order-2 md:order-1">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
                {t("title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 sm:space-y-4 md:space-y-6"
              >
                {/* Email Input */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="email"
                    className="font-semibold mb-1 text-sm sm:text-base"
                  >
                    {t("yourEmail")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="p-2 sm:p-3 md:p-4 rounded-lg border border-gray-300 text-black"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {t(errors.email.message as string)}
                    </p>
                  )}
                </div>

                {/* Topic Input */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="topic"
                    className="font-semibold mb-1 text-sm sm:text-base"
                  >
                    {t("topic")}
                  </label>
                  <Input
                    id="topic"
                    type="text"
                    placeholder={t("topicPlaceholder")}
                    className="p-2 sm:p-3 md:p-4 rounded-lg border border-gray-300 text-black"
                    {...register("topic")}
                  />
                  {errors.topic && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {t(errors.topic.message as string)}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="message"
                    className="font-semibold mb-1 text-sm sm:text-base"
                  >
                    {t("message")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("messagePlaceholder")}
                    className="p-2 sm:p-3 md:p-4 rounded-lg border border-gray-300 text-black"
                    rows={4}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {t(errors.message.message as string)}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center md:justify-start">
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-4 md:px-6 py-2 sm:py-3 text-base md:text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                  >
                    {t("sendMessage")}
                  </Button>
                </div>
              </form>

              {/* Separator before Direct Email Section */}
              <Separator className="my-6" />

              {/* Direct Email Section with Copy Icon */}
              <div className="mt-6 text-left flex flex-col gap-2">
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("directEmail")}
                </p>
                <div>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-blue-500 hover:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <FaCopy />
                  </button>
                  {copied && (
                    <span className="text-xs text-blue-500 ml-2">
                      {t("copied")}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center w-full md:w-4/12 p-2 md:p-4 order-1 md:order-2 mb-4 md:mb-0">
            <Image
              src={ContactImg}
              alt={t("imageAlt")}
              className="h-40 sm:h-40 md:h-full w-auto object-contain pb-4 md:pb-0"
              width={200}
              height={100}
              style={{
                WebkitFilter: "drop-shadow(5px 5px 5px #222)",
                filter: "drop-shadow(5px 5px 5px #222)",
              }}
            />
          </div>
        </Card>
      </div>

      {/* Alert Dialog for Feedback */}
      {showDialog && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent
            className={cn(
              "bg-white rounded-lg p-4 md:p-6 shadow-lg w-64 md:w-80 border-none"
            )}
          >
            <AlertDialogHeader className="font-bold text-base md:text-lg mb-2 md:mb-4">
              <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-center mb-2 md:mb-4 text-sm md:text-base">
              {dialogContent.message}
            </p>
            <AlertDialogFooter className="flex justify-between mt-4 gap-2">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
                onClick={() => {
                  router.push("/");
                }}
              >
                {t("goHome")}
              </Button>
              <Button
                onClick={() => setShowDialog(false)}
                variant="secondary"
                className="bg-gray-200 hover:bg-gray-300 transition-transform duration-300 transform hover:scale-105 px-3 md:px-4 py-1 md:py-2"
              >
                {t("close")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default ContactSection;
