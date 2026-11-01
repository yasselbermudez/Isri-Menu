import Image from 'next/image';
import type { Business } from '../../lib/types';

export function StoreHero({ business }: { business: Business }) {
  return (
    <section className="bg-background pt-4 mb-3 pb-8" id='hero'>
      {/* portada */}
      <div className="mx-4 aspect-square rounded-lg overflow-hidden bg-muted">
        <Image
          src={business.cover || '/black-cover.webp'}
          alt={business.name}
          className="w-full h-full object-cover"
          width={480}
          height={480}
        />
      </div>

      {/* reseñas + moneda */}
      <div className="px-4 pt-4 flex gap-2 text-sm">
        <div className="flex items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            className="w-4 stroke-primary fill-background dark:fill-muted-foreground"
          >
            <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z" />
          </svg>
          <span className="text-muted-foreground">
            ({business.reviewsCount ?? 0} reseñas)
          </span>
        </div>

        <span className="text-muted-foreground">·</span>

        <div className="flex items-center gap-1">
          <span className="font-semibold text-primary-accent">
            {business.currency ?? 'CUP'}
          </span>
          <span className="text-muted-foreground">
            ({business.priceRange ?? '$$'})
          </span>
        </div>
      </div>

      {/* info */}
      <div className="px-4 mt-2 text-primary-accent">
        <h1 className="text-2xl font-bold leading-tight">{business.name}</h1>

        {business.address && (
          <p className="text-base font-semibold">{business.address}</p>
        )}

        {business.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {business.description}
          </p>
        )}

        {/* botones */}
        <div className="flex flex-row mt-4 gap-2">
          {business.deliveryAvailable && (
            <div className="flex items-center rounded-full pl-3 pr-4 py-1.5 bg-primary text-primary-foreground">
              <svg
                viewBox="0 0 18 18"
                fill="currentColor"
                className="w-5 h-5 mr-1.5"
              >
                <path d="M13.92 3.5h-.93v-.88c0-.7-.29-1.38-.81-1.87-1.06-1.02-2.77-1-3.81.04C7.86.28 7.16 0 6.44 0 4.95 0 3.74 1.18 3.74 2.62v.88h-.93c-.64 0-1.15.5-1.15 1.12l-1 10.38c0 1.66 1.38 3 3.08 3h6.42..." />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">
                  Domicilio
                </span>
                <span className="text-xs leading-tight text-primary-foreground/80">
                  Disponible ahora
                </span>
              </div>
            </div>
          )}

          {business.pickupAvailable && (
            <div className="flex items-center rounded-full pl-3 pr-4 py-1.5 bg-secondary text-secondary-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-1.5"
              >
                <path d="M23.05 4.5v2.1a2.19 2.19 0 0 1-1.31 2.05v3.16l-.3-.2a5.79 5.79 0 0 0-6 0 6.06 6.06 0 0 0-3 5.24..." />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">
                  Recogida
                </span>
                <span className="text-xs leading-tight text-secondary-foreground/70">
                  Disponible ahora
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}