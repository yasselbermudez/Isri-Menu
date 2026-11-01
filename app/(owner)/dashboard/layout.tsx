// MERGE: si ya tienes un layout de dashboard con sidebar, NO lo reemplaces.
// Copia solo las lineas de guard (requireStore + chequeo de suspension) al inicio de tu layout.
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireStore } from "@/lib/auth/dal";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { store } = await requireStore(); // sin sesion -> /login ; sin tienda -> /onboarding

  const pathname = (await headers()).get("x-pathname") ?? "";
  if (store.status === "suspended" && !pathname.startsWith("/dashboard/facturacion")) {
    redirect("/dashboard/facturacion");
  }
  return <>{children}</>; // aqui va tu sidebar/estructura actual
}
