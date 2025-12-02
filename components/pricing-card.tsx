import { Check, X, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordPressIcon } from "@/components/icons/wordpress";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  features: PricingFeature[];
  recommended?: boolean;
  popular?: boolean;
  className?: string;
}

export const PricingCard = ({
  title,
  subtitle,
  price,
  originalPrice,
  features,
  recommended = false,
  popular = false,
  className,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-6 sm:p-8 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 w-full",
        recommended && "border-primary/50 shadow-md ring-2 ring-primary/20",
        className
      )}
    >
      {/* Badge/Tag */}
      {(recommended || popular) && (
        <div className="absolute -top-3 left-6 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          <Bookmark className="w-4 h-4 fill-current" />
          {recommended && "RECOMENDADO"}
          {popular && !recommended && "POPULAR"}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 relative">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-medium pr-10">
          {title}
        </div>
        <div className="text-sm text-muted-foreground mb-4 pr-10">{subtitle}</div>
        
        {/* WordPress Icon */}
        <div className="absolute top-0 right-0">
          <WordPressIcon className="text-muted-foreground/30 dark:text-muted-foreground/20" width={28} height={28} />
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          {originalPrice && (
            <span className="text-base sm:text-lg text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-bold whitespace-nowrap">{price}</span>
            <span className="text-sm text-muted-foreground whitespace-nowrap">/mês</span>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="flex-1 space-y-2 sm:space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 sm:gap-3">
            {feature.included ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
            )}
            <span className={cn(
              "text-xs sm:text-sm leading-relaxed",
              !feature.included && "text-muted-foreground"
            )}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="space-y-2 sm:space-y-3 mt-auto">
        <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 border border-primary text-primary hover:bg-primary/5 rounded-md text-sm font-medium transition-colors">
          FAZER PERGUNTA
        </button>
        <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-accent hover:bg-accent/80 text-accent-foreground rounded-md text-sm font-medium transition-colors">
          SOLICITAR SERVIÇO
        </button>
      </div>
    </div>
  );
};
