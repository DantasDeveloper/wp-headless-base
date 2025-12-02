import {
  getPostsPaginated,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { PostCard } from "@/components/posts/post-card";
import { FilterPosts } from "@/components/posts/filter";
import { SearchInput } from "@/components/posts/search-input";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artigos",
  description: "Navegue por todos os nossos artigos",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    autor?: string;
    tag?: string;
    etiqueta?: string;
    category?: string;
    categoria?: string;
    page?: string;
    pagina?: string;
    search?: string;
    busca?: string;
  }>;
}) {
  const params = await searchParams;
  
  // Suportar parâmetros em português e inglês
  const author = params.author || params.autor;
  const tag = params.tag || params.etiqueta;
  const category = params.category || params.categoria;
  const pageParam = params.page || params.pagina;
  const search = params.search || params.busca;

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 6;

  // Fetch data based on search parameters using efficient pagination
  const [postsResponse, authors, tags, categories] = await Promise.all([
    getPostsPaginated(page, postsPerPage, { author, tag, category, search }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTags(search) : getAllTags(),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  // Create pagination URL helper (usando parâmetros em português)
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("pagina", newPage.toString());
    if (category) params.set("categoria", category);
    if (author) params.set("autor", author);
    if (tag) params.set("etiqueta", tag);
    if (search) params.set("busca", search);
    return `/artigos${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="w-full max-w-[1320px] mx-auto px-0 md:px-[30px] space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Todos os Artigos</h2>
            <p className="text-muted-foreground">
              {total} {total === 1 ? "artigo encontrado" : "artigos encontrados"}
              {search && " na sua busca"}
            </p>
          </div>

          <div className="space-y-4">
            <SearchInput defaultValue={search} />

            <FilterPosts
              authors={authors}
              tags={tags}
              categories={categories}
              selectedAuthor={author}
              selectedTag={tag}
              selectedCategory={category}
            />
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>Nenhum Artigo Encontrado</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center py-8">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPaginationUrl(page - 1)}
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                      // Show current page, first page, last page, and 2 pages around current
                      return (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - page) <= 1
                      );
                    })
                    .map((pageNum, index, array) => {
                      const showEllipsis =
                        index > 0 && pageNum - array[index - 1] > 1;
                      return (
                        <div key={pageNum} className="flex items-center">
                          {showEllipsis && <span className="px-2">...</span>}
                          <PaginationItem>
                            <PaginationLink
                              href={createPaginationUrl(pageNum)}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        </div>
                      );
                    })}

                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={createPaginationUrl(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
