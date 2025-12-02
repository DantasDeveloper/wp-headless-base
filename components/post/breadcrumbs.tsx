import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link 
        href="/" 
        className="hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
      >
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium break-words">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
