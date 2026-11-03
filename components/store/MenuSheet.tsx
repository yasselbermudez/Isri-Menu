// components/store/StoreMenuSheet.tsx
"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "../Icons"
import Image from "next/image"

type StoreMenuSheetProps = {
  storeSlug: string
  storeName: string
  storeLogo?: string | null
  storeType?: string
  verified?: boolean
  cartCount?: number
  onCategoriesClick?: () => void
  /** Si no se pasa, se usa el botón de menú por defecto */
  trigger?: ReactNode
  /** "right" por defecto; puedes usar "left" | "top" | "bottom" */
  side?: "left" | "right" | "top" | "bottom"
}

export default function StoreMenuSheet({
  storeSlug,
  storeName,
  storeLogo,
  storeType = "Restaurante",
  verified = false,
  cartCount = 0,
  onCategoriesClick,
  trigger,
  side = "right",
}: StoreMenuSheetProps) {
  return (
    <Sheet>
      <SheetTrigger>
        {trigger ?? (
          <button type="button" aria-label="Abrir menú">
            <Icons.IcoMenu className="w-6 h-6 fill-current" />
          </button>
        )}
      </SheetTrigger>

      <SheetContent
        side={side}
        className="w-full max-w-lg p-0 flex flex-col gap-0 border-border bg-background"
      >
        {/* ───────── Store header ───────── */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          {storeLogo && (
            <Image
              src={storeLogo}
              alt={storeName}
              className="flex-none rounded-full w-11 h-11 object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="flex items-center gap-1 text-lg font-semibold leading-tight text-foreground">
              <span className="truncate">{storeName}</span>
              {verified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15.99 16"
                  fill="currentColor"
                  aria-label="Verificado"
                  className="inline h-4 shrink-0 -translate-y-0.5 fill-primary-accent"
                >
                  <path d="M15.8,8.27l-.03-.06c-.37-.73-.49-1.57-.33-2.38v-.06c.15-.71-.18-1.43-.81-1.79l-.03-.02c-.72-.42-1.28-1.06-1.58-1.84v-.03c-.28-.68-.95-1.11-1.67-1.08h-.01c-.84.05-1.66-.2-2.34-.69h-.01c-.59-.43-1.39-.43-1.98,0h-.01c-.68.49-1.51.74-2.34.69h-.01c-.73-.03-1.4.4-1.66,1.08v.03c-.32.78-.88,1.42-1.6,1.84l-.03.02c-.62.36-.95,1.08-.81,1.79v.06c.17.81.05,1.65-.33,2.38l-.03.06c-.33.64-.22,1.42.28,1.94l.04.04c.57.6.92,1.37.99,2.2v.05c.07.72.59,1.32,1.3,1.49h.01c.82.2,1.54.67,2.05,1.33v.02c.46.58,1.23.8,1.91.56.4-.14.81-.21,1.23-.21s.82.07,1.22.21c.69.24,1.46.02,1.91-.56v-.02c.52-.66,1.24-1.13,2.05-1.32h.02c.71-.18,1.22-.78,1.29-1.5v-.05c.08-.83.43-1.6,1-2.2l.04-.04c.49-.52.6-1.3.27-1.94ZM11.7,6.88l-3.87,3.87c-.14.13-.3.2-.48.2s-.34-.07-.48-.2l-1.95-1.96c-.13-.12-.19-.28-.19-.48s.06-.35.19-.47c.13-.13.29-.19.48-.19s.35.06.48.19l1.47,1.47,3.39-3.39c.13-.13.29-.19.48-.19.2,0,.36.06.48.19.13.12.19.28.19.48s-.06.35-.19.48Z" />
                </svg>
              )}
            </h4>
            {storeType && (
              <span className="text-xs font-normal text-muted-foreground">
                {storeType}
              </span>
            )}
          </div>
        </div>

        {/* ───────── Menu items ───────── */}
        <nav className="flex flex-col gap-2 pt-2 pb-8 overflow-y-auto">
          {/* Categorías */}
          <button
            type="button"
            onClick={onCategoriesClick}
            className="text-left transition-colors active:bg-muted"
          >
            <div className="flex items-center gap-3.5 py-2 pl-6 pr-4 min-h-11">
              <span className="min-w-[14px] text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" stroke="currentColor" className="w-5 h-5">
                  <path
                    d="M6.9,9h9.1M2,9h.7M2,4.1h.7M2,13.9h.7M6.9,4.1h9.1M6.9,13.9h9.1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                  />
                </svg>
              </span>
              <span className="flex-1 text-sm font-semibold text-foreground">
                Categorías
              </span>
              <span className="mr-3 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-3 h-3">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.7"
                    d="M11.6,6.7l8.8,9.3-8.8,9.3"
                  />
                </svg>
              </span>
            </div>
          </button>

          {/* Pedido / Carrito */}
          <Link
            href={`/store/${storeSlug}/cart`}
            className="text-left transition-colors active:bg-muted"
          >
            <div className="flex items-center gap-3.5 py-2 pl-6 pr-4 min-h-11">
              <span className="min-w-[14px] text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" stroke="currentColor" className="w-5 h-5">
                  <path
                    d="M13.12,16.99H4.88c-1.25,0-2.26-1.01-2.26-2.26V5.73c0-.32.26-.59.59-.59h11.59c.32,0,.59.26,.59.59v9.01c0,1.25-1.01,2.26-2.26,2.26h0ZM10.87,5.14v9.68c0,1.2.97,2.17,2.17,2.17h.14M9.3,5.14v-2.2c0-1.07-.87-1.94-1.94-1.94h-.29c-1.07,0-1.94.87-1.94,1.94v2.2M12.75,5.14v-2.2c0-1.07-.87-1.94-1.94-1.94h-.29c-.65,0-1.23.33-1.58.81"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                  />
                </svg>
              </span>
              <span className="flex-1 text-sm font-semibold text-foreground">
                Pedido
              </span>
              {cartCount > 0 && (
                <span className="mr-3 flex min-w-6 h-6 items-center justify-center rounded-full bg-primary-accent px-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* Deja una reseña */}
          <Link
            href={`/store/${storeSlug}/review`}
            className="text-left transition-colors active:bg-muted"
          >
            <div className="flex items-center gap-3.5 py-2 pl-6 pr-4 min-h-11">
              <span className="min-w-[14px] text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" stroke="currentColor" className="h-5 w-5">
                  <path
                    d="M5.44,16.16c-.28-.15-.61-.18-.92-.11l-1.78.48c-.18.05-.36.05-.54,0-.55-.15-.88-.72-.74-1.27l.48-1.78c.08-.31.04-.63-.11-.92-.53-1.07-.83-2.28-.83-3.56C1,4.58,4.58,1,9,1s8,3.58,8,8-3.58,8-8,8c-1.24,0-2.46-.28-3.56-.84ZM7.91,6.94c-.12.22-.19.33-.28.4-.1.07-.22.1-.46.15l-.22.05c-.84.19-1.26.29-1.36.61-.1.32.19.66.76,1.33l.15.17c.16.19.24.29.28.4.04.12.03.25,0,.5l-.02.23c-.09.9-.13,1.35.13,1.55.26.2.66.02,1.45-.35l.2-.09c.22-.1.34-.16.46-.16s.23.05.46.16l.2.09c.79.36,1.18.54,1.45.35.26-.2.22-.65.13-1.55l-.02-.23c-.03-.26-.04-.38,0-.5.04-.12.12-.21.28-.4l.15-.17c.57-.67.86-1.01.76-1.33-.1-.32-.52-.42-1.37-.61l-.22-.05c-.24-.05-.36-.08-.46-.16-.1-.07-.16-.18-.28-.4l-.11-.2c-.43-.78-.65-1.17-.98-1.17s-.54.39-.98,1.17l-.11.2Z"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                  />
                </svg>
              </span>
              <span className="flex-1 text-sm font-semibold text-foreground">
                Deja una reseña
              </span>
            </div>
          </Link>

          {/* Info */}
          <Link
            href={`/store/${storeSlug}/info`}
            className="text-left transition-colors active:bg-muted"
          >
            <div className="flex items-center gap-3.5 py-2 pl-6 pr-4 min-h-11">
              <span className="min-w-[14px] text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" stroke="currentColor" className="h-5 w-5">
                  <circle cx="9" cy="9" r="8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
                  <path d="M9,13v-4.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
                  <path d="M9,5.8h0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
                </svg>
              </span>
              <span className="flex-1 text-sm font-semibold text-foreground">
                Más sobre {storeName}
              </span>
            </div>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}