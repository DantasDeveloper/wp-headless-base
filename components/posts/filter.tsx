"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Ensure this is the correct import path
import { Button } from "@/components/ui/button"; // Add this import for the Button component

interface Author {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface FilterPostsProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: string;
  selectedTag?: string;
  selectedCategory?: string;
}

export function FilterPosts({
  authors,
  tags,
  categories,
  selectedAuthor,
  selectedTag,
  selectedCategory,
}: FilterPostsProps) {
  const router = useRouter();

  const handleFilterChange = (type: string, value: string) => {
    console.log(`Filter changed: ${type} -> ${value}`);
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("page");
    newParams.delete("pagina");
    
    // Traduzir parâmetros para português
    const paramMap: Record<string, string> = {
      'category': 'categoria',
      'tag': 'etiqueta',
      'author': 'autor',
      'search': 'busca',
      'page': 'pagina'
    };
    
    const translatedType = paramMap[type] || type;
    value === "all" ? newParams.delete(translatedType) : newParams.set(translatedType, value);

    router.push(`/artigos?${newParams.toString()}`);
  };

  const handleResetFilters = () => {
    router.push("/artigos");
  };

  const hasTags = tags.length > 0;
  const hasCategories = categories.length > 0;
  const hasAuthors = authors.length > 0;

  return (
    <div className="grid md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-2 my-4 z-10!">
      <Select
        value={selectedTag || "all"}
        onValueChange={(value) => handleFilterChange("tag", value)}
      >
        <SelectTrigger disabled={!hasTags}>
          {hasTags ? <SelectValue placeholder="Todas As Etiquetas" /> : "Nenhuma etiqueta encontrada"}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas As Tags</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.id.toString()}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedCategory || "all"}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger disabled={!hasCategories}>
          {hasCategories ? (
            <SelectValue placeholder="Todas As Categorias" />
          ) : (
            "No categories found"
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas As Categorias</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedAuthor || "all"}
        onValueChange={(value) => handleFilterChange("author", value)}
      >
        <SelectTrigger disabled={!hasAuthors} className="text-center">
          {hasAuthors ? (
            <SelectValue placeholder="Todos Os Autores" />
          ) : (
            "No authors found"
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Os Autores</SelectItem>
          {authors.map((author) => (
            <SelectItem key={author.id} value={author.id.toString()}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={handleResetFilters}>
        Limpar Filtros
      </Button>
    </div>
  );
}
