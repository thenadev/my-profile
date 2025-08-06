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
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCopy, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { z } from "zod";
import ContactImg from "../../assets/me-contact.png";

const ContactSection: React.FC = () => {
  const t = useTranslations("Contact");

  const formSchema = z.object({
    email: z.string().email("errors.invalidEmail"),
    topic: z.string().min(1, "errors.topicRequired"),
    message: z.string().min(5, "errors.messageMin"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const [copied, setCopied] = useState<{
    email: boolean;
    phone: boolean;
  }>({
    email: false,
    phone: false,
  });

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

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [type]: false }));
    }, 2000);
  };

  return (
    <div
      id="contact"
      className="min-h-screen max-w-7xl mx-auto py-20 flex flex-col items-center justify-center gap-12 px-4 md:px-8 text-slate-700 z-40 relative"
    >
      <div className="w-full max-w-[1200px] flex flex-col items-center justify-start gap-12 px-4 md:px-8 mt-10">
        {/* ===== HERO SECTION ===== */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent mb-6 animate-fadeIn">
            🤝 {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-200">
            Ich freue mich, von Ihnen zu hören! Ob Projektanfrage, Kooperation
            oder einfach nur ein nettes Hallo – schreiben Sie mir. Ich antworte
            in der Regel innerhalb von 24 Stunden.
          </p>
        </section>

        {/* ===== MAIN CONTACT SECTION ===== */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== LEFT COLUMN: FORM + DIRECT CONTACT ===== */}
          <div className="space-y-8">
            {/* Contact Form Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />

              <Card className="w-full shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100/50 p-8 overflow-hidden relative">
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    📨 {t("sendMessage")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        className={cn(
                          "peer h-16 px-4 pt-8 pb-2 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md",
                          errors.email &&
                            "border-red-300 focus:border-red-500 focus:ring-red-200"
                        )}
                        placeholder=" "
                        {...register("email")}
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-3 text-sm font-medium text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-600 transition-all duration-300"
                      >
                        {t("yourEmail")}
                      </label>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {t(errors.email.message as string)}
                        </p>
                      )}
                    </div>

                    {/* Topic Input */}
                    <div className="relative">
                      <Input
                        id="topic"
                        type="text"
                        className={cn(
                          "peer h-16 px-4 pt-8 pb-2 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md",
                          errors.topic &&
                            "border-red-300 focus:border-red-500 focus:ring-red-200"
                        )}
                        placeholder=" "
                        {...register("topic")}
                      />
                      <label
                        htmlFor="topic"
                        className="absolute left-4 top-3 text-sm font-medium text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-600 transition-all duration-300"
                      >
                        {t("topic")}
                      </label>
                      {errors.topic && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {t(errors.topic.message as string)}
                        </p>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className="relative">
                      <Textarea
                        id="message"
                        className={cn(
                          "peer h-40 px-4 pt-8 pb-2 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md resize-none",
                          errors.message &&
                            "border-red-300 focus:border-red-500 focus:ring-red-200"
                        )}
                        placeholder=" "
                        {...register("message")}
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-4 top-3 text-sm font-medium text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-600 transition-all duration-300"
                      >
                        {t("message")}
                      </label>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {t(errors.message.message as string)}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:rotate-[0.5deg] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t("sending")}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <MdEmail className="w-6 h-6" />
                          Nachricht jetzt absenden
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Direct Contact Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

              <Card className="w-full shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100/50 p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    📫 Direktkontakt
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50/80 transition-all duration-200 hover:scale-[1.02]">
                      <MdEmail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">E-Mail</div>
                        <a
                          href={`mailto:${siteConfig.contactEmail}`}
                          className="text-blue-600 hover:underline"
                        >
                          {siteConfig.contactEmail}
                        </a>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(siteConfig.contactEmail, "email")
                        }
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="E-Mail kopieren"
                      >
                        <FaCopy className="w-4 h-4" />
                      </button>
                      {copied.email && (
                        <span className="text-xs text-blue-600 font-medium">
                          Kopiert!
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50/80 transition-all duration-200 hover:scale-[1.02]">
                      <MdPhone className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">
                          Telefon
                        </div>
                        <a
                          href={`tel:${siteConfig.contactPhone}`}
                          className="text-green-600 hover:underline"
                        >
                          {siteConfig.contactPhoneDisplay}
                        </a>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(siteConfig.contactPhone, "phone")
                        }
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Telefonnummer kopieren"
                      >
                        <FaCopy className="w-4 h-4" />
                      </button>
                      {copied.phone && (
                        <span className="text-xs text-green-600 font-medium">
                          Kopiert!
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50/80 transition-all duration-200 hover:scale-[1.02]">
                      <MdLocationOn className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">
                          Standort
                        </div>
                        <a
                          href="https://maps.google.com/?q=Wetzlar,Deutschland"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline"
                        >
                          Wetzlar, Deutschland
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: AVATAR + MAPS ===== */}
          <div className="space-y-8">
            {/* Avatar Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />

              <Card className="w-full shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100/50 p-12 relative">
                <div className="relative">
                  {/* Enhanced Speech Bubble */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-2xl border border-gray-200/50 relative">
                      <p className="text-base font-medium text-slate-800 whitespace-nowrap">
                        Ich freue mich auf deine Nachricht! 💬
                      </p>
                      {/* Speech bubble tail - verbessert */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/95"></div>
                    </div>
                  </div>

                  {/* Main Image - größer */}
                  <div className="relative z-10 flex justify-center">
                    <Image
                      src={ContactImg}
                      alt={t("imageAlt")}
                      className="h-80 w-auto object-contain drop-shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-1"
                      width={400}
                      height={400}
                      style={{
                        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                      }}
                    />
                  </div>

                  {/* Floating Elements - angepasst für größere Card */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-green-500 rounded-full animate-bounce opacity-80" />
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-500 rounded-full animate-pulse opacity-60" />
                </div>
              </Card>
            </div>

            {/* Google Maps Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

              <Card className="w-full shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100/50 p-6 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <MdLocationOn className="w-6 h-6 text-purple-600" />
                    📍 Hier findest du mich
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20447.123456789!2d8.5!3d50.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc4c123456789%3A0xabcdef123456789!2sWetzlar%2C%20Deutschland!5e0!3m2!1sde!2sde!4v1234567890123"
                      width="100%"
                      height="320"
                      className="rounded-2xl border-0 shadow-lg"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* Enhanced Overlay */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-gray-200/50">
                      <p className="text-sm font-semibold text-slate-800">
                        🏢 Wetzlar, Deutschland
                      </p>
                      <p className="text-xs text-slate-600">
                        Perfekt für lokale Zusammenarbeit
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ===== SEPARATOR ===== */}
        <div className="w-full max-w-4xl">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Weitere Kontaktmöglichkeiten
              </span>
            </div>
          </div>
        </div>

        {/* ===== SOCIAL MEDIA SECTION ===== */}
        <section className="w-full max-w-4xl">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-400/20 to-blue-400/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100/50 shadow-2xl rounded-3xl p-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">
                Weitere Kontaktmöglichkeiten
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="https://wa.me/4917656120050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-2xl bg-green-50/80 hover:bg-green-100/80 border border-green-200/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <FaWhatsapp className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold text-green-800 text-lg">
                      WhatsApp
                    </div>
                    <div className="text-sm text-green-600">Schneller Chat</div>
                  </div>
                </a>

                <a
                  href={siteConfig.links.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <FaLinkedin className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold text-blue-800 text-lg">
                      LinkedIn
                    </div>
                    <div className="text-sm text-blue-600">Professionell</div>
                  </div>
                </a>

                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <FaGithub className="w-8 h-8 text-gray-800 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold text-gray-800 text-lg">
                      GitHub
                    </div>
                    <div className="text-sm text-gray-600">Code & Projekte</div>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* ===== ENHANCED ALERT DIALOG ===== */}
      {showDialog && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100/50 max-w-md mx-4">
            <AlertDialogHeader className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
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
              <AlertDialogTitle className="text-2xl font-bold text-slate-800">
                {dialogContent.title}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-center mb-8 text-slate-600 leading-relaxed text-lg">
              {dialogContent.message}
            </p>
            <AlertDialogFooter className="flex gap-4">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold h-12"
                onClick={() => {
                  router.push("/");
                }}
              >
                {t("goHome")}
              </Button>
              <Button
                onClick={() => setShowDialog(false)}
                variant="secondary"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-xl font-semibold h-12"
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
