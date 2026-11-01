const RESERVED = ["admin", "api", "dashboard", "login", "registro", "tiendas", "superadmin", "onboarding", "auth"];

// "Mi Tienda Ñandú!" -> "mi-tienda-nandu"
export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);

export const isReserved = (slug: string) => RESERVED.includes(slug);
