// components/PlaceHeader.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';

interface Props {
  business: {
    slug: string;
    name: string;
    logo: string | undefined;
    isOpen: boolean;
    nextOpening?: string;
    currency: string;
  };
  onCurrencyChange: (currency: string) => void;
}

export default function PlaceHeader({ business, onCurrencyChange }: Props) {
  const { slug, name, logo, isOpen, nextOpening, currency } = business;

  return (
    <header className="fixed w-full max-w-lg top-0 z-30 bg-gray-800 shadow-md h-[56px]">
      <div className="flex px-4 py-2 items-center gap-2 flex-1 h-full">
        {/* Logo */}
        <div className="flex-none flex items-center">
          <Link href={`/${slug}`} aria-label={name}>
            <Image
              src={logo?logo:"dedede"}
              alt={name}
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority
            />
          </Link>
        </div>

        {/* Nombre y estado */}
        <div className="w-full wrap-break-word">
          <div className="flex flex-col">
            <div className="truncate line-clamp-1 leading-tight flex overflow-hidden gap-px items-center flex-wrap text-gray-400 text-xs">
              <span
                className={`uppercase font-bold ${
                  isOpen ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isOpen ? 'Open' : 'Closed'}
              </span>
              {!isOpen && nextOpening && (
                <>
                  <span className="ml-1">· Opens</span>
                  <span className="ml-1">{nextOpening}</span>
                </>
              )}
            </div>
            <span className="line-clamp-1 text-emerald-400 font-bold text-sm uppercase">
              {name}
            </span>
          </div>
        </div>

        {/* Botones: búsqueda y menú */}
        <div className="flex-none flex gap-4 content-center text-emerald-400 items-center">
          <Link href={`/${slug}/search`} aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M8.22,2c3.44,0,6.22,2.79,6.22,6.22s-2.79,6.22-6.22,6.22-6.22-2.79-6.22-6.22,2.79-6.22,6.22-6.22ZM12.62,12.62l3.38,3.38"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </Link>
          <DropdownMenu
            businessSlug={slug}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
          />
        </div>
      </div>
    </header>
  );
}