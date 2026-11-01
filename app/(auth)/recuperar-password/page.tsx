import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { forgotPassword } from "@/actions/auth";

export default function RecuperarPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Recuperar contrasena</h1>
      <AuthForm
        action={forgotPassword}
        submitLabel="Enviar enlace"
        fields={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]}
      />
      <p className="text-sm"><Link href="/login" className="underline">Volver a entrar</Link></p>
    </>
  );
}
