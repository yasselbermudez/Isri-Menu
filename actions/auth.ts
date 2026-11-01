"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getHomePath } from "@/lib/auth/dal";

export type FormState = { error?: string; success?: string } | null;

const SITE = process.env.NEXT_PUBLIC_SITE_URL!;

// Evita "open redirect": solo aceptamos rutas internas
const safeNext = (next?: string | null) =>
  next && next.startsWith("/") && !next.startsWith("//") ? next : null;

const credentials = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "Minimo 8 caracteres"),
});

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const parsed = credentials.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Email o contrasena incorrectos" };

  redirect(safeNext(fd.get("next") as string) ?? (await getHomePath()));
}

export async function register(_: FormState, fd: FormData): Promise<FormState> {
  const parsed = credentials
    .extend({ fullName: z.string().min(2, "Ingresa tu nombre") })
    .safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { email, password, fullName } = parsed.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }, // lo lee el trigger handle_new_user
      emailRedirectTo: `${SITE}/auth/callback`,
    },
  });
  if (error) return { error: error.message };

  // Con confirmacion de email activada todavia no hay sesion
  if (!data.session) return { success: "Revisa tu correo para confirmar tu cuenta." };
  redirect("/onboarding");
}

export async function forgotPassword(_: FormState, fd: FormData): Promise<FormState> {
  const email = z.string().email().safeParse(fd.get("email"));
  if (!email.success) return { error: "Email invalido" };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: `${SITE}/auth/callback?next=/restablecer-password`,
  });
  // Mismo mensaje exista o no el email (evita enumerar usuarios)
  return { success: "Si el correo existe, te enviamos un enlace." };
}

export async function resetPassword(_: FormState, fd: FormData): Promise<FormState> {
  const password = z.string().min(8).safeParse(fd.get("password"));
  if (!password.success) return { error: "Minimo 8 caracteres" };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: password.data });
  if (error) return { error: error.message };
  redirect(await getHomePath());
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
