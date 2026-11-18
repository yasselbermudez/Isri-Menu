// src/features/cart/actions/create-order.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

const inputSchema = z.object({
  storeSlug: z.string().min(1),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive().max(99),
      })
    )
    .min(1),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(6),
    address: z.string().min(5),
  }),
});

export type CreateOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function createOrderAction(raw: unknown): Promise<CreateOrderResult> {
  const parsed = inputSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: 'Datos inválidos' };
  const { storeSlug, items, customer } = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const store = await tx.store.findUnique({ where: { slug: storeSlug } });
      if (!store) throw new Error('Tienda no encontrada');

      // 1. Releer productos escopados a ESTA tienda
      const productIds = items.map((i) => i.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds }, storeId: store.id },
        select: { id: true, price: true, stock: true, name: true },
      });
      const byId = new Map(products.map((p) => [p.id, p]));

      // 2. Validar pertenencia + stock
      const lines = items.map((i) => {
        const p = byId.get(i.productId);
        if (!p) {
          throw new Error(`Un producto no pertenece a esta tienda`);
        }
        if (p.stock < i.quantity) {
          throw new Error(`Sin stock suficiente: ${p.name}`);
        }
        return { productId: i.productId, quantity: i.quantity, price: p.price };
      });

      const total = lines.reduce(
        (n, l) => n + Number(l.price) * l.quantity,
        0
      );

      // 3. Crear orden
      const created = await tx.order.create({
        data: {
          storeId: store.id,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          customerAddress: customer.address,
          total,
          status: 'PENDING',
          items: {
            create: lines.map((l) => ({
              productId: l.productId,
              quantity: l.quantity,
              price: l.price,
            })),
          },
        },
        select: { id: true },
      });

      // 4. Descontar stock
      for (const l of lines) {
        await tx.product.update({
          where: { id: l.productId },
          data: { stock: { decrement: l.quantity } },
        });
      }

      return created;
    });

    revalidatePath(`/store/${storeSlug}`);
    revalidatePath(`/store/${storeSlug}/products`);
    revalidatePath(`/store/${storeSlug}/categories`);

    return { ok: true, orderId: order.id };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}