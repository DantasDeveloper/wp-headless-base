// Define the menu items
export const mainMenu = {
  Início: "/",
  Tutoriais: {
    href: "/tutorials",
    submenu: {
      "WordPress Básico": "/tutorials/wordpress-basico",
      "WordPress Avançado": "/tutorials/wordpress-avancado",
      "Otimização": "/tutorials/otimizacao",
      "Segurança": "/tutorials/seguranca",
      "cPanel": "/tutorials/cpanel",
    }
  },
  Recursos: {
    href: "/recursos",
    submenu: {
      "Ferramentas Recomendadas": "/recursos/ferramentas-recomendadas",
      "Plugins Essenciais": "/recursos/plugins-essenciais",
      "Temas": "/recursos/temas",
    }
  },
  planos: "/planos",
  Artigos: "/artigos",
  contato: "/contato",
};

export const contentMenu = {
  Categorias: "/categorias",
  Tags: "/artigos/tags",
  Autores: "/artigos/authors",
};
