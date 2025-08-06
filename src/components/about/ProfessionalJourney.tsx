"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Car, Music, Users, Zap } from "lucide-react";

const ProfessionalJourney: React.FC = () => {
  return (
    <section className="w-full space-y-8">
      <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
        Ein paar Karriere-Highlights
      </h2>

      <div className="max-w-6xl mx-auto">
        {/* Valtech Case Study Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded-2xl blur-sm -z-10" />

          <Card className="w-full shadow-md bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="pb-6 border-b border-gray-100">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Valtech Mobility GmbH
                </CardTitle>
                <p className="text-base text-gray-600">
                  Porsche & Audi Projekte
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Media Section */}
                <div className="lg:col-span-1 space-y-4 pl-4 py-6">
                  <video
                    src="/about/valtech_testfahrt.mp4"
                    className="w-full aspect-video object-cover rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <video
                    src="/about/valtech_short.mp4"
                    className="w-full aspect-video object-cover rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                {/* Content Section */}
                <div className="lg:col-span-1 p-8 space-y-10 ">
                  {/* Tätigkeit */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">Tätigkeit</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Beratung & Umsetzung für Porsche und Audi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Tägliche Gespräche mit internen Entwicklerteams
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Integration von Apple Music, Spotify, Apple Podcasts
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Verantwortung */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">
                        Verantwortung
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>QR-Code Login für Porsche & Audi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Premium UX in Automotive-Kontext</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Entwicklung innovativer Fahrzeugfunktionen</span>
                      </li>
                    </ul>
                  </div>

                  {/* Learnings */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">Learnings</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Fokus auf Teamarbeit & hohe Softwarequalität
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Premium UX in Automotive-Kontext</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Wie es sich anfühlt, in einem Porsche zu sitzen 😄
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Angular
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Agile
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Apple Integration
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        QR-Code Login
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalJourney;
