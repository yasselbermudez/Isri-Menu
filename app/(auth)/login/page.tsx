import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { login } from "@/actions/auth";
import { getHomePath, getUser } from "@/lib/auth/dal";

export default async function LoginPage({
  searchParams,
}: { searchParams: Promise<{ next?: string }> }) { // Next 15: searchParams es una Promise
  if (await getUser()) redirect(await getHomePath());

  const { next } = await searchParams;
  return (
    <>
      <h1 className="text-2xl font-bold">Inicia sesion</h1>
      <AuthForm
        action={login}
        next={next}
        submitLabel="Entrar"
        fields={[
          { name: "email", label: "Email", type: "email", autoComplete: "email" },
          { name: "password", label: "Contrasena", type: "password", autoComplete: "current-password" },
        ]}
      />
      <p className="text-sm">
        <Link href="/recuperar-password" className="underline">Olvidaste tu contrasena?</Link> ·{" "}
        <Link href="/registro" className="underline">Crear cuenta</Link>
      </p>
    </>
  );
}
