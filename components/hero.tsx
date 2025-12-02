import Link from "next/link";
import { Layers } from "lucide-react";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  stats?: HeroStat[];
  breadcrumb?: string;
}

export const Hero = ({
  badge = "🚀 Novo: Tutorial WordPress 6.4",
  title = "Tutoriais WordPress e",
  highlightedText = "Desenvolvimento Web",
  subtitle = "Aprenda WordPress do básico ao avançado: otimização, plugins, temas e desenvolvimento headless com Next.js",
  primaryCTA,
  secondaryCTA,
  stats = [
    { value: "150+", label: "Tutoriais" },
    { value: "50k+", label: "Leitores/mês" },
    { value: "4.9★", label: "Avaliação" },
  ],
  breadcrumb = "Início → WordPress & Desenvolvimento",
}: HeroProps) => {
  return (
    <section 
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'url(/background-hero-helio-dantas-wordprss.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay preto */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32 z-10">
        {/* Grid de duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Coluna Esquerda - Informações */}
          <div className="text-left">
            {/* Breadcrumb */}
            {breadcrumb && (
              <nav className="text-sm text-white/80 mb-6 font-medium">
                {breadcrumb}
              </nav>
            )}

            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full mb-6 text-xs sm:text-sm font-semibold text-white">
                <span>{badge}</span>
              </div>
            )}

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              {title}{" "}
              <span className="text-white">
                {highlightedText}
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-10 leading-relaxed">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href={primaryCTA.href}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all hover:scale-105 hover:shadow-xl shadow-indigo-500/20"
              >
                {primaryCTA.text}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 transition-all hover:shadow-lg"
              >
                <Layers className="w-5 h-5" />
                {secondaryCTA.text}
              </Link>
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-white/70 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coluna Direita - Imagem */}
          <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="/helio-dantas-logo-wordpress-hero.png"
                alt="Helio Dantas WordPress"
                className="w-full h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
