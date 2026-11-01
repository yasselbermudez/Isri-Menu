import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// UUID fijo del usuario de prueba. Coincide con profiles.id.
// En producción esto vendría de auth.users, pero para el seed basta con un UUID válido.
const OWNER_ID = "00000000-0000-0000-0000-000000000001";

const businesses = [
  {
    slug: "la-esquina-del-sabor",
    ownerId: OWNER_ID,
    name: "La Esquina del Sabor",
    state: "Cundinamarca",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=256&q=80",
    cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    description: "Cocina casera y sabores locales para disfrutar todos los dias.",
    address: "Calle 10 #12-34",
    city: "Bogota",
    country: "Colombia",
    phone: "+57 300 123 4567",
    email: "hola@laesquinadelsabor.test",
    website: "https://laesquinadelsabor.test",
    instagram: "@laesquinadelsabor",
    isOpen: true,
    published: true,
    currency: "COP",
    priceRange: "$$",
    rating: 4.8,
    reviewsCount: 126,
    delivery: true,
    pickup: true,
  },
  {
    slug: "cafe-luna",
    ownerId: OWNER_ID,
    name: "Cafe Luna",
    state: "Antioquia",
    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=256&q=80",
    cover: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
    description: "Cafe de especialidad, reposteria artesanal y tardes tranquilas.",
    address: "Carrera 7 #45-18",
    city: "Medellin",
    country: "Colombia",
    phone: "+57 301 765 4321",
    email: "hola@cafeluna.test",
    instagram: "@cafeluna",
    isOpen: false,
    published: true,
    nextOpening: "08:00",
    currency: "COP",
    priceRange: "$",
    rating: 4.6,
    reviewsCount: 89,
    delivery: false,
    pickup: true,
  },
  {
    slug: "brasa-norte",
    ownerId: OWNER_ID,
    name: "Brasa Norte",
    state: "Valle del Cauca",
    logo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=256&q=80",
    cover: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
    description: "Parrilla al carbon, porciones generosas y ambiente familiar.",
    address: "Avenida Siempre Viva #25-60",
    city: "Cali",
    country: "Colombia",
    phone: "+57 302 555 0198",
    email: "reservas@brasanorte.test",
    facebook: "brasanorte",
    isOpen: true,
    published: true,
    currency: "COP",
    priceRange: "$$$",
    rating: 4.9,
    reviewsCount: 214,
    delivery: true,
    pickup: true,
  },
];

async function main() {
  // 1) Crear el perfil del propietario de prueba (necesario por la FK de ownerId)
  await prisma.profile.upsert({
    where: { id: OWNER_ID },
    create: {
      id: OWNER_ID,
      role: "owner",
      fullName: "Usuario de Prueba",
    },
    update: {},
  });

  // 2) Crear/actualizar los negocios apuntando al perfil anterior
  for (const business of businesses) {
    await prisma.business.upsert({
      where: { slug: business.slug },
      create: business,
      update: business,
    });
  }

  console.log(`Seed completado: ${businesses.length} negocios disponibles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });