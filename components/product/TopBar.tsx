"use client";

import Link from "next/link";

interface TopBarProps {
  storeName: string;
  storeSlug: string;
  categoryName: string;
  children?: React.ReactNode
}

export function TopBar({ storeName, storeSlug, categoryName,children}: TopBarProps) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${storeName} — ${categoryName}`,
          url: window.location.href,
        });
      } catch {
        /* usuario canceló */
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full h-14 bg-card border-b border-border flex items-center px-4 gap-2 shadow-sm">
        {/* Botón atrás */}
        <div className="flex-none flex items-center">
          <Link href={`/store/${storeSlug}`} aria-label="cerrar" className="text-foreground">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        </div>

        {/* Nombre tienda + categoría */}
        <div className="w-full break-words">
          <div className="flex flex-col">
            <div className="truncate text-muted-foreground text-xs w-full pr-4">
              {storeName}
            </div>
            <span className="line-clamp-1 text-primary-accent font-bold text-sm mb-0 p-0 uppercase">
              {categoryName}
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex-none flex gap-4 content-center text-primary-accent items-center">
          <Link href={`/store/${storeSlug}/search`} aria-label="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" stroke="currentColor" className="w-5 h-5">
              <path
                d="M8.22,2c3.44,0,6.22,2.79,6.22,6.22s-2.79,6.22-6.22,6.22-6.22-2.79-6.22-6.22,2.79-6.22,6.22-6.22ZM12.62,12.62l3.38,3.38"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.3}
              />
            </svg>
          </Link>
          <button type="button" aria-label="Compartir producto" onClick={handleShare}>
            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
          </button>
          {children}
        </div>
      
    </header>
  );
}