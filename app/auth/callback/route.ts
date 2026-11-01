// Recibe al usuario desde el enlace del correo (confirmacion de cuenta o recuperacion de contrasena).
// Supabase manda un "code" que aqui se intercambia por una sesion real (cookies).
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getHomePath } from "@/lib/auth/dal";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const safe = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
      return NextResponse.redirect(`${origin}${safe ?? (await getHomePath())}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=callback`);
}
