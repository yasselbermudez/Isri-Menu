'use client'
import {Icons} from "../Icons"
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const formatPrice = (price: number) =>
  `${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} CUP`;

export default function ProductsList ({storeSlug,products}:{storeSlug:string,products:Product[]}){


    const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [sortBy, setSortBy] = useState<'default' | 'low_price' | 'high_price' | 'news_from_date'>(
    'default',
  );

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    switch (sortBy) {
      case 'low_price':
        return copy.sort((a, b) => a.price - b.price);
      case 'high_price':
        return copy.sort((a, b) => b.price - a.price);
      case 'news_from_date':
        return copy.reverse();
      default:
        return copy;
    }
  }, [sortBy]);

  const increment = (id: string) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const decrement = (id: string) =>
    setQuantities((prev) => {
      const next = (prev[id] ?? 0) - 1;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });

    return(
        <div className="bg-card mb-2.5">
          <div className="flex justify-between gap-1 relative overflow-hidden items-center px-4 pt-12">
            <div className="flex items-center gap-1.5 text-primary-accent">
              <Icons.IcoBookmark className="h-4 flex-none" />
              <span className="font-semibold text-sm">
                {products.length} Elementos
              </span>
            </div>

            <div className="relative">
              <button className="flex items-center">
                <span className="text-primary-accent font-semibold text-sm">Ordenar</span>
                <Icons.IcoSort className="h-6 mx-0.5" />
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="opacity-0 absolute inset-0 cursor-pointer"
              >
                <option value="default">Por defecto</option>
                <option value="low_price">Menor precio</option>
                <option value="high_price">Mayor precio</option>
                <option value="news_from_date">Nuevo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row-dense gap-2 px-4 py-4">
            {sortedProducts.map((product) => {
              const qty = quantities[product.id] ?? 0;
              const href = `/store/${storeSlug}/product/${product.slug}`;
              return (
                <div key={product.id} className="relative">
                  <Link href={href}>
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex justify-between gap-1 mt-2 relative">
                    <Link href={href} className="flex-1 min-w-0 mb-1 min-h-9">
                      <div className="line-clamp-2 font-semibold text-base leading-tight text-foreground">
                        {product.name}
                      </div>
                      {product.description && (
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {product.description}
                        </div>
                      )}
                    </Link>

                    {/* Control de cantidad */}
                    <div className="flex-none relative w-9 h-9">
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => increment(product.id)}
                          aria-label="Añadir"
                          className="w-9 h-9 text-primary-foreground rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center transition-colors"
                        >
                          <Icons.IcoPlus className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="absolute top-0 right-0 h-9 flex items-center rounded-full bg-primary text-primary-foreground shadow-md">
                          <button
                            type="button"
                            onClick={() => decrement(product.id)}
                            aria-label="Disminuir"
                            className="w-9 h-9 flex items-center justify-center hover:bg-primary-hover rounded-l-full transition-colors"
                          >
                            <Icons.IcoMinus className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-semibold min-w-[16px] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => increment(product.id)}
                            aria-label="Añadir"
                            className="w-9 h-9 flex items-center justify-center hover:bg-primary-hover rounded-r-full transition-colors"
                          >
                            <Icons.IcoPlus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm mt-1">
                    <span className="text-primary-accent font-semibold">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    )
}