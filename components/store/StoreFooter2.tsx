import { Business } from "@/lib/types";
import {Icons} from "../Icons"
type Store = Business;

function formatTimeUntil(target: Date): string {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return '0m';
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (h > 0 && m > 0) return `${h}h y ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

function normalizeSocial(value: string, base: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  const handle = value.startsWith('@') ? value.slice(1) : value;
  return `${base}/${handle}`;
}

function buildLocation(store: Store): string {
  return [store.city, store.state, store.country].filter(Boolean).join(', ');
}

function buildPhone(store: Store): { tel: string; wa: string; display: string } | null {
  if (!store.phone) return null;
  const digits = store.phone.replace(/[^\d]/g, '');
  if (!digits) return null;
  return {
    display: store.phone,
    tel: `tel://+${digits}`,
    wa: `https://api.whatsapp.com/send?phone=${digits}`,
  };
}

interface StoreFooterProps {
  store: Store;
}

export function StoreFooter({ store }: StoreFooterProps) {
  const location = buildLocation(store);
  const phone = buildPhone(store);
  const nextOpening = store.nextOpening ? new Date(store.nextOpening) : null;
  const statusDetail =
    nextOpening && !Number.isNaN(nextOpening.getTime())
      ? `${store.isOpen ? '· Cierra en' : '· Abre en'} ${formatTimeUntil(nextOpening)}`
      : null;

  const socials = [
    store.instagram && { href: normalizeSocial(store.instagram, 'https://instagram.com'), Icon: Icons.IcoInstagram, label: 'Instagram' },
    store.facebook && { href: normalizeSocial(store.facebook, 'https://facebook.com'), Icon: Icons.IcoFacebook, label: 'Facebook' },
    store.youtube && { href: normalizeSocial(store.youtube, 'https://youtube.com'), Icon: Icons.IcoYouTube, label: 'YouTube' },
    //store.x && { href: normalizeSocial(store.x, 'https://x.com'), Icon: Icons.IcoX, label: 'X' },
    //store.tiktok && { href: normalizeSocial(store.tiktok, 'https://tiktok.com'), Icon: Icons.IcoTikTok, label: 'TikTok' },
    store.website && { href: store.website, Icon: Icons.IcoGlobe, label: 'Sitio web' },
  ].filter(Boolean) as { href: string; Icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string }[];

  return (
    <footer
      role="contentinfo"
      className="w-full pb-12 pt-8 bg-primary text-primary-foreground flex flex-col px-4"
    >
      <span className="font-semibold text-3xl">{store.name}</span>
      {store.description && (
        <p className="text-base text-primary-foreground/70 mt-2 whitespace-pre-line">
          {store.description}
        </p>
      )}

      {/* Estado */}
      <div className="flex gap-2 items-center mt-6">
        <div className="w-9 h-9 bg-white/15 rounded-full flex items-center flex-none">
          <Icons.IcoClock className="w-5 h-5 mx-auto text-primary-accent" />
        </div>
        <div className="truncate leading-tight flex items-center flex-wrap text-primary-foreground/70">
          <span className="text-primary-foreground text-base font-semibold">
            {store.isOpen ? 'Abierto' : 'Cerrado'}
          </span>
          {statusDetail && <span className="ml-1">{statusDetail}</span>}
        </div>
      </div>

      {/* Ubicación */}
      {location && (
        <div className="text-primary-foreground text-base font-semibold flex gap-2 items-center mt-2">
          <div className="w-9 h-9 bg-white/15 rounded-full flex items-center flex-none">
            <Icons.IcoPin className="w-5 h-5 mx-auto" />
          </div>
          {location}
        </div>
      )}

      {/* Delivery */}
      {store.delivery && (
        <div className="flex gap-2 items-center mt-2 text-primary-foreground text-base font-semibold">
          <div className="w-9 h-9 bg-white/15 rounded-full flex items-center flex-none">
            <Icons.IcoDelivery className="w-5 h-5 mx-auto" />
          </div>
          Entregamos a domicilio
        </div>
      )}

      {/* Contactos */}
      {phone && (
        <div className="flex flex-col gap-3">
          <span className="mt-12 text-sm text-primary-foreground/70">Contactos</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={phone.wa}
            className="text-xl font-semibold text-primary-foreground hover:text-primary-accent flex items-center gap-2 rounded-xl bg-white/15 w-fit px-3 py-2"
          >
            <Icons.IcoWhatsApp className="w-6 h-6" />
            {phone.display}
          </a>
          <a
            href={phone.tel}
            className="text-xl font-semibold text-primary-foreground hover:text-primary-accent flex items-center gap-2 rounded-xl bg-white/15 w-fit px-3 py-2"
          >
            <Icons.IcoPhone className="w-6 h-6" />
            {phone.display}
          </a>
        </div>
      )}

      {/* Redes */}
      {socials.length > 0 && (
        <div className="flex flex-col gap-3 mt-12">
          <span className="text-sm text-primary-foreground/70">Redes sociales</span>
          <div className="flex items-center flex-wrap gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                target="_blank"
                rel="noopener noreferrer"
                href={href}
                aria-label={`${label} - ${store.name}`}
                className="bg-white/15 rounded-full p-3 group hover:bg-white/25"
              >
                <Icon className="w-7 h-7 text-primary-foreground group-hover:text-primary-accent" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="h-0.5 w-5 bg-primary-foreground mt-12" />

      <a
        href="https://elyerromenu.com/signup?s=1OV8I"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-semibold text-primary-foreground mt-3 flex items-center gap-2 group hover:text-primary-accent"
      >
        Crea tu catálogo digital
        <div className="p-1 border rounded-full border-primary-accent group-hover:bg-primary-accent">
          <Icons.IcoPlusCircle className="w-4 h-4 text-primary-accent group-hover:text-primary" />
        </div>
      </a>
      <a
        href="https://elyerroapp.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-sm text-primary-foreground/70 hover:text-primary-accent"
      >
        ©{new Date().getFullYear()} El Yerro Apps SRL
      </a>
    </footer>
  );
}