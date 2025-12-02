import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress.d";
import { getFeaturedMediaById, getCategoryById, getAuthorById } from "@/lib/wordpress";
import { cn } from "@/lib/utils";

interface RelatedPostsProps {
  posts: Post[];
}

export async function RelatedPosts({ posts }: RelatedPostsProps) {
  // Pegar apenas 2 posts
  const displayPosts = posts.slice(0, 2);

  return (
    <div className="w-full max-w-[830px] px-0 md:px-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Você também pode gostar destes artigos
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] justify-items-center">
        {await Promise.all(displayPosts.map(async (post) => {
          const media = post.featured_media ? await getFeaturedMediaById(post.featured_media) : null;
          const category = post.categories?.[0] ? await getCategoryById(post.categories[0]) : null;
          const author = await getAuthorById(post.author);
          
          const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '').trim();
          const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
          const truncatedExcerpt = cleanExcerpt.length > 130 ? cleanExcerpt.substring(0, 130).trim() + "...." : cleanExcerpt;

          return (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              title={`Leia mais sobre: ${cleanTitle}`}
              className={cn(
                "w-[90%] md:w-full md:max-w-[400px] h-auto min-h-[505px] mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl overflow-hidden group flex flex-col not-prose",
                "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              )}
              style={{ border: '2px solid #031a2b' }}
            >
              <article 
                itemScope 
                itemType="https://schema.org/BlogPosting"
              >
                {/* Container com padding */}
                <div className="p-[20px] md:p-[30px] flex flex-col h-full">
                  {/* Imagem */}
                  <div className="w-full h-auto overflow-hidden relative rounded-xl bg-muted mb-6">
                    {media?.source_url ? (
                      <Image
                        src={media.source_url}
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
                    <meta itemProp="author" content={author?.name || "Admin"} />

                    {/* Footer com categoria e data */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                      <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded text-white" style={{ backgroundColor: '#031a2b' }}>
                        {category?.name || "Uncategorized"}
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
              </article>
            </Link>
          );
        }))}
      </div>
    </div>
  );
}
