import { Section, Container } from "@/components/craft";
import { PricingCard } from "@/components/pricing-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos de Manutenção WordPress",
  description: "Escolha o plano ideal de manutenção WordPress para seu site ou blog",
};

const pricingPlans = [
  {
    title: "Básico",
    subtitle: "Recomendado para Blogs",
    price: "R$139,00",
    originalPrice: "R$220",
    popular: false,
    recommended: false,
    features: [
      { text: "Manutenção dos serviços inatos WP", included: true },
      { text: "Diagnóstico de erros, bugs e conflitos", included: true },
      { text: "Atualização do core, temas e plugins", included: true },
      { text: "Alterações em nível de servidor (cPanel)", included: false },
      { text: "Serviço de emergência", included: true },
      { text: "Busca por links quebrados (SEO)", included: false },
      { text: "Limpezas de arquivos, transientes e do banco de dados", included: true },
      { text: "Contato direto com Desenvolvedor", included: true },
      { text: "1 hora / mês", included: true },
      { text: "1 preventiva / mês", included: true },
      { text: "Programação", included: false },
      { text: "Design", included: false },
      { text: "Criação de novas funcionalidades", included: false },
      { text: "Alteração de plugins de terceiros", included: false },
      { text: "Interagir com o suporte da sua hospedagem", included: false },
      { text: "Instalação e atualização de temas e plugins premium", included: false },
    ],
  },
  {
    title: "Essencial",
    subtitle: "Esteja sempre preparado",
    price: "R$259,00",
    originalPrice: "R$330",
    popular: false,
    recommended: true,
    features: [
      { text: "Manutenção dos serviços inatos WP", included: true },
      { text: "Diagnóstico de erros, bugs e conflitos", included: true },
      { text: "Atualização do core, temas e plugins", included: true },
      { text: "Alterações em nível de servidor (cPanel)", included: false },
      { text: "Serviço de emergência", included: true },
      { text: "Busca por links quebrados (SEO)", included: true },
      { text: "Limpezas de arquivos, transientes e do banco de dados", included: true },
      { text: "Contato direto com Desenvolvedor", included: true },
      { text: "2 horas / mês", included: true },
      { text: "1 preventiva / mês", included: true },
      { text: "Programação", included: true },
      { text: "Design", included: true },
      { text: "Criação de novas funcionalidades", included: true },
      { text: "Alteração de plugins de terceiros", included: false },
      { text: "Interagir com o suporte da sua hospedagem", included: false },
      { text: "Instalação e atualização de temas e plugins premium", included: false },
    ],
  },
  {
    title: "Premium",
    subtitle: "Serviço Completo",
    price: "R$369,00",
    originalPrice: "R$530",
    popular: true,
    recommended: false,
    features: [
      { text: "Manutenção dos serviços inatos WP", included: true },
      { text: "Diagnóstico de erros, bugs e conflitos", included: true },
      { text: "Atualização do core, temas e plugins", included: true },
      { text: "Alterações em nível de servidor (cPanel)", included: true },
      { text: "Serviço de emergência", included: true },
      { text: "Busca por links quebrados (SEO)", included: true },
      { text: "Limpezas de arquivos, transientes e do banco de dados", included: true },
      { text: "Contato direto com Desenvolvedor", included: true },
      { text: "4 horas / mês", included: true },
      { text: "1 preventiva / mês", included: true },
      { text: "Programação", included: true },
      { text: "Design", included: true },
      { text: "Criação de novas funcionalidades", included: true },
      { text: "Alteração de plugins de terceiros", included: false },
      { text: "Interagir com o suporte da sua hospedagem", included: false },
      { text: "Instalação e atualização de temas e plugins premium", included: false },
    ],
  },
  {
    title: "Empresarial",
    subtitle: "Para sites profissionais",
    price: "R$469,00",
    originalPrice: "R$690",
    popular: false,
    recommended: false,
    features: [
      { text: "Manutenção dos serviços inatos WP", included: true },
      { text: "Diagnóstico de erros, bugs e conflitos", included: true },
      { text: "Atualização do core, temas e plugins", included: true },
      { text: "Alterações em nível de servidor (cPanel)", included: true },
      { text: "Serviço de emergência", included: true },
      { text: "Busca por links quebrados (SEO)", included: true },
      { text: "Limpezas de arquivos, transientes e do banco de dados", included: true },
      { text: "Contato direto com Desenvolvedor", included: true },
      { text: "6 horas / mês", included: true },
      { text: "1 preventiva / mês", included: true },
      { text: "Programação", included: true },
      { text: "Design", included: true },
      { text: "Criação de novas funcionalidades", included: true },
      { text: "Alteração de plugins de terceiros", included: true },
      { text: "Interagir com o suporte da sua hospedagem", included: true },
      { text: "Instalação e atualização de temas e plugins premium", included: true },
    ],
  },
];

export default function PlanosPage() {
  return (
    <section 
      className="py-8 sm:py-16 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/background-hero-helio-dantas-wordprss.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay preto */}
      <div className="absolute inset-0 bg-black/40" />
      
      <Container className="px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Planos de Manutenção
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
            Mantenha seu site WordPress seguro, atualizado e funcionando perfeitamente
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              originalPrice={plan.originalPrice}
              features={plan.features}
              recommended={plan.recommended}
              popular={plan.popular}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-white/80">
            Todos os planos incluem suporte técnico especializado e manutenção preventiva mensal.
          </p>
          <p className="text-sm text-white/70">
            * As horas mensais podem ser utilizadas para programação, design e criação de funcionalidades conforme disponibilidade do plano.
          </p>
        </div>
      </Container>
    </section>
  );
}
