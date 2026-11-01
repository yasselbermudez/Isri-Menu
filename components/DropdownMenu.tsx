// components/DropdownMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  businessSlug: string;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export default function DropdownMenu({ businessSlug, currency, onCurrencyChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Options"
        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 z-50">
          <div className="py-1">
            <Link
              href={`/${businessSlug}/categories`}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Categories
            </Link>
            <button
              onClick={() => {
                // Abrir modal o selector de moneda
                const newCurrency = currency === 'CUP' ? 'USD' : 'CUP';
                onCurrencyChange(newCurrency);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Change currency (current: {currency})
            </button>
            <Link
              href={`/${businessSlug}/info`}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              More info
            </Link>
            <Link
              href={`/${businessSlug}/review`}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Leave a review
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}