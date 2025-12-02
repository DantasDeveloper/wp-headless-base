import { getAllCategories } from "@/lib/wordpress";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Todas as Categorias",
  description: "Navegue por todas as categorias do nosso blog",
  alternates: {
    canonical: "/categorias",
  },
};

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="w-full max-w-[1320px] mx-auto px-0 md:px-[30px] space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Todas as Categorias</h2>
            <p className="text-muted-foreground">
              {categories.length} {categories.length === 1 ? "categoria disponível" : "categorias disponíveis"}
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="w-full h-auto min-h-[160px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-8 flex flex-col justify-between"
                  style={{ border: '2px solid #031a2b' }}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded text-white" style={{ backgroundColor: '#031a2b' }}>
                      {category.count} {category.count === 1 ? "artigo" : "artigos"}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      Ver categoria →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>Nenhuma categoria disponível</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
