import Link from 'next/link';
import type { Business } from '../../lib/types';
import Image from 'next/image';
import StoreMenuSheet from './MenuSheet';

export function StoreHeader({ business }: { business: Business }) {
  // const opensIn = business.opensIn;
  const opensIn = '10:00 AM';

  return (
    <header
      className="
        sticky top-0  z-30 h-14 w-full
        bg-card  border-b border-border shadow-sm text-card-foreground
        flex px-4 py-2 items-center gap-3
      "
    >
      <Link
        href={`/b/${business.slug}`}
        aria-label={business.name}
        className="flex-none"
      >
        <Image
          src={business.logo || '/black-cover.webp'}
          alt={business.name}
          className="rounded-full w-10 h-10 object-cover"
          width={40}
          height={40}
        />
      </Link>

      <div className="w-full min-w-0">
        <div className="flex items-center gap-1 text-xs">
          <span
            className={
              business.isOpen
                ? 'text-primary-accent font-bold uppercase'
                : 'text-destructive font-bold uppercase'
            }
          >
            {business.isOpen ? 'Abierto' : 'Cerrado'}
          </span>

          {!business.isOpen && opensIn && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">Abre en {opensIn}</span>
            </>
          )}
        </div>

        <h1 className="line-clamp-1 text-sm font-bold uppercase text-primary">
          {business.name}
        </h1>
      </div>

      <div className="flex-none flex items-center gap-1 text-primary">
        <button
          aria-label="Buscar"
          type="button"
          className="p-1.5 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg
            viewBox="0 0 18 18"
            className="w-5 h-5"
            stroke="currentColor"
            fill="none"
          >
            <path
              d="M8.22 2c3.44 0 6.22 2.79 6.22 6.22s-2.79 6.22-6.22 6.22S2 11.66 2 8.22 4.79 2 8.22 2Zm4.4 10.62 3.38 3.38"
              strokeLinecap="round"
              strokeWidth="1.3"
            />
          </svg>
        </button>

          <StoreMenuSheet
            storeName={business.name}
            storeSlug={business.slug}
            storeLogo={business.logo}
            storeType={'restaurante'}
          />
       
      </div>
    </header>
  );
}