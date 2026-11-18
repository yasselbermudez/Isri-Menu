'use client'
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import {Icons} from "../Icons"
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Image from 'next/image'

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
              const href = `/store/${storeSlug}/product/${product.slug}`;
              return (
                <div key={product.id} className="relative">
                  <Link href={href}>
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={480}
                        height={480}
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
                    
                    <AddToCartButton storeSlug={storeSlug} product={{...product,stock:10000}} />
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