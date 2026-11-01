// app/api/businesses/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImageByUrl } from "@/lib/storage";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const business = await prisma.business.findUnique({
    where: { id },
    include: { categories: { include: { products: true } } },
  });

  if (!business) {
    return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
  }

  return NextResponse.json(business);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const existing = await prisma.business.findUnique({ where: { id: id } });
    if (!existing) {
      return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
    }

    const formData = await req.formData();

    const logoFile = formData.get("logo") as File | null;
    const coverFile = formData.get("cover") as File | null;

    const logoUrl =
      logoFile && logoFile.size > 0
        ? await uploadImage(logoFile, "business-logos", existing.logo)
        : existing.logo;

    const coverUrl =
      coverFile && coverFile.size > 0
        ? await uploadImage(coverFile, "business-covers", existing.cover)
        : existing.cover;

    const field = (key: string, fallback: string | null) => {
      const v = formData.get(key);
      return v !== null ? (v as string) : fallback;
    };

    const business = await prisma.business.update({
      where: { id: id },
      data: {
        slug: field("slug", existing.slug)!,
        name: field("name", existing.name)!,
        logo: logoUrl,
        cover: coverUrl,
        description: field("description", existing.description)!,
        address: field("address", existing.address)!,
        city: field("city", existing.city)!,
        state: field("state", existing.state)!,
        country: field("country", existing.country)!,
        phone: field("phone", existing.phone)!,
        email: field("email", existing.email)!,
        website: field("website", existing.website),
        instagram: field("instagram", existing.instagram),
        facebook: field("facebook", existing.facebook),
        youtube: field("youtube", existing.youtube),
        isOpen: formData.has("isOpen") ? formData.get("isOpen") === "true" : existing.isOpen,
        nextOpening: field("nextOpening", existing.nextOpening),
        currency: field("currency", existing.currency)!,
        priceRange: field("priceRange", existing.priceRange)!,
        delivery: formData.has("delivery") ? formData.get("delivery") === "true" : existing.delivery,
        pickup: formData.has("pickup") ? formData.get("pickup") === "true" : existing.pickup,
      },
    });

    return NextResponse.json(business);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error editando negocio" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const existing = await prisma.business.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
    }

    // onDelete: Cascade en categorías se encarga de borrar categorías asociadas
    // en la BD, pero las imágenes en storage hay que limpiarlas a mano.
    const categories = await prisma.category.findMany({ where: { businessId: params.id } });

    await prisma.business.delete({ where: { id: params.id } });

    await Promise.all([
      deleteImageByUrl(existing.logo).catch(() => {}),
      deleteImageByUrl(existing.cover).catch(() => {}),
      ...categories.map((c) => deleteImageByUrl(c.image).catch(() => {})),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error borrando negocio" },
      { status: 500 }
    );
  }
}
