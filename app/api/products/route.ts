// app/api/products/route.ts
//
// GET  -> lista productos (opcionalmente filtrados por categoryId)
// POST -> crea un producto. Espera FormData (no JSON) porque incluye archivo.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get("categoryId");

  const products = await prisma.product.findMany({
    //where: categoryId ? { categoryId } : undefined,
    orderBy: { createdAt: "desc" },
  });
  console.log("******** GET /api/products", { categoryId, products });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const categoryId = (formData.get("categoryId") as string) || null;
    const active = formData.get("active") === "true";
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug || !imageFile) {
      return NextResponse.json(
        { error: "name, slug e image son obligatorios" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(imageFile, "product-images");



    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price,
        description,
        categoryId,
        active,
        image: imageUrl,
      },
    });

    console.log("********Create products",{name,
        slug,
        price,
        description,
        categoryId,
        active,
        image: imageUrl})

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error creando producto" },
      { status: 500 }
    );
  }
}
