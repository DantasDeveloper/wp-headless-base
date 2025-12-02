import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface CategoriesWidgetProps {
  categories: Category[];
}

export function CategoriesWidget({ categories }: CategoriesWidgetProps) {
  // Pegar apenas as primeiras 6 categorias
  const displayCategories = categories.slice(0, 6);

  return (
    <div className="w-[95%] lg:w-[325px] mx-auto lg:mx-0 h-auto min-h-[264px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-6" style={{ border: '2px solid #031a2b' }}>
      <h3 className="font-bold text-lg mb-4 pb-2 border-b-2" style={{ borderColor: '#031a2b' }}>
        Categorias
      </h3>
      <div className="flex flex-col gap-2">
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug || category.id}`}
            className="flex justify-between items-center text-sm py-2 px-3 rounded transition-colors group"
            style={{ backgroundColor: '#031a2b' }}
          >
            <span className="text-white group-hover:opacity-80">
              {category.name}
            </span>
            <span className="text-white text-xs bg-white/20 px-2 py-1 rounded">
              {category.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
