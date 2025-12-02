import { ReactNode } from "react";
import Link from "next/link";
import { Package, ShoppingCart, Palette } from "lucide-react";

interface CategoryBannerProps {
  title: string;
  description?: string;
  icon?: string;
  label?: string;
  viewAllLink?: string;
  viewAllText?: string;
  children?: ReactNode;
  className?: string;
  isFirstSection?: boolean;
}

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case "package":
      return Package;
    case "shopping-cart":
      return ShoppingCart;
    case "palette":
      return Palette;
    default:
      return null;
  }
};

export const CategoryBanner = ({
  title,
  description,
  icon = "📦",
  label,
  viewAllLink,
  viewAllText = "Ver todos os tutoriais",
  children,
  className = "",
  isFirstSection = false,
}: CategoryBannerProps) => {
  return (
    <div className={`max-w-4xl mx-auto text-center mb-12 md:mb-16 px-4 ${className}`}>
      {/* Label com ícone */}
      {label && (() => {
        const IconComponent = getIconComponent(icon);
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 ${
            isFirstSection 
              ? 'bg-white/10 border border-white/20 backdrop-blur-sm text-white' 
              : 'bg-gray-100 dark:bg-gray-800'
          }`}>
            {IconComponent ? (
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <span className="text-base sm:text-lg">{icon}</span>
            )}
            <span>{label}</span>
          </div>
        );
      })()}

      {/* Título */}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 leading-tight ${
        isFirstSection ? 'text-white' : ''
      }`}>
        {title}
      </h2>

      {/* Descrição */}
      {description && (
        <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto ${
          isFirstSection ? 'text-white/90' : 'text-muted-foreground'
        }`}>
          {description}
        </p>
      )}

      {/* Link para ver todos */}
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className={`inline-flex items-center gap-2 font-semibold group ${
            isFirstSection 
              ? 'text-white hover:text-white/80' 
              : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300'
          }`}
        >
          {viewAllText}
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
      )}

      {children}
    </div>
  );
};
