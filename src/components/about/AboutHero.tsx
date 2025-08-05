"use client";

const AboutHero: React.FC = () => {
  return (
    <section className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent mb-6 animate-fadeIn">
        Über mich
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-200">
        Entdecke die Person hinter dem Code - meine Leidenschaft für
        Technologie, meine Reise als Entwickler und was mich antreibt.
      </p>
    </section>
  );
};

export default AboutHero;
