"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, Globe, Users, Zap } from "lucide-react";
import Image from "next/image";

const BlockchainSection: React.FC = () => {
  return (
    <section className="w-full space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Digitalsocial.ID Case Study Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded-2xl blur-sm -z-10" />

          <Card className="w-full shadow-md bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="pb-6 border-b border-gray-100">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Digitalsocial.ID Ltd.
                </CardTitle>
                <p className="text-base text-gray-600">
                  Blockchain-Startup für digitale Identitäten
                </p>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-700">
                      European Blockchain Convention 2023
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Als Mitglied des Teams war ich bei der European Blockchain
                    Convention in Barcelona dabei. Eine aufregende Erfahrung,
                    bei der wir Digitalsocial.ID einem internationalen Publikum
                    präsentiert haben.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Barcelona, Spanien
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content Section */}
                <div className="lg:col-span-1 p-8 space-y-6">
                  {/* Tätigkeit */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">Tätigkeit</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Entwicklung innovativer Blockchain-Lösungen für
                          digitale Identitäten
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Arbeit im Team von Simon Molitor an sicheren und
                          dezentralen Identitätsverwaltungssystemen
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Schnittstelle zwischen Technologie und Gesellschaft
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Verantwortung */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">
                        Verantwortung
                      </h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Blockchain-Technologie für digitale Identitäten
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Dezentrale Identitätsverwaltungssysteme</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Präsentation bei der European Blockchain Convention
                          2023
                        </span>
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
                          Tiefe Einblicke in Blockchain-Technologie und digitale
                          Identität
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Zukunft der digitalen Identität und Web3</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Internationale Präsentation bei der European
                          Blockchain Convention in Barcelona
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Blockchain
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Solana
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Digital Identity
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Web3
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Startup
                      </span>
                    </div>
                  </div>
                </div>

                {/* Media Section */}
                <div className="lg:col-span-1 space-y-4 pr-4 pt-6">
                  {/* Images */}
                  <div className="space-y-4">
                    <Image
                      src="/about/dsid_stand.jpg"
                      alt="DSID Präsentation"
                      className="w-full h-60 object-cover rounded-lg"
                      width={900}
                      height={600}
                    />
                    <Image
                      src="/about/dsid_stage.jpg"
                      alt="DSID Stand bei der European Blockchain Convention"
                      className="w-full h-60 object-cover rounded-lg"
                      width={900}
                      height={600}
                    />
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

export default BlockchainSection;
