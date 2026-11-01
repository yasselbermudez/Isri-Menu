// lib/store.ts
import { prisma } from '@/lib/prisma';

export async function getBusiness(slug: string) {
  return prisma.business.findUnique({
    where: { slug },
  });
}

export async function getCategories(businessId: string) {
  return prisma.category.findMany({
    where: { businessId: businessId },
    orderBy: { name: 'asc' },
    //include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryBySlug(businessId: string, slug: string) {
  return prisma.category.findFirst({
    where: { businessId, slug },
  });
}

export async function getProducts(categoryId: string) {
  return prisma.product.findMany({
    where: { categoryId },
    orderBy: { name: 'asc' },
  });
}

export async function getProductBySlug(businessId: string, slug: string) {
  return prisma.product.findFirst({
    where: { slug, category: { businessId } },
    include: { category: true },
  });
}