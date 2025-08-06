"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Target, Trophy, Users, Zap } from "lucide-react";
import Image from "next/image";

const PersonalStory: React.FC = () => {
  return (
    <section className="w-full space-y-16">
      {/* SECTION 1: Intro & Tech-Story (2-Spalten Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Text Content - 60% */}
        <div className="lg:col-span-3 space-y-6 max-w-prose">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Die Person hinter dem Code
          </h2>
          <div className="space-y-6">
            <p className="text-xl font-medium text-slate-700 leading-relaxed">
              Hi, ich bin Thomas – Fullstack-Freelancer mit{" "}
              <span className="font-semibold">Tech-Leidenschaft</span> und{" "}
              <span className="font-semibold">Startup-DNA</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              Meine Begeisterung für Technik begann früh – wie bei vielen
              anderen auch, zunächst mit Spielekonsolen, später mit meinem
              ersten Computer. Der entscheidende Moment kam aber beim Abitur: Im
              Fach EDV merkte ich zum ersten Mal, wie sehr mich
              Softwareentwicklung fesselt. Die Stunden verflogen – und damit war
              klar, dass ich daraus mehr machen will.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Nach meinem Studium der{" "}
              <span className="font-semibold">Informatik</span> an der
              Technischen Hochschule Mittelhessen in Gießen habe ich meine
              Leidenschaft für Softwareentwicklung zum Beruf gemacht.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Heute entwickle ich Web- und Mobile-Anwendungen mit{" "}
              <span className="font-semibold">Next.js</span>,{" "}
              <span className="font-semibold">React</span>,{" "}
              <span className="font-semibold">Tailwind</span> und{" "}
              <span className="font-semibold">TypeScript</span> im Frontend
              sowie <span className="font-semibold">Python</span> und{" "}
              <span className="font-semibold">KI-Anbindungen</span> im Backend.
              Ich liebe{" "}
              <span className="font-semibold">Greenfield-Projekte</span>, bei
              denen ich von Anfang an mitdenken, mitgestalten und skalierbare
              Architekturen aufbauen kann.
            </p>
          </div>
        </div>

        {/* Image - 40% */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

            <Card className="w-full shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/50 overflow-hidden hover:scale-[1.02] transition-all duration-300">
              <Image
                src="/about/dsid_me.jpg"
                alt="Thomas Schwabauer - DSID Digitalsocial.ID Portrait"
                className="w-full aspect-square object-cover transition-all duration-300 group-hover:scale-105"
                width={400}
                height={400}
                style={{
                  filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
                }}
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-slate-800">
                    Entwickler-Modus
                  </h4>
                </div>
                <p className="text-sm text-slate-600">
                  Konzentriert bei der Arbeit an innovativen Lösungen
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* SECTION 2: Arbeitsweise & Werte (Full Width Cards) */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold tracking-tight text-slate-800 mb-4">
            Mein Arbeitsstil
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Je nach Projektphase bringe ich die passende Herangehensweise mit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-blue-600 font-semibold mb-2">Strategisch</h4>
              <p className="text-sm text-slate-600">
                Architektur und Skalierung
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-purple-600 font-semibold mb-2">Kreativ</h4>
              <p className="text-sm text-slate-600">UX und UI Design</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-green-600 font-semibold mb-2">Pragmatisch</h4>
              <p className="text-sm text-slate-600">MVP schnell live</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-prose mx-auto text-center space-y-4">
          <h4 className="text-xl font-semibold text-blue-600">
            Warum ich am liebsten mit Startups arbeite
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Ich arbeite gerne mit Menschen, die für ihre Ideen brennen. Genau
            das finde ich bei Gründer:innen, Startups und Einzelpersonen mit
            einer klaren Vision. Mir ist wichtig, nicht nur umzusetzen, sondern
            auch mitzudenken, zu hinterfragen und Verantwortung zu übernehmen.
            Ich bin kein Entwickler, der nur Tasks abarbeitet – sondern ein{" "}
            <span className="font-semibold">Sparringspartner</span>, der ehrlich
            kommuniziert, mitdenkt aber auch umsetzt.
          </p>
        </div>
      </div>

      {/* SECTION 3: Hintergrund & Bodybuilding (Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Text Content - 60% */}
        <div className="lg:col-span-3 space-y-6 max-w-prose">
          <h3 className="text-2xl font-bold tracking-tight text-slate-800">
            Persönlich motiviert, technisch neugierig
          </h3>

          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <blockquote className="text-slate-700 italic">
                "Wenn ich in der Karriere hätte weiter gehen können, hätte ich
                das gemacht."
              </blockquote>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Meine Eltern kamen als Russlanddeutsche nach Deutschland zurück
              und mussten sich hier ein neues Leben aufbauen. Dieser Satz meines
              Vaters begleitet mich bis heute. Er motiviert mich, mutig zu sein,
              Verantwortung zu übernehmen und neue Wege zu gehen – sowohl im
              Leben als auch in der Technik.
            </p>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Wenn ich nicht code, findet man mich wahrscheinlich im Gym oder bei
            Marvel-Filmen im Kino oder beim Essen. Ich betreibe{" "}
            <span className="font-semibold">Natural Bodybuilding</span> – 2018
            stand ich bei der GNBF auf der Bühne und holte den 2. Platz bei der
            Kategorie Junior Bodybuilding bis 21 Jahre Über 75kg.
          </p>
        </div>

        {/* Image - 40% */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-md -z-20 group-hover:blur-lg transition-all duration-300" />

            <Card className="w-full shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/50 overflow-hidden hover:scale-[1.02] transition-all duration-300 p-0">
              <Image
                src="/about/gnbf_placing.jpg"
                alt="Thomas Schwabauer - GNBF Bodybuilding Wettkampf 2018, 2. Platz"
                className="w-full aspect-[4/3] object-contain transition-all duration-300 group-hover:scale-105"
                width={400}
                height={300}
                style={{
                  filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
                }}
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-slate-800">
                    GNBF 2018 - 2. Platz
                  </h4>
                </div>
                <p className="text-sm text-slate-600">
                  Natural Bodybuilding - Deutsche Meisterschaft
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalStory;
