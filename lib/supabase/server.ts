// Cliente para el SERVIDOR (Server Components, Server Actions, Route Handlers).
// Lee y escribe la sesion en las cookies de la peticion.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // Next 15: cookies() es asincrono
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll(list) {
          try {
            list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // En Server Components no se pueden escribir cookies; el middleware ya refresco la sesion.
          }
        },
      },
    }
  );
}
