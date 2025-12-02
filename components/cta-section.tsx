import Link from "next/link";

export const CTASection = () => {
  return (
    <section 
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage: 'url(/background-hero-helio-dantas-wordprss.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay preto */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
          Pronto para dominar WordPress?
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Junte-se a 50.000+ desenvolvedores que recebem tutoriais 
          semanais no seu email
        </p>

        <form className="max-w-md mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/40"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 transition-all whitespace-nowrap inline-flex items-center justify-center gap-2"
            >
              Assinar Newsletter
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </form>

        <p className="text-sm text-white/80 flex items-center justify-center gap-2">
          <span>✅</span>
          <span>Sem spam. Cancele quando quiser.</span>
        </p>
      </div>
    </section>
  );
};
