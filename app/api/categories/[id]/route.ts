// app/api/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImageByUrl } from "@/lib/storage";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
    include: { products: true },
  });

  if (!category) {
    return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const existing = await prisma.category.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const slug = formData.get("slug") as string | null;
    const description = formData.get("description") as string | null;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = existing.image;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "category-images", existing.image);
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: name ?? existing.name,
        slug: slug ?? existing.slug,
        description: description ?? existing.description,
        image: imageUrl,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error editando categoría" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const existing = await prisma.category.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    // Al borrar la categoría, los productos asociados quedan con categoryId = null
    // (definido en el schema con onDelete: SetNull), no se borran en cascada.
    await prisma.category.delete({ where: { id: params.id } });
    await deleteImageByUrl(existing.image).catch(() =>
      console.warn("No se pudo borrar la imagen de la categoría:", existing.image)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error borrando categoría" },
      { status: 500 }
    );
  }
}
