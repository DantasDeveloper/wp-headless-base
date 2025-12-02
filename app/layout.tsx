import "./globals.css";

import { Section, Container } from "@/components/craft";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MobileNav } from "@/components/nav/mobile-nav";
import { DropdownMenuItem } from "@/components/nav/dropdown-menu-item";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "@/components/ui/button";

import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import { getCategoryBySlug, getCategoriesByParent } from "@/lib/wordpress";

import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Helio Dantas | Tutoriais WordPress",
  description:
    "Tutoriais práticos de WordPress, dicas de desenvolvimento e otimização. Aprenda a criar sites profissionais com um desenvolvedor experiente.",
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Buscar dinamicamente as categorias filhas de "Tutoriais"
  let tutoriaisSubmenu: Record<string, string> = {};
  try {
    const tutoriaisCategory = await getCategoryBySlug("tutoriais");
    if (tutoriaisCategory) {
      const childCategories = await getCategoriesByParent(tutoriaisCategory.id);
      tutoriaisSubmenu = childCategories.reduce((acc, cat) => {
        acc[cat.name] = `/${cat.slug}`;
        return acc;
      }, {} as Record<string, string>);
    }
  } catch (error) {
    console.error("Erro ao buscar categorias de Tutoriais:", error);
  }

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased overflow-x-hidden", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="sun"
          enableSystem
          disableTransitionOnChange
        >
          <Nav tutoriaisSubmenu={tutoriaisSubmenu} />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id, tutoriaisSubmenu }: NavProps & { tutoriaisSubmenu?: Record<string, string> }) => {
  return (
    <nav
      className={cn("sticky z-50 top-0 bg-background", "border-b", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-4 items-center"
          href="/"
        >
          <Image
            src={Logo}
            alt="Logo"
            loading="eager"
            className="dark:invert"
            width={42}
            height={26.44}
          ></Image>
          <h2 className="text-sm">{siteConfig.site_name}</h2>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, value]) => {
              const href = typeof value === 'string' ? value : value.href;
              let submenu = typeof value === 'object' && 'submenu' in value ? value.submenu : undefined;
              
              // Substituir submenu de Tutoriais por categorias dinâmicas
              if (key === 'Tutoriais' && tutoriaisSubmenu && Object.keys(tutoriaisSubmenu).length > 0) {
                submenu = tutoriaisSubmenu as any;
              }
              
              return (
                <DropdownMenuItem 
                  key={key}
                  label={key}
                  href={href}
                  submenu={submenu}
                />
              );
            })}
          </div>
          <Button asChild className="hidden sm:flex">
            <Link href="https://central.hospedainfo.com/aff.php?aff=829">Contratar Hospedagem</Link>
          </Button>
          <MobileNav tutoriaisSubmenu={tutoriaisSubmenu} />
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre/Bio com avatar */}
          <div className="flex flex-col gap-6 text-center items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                HD
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg">Hélio Dantas</h3>
                <p className="text-gray-400 text-sm">WordPress Developer</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed text-center">
              Desenvolvedor WordPress há 8+ anos. Especialista em performance, 
              SEO e arquitetura headless. Já trabalhei com 100+ projetos WordPress 
              e ajudo desenvolvedores a criar sites profissionais.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 items-center">
            <h5 className="font-bold text-base uppercase tracking-wide">Website</h5>
            <div className="flex flex-col gap-3 items-center">
              {Object.entries(mainMenu).map(([key, value]) => {
                const href = typeof value === 'string' ? value : value.href;
                return (
                  <Link
                    className="w-[186px] h-[40px] border border-white/20 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    key={key}
                    href={href}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col gap-4 items-center">
            <h5 className="font-bold text-base uppercase tracking-wide">Blog</h5>
            <div className="flex flex-col gap-3 items-center">
              {Object.entries(contentMenu).map(([key, href]) => (
                <Link
                  className="w-[186px] h-[40px] border border-white/20 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  key={href}
                  href={href}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col gap-4 items-center">
            <h5 className="font-bold text-base uppercase tracking-wide">
              Social Link
            </h5>
            <div className="flex flex-col gap-3 items-center">
              <Link 
                href="https://instagram.com/heliodantas.dev" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-[186px] h-[40px] border border-white/20 rounded flex items-center gap-3 px-3 hover:bg-white/10 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm text-white">Instagram | Seguir</span>
              </Link>

              <Link 
                href="https://wa.me/5571983180358" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-[186px] h-[40px] border border-white/20 rounded flex items-center gap-3 px-3 hover:bg-white/10 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm text-white">WhatsApp | Chat</span>
              </Link>

              <Link 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-[186px] h-[40px] border border-white/20 rounded flex items-center gap-3 px-3 hover:bg-white/10 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-sm text-white">YouTube | Gostei</span>
              </Link>

              <Link 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-[186px] h-[40px] border border-white/20 rounded flex items-center gap-3 px-3 hover:bg-white/10 transition-colors group"
              >
                <svg className="w-6 h-6 text-white group-hover:text-gray-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm text-white">Twitter | Seguir</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} <a href="https://9d8.dev" className="hover:text-white transition-colors">Hélio Dantas</a> - Todos os direitos reservados
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
