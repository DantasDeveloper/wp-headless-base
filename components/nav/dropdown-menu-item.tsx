"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface DropdownMenuItemProps {
  label: string;
  href: string;
  submenu?: Record<string, string>;
}

export function DropdownMenuItem({ label, href, submenu }: DropdownMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!submenu) {
    return (
      <Button asChild variant="ghost" size="sm">
        <Link href={href}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Link>
      </Button>
    );
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button 
        variant="ghost" 
        size="sm"
        className="flex items-center gap-1"
        asChild
      >
        <Link href={href}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
          <ChevronDown className="w-4 h-4 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </Link>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-background border rounded-md shadow-lg py-2 min-w-[200px]">
            {Object.entries(submenu).map(([key, href]) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {key}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
