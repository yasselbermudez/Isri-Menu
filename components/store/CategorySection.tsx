import Link from 'next/link';
import type { Category } from '../../lib/types';
import Image from 'next/image';

export function CategorySection({
  category,
  businessSlug,
}: {
  category: Category;
  businessSlug: string;
}) {
  const count = category.productsCount ?? 0;

  return (
    <Link
      href={`/store/${businessSlug}/category/${category.slug}`}
      id={`cat-${category.slug}`}
      className="block bg-card mb-2.5 pt-6 px-4 scroll-mt-28 transition-colors hover:bg-accent/40"
    >
      <h2 className="text-lg font-bold text-primary-accent line-clamp-1">
        {category.name}
      </h2>

      <div className="mt-4 relative w-full pt-[73%] rounded-lg overflow-hidden bg-muted">
        {category.image ? (
          <Image
            fill
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {category.description && (
        <p className="mt-4 text-sm text-foreground line-clamp-5 leading-tight">
          {category.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-4">
        <span className="text-primary-accent font-semibold text-sm">
          {count} Elementos
        </span>
        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 rotate-180"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          >
            <path
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}