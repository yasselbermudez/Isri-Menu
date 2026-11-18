import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  image?: string;
  price: number;   // snapshot para UI — el checkout revalida en servidor
  stock: number;   // snapshot para limitar cantidad en UI
  quantity: number;
};

type CartsByStore = Record<string, CartItem[]>;

type CartState = {
  carts: CartsByStore;
  addItem: (storeSlug: string, item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (storeSlug: string, productId: string) => void;
  updateQuantity: (storeSlug: string, productId: string, qty: number) => void;
  clearStore: (storeSlug: string) => void;
  decrementItem: (storeSlug: string, productId: string) => void;
};

const MAX_QTY = 99;
const EMPTY: CartItem[] = [];

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      carts: {},

      addItem: (storeSlug, item, qty = 1) =>
        set((state) => {
          const items = state.carts[storeSlug] ?? EMPTY;
          const cap = Math.min(item.stock, MAX_QTY);
          const existing = items.find((i) => i.productId === item.productId);

          const nextItems = existing
            ? items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: Math.min(i.quantity + qty, cap) }
                  : i
              )
            : [...items, { ...item, quantity: Math.min(qty, cap) }];

          return { carts: { ...state.carts, [storeSlug]: nextItems } };
        }),

      removeItem: (storeSlug, productId) =>
        set((state) => {
          const items = (state.carts[storeSlug] ?? EMPTY).filter(
            (i) => i.productId !== productId
          );
          const carts = { ...state.carts };
          if (items.length === 0) delete carts[storeSlug];
          else carts[storeSlug] = items;
          return { carts };
        }),

        decrementItem: (storeSlug, productId) =>
      set((state) => {
        const items = state.carts[storeSlug] ?? EMPTY;
        const existing = items.find((i) => i.productId === productId);

        // Si no existe, no hacemos nada (evita crear una nueva referencia de estado)
        if (!existing) return state;

        const carts = { ...state.carts };

        if (existing.quantity <= 1) {
          // Última unidad → eliminar la línea
          const nextItems = items.filter((i) => i.productId !== productId);
          if (nextItems.length === 0) delete carts[storeSlug];
          else carts[storeSlug] = nextItems;
        } else {
          carts[storeSlug] = items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
          );
        }

        return { carts };
      }),

      updateQuantity: (storeSlug, productId, qty) =>
        set((state) => {
          const items = (state.carts[storeSlug] ?? EMPTY).map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, Math.min(qty, i.stock, MAX_QTY)) }
              : i
          );
          return { carts: { ...state.carts, [storeSlug]: items } };
        }),

      clearStore: (storeSlug) =>
        set((state) => {
          const carts = { ...state.carts };
          delete carts[storeSlug];
          return { carts };
        }),
    }),
    {
      name: 'cart:v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ carts: s.carts }),
    }
  )
);

// ── Selectores (factory, evitan nuevas referencias al re-render) ──
export const selectStoreItems = (slug: string) => (s: CartState) =>
  s.carts[slug] ?? EMPTY;

export const selectStoreCount = (slug: string) => (s: CartState) =>
  (s.carts[slug] ?? EMPTY).reduce((n, i) => n + i.quantity, 0);

export const selectStoreSubtotal = (slug: string) => (s: CartState) =>
  (s.carts[slug] ?? EMPTY).reduce((n, i) => n + i.price * i.quantity, 0);

export const selectStoreLine = (slug: string, productId: string) => (s: CartState) =>
  (s.carts[slug] ?? EMPTY).find((i) => i.productId === productId);