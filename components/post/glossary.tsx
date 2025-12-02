"use client";

import { useState } from "react";
import { ChevronDown, List } from "lucide-react";

interface GlossaryItem {
  id: string;
  title: string;
  level: number;
  children?: GlossaryItem[];
}

interface GlossaryProps {
  items: GlossaryItem[];
  className?: string;
}

export const Glossary = ({ items, className = "" }: GlossaryProps) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      className={`border-2 border-[#031a2b] dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 ${className}`}
      aria-label="Índice do artigo"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <List className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Índice
        </h2>
      </div>

      {/* Glossary Items */}
      <ol className="space-y-2" role="list">
        {items.map((item, index) => (
          <li key={item.id} className="list-none">
            {/* H2 - Parent Item */}
            <div className="space-y-2">
              <button
                onClick={() => toggleSection(item.id)}
                className="w-full flex items-center justify-between gap-2 text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
                aria-expanded={openSections.has(item.id)}
                aria-controls={`section-${item.id}`}
              >
                <span className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 min-w-[24px]">
                    {index + 1}.
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToHeading(item.id);
                    }}
                    className="text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </span>
                </span>
                {item.children && item.children.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                      openSections.has(item.id) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* H3 - Child Items */}
              {item.children && item.children.length > 0 && (
                <div
                  id={`section-${item.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSections.has(item.id)
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  role="region"
                  aria-labelledby={item.id}
                >
                  <ol className="ml-8 space-y-1 mt-1" role="list">
                    {item.children.map((child, childIndex) => (
                      <li key={child.id} className="list-none">
                        <button
                          onClick={() => scrollToHeading(child.id)}
                          className="w-full flex items-start gap-2 text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                        >
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[32px]">
                            {index + 1}.{childIndex + 1}
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {child.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Utility function to extract headings from HTML content
export const extractHeadings = (htmlContent: string): GlossaryItem[] => {
  if (typeof window === "undefined") return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const headings = doc.querySelectorAll("h2, h3");

  const items: GlossaryItem[] = [];
  let currentH2: GlossaryItem | null = null;

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1));
    const title = heading.textContent?.trim() || "";
    const id = heading.id || title.toLowerCase().replace(/[^\w]+/g, "-");

    // Set ID if not present
    if (!heading.id) {
      heading.id = id;
    }

    if (level === 2) {
      currentH2 = {
        id,
        title,
        level,
        children: [],
      };
      items.push(currentH2);
    } else if (level === 3 && currentH2) {
      currentH2.children?.push({
        id,
        title,
        level,
      });
    }
  });

  return items;
};
