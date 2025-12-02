// Site Constants and Configuration

export const SITE_CONFIG = {
  // Posts configuration
  posts: {
    perSection: 3,
    perPage: 9,
    perPageAll: 100,
  },

  // Categories configuration
  categories: {
    wordpress: {
      id: 1,
      name: "WordPress",
      slug: "wordpress",
    },
    woocommerce: {
      id: 2,
      name: "WooCommerce",
      slug: "woocommerce",
    },
    elementor: {
      id: 3,
      name: "Elementor",
      slug: "elementor",
    },
  },

  // Cache configuration
  cache: {
    revalidate: 3600, // 1 hour in seconds
  },

  // SEO defaults
  seo: {
    defaultTitle: "Helio Dantas | Tutoriais WordPress",
    defaultDescription:
      "Tutoriais práticos de WordPress, dicas de desenvolvimento e otimização. Aprenda a criar sites profissionais com um desenvolvedor experiente.",
    siteName: "Helio Dantas",
  },
} as const;

// Home page sections
export const HOME_SECTIONS = [
  {
    title: "Tutoriais WordPress: Desenvolvimento e Otimização",
    description: "Guias práticos para dominar WordPress do básico ao avançado. Aprenda performance, segurança, SEO e desenvolvimento.",
    category: "wordpress",
    icon: "package",
    label: "WordPress",
    viewAllLink: "/wordpress",
  },
  {
    title: "WooCommerce: Loja Virtual Profissional",
    description: "Aprenda a criar e gerenciar sua loja online com WooCommerce. Otimização, conversão e integrações.",
    category: "woocommerce",
    icon: "shopping-cart",
    label: "WooCommerce",
    viewAllLink: "/woocommerce",
  },
  {
    title: "Elementor: Design e Personalização",
    description: "Crie páginas incríveis sem código usando o Elementor. Templates, widgets e customização avançada.",
    category: "elementor",
    icon: "palette",
    label: "Elementor",
    viewAllLink: "/elementor",
  },
] as const;
