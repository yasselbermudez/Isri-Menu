// app/api/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const businessId = req.nextUrl.searchParams.get("businessId");

  const categories = await prisma.category.findMany({
    where: businessId ? { businessId } : undefined,
    include: { products: false },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const businessId = formData.get("businessId") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = (formData.get("description") as string) || null;
    const imageFile = formData.get("image") as File | null;

    if (!businessId || !name || !slug || !imageFile) {
      return NextResponse.json(
        { error: "businessId, name, slug e image son obligatorios" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(imageFile, "category-images");

    const category = await prisma.category.create({
      data: { businessId, name, slug, description, image: imageUrl },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error creando categoría" },
      { status: 500 }
    );
  }
}
