// DATA ACCESS LAYER: fuente unica de verdad de "quien es el usuario y que puede hacer".
// Aqui se unen Supabase (identidad) y Prisma (datos).
import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// cache() = si se llama varias veces en la misma peticion, consulta una sola vez.
export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
});

export const getProfile = cache(async () => {
  const user = await getUser();
  return user ? prisma.profile.findUnique({ where: { id: user.id } }) : null;
});

export const getMyStore = cache(async () => {
  const user = await getUser();
  return user ? prisma.business.findFirst({ where: { ownerId: user.id } }) : null;
});

export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireOwner() {
  const user = await requireUser();
  const profile = await getProfile();
  if (!profile) redirect("/login");
  return { user, profile };
}

export async function requireSuperadmin() {
  const { user, profile } = await requireOwner();
  if (profile.role !== "superadmin") redirect("/dashboard");
  return { user, profile };
}

/** Para paginas y actions del dashboard: exige sesion Y tienda. */
export async function requireStore() {
  const { user, profile } = await requireOwner();
  const store = await getMyStore();
  if (!store) redirect("/onboarding");
  return { user, profile, store };
}

/** A donde mandar a alguien recien autenticado segun su rol y estado de tienda. */
export async function getHomePath() {
  const profile = await getProfile();
  if (!profile) return "/login";
  if (profile.role === "superadmin") return "/superadmin";
  const store = await getMyStore();
  if (!store) return "/onboarding";
  if (store.status === "suspended") return "/dashboard/facturacion";
  return `/dashboard`;
}
