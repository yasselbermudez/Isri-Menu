import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { register } from "@/actions/auth";

export default function RegistroPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
      <AuthForm
        action={register}
        submitLabel="Registrarme"
        fields={[
          { name: "fullName", label: "Nombre completo", autoComplete: "name" },
          { name: "email", label: "Email", type: "email", autoComplete: "email" },
          { name: "password", label: "Contrasena (min. 8)", type: "password", autoComplete: "new-password" },
        ]}
      />
      <p className="text-sm">Ya tienes cuenta? <Link href="/login" className="underline">Entrar</Link></p>
    </>
  );
}
