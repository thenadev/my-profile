"use client";

import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

// Kundenlogos
const clientLogos = [
  { name: "Porsche", logo: "/customer/porsche.png" },
  { name: "Audi", logo: "/customer/audi.png" },
  { name: "Valtech Mobility", logo: "/customer/valtech-mobility.png" },
  { name: "Tricon", logo: "/customer/tricon.svg" },
  { name: "Alcedis", logo: "/customer/alcedis.png" },
];

// Testimonials
const testimonials = [
  {
    name: "Amsel UG",
    company: "E-Commerce Unternehmen",
    text: "Dank des Redesigns hat unsere Website jetzt ein komplett neues Aussehen und unsere Kunden interagieren viel häufiger mit unseren Angeboten. Die Zusammenarbeit war professionell und effizient.",
    rating: 5,
  },
  {
    name: "Tricon GmbH",
    company: "Technologieunternehmen",
    text: "Professionelle Umsetzung unserer Unternehmenswebsite. Schnelle Reaktionszeiten und sehr zufriedenstellendes Ergebnis. Die SEO-Optimierung zeigt bereits erste Erfolge.",
    rating: 5,
  },
];

export default function UnternehmenswebsiteSocialProof() {
  return (
    <>
      {/* Social Proof - Kundenlogos */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Vertrauen Sie auf unsere Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wir haben bereits für namhafte Unternehmen erfolgreich Websites
            entwickelt
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="w-32 h-16 flex items-center justify-center rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white p-4 shadow-sm"
            >
              <Image
                src={client.logo}
                alt={`${client.name} Logo`}
                width={96}
                height={40}
                className="max-w-24 max-h-10 object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Was unsere Kunden sagen
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
