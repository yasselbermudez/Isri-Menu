// app/api/businesses/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/storage";

export async function GET() {
  const businesses = await prisma.business.findMany({
    include: { categories: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(businesses);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const logoFile = formData.get("logo") as File | null;
    const coverFile = formData.get("cover") as File | null;
    if (!logoFile || !coverFile) {
      return NextResponse.json(
        { error: "logo y cover son obligatorios" },
        { status: 400 }
      );
    }

    const [logoUrl, coverUrl] = await Promise.all([
      uploadImage(logoFile, "business-logos"),
      uploadImage(coverFile, "business-covers"),
    ]);

    const business = await prisma.business.create({
      data: {
        slug: formData.get("slug") as string,
        name: formData.get("name") as string,
        logo: logoUrl,
        cover: coverUrl,
        description: formData.get("description") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        country: formData.get("country") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        website: (formData.get("website") as string) || null,
        instagram: (formData.get("instagram") as string) || null,
        facebook: (formData.get("facebook") as string) || null,
        youtube: (formData.get("youtube") as string) || null,
        isOpen: formData.get("isOpen") === "true",
        nextOpening: (formData.get("nextOpening") as string) || null,
        currency: formData.get("currency") as string,
        priceRange: formData.get("priceRange") as string,
        delivery: formData.get("delivery") === "true",
        pickup: formData.get("pickup") === "true",
      },
    });

    return NextResponse.json(business, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error creando negocio" },
      { status: 500 }
    );
  }
}
