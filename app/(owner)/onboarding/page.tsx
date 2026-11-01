import { redirect } from "next/navigation";
import { requireOwner, getMyStore } from "@/lib/auth/dal";
//import { prisma } from "@/lib/prisma";
import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
  await requireOwner();                            // sin sesion -> /login
  if (await getMyStore()) redirect("/dashboard");  // ya tiene tienda -> no repetir onboarding
  //obtener las categorias globales
  //const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <main className="mx-auto max-w-lg p-6 space-y-6">
      <h1 className="text-2xl font-bold">Crea tu tienda</h1>
      {/*pasamos las categorias globales*/ }
      {/*<OnboardingForm categories={categories.map(({ id, name }) => ({ id, name }))} />*/}
      <OnboardingForm />
    </main>
  );
}
