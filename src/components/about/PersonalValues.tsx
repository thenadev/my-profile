"use client";

import { Card } from "@/components/ui/card";

const PersonalValues: React.FC = () => {
  return (
    <section className="w-full space-y-8">
      <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
        Was mich antreibt
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Innovation */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

          <Card className="w-full shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Innovation
            </h3>
            <p className="text-slate-600 text-sm">
              Ich liebe es, neue Technologien zu erkunden und innovative
              Lösungen zu entwickeln, die echten Mehrwert schaffen.
            </p>
          </Card>
        </div>

        {/* Quality */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

          <Card className="w-full shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Qualität
            </h3>
            <p className="text-slate-600 text-sm">
              Sauberer Code, nachhaltige Architekturen und
              benutzerfreundliche Lösungen stehen im Mittelpunkt meiner
              Arbeit.
            </p>
          </Card>
        </div>

        {/* Collaboration */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

          <Card className="w-full shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Zusammenarbeit
            </h3>
            <p className="text-slate-600 text-sm">
              Der beste Code entsteht im Team. Ich schätze offene
              Kommunikation und den Austausch von Wissen und Erfahrungen.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PersonalValues; 