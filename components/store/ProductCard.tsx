import Link from 'next/link';
import type { Product } from '@/lib/types';
import Image from 'next/image'

export function ProductCard({
  product,
  businessSlug,
}: {
  product: Product;
  businessSlug: string;
}) {
  return (
    <Link
      href={`/store/${businessSlug}/product/${product.slug}`}
      className="flex gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
    >
      <div className="w-24 h-24 flex-none rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        {product.image ? (
          <Image src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">s/i</div>
        )}
      </div>
      <div className="min-w-0 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-900 dark:text-gray-100 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
            {product.description}
          </p>
        )}
        <span className="mt-auto text-emerald-500 font-bold">
          {product.price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}