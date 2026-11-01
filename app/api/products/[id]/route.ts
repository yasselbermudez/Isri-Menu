// app/api/products/[id]/route.ts
//
// GET    -> obtiene un producto
// PUT    -> edita un producto. Si viene una nueva imagen, reemplaza la anterior
// DELETE -> borra el producto y su imagen en storage

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImageByUrl } from "@/lib/storage";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const existing = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const slug = formData.get("slug") as string | null;
    const priceRaw = formData.get("price") as string | null;
    const description = formData.get("description") as string | null;
    const categoryId = formData.get("categoryId") as string | null;
    const activeRaw = formData.get("active") as string | null;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = existing.image;
    // Solo tocamos storage si el panel mandó un archivo nuevo
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "product-images", existing.image);
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: name ?? existing.name,
        slug: slug ?? existing.slug,
        price: priceRaw !== null ? Number(priceRaw) : existing.price,
        description: description ?? existing.description,
        categoryId: categoryId ?? existing.categoryId,
        active: activeRaw !== null ? activeRaw === "true" : existing.active,
        image: imageUrl,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error editando producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const existing = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id: params.id } });
    await deleteImageByUrl(existing.image).catch(() =>
      console.warn("No se pudo borrar la imagen del producto:", existing.image)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error borrando producto" },
      { status: 500 }
    );
  }
}
