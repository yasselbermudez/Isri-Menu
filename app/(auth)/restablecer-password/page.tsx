import { AuthForm } from "@/components/auth/auth-form";
import { resetPassword } from "@/actions/auth";

// El usuario llega aqui desde el correo, ya con sesion temporal creada por /auth/callback
export default function RestablecerPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Nueva contrasena</h1>
      <AuthForm
        action={resetPassword}
        submitLabel="Guardar contrasena"
        fields={[{ name: "password", label: "Nueva contrasena", type: "password", autoComplete: "new-password" }]}
      />
    </>
  );
}
