'use client';

import { useEffect, useRef, useState } from 'react';
import { useCartStore, selectStoreLine } from '../store/cart-store';
import { useCartHydrated } from '../hooks/use-cart-hydrated';
import {Trash} from 'lucide-react'

type Props = {
  storeSlug: string;
  product: {
    id: string;
    name: string;
    slug: string;
    image?: string;
    price: number;
    stock: number;
  };
};

const AUTO_COLLAPSE_MS = 10_000;
const MAX_QTY = 99;

export function AddToCartButton({ storeSlug, product }: Props) {
  const hydrated = useCartHydrated();
  const addItem = useCartStore((s) => s.addItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  //const removeItem = useCartStore((s) => s.removeItem);
  const line = useCartStore(selectStoreLine(storeSlug, product.id));

  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleCollapse = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setExpanded(false);
      timerRef.current = null;
    }, AUTO_COLLAPSE_MS);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  if (product.stock <= 0) {
    return (
      <button disabled className="text-primary-foreground rounded-full bg-primary px-3 py-2">
        Sin stock
      </button>
    );
  }

  const quantity = hydrated ? (line?.quantity ?? 0) : 0;
  const cap = Math.min(product.stock, MAX_QTY);
  const atMax = quantity >= cap;
  const isTrash = quantity <= 1;

  const snapshot = {
    productId: product.id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    stock: product.stock,
  };

  const handleIncrement = () => {
    if (!expanded) setExpanded(true);
    if (!atMax) addItem(storeSlug, snapshot);
    scheduleCollapse(); // cualquier toque reinicia los 10s
  };

  const handleDecrement = () => {
    decrementItem(storeSlug, product.id);
    if (quantity <= 1) {
      clearTimer();
      setExpanded(false);
    } else {
      scheduleCollapse();
    }
  };

  const showCollapsedQuantity = !expanded && quantity > 0;
  const mainLabel = expanded ? '+' : showCollapsedQuantity ? String(quantity) : '+';

  return (
    <div className={`relative inline-flex h-12 w-12`}>
      
      <div
        className={`absolute right-0 top-0 flex h-12 items-center justify-end overflow-hidden rounded-full bg-primary shadow-lg transition-[width] duration-300 ease-out ${
          expanded ? 'w-[120px]' : 'w-12'
        }`}
      >
        <div className="flex shrink-0 items-center whitespace-nowrap pl-2">
          <button
            type="button"
            aria-hidden={!expanded}
            onClick={handleDecrement}
            aria-label={isTrash ? 'Eliminar del carrito' : 'Quitar una unidad'}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {isTrash ? <Trash /> : <span className="text-lg leading-none">−</span>}
          </button>

          <span
            aria-hidden={!expanded}
            className="min-w-6 text-center text-base font-medium text-primary-foreground"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            aria-label={
              showCollapsedQuantity
                ? `En el carrito (${quantity}). Pulsa para añadir otra unidad`
                : 'Añadir al carrito'
            }
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {mainLabel}
          </button>
        </div>
      </div>
    </div>
  );
}