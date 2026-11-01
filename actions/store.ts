"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireOwner, getMyStore } from "@/lib/auth/dal";
import { slugify, isReserved } from "@/lib/slug";
import type { FormState } from "@/actions/auth";

const schema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(60),
  slug: z.string().min(3, "Minimo 3 caracteres").max(40),
});

export async function createStore(_: FormState, fd: FormData): Promise<FormState> {
  const { user } = await requireOwner(); // identidad desde la sesion, NUNCA desde el formulario

  if (await getMyStore()) redirect("/dashboard"); // una tienda por owner

  const parsed = schema.safeParse({
    ...Object.fromEntries(fd),
    slug: slugify(String(fd.get("slug") ?? "")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { name, slug } = parsed.data;
  if (isReserved(slug)) return { error: "Ese nombre de URL no esta disponible" };

  try {
    await prisma.business.create({
      data: {
        ownerId: user.id,
        name,
        slug,
        state: "",
        logo: "",
        cover: "",
        description: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: user.email ?? "",
        currency: "COP",
        priceRange: "$",
      },
    });
  } catch (e) {
    // P2002 = violacion de indice unico (slug repetido)
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return { error: "Esa URL ya esta en uso, prueba otra" };
    throw e;
  }

  redirect("/dashboard");
}
