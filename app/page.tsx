// Craft Imports
import { Section, Container } from "@/components/craft";

// Component Imports
import { Hero } from "@/components/hero";
import { CategoryBanner } from "@/components/category-banner";
import { PostsSection } from "@/components/posts/posts-section";
import { CTASection } from "@/components/cta-section";

// Next.js Imports
import type { Metadata } from "next";

// WordPress API
import { getAllPosts } from "@/lib/wordpress";

// Constants
import { SITE_CONFIG, HOME_SECTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE_CONFIG.seo.defaultTitle,
  description: SITE_CONFIG.seo.defaultDescription,
};

// This page is using the craft.tsx component and design system
export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, SITE_CONFIG.posts.perSection);
  const wordpressPosts = posts.slice(0, 6); // 6 posts para a primeira seção

  return (
    <>
      {/* Hero Section */}
      <Hero
        badge="🚀 Novo: Tutorial WordPress 6.4"
        title="Tutoriais WordPress e"
        highlightedText="Desenvolvimento Web"
        subtitle="Aprenda WordPress do básico ao avançado: otimização, plugins, temas e desenvolvimento headless com Next.js"
        primaryCTA={{
          text: "Ver Últimos Tutoriais",
          href: "/artigos",
        }}
        secondaryCTA={{
          text: "Explorar Categorias",
          href: "/categorias",
        }}
        stats={[
          { value: "150+", label: "Tutoriais" },
          { value: "50k+", label: "Leitores/mês" },
          { value: "4.9★", label: "Avaliação" },
        ]}
        breadcrumb="Início → WordPress & Desenvolvimento"
      />

      {/* Category Sections */}
      {HOME_SECTIONS.map((section, index) => (
        index === 1 ? (
          <section 
            key={section.category}
            className="py-20 relative overflow-hidden"
            style={{
              backgroundImage: 'url(/background-hero-helio-dantas-wordprss.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderTop: '2px solid white',
              borderBottom: '2px solid white',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <Container className="relative z-10 !max-w-[1400px] !p-0 sm:!p-6 md:!p-8">
              <CategoryBanner 
                title={section.title}
                description={section.description}
                icon={section.icon}
                label={section.label}
                viewAllLink={section.viewAllLink}
                viewAllText={`Ver todos os tutoriais ${section.label}`}
                isFirstSection={true}
              />
              <PostsSection posts={latestPosts} showViewAllButton={false} />
            </Container>
          </section>
        ) : index === 0 ? (
          <Section key={section.category} className="py-20 border-t border-gray-100 dark:border-gray-800">
            <Container className="!max-w-[1400px] !p-0 sm:!p-6 md:!p-8">
              <CategoryBanner 
                title={section.title}
                description={section.description}
                icon={section.icon}
                label={section.label}
                viewAllLink={section.viewAllLink}
                viewAllText={`Ver todos os tutoriais ${section.label}`}
                isFirstSection={false}
              />
              <PostsSection posts={wordpressPosts} showViewAllButton={false} />
            </Container>
          </Section>
        ) : (
          <Section key={section.category} className="py-20 border-t border-gray-100 dark:border-gray-800">
            <Container className="!max-w-[1400px] !p-0 sm:!p-6 md:!p-8">
              <CategoryBanner 
                title={section.title}
                description={section.description}
                icon={section.icon}
                label={section.label}
                viewAllLink={section.viewAllLink}
                viewAllText={`Ver todos os tutoriais ${section.label}`}
                isFirstSection={false}
              />
              <PostsSection posts={latestPosts} showViewAllButton={false} />
            </Container>
          </Section>
        )
      ))}

      {/* CTA Newsletter */}
      <CTASection />
    </>
  );
}
