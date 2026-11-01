// lib/supabase-server.ts
//
// Cliente de Supabase para uso EXCLUSIVO en el servidor (API routes,
// server actions). Usa la service_role key, que se salta RLS por completo,
// así que este archivo NUNCA debe importarse desde código de cliente
// ("use client") ni exponer la key con el prefijo NEXT_PUBLIC_.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno"
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
