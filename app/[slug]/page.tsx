import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPostSlugs,
  getTagsByPost,
  getAllCategories,
  getAllPosts,
  getCategoryBySlug,
  getPostsPaginated,
} from "@/lib/wordpress";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/post/breadcrumbs";
import { SocialFollow } from "@/components/post/social-follow";
import { PromoAd } from "@/components/post/promo-ad";
import { AuthorBox } from "@/components/post/author-box";
import { RelatedPosts } from "@/components/post/related-posts";
import { CategoriesWidget } from "@/components/post/categories-widget";
import { ShareButtons } from "@/components/post/share-buttons";
import { PostCard } from "@/components/posts/post-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export async function generateStaticParams() {
  const [posts, categories] = await Promise.all([
    getAllPostSlugs(),
    getAllCategories()
  ]);
  
  return [
    ...posts,
    ...categories.map(cat => ({ slug: cat.slug }))
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Verificar se é uma categoria
  try {
    const category = await getCategoryBySlug(slug);
    if (category) {
      return {
        title: `${category.name} - Artigos`,
        description: category.description || `Todos os artigos da categoria ${category.name}`,
      };
    }
  } catch (error) {
    // Não é categoria, continuar
  }
  
  // Verificar se é um post
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", post.title.rendered);
  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  ogUrl.searchParams.append("description", description);

  return {
    title: post.title.rendered,
    description: description,
    openGraph: {
      title: post.title.rendered,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Tentar buscar como categoria primeiro
  try {
    const category = await getCategoryBySlug(slug);
    if (category) {
      // É uma categoria, renderizar página de categoria
      return <CategoryPage categorySlug={slug} />;
    }
  } catch (error) {
    // Não é uma categoria, continuar para verificar se é post
  }
  
  // Buscar como post
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);
  const tags = await getTagsByPost(post.id);
  const allCategories = await getAllCategories();
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter(p => p.id !== post.id);
  
  const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '').trim();
  const postUrl = `${siteConfig.site_domain}/${post.slug}`;

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 min-h-screen py-12 overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Art", href: "/artigos" },
            { label: category.name, href: `/${category.slug}` },
            { label: cleanTitle }
          ]}
        />

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight max-w-[1110px] hyphens-auto break-words" lang="pt-BR">
            {cleanTitle}
          </h1>
        </div>

        {/* Layout principal: Conteúdo (esquerda) + Sidebar (direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_325px] gap-8">
          {/* Coluna principal - Esquerda */}
          <div className="space-y-8">
            {/* Imagem principal 1110x592 */}
            {featuredMedia?.source_url && (
              <div className="w-full max-w-[1110px] aspect-video md:h-[592px] overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
                <Image
                  src={featuredMedia.source_url}
                  alt={cleanTitle}
                  width={1110}
                  height={592}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 5).map((tag) => (
                <Link
                  key={tag.id}
                  href={`/artigos?etiqueta=${tag.id}`}
                  className="text-xs font-medium px-4 py-2 rounded text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#031a2b' }}
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            {/* Meta informações */}
            <div>

              {/* Info de publicação e compartilhamento */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Por <Link href={`/artigos?autor=${author.id}`} className="font-medium hover:text-blue-900">{author.name}</Link> • {date}
                  </div>
                </div>

                {/* Botões de compartilhamento */}
                <ShareButtons url={postUrl} title={cleanTitle} />
              </div>
            </div>

            {/* Conteúdo do post */}
            <article 
              className="prose dark:prose-invert w-full max-w-[760px] mx-auto prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-p:text-[16px] prose-p:leading-relaxed prose-img:w-full prose-img:h-auto"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Author Box - Centralizado */}
            <div className="flex justify-center w-full">
              <AuthorBox author={author} />
            </div>

            {/* Posts relacionados - Centralizado */}
            <div className="flex justify-center w-full">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>

          {/* Sidebar - Direita */}
          <div className="space-y-6 w-full lg:w-auto">
            {/* Follow Us */}
            <SocialFollow />

            {/* Promo Ad */}
            <PromoAd />

            {/* Categories */}
            <CategoriesWidget categories={allCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para página de categoria
async function CategoryPage({ categorySlug }: { categorySlug: string }) {
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    notFound();
  }

  const page = 1;
  const postsPerPage = 6;

  const postsResponse = await getPostsPaginated(page, postsPerPage, { 
    category: category.id.toString() 
  });

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  const createPaginationUrl = (newPage: number) => {
    return `/${categorySlug}${newPage > 1 ? `?pagina=${newPage}` : ''}`;
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="w-full max-w-[1320px] mx-auto px-0 md:px-[30px] space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h2>
            <p className="text-muted-foreground">
              {total} {total === 1 ? "artigo encontrado" : "artigos encontrados"}
            </p>
            {category.description && (
              <p className="text-muted-foreground">{category.description}</p>
            )}
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
