import type { Category } from '../../lib/types';
import Link from 'next/link';

export function CategoryChips({ categories, storeSlug, activeCategory }: { categories: Category[], storeSlug: string, activeCategory?:string }) {
    return(
        <div className="bg-card mb-2 pt-6 pb-12 px-4">
          <div className="text-foreground text-base font-semibold">Categorías</div>
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => {
              const isActive = cat.slug === activeCategory;
              return (
                <Link
                  key={cat.slug}
                  href={`/store/${storeSlug}/category/${cat.slug}`}
                  className={
                    isActive
                      ? 'text-xs font-normal border rounded-md px-3 py-2 bg-primary text-primary-foreground border-primary'
                      : 'text-xs font-normal border rounded-md px-3 py-2 text-foreground border-border hover:bg-accent hover:text-accent-foreground'
                  }
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
    )
}

