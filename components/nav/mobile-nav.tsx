"use client";

// React and Next Imports
import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

// Utility Imports
import { Menu, ArrowRightSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Component Imports
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";

export function MobileNav({ tutoriaisSubmenu }: { tutoriaisSubmenu?: Record<string, string> }) {
  const [open, setOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setOpenSubmenu(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 border w-10 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-left">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setOpen}
            >
              <ArrowRightSquare className="mr-2 h-4 w-4" />
              <span>{siteConfig.site_name}</span>
            </MobileLink>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pr-6">
          <div className="flex flex-col">
            {Object.entries(mainMenu).map(([key, value]) => {
              const href = typeof value === 'string' ? value : value.href;
              let submenu = typeof value === 'object' && 'submenu' in value ? value.submenu : undefined;
              
              // Substituir submenu de Tutoriais por categorias dinâmicas
              if (key === 'Tutoriais' && tutoriaisSubmenu && Object.keys(tutoriaisSubmenu).length > 0) {
                submenu = tutoriaisSubmenu as any;
              }
              
              const isSubmenuOpen = openSubmenu === key;
              
              return (
                <div key={key} className="border-b last:border-b-0">
                  {submenu ? (
                    <button
                      onClick={() => toggleSubmenu(key)}
                      className="flex items-center justify-between w-full py-4 px-4 text-sm font-medium uppercase text-left hover:bg-accent transition-colors"
                    >
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <ChevronRight className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform",
                        isSubmenuOpen && "rotate-90"
                      )} />
                    </button>
                  ) : (
                    <MobileLink 
                      href={href} 
                      onOpenChange={setOpen}
                      className="flex items-center justify-between py-4 px-4 text-sm font-medium uppercase hover:bg-accent transition-colors"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </MobileLink>
                  )}
                  
                  {submenu && (
                    <div 
                      className={cn(
                        "bg-accent/50 overflow-hidden transition-all duration-300 ease-in-out",
                        isSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {Object.entries(submenu).map(([subKey, subHref]) => (
                        <MobileLink 
                          key={subKey} 
                          href={subHref} 
                          onOpenChange={setOpen}
                          className="flex items-center py-3 pl-8 pr-4 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          {subKey}
                        </MobileLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
