// src/features/cart/components/cart-menu-link.tsx
'use client';

import Link from 'next/link';
import { useCartStore, selectStoreCount } from '../store/cart-store';
import { useCartHydrated } from '../hooks/use-cart-hydrated';

export function CartMenuLink({ storeSlug }: { storeSlug: string }) {
  const hydrated = useCartHydrated();
  const count = useCartStore(selectStoreCount(storeSlug));

  return (
    <Link href={`/store/${storeSlug}/checkout`} className="relative">
      🛒 Carrito
      {hydrated && count > 0 && (
        <span className="ml-1 rounded-full bg-red-500 px-2 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  );
}