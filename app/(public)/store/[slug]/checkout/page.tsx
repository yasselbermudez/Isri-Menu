import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CheckoutClient } from './checkout-client';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = await prisma.business.findUnique({
    where: { slug },
    select: { slug: true, name: true },
  });
  if (!store) notFound();

  return <CheckoutClient storeSlug={store.slug} storeName={store.name} />;
}