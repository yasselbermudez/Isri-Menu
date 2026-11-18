// src/features/cart/components/floating-cart-button.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCartStore,
  selectStoreCount,
  selectStoreSubtotal,
} from '../store/cart-store';
import { useCartHydrated } from '../hooks/use-cart-hydrated';

export function FloatingCartButton({ storeSlug }: { storeSlug: string }) {
  const hydrated = useCartHydrated();
  const count = useCartStore(selectStoreCount(storeSlug));
  const subtotal = useCartStore(selectStoreSubtotal(storeSlug));
  const pathname = usePathname();

  if (!hydrated || count === 0) return null;
  if (pathname.includes('/checkout')) return null;

  return (
    <Link
      href={`/store/${storeSlug}/checkout`}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-black px-4 py-3 text-white shadow-lg"
    >
      🛒 {count} · ${subtotal.toFixed(2)}
    </Link>
  );
}