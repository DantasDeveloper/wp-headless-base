// Next.js Imports
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Types
import type { WPPost } from "@/types/wordpress";

interface PostsSectionProps {
  posts: WPPost[];
  showViewAllButton?: boolean;
  viewAllLink?: string;
  viewAllText?: string;
  layout?: "three-columns" | "featured-two" | "grid-four";
}

export const PostsSection = ({
  posts,
  showViewAllButton = true,
  viewAllLink = "/posts",
  viewAllText = "Ver Todos",
  layout = "three-columns",
}: PostsSectionProps) => {
  const renderCard = (post: WPPost, featured: boolean = false) => {
    // @ts-ignore - _embedded is added by _embed parameter
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    // @ts-ignore - _embedded is added by _embed parameter
    const authorName = post._embedded?.["author"]?.[0]?.name;
    // @ts-ignore - _embedded is added by _embed parameter
    const categories = post._embedded?.["wp:term"]?.[0] || [];
    const primaryCategory = categories[0];

    // Limpa o título e excerpt para SEO
    const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '').trim();
    const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
    const truncatedExcerpt = cleanExcerpt.length > 220 
      ? cleanExcerpt.substring(0, 220).trim() + "...." 
      : cleanExcerpt;

    return (
      <article
        key={post.id}
        itemScope
        itemType="https://schema.org/BlogPosting"
        className="w-[90%] md:w-full md:max-w-[400px] h-auto min-h-[505px] mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        style={{ border: '2px solid #031a2b' }}
      >
        <Link 
          href={`/${post.slug}`}
          title={`Leia mais sobre: ${cleanTitle}`}
          className="block h-full"
        >
          {(() => {
            return (
              <div className="p-[20px] md:p-[30px] flex flex-col h-full">
                {/* Imagem */}
                <div className="w-full h-auto overflow-hidden relative rounded-xl bg-muted mb-6">
                  {featuredImage ? (
                    <Image
                      src={featuredImage}
                      alt={cleanTitle}
                      width={338}
                      height={190}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      itemProp="image"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center min-h-[190px]">
                      <span className="text-muted-foreground text-sm">Sem imagem</span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col flex-1">
                  {/* Título */}
                  <h3 
                    className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight"
                    itemProp="headline"
                  >
                    {cleanTitle}
                  </h3>

                  {/* Excerpt */}
                  <p 
                    className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-1"
                    itemProp="description"
                  >
                    {truncatedExcerpt}
                  </p>

                  {/* Meta invisível para SEO */}
                  <meta itemProp="datePublished" content={post.date} />
                  <meta itemProp="dateModified" content={post.modified} />
                  <meta itemProp="author" content={authorName || "Admin"} />

                  {/* Footer com categoria e data */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded text-white" style={{ backgroundColor: '#031a2b' }}>
                      {primaryCategory?.name || "Uncategorized"}
                    </span>
                    <time 
                      dateTime={post.date}
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      {new Date(post.date).toLocaleDateString("pt-BR")}
                    </time>
                  </div>
                </div>
              </div>
            );
          })()}
        </Link>
      </article>
    );
  };

  const renderLayout = () => {
    // Layout padrão: grid com 3 colunas, cards de 400px, gap de 30px
    // Total: 3 * 400px + 2 * 30px = 1260px
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] w-full max-w-[1320px] mx-auto px-0 md:px-[30px]">
        {posts.map((post) => renderCard(post, false))}
      </div>
    );
  };

  return (
    <>
      {renderLayout()}

      {showViewAllButton && (
        <div className="flex justify-center mt-12">
          <Link
            href={viewAllLink}
            className="px-8 py-3 border-2 border-foreground text-foreground rounded-md font-semibold hover:bg-foreground hover:text-background transition-colors uppercase tracking-wide"
          >
            {viewAllText}
          </Link>
        </div>
      )}
    </>
  );
};
