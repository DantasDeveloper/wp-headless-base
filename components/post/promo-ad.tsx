import Link from "next/link";

export function PromoAd() {
  return (
    <div className="w-[95%] lg:w-[325px] mx-auto lg:mx-0 h-auto min-h-[350px] bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-shadow">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-4">
            PROMOÇÃO
          </span>
          <h3 className="font-bold text-2xl mb-3 leading-tight">
            Aprenda WordPress do Zero!
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            Curso completo de WordPress com certificado. 
            De iniciante a profissional em 8 semanas.
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">50% OFF</span>
          </div>
          <Link
            href="/planos"
            className="block w-full bg-white text-blue-900 text-center font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Saiba Mais
          </Link>
        </div>
      </div>
    </div>
  );
}
