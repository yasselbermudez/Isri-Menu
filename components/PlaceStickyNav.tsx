// components/PlaceStickyNav.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Category } from '@/lib/types';

interface Props {
  categories: Category[];
  businessSlug: string;
}

export default function PlaceStickyNav({ categories, businessSlug,}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel para detectar cuándo el hero desaparece */}
      <div ref={sentinelRef} className="h-0" />

      <nav
        className={`sticky top-14 z-20 bg-gray-800 shadow-md transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex gap-4 px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${businessSlug}/category/${cat.slug}`}
              className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}