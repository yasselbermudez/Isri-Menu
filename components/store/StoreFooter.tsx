import type { Business } from '../../lib/types';

export function StoreFooter({ business }: { business: Business }) {
  return (
    <footer className="bg-primary text-primary-foreground flex flex-col px-4 py-10 mt-6">
      <span className="font-semibold text-3xl">{business.name}</span>

      {business.description && (
        <p className="text-base text-primary-foreground/80 mt-2 whitespace-pre-line">
          {business.description}
        </p>
      )}

      {business.address && (
        <p className="mt-6 text-sm text-primary-foreground/80">
          📍 {business.address}
        </p>
      )}

      <div className="flex flex-col gap-3 mt-10">
        <span className="text-sm text-primary-foreground/70">Contactos</span>

        {business.whatsapp && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?phone=${business.whatsapp}`}
            className="text-lg font-semibold flex items-center gap-2 rounded-xl bg-primary-foreground/15 w-fit px-3 py-2 transition-colors hover:bg-primary-foreground/25"
          >
            +{business.whatsapp}
          </a>
        )}

        {business.email && (
          <a
            href={`mailto:${business.email}`}
            className="text-lg font-semibold flex items-center gap-2 rounded-xl bg-primary-foreground/15 w-fit px-3 py-2 transition-colors hover:bg-primary-foreground/25"
          >
            {business.email}
          </a>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <span className="text-sm text-primary-foreground/70">Redes sociales</span>
        <div className="flex gap-3">
          {business.instagram && (
            <a
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              className="bg-primary-foreground/15 rounded-full p-3 transition-colors hover:bg-primary-foreground/25"
              aria-label="Instagram"
            >
              <span className="text-sm font-semibold">IG</span>
            </a>
          )}

          {business.facebook && (
            <a
              href={business.facebook}
              target="_blank"
              rel="noreferrer"
              className="bg-primary-foreground/15 rounded-full p-3 transition-colors hover:bg-primary-foreground/25"
              aria-label="Facebook"
            >
              <span className="text-sm font-semibold">FB</span>
            </a>
          )}
        </div>
      </div>

      <div className="mt-16 text-sm text-primary-foreground/70">
        ©{new Date().getFullYear()} {business.name}
      </div>
    </footer>
  );
}