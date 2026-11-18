'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import {
  useCartStore,
  selectStoreItems,
  selectStoreSubtotal,
} from '@/features/cart/store/cart-store';
import { useCartHydrated } from '@/features/cart/hooks/use-cart-hydrated';
import { createOrderAction } from '@/features/cart/actions/create-order';

export function CheckoutClient({
  storeSlug,
  storeName,
}: {
  storeSlug: string;
  storeName: string;
}) {
  const hydrated = useCartHydrated();
  const router = useRouter();
  const items = useCartStore(selectStoreItems(storeSlug));
  const subtotal = useCartStore(selectStoreSubtotal(storeSlug));
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearStore = useCartStore((s) => s.clearStore);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Leemos el estado más reciente sin suscribir el componente
    const current = useCartStore.getState().carts[storeSlug] ?? [];
    if (current.length === 0) {
      setError('Tu carrito está vacío');
      return;
    }

    const fd = new FormData(e.currentTarget);
    setSubmitting(true);

    const res = await createOrderAction({
      storeSlug,
      items: current.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
      customer: {
        name: String(fd.get('name') ?? ''),
        email: String(fd.get('email') ?? ''),
        phone: String(fd.get('phone') ?? ''),
        address: String(fd.get('address') ?? ''),
      },
    });

    setSubmitting(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    clearStore(storeSlug);
    router.push(`/store/${storeSlug}/checkout/gracias/${res.orderId}`);
  }

  if (!hydrated) return <p className="p-4">Cargando carrito…</p>;
  if (items.length === 0)
    return <p className="p-4">Tu carrito de {storeName} está vacío.</p>;

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Finalizar pedido — {storeName}</h1>

      <ul className="mb-4 divide-y">
        {items.map((i) => (
          <li key={i.productId} className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-sm text-gray-600">
                ${i.price.toFixed(2)} × {i.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(storeSlug, i.productId, i.quantity - 1)
                }
                className="rounded border px-2"
              >
                −
              </button>
              <span>{i.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(storeSlug, i.productId, i.quantity + 1)
                }
                className="rounded border px-2"
              >
                +
              </button>
              <button
                onClick={() => removeItem(storeSlug, i.productId)}
                className="ml-2 text-red-600"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mb-4 text-right text-lg font-semibold">
        Total: ${subtotal.toFixed(2)}
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input name="name" placeholder="Nombre completo" required className="rounded border p-2" />
        <input name="email" type="email" placeholder="Email" required className="rounded border p-2" />
        <input name="phone" placeholder="Teléfono" required className="rounded border p-2" />
        <textarea name="address" placeholder="Dirección de entrega" required className="rounded border p-2" />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {submitting ? 'Procesando…' : 'Confirmar pedido'}
        </button>
      </form>
    </div>
  );
}