"use client";

import { useState } from "react";
import {
  ArrowRight, BadgeCheck, ChevronRight, Heart, MapPin, Search,
  ShoppingBag, Star, Truck, Store, BookOpen, Sparkles, Gift, Shirt, Coffee,
  Utensils, Flower2, Dumbbell, Smartphone, Home, X, Zap,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import StoreMenuSheet from "@/components/store/MenuSheet";
import { useRouter } from 'next/navigation';

type Business = {
  name: string; category: string; rating: string; image: string;
  delivery?: boolean; pickup?: boolean; verified?: boolean; location: string;
};

type Product = { name: string; image: string; price?: string };

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const businesses: Business[] = [
  { name: "DermoBrav", category: "Belleza y cuidado personal", rating: "4.9", image: image("photo-1608571423902-eed4a5ad8108"), delivery: true, pickup: true, verified: true, location: "Vedado, La Habana" },
  { name: "Bodegón Oasis", category: "Bodegón y alimentos", rating: "4.8", image: image("photo-1542838132-92c53300491e"), delivery: true, pickup: true, verified: true, location: "Vedado, La Habana" },
  { name: "Casa Verde", category: "Hogar y decoración", rating: "4.7", image: image("photo-1618221195710-dd6b41faaea6"), pickup: true, location: "Playa, La Habana" },
  { name: "Café Central", category: "Cafetería", rating: "4.9", image: image("photo-1445116572660-236099ec97a0"), delivery: true, location: "Centro Habana" },
];

const trending = [
  { name: "MuDreams", image: image("photo-1490481651871-ab68de25d43d", 300), verified: true,slug:'suripong'},
  { name: "Walmart Store", image: image("photo-1542838132-92c53300491e", 300), verified: false,slug:'suripong' },
  { name: "Nuevitas Express", image: image("photo-1542838132-92c53300491e", 300), verified: true,slug:'suripong'},
  { name: "S&J Nails", image: image("photo-1604654894610-df63bc536371", 300), verified: true,slug:'suripong' },
  { name: "BlancaArmonía", image: image("photo-1608248543803-ba4f8c70ae0b", 300), verified: false,slug:'suripong' },
  { name: "Suripong", image: image("photo-1490481651871-ab68de25d43d", 300), verified: true,slug:'suripong' },
];

const productSets: { title: string; location: string; products: Product[] }[] = [
  { title: "Productos de cuidado personal en", location: "Santa Clara", products: [
    { name: "Rutina facial hidratante", image: image("photo-1601049541289-9b1b7bbbfe19") },
    { name: "Esenciales para tu piel", image: image("photo-1556229010-6c3f2c9ca5f8") },
    { name: "Cuidado y bienestar", image: image("photo-1608248543803-ba4f8c70ae0b") },
    { name: "Belleza natural", image: image("photo-1596462502278-27bfdc403348") },
  ]},
  { title: "Encuentra lo que necesitas en", location: "La Habana", products: [
    { name: "Accesorios para el hogar", image: image("photo-1616486338812-3dadae4b4ace") },
    { name: "Detalles para regalar", image: image("photo-1513475382585-d06e58bcb0e0") },
    { name: "Productos favoritos", image: image("photo-1542291026-7eec264c27ff") },
    { name: "Nuevas colecciones", image: image("photo-1490312278390-ab64016e0aa9") },
  ]},
];

const categories = [
  { label: "Todos", icon: Store }, { label: "Tienda general", icon: ShoppingBag },
  { label: "Catálogo", icon: BookOpen }, { label: "Belleza", icon: Sparkles },
  { label: "Combos", icon: Gift }, { label: "Regalos", icon: Flower2 },
  { label: "Ropa", icon: Shirt }, { label: "Cafeterías", icon: Coffee },
  { label: "Restaurantes", icon: Utensils }, { label: "Hogar", icon: Home },
  { label: "Deportes", icon: Dumbbell }, { label: "Tecnología", icon: Smartphone },
];

function SectionHeading({ eyebrow, title, action = "Ver todos" }: { eyebrow?: string; title: string; action?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3 px-5">
      <div>
        {eyebrow && <p className="mb-1 text-[11px] font-bold uppercase tracking-[.16em] text-primary-accent">{eyebrow}</p>}
        <h2 className="text-[21px] font-extrabold leading-tight tracking-[-.04em] text-foreground">{title}</h2>
      </div>
      <button className="shrink-0 text-xs font-bold text-primary-accent hover:text-primary-hover">{action}</button>
    </div>
  );
}

function Header() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/90 pb-3 pt-3 backdrop-blur-xl">
      <div className="mx-4 flex items-center gap-3 rounded-full border border-surface bg-surface-secondary p-2 shadow-md">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-primary/25">
          <Store size={20} strokeWidth={2.4} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold leading-4 text-foreground">Catálogos</p>
          <p className="mt-1 text-xs text-foreground-muted">Isri</p>
        </div>
        <StoreMenuSheet storeSlug='isri' storeName='Isri'></StoreMenuSheet>
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Buscar"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground-secondary shadow-sm transition hover:-translate-y-0.5"
        >
          {searchOpen ? <X size={18} /> : <Search size={18} />}
        </button>
      </div>

      

      {searchOpen && (
        <div className="mx-4 mt-3 flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-2 shadow-sm">
          
          <StoreMenuSheet storeSlug='isri' storeName='Isri'></StoreMenuSheet>
          
          <Search size={17} className="text-foreground-subtle" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar negocios, productos..."
            className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-foreground-subtle"
          />
          {query && <button onClick={() => setQuery("")}><X size={15} /></button>}
        </div>
      )}
    </header>
  );
}

function CategoryNav() {
  const [active, setActive] = useState("Todos");

  return (
    <nav className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-6 overflow-x-auto px-5 pb-3 pt-4">
      {categories.map(({ label, icon: Icon }) => (
        <button key={label} onClick={() => setActive(label)} className="group flex min-w-[62px] shrink-0 flex-col items-center gap-2">
          <span className={`grid h-11 w-11 place-items-center rounded-2xl transition ${
            active === label
              ? "bg-primary text-primary-foreground shadow-primary/20"
              : "bg-surface-muted text-foreground-muted group-hover:bg-primary-subtle group-hover:text-primary-accent"
          }`}>
            <Icon size={20} strokeWidth={1.9} />
          </span>
          <span className={`whitespace-nowrap text-[10px] font-bold ${active === label ? "text-primary-accent" : "text-foreground-muted"}`}>
            {label}
          </span>
          <span className={`h-0.5 w-5 rounded-full ${active === label ? "bg-primary" : "bg-transparent"}`} />
        </button>
      ))}
    </nav>
  );
}

function TrendingBusinesses() {
  const router = useRouter();

  const handlerClick = (slug:string) => {
    router.push(`/store/${slug}`); // Navega a la nueva URL
  };

  return (
    <section className="mt-7">
      <SectionHeading eyebrow="Descubre" title="Negocios en tendencia" />
      <div className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-4 overflow-x-auto px-5 pb-2">
        {trending.map((item) => (
          <button 
            key={item.name} 
            className="flex w-[82px] shrink-0 flex-col items-center text-center"
            onClick= {() => handlerClick(item.slug)}
            >
            <span className="relative">
              <img src={item.image} alt="" className="h-[76px] w-[76px] rounded-full object-cover ring-4 ring-surface shadow-md" />
              {item.verified && (
                <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-surface bg-primary text-primary-foreground">
                  <BadgeCheck size={13} />
                </span>
              )}
            </span>
            <span className="mt-3 line-clamp-2 text-[11px] font-bold leading-4 text-foreground-secondary">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function BusinessCard({ business }: { business: Business }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="w-[244px] shrink-0 overflow-hidden rounded-[26px] border border-border-subtle bg-card shadow-lg">
      <div className="relative h-[145px]">
        <img src={business.image} alt={business.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 to-transparent" />
        <button
          onClick={() => setLiked(!liked)}
          aria-label="Guardar negocio"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-foreground-secondary shadow-sm backdrop-blur"
        >
          <Heart size={17} className={liked ? "fill-destructive text-destructive" : ""} />
        </button>
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[11px] font-extrabold text-foreground shadow-sm">
          <Star size={12} className="fill-primary-light text-primary-light" /> {business.rating}
        </span>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-primary-accent">{business.category}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <h3 className="truncate text-[17px] font-extrabold tracking-tight text-foreground">{business.name}</h3>
          {business.verified && <BadgeCheck size={15} className="shrink-0 fill-primary-subtle text-primary" />}
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-foreground-muted">
          <MapPin size={12} />{business.location}
        </p>
        <div className="mt-3 flex gap-2">
          {business.delivery && (
            <span className="flex items-center gap-1 rounded-full bg-primary-subtle px-2.5 py-1.5 text-[10px] font-bold text-primary-accent">
              <Truck size={12} /> Domicilio
            </span>
          )}
          {business.pickup && (
            <span className="flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1.5 text-[10px] font-bold text-foreground-secondary">
              <ShoppingBag size={12} /> Recogida
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function BusinessShowcase() {
  return (
    <section className="mt-9">
      <SectionHeading eyebrow="Para ti" title="Negocios que te pueden gustar" />
      <div className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-4 overflow-x-auto px-5 pb-5">
        {businesses.map(b => <BusinessCard key={b.name} business={b} />)}
      </div>
    </section>
  );
}

function ProductCollection({ title, location, products }: { title: string; location: string; products: Product[] }) {
  return (
    <section className="mt-9">
      <div className="mb-4 px-5">
        <p className="text-[11px] font-bold uppercase tracking-[.16em] text-primary-accent">Colección destacada</p>
        <h2 className="mt-1 text-[21px] font-extrabold leading-tight tracking-[-.04em] text-foreground">
          {title} <span className="text-primary-accent">{location}</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5">
        {products.map((product) => (
          <article key={product.name} className="group relative aspect-[1.08] overflow-hidden rounded-[22px] bg-surface-muted shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/5 to-transparent" />
            <span className="absolute bottom-4 left-4 right-3 text-[14px] font-extrabold leading-tight text-background drop-shadow">
              {product.name}
            </span>
          </article>
        ))}
      </div>

      <div className="px-5 pt-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary-border bg-primary-subtle py-3 text-xs font-extrabold text-primary-accent transition hover:bg-primary-border">
          Más de esta colección <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}

function LocationCollections() {
  const places = ["La Habana", "Santa Clara", "Matanzas", "Cerro", "Habana Vieja", "San Miguel del Padrón"];

  return (
    <section className="mt-10">
      <SectionHeading eyebrow="Explora cerca de ti" title="Negocios por ubicación" />

      <div className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-2 overflow-x-auto px-5 pb-3">
        {places.map((place, i) => (
          <button
            key={place}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold ${
              i === 0
                ? "bg-primary text-primary-foreground shadow-primary/20"
                : "border border-border bg-surface text-foreground-secondary"
            }`}
          >
            {place}
          </button>
        ))}
      </div>

      <div className="mx-5 mt-2 rounded-[24px] bg-gradient-to-br from-primary-subtle to-surface-secondary p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary-accent">Selección local</p>
            <h3 className="mt-1 text-lg font-extrabold text-foreground">Lo mejor de tu zona</h3>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-surface text-primary-accent shadow-sm">
            <MapPin size={20} />
          </span>
        </div>
        <p className="mt-2 text-xs leading-5 text-foreground-muted">
          Descubre tiendas, servicios y propuestas interesantes en diferentes municipios.
        </p>
        <button className="mt-3 flex items-center gap-1 text-xs font-extrabold text-primary-accent">
          Explorar ubicaciones <ChevronRight size={15} />
        </button>
      </div>
    </section>
  );
}

function ExploreLinks() {
  const links = [
    ["Belleza y cuidado personal", "Colecciones para cuidarte", Sparkles],
    ["Restaurantes y cafeterías", "Sabores para descubrir", Coffee],
    ["Hogar y decoración", "Ideas para tus espacios", Home],
    ["Tiendas de regalos", "Detalles especiales", Gift],
    ["Ropa y accesorios", "Encuentra tu estilo", Shirt],
    ["Servicios y bienestar", "Profesionales cerca de ti", Flower2],
  ] as const;

  return (
    <section className="mt-10">
      <SectionHeading eyebrow="Inspírate" title="Más por conocer" action="Explorar" />
      <div className="grid grid-cols-2 gap-3 px-5">
        {links.map(([title, sub, Icon]) => (
          <button
            key={title}
            className="flex min-h-[112px] flex-col items-start rounded-[22px] border border-border-subtle bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-primary-subtle text-primary-accent">
              <Icon size={18} />
            </span>
            <span className="text-xs font-extrabold text-foreground">{title}</span>
            <span className="mt-1 text-[10px] text-foreground-muted">{sub}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SignupBanner() {
  return (
    <section className="mx-5 mt-11 overflow-hidden rounded-[28px] bg-foreground p-6 text-background shadow-xl">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3 py-1.5 text-[10px] font-bold text-primary-border">
        <Zap size={12} /> PARA EMPRENDEDORES
      </span>
      <h2 className="mt-4 max-w-[270px] text-[25px] font-extrabold leading-[1.12] tracking-[-.04em]">
        Créate un catálogo digital en minutos.
      </h2>
      <p className="mt-3 max-w-[280px] text-xs leading-5 text-foreground-subtle">
        Muestra tus productos y servicios, conecta con nuevos clientes y haz crecer tu negocio.
      </p>
      <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-extrabold text-primary-foreground shadow-primary/30 transition hover:bg-primary-light">
        Regístrate <ArrowRight size={15} />
      </button>
      <div className="mt-6 flex items-end justify-between">
        <div className="flex -space-x-2">
          {businesses.slice(0, 3).map(b => (
            <img key={b.name} src={b.image} alt="" className="h-9 w-9 rounded-full border-2 border-foreground object-cover" />
          ))}
        </div>
        <p className="text-[10px] font-semibold text-foreground-subtle">Tu negocio merece ser descubierto.</p>
      </div>
    </section>
  );
}

function PromoImage() {
  return (
    <section className="mx-5 mt-5 overflow-hidden rounded-[24px]">
      <div className="relative min-h-[170px] bg-surface-muted">
        <img
          src={image("photo-1556761175-b413da4baf72")}
          alt="Equipo trabajando en un negocio"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
        <div className="relative max-w-[230px] p-5 text-background">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-primary-border">Isri</p>
          <h3 className="mt-2 text-xl font-extrabold leading-tight">Impulsa tu negocio con Isri</h3>
          <button className="mt-4 inline-flex items-center gap-1 text-xs font-bold">
            Conoce más <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 bg-foreground px-6 pb-8 pt-8 text-foreground-subtle">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Store size={20} />
        </span>
        <div>
          <p className="font-extrabold text-background">Isri</p>
          <p className="text-[10px] text-foreground-subtle">Catálogos digitales</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-foreground-subtle">
        Herramienta útil y sencilla. Creación de catálogos y cartas menús de productos y servicios de tu negocio.
      </p>

      <div className="mt-7 grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-extrabold text-background">¿Quieres estar en Isri?</h4>
          <a className="mt-3 block text-xs text-foreground-subtle">Registra tu negocio</a>
          <a className="mt-2 block text-xs text-foreground-subtle">Contacto comercial</a>
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-background">¿Necesitas ayuda?</h4>
          <a className="mt-3 block text-xs text-foreground-subtle">Guía para tu negocio</a>
          <a className="mt-2 block text-xs text-foreground-subtle">Preguntas frecuentes</a>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-foreground/10 pt-5">
        <p className="text-[10px] text-foreground-subtle">© 2026 Isri Apps</p>
        <div className="flex gap-3 text-foreground-subtle">
          <FaInstagram size={16} />
          <FaFacebook size={16} />
          <FaYoutube size={17} />
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-lg overflow-hidden bg-background text-foreground shadow-lg">
      <Header />
      <CategoryNav />
      <div className="pb-8">
        <TrendingBusinesses />
        <BusinessShowcase />
        {productSets.map(set => <ProductCollection key={set.location} {...set} />)}
        <LocationCollections />
        <ExploreLinks />
        <SignupBanner />
        <PromoImage />
      </div>
      <Footer />
    </main>
  );
}
