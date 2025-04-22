import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  companyName: z.string().min(2, "Bitte geben Sie einen Firmennamen ein"),
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(10, "Bitte geben Sie eine gültige Telefonnummer ein"),
  address: z.string().min(10, "Bitte geben Sie eine gültige Adresse ein"),
  city: z.string().min(2, "Bitte geben Sie eine Stadt ein"),
  zipCode: z.string().min(5, "Bitte geben Sie eine gültige Postleitzahl ein"),
  additionalInfo: z.string().optional(),
});

interface CheckoutFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  design: string;
  pages: number;
  features: string[];
  additional: string[];
  basePrice: number;
  monthlyPrice: number;
  skippedConfig: boolean;
}

export const CheckoutForm = forwardRef<
  { handleSubmit: () => void },
  CheckoutFormProps
>(
  (
    {
      onSubmit,
      design,
      pages,
      features,
      additional,
      basePrice,
      monthlyPrice,
      skippedConfig,
    },
    ref
  ) => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        companyName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        additionalInfo: "",
      },
    });

    const handleSubmit = async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const formData = form.getValues();
        try {
          const response = await fetch("/api/sendWebsiteRequest", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              design,
              pages,
              features,
              additional,
              basePrice,
              monthlyPrice,
              skippedConfig,
            }),
          });

          if (!response.ok) {
            throw new Error("Fehler beim Senden der Anfrage");
          }

          onSubmit(formData);
        } catch (error) {
          console.error("Fehler beim Senden der Anfrage:", error);
          alert(
            "Es gab einen Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut."
          );
        }
      }
    };

    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firmenname</FormLabel>
                  <FormControl>
                    <Input placeholder="Ihre Firma GmbH" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorname</FormLabel>
                  <FormControl>
                    <Input placeholder="Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachname</FormLabel>
                  <FormControl>
                    <Input placeholder="Mustermann" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="max@mustermann.de" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input placeholder="+49 123 456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Musterstraße 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stadt</FormLabel>
                  <FormControl>
                    <Input placeholder="Berlin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postleitzahl</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zusätzliche Informationen</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Haben Sie noch weitere Wünsche oder Anforderungen?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
);
