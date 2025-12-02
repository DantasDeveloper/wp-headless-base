import { ReactNode } from "react";

interface BannerProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
  height?: "small" | "medium" | "large" | "full";
}

export const Banner = ({
  title,
  subtitle,
  children,
  className = "",
  backgroundImage,
  overlay = true,
  height = "large",
}: BannerProps) => {
  const heightClasses = {
    small: "min-h-[300px]",
    medium: "min-h-[400px]",
    large: "min-h-[500px]",
    full: "min-h-screen",
  };

  return (
    <section
      className={`relative w-full ${heightClasses[height]} flex items-center justify-center overflow-hidden ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      )}

      {/* Gradient Background (quando não há imagem) */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-secondary dark:from-primary/20 dark:via-accent dark:to-secondary/80" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground dark:text-white">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground dark:text-gray-200 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
